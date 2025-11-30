/* eslint-disable
    @typescript-eslint/no-non-null-assertion,
    @typescript-eslint/naming-convention,
    camelcase
*/

import { merge } from 'lodash-es';
import {
    type ErrorResponse, InMemoryWebStorage, type SigninSilentArgs, type User, type UserProfile, WebStorageStateStore
} from 'oidc-client-ts';

import {
    type AuthGuardOptions, AuthLogger, AuthManager, type AuthSubscriber, type AuthSubscriberOptions,
    type AuthSubscription, AuthSubscriptions, decodeJwt, getBaseUrl, isNativeMobile, isUrlMatching,
    stringToURL
} from '../core';
import { DEFAULT_SETTINGS, REDIRECT_URL_KEY } from './default-settings';
import { MobileStorage } from './mobile/mobile-storage';
import type { AccessToken } from './models/access-token.model';
import type { LoginArgs, LogoutArgs, RenewArgs } from './models/args.model';
import { DesktopNavigation } from './models/desktop-navigation.enum';
import type { IdToken } from './models/id-token.model';
import type { OIDCAuthSettings } from './models/oidc-auth-settings.model';
import type { UserSession } from './models/user-session.model';
import { OIDCAuthGuard } from './oidc-auth-guard';
import { OIDCAuthInterceptor } from './oidc-auth-interceptor';
import { OIDCUserManager } from './oidc-user-manager';

const logger = new AuthLogger('OIDCAuthManager');

export class OIDCAuthManager extends AuthManager<OIDCAuthSettings> {
    #idTokenSubs = new AuthSubscriptions<string | undefined>();
    #accessTokenSubs = new AuthSubscriptions<string | undefined>();
    #userProfileSubs = new AuthSubscriptions<UserProfile | undefined>();
    #userSessionSubs = new AuthSubscriptions<UserSession | undefined>();
    #authenticatedSubs = new AuthSubscriptions<boolean>();
    #renewingSubs = new AuthSubscriptions<boolean>();
    #redirectSubs = new AuthSubscriptions<URL>();
    #userManagerSubs: (() => void)[] = [];

    #idToken?: string;
    #accessToken?: string;
    #userProfile?: UserProfile;
    #userSession?: UserSession;
    #isAuthenticated = false;
    #isRenewing = false;

    #userManager?: OIDCUserManager;
    #settings = DEFAULT_SETTINGS as OIDCAuthSettings;

    #user?: User | null;
    private set user(value: User | null | undefined) {
        if (this.#user !== value) {
            this.#user = value;

            this.#idToken = (value) ? value.id_token : undefined;
            this.#accessToken = (value) ? value.access_token : undefined;
            this.#userProfile = value?.profile ?? undefined;
            this.#userSession = (value) ? {
                expired: value.expired,
                expires_in: value.expires_in,
                expires_at: value.expires_at,
                token_type: value.token_type,
                scope: value.scope,
                scopes: value.scopes,
                session_state: value.session_state
            } : undefined;
            this.#isAuthenticated = !!(value && !value.expired);

            this.#idTokenSubs.notify(this.#idToken);
            this.#accessTokenSubs.notify(this.#accessToken);
            this.#userProfileSubs.notify(this.#userProfile);
            this.#userSessionSubs.notify(this.#userSession);
            this.#authenticatedSubs.notify(this.#isAuthenticated);
        }
    }

    // --- PUBLIC API(s) ---

    public async init(userSettings: OIDCAuthSettings): Promise<void> {
        AuthLogger.setLogLevel(userSettings.logLevel ?? DEFAULT_SETTINGS.logLevel);

        // Sanity checks
        const isNativeMobilePlatform = isNativeMobile();
        if (isNativeMobilePlatform && !userSettings.mobileScheme) {
            throw logger.getError('Parameter `mobileScheme` is required for mobile platform');
        }

        /**
         * Providers like Keycloak does not handle custom redirect urls like `demo-app://?oidc-callback=login`,
         * because they lack a host name. To fix this, `demo-app://localhost/?oidc-callback=login` is used instead.
         */
        const baseUrl = (isNativeMobilePlatform) ? `${userSettings.mobileScheme!}://localhost/` : getBaseUrl();

        // Initialize settings
        this.#settings = merge({}, DEFAULT_SETTINGS, {
            internal: {
                userStore: new WebStorageStateStore({
                    store: (isNativeMobilePlatform) ? new MobileStorage() : new InMemoryWebStorage()
                }),
                redirect_uri: `${baseUrl}${DEFAULT_SETTINGS.internal.redirect_uri}`,
                post_logout_redirect_uri: `${baseUrl}${DEFAULT_SETTINGS.internal.post_logout_redirect_uri}`,
                popup_redirect_uri: `${baseUrl}${DEFAULT_SETTINGS.internal.popup_redirect_uri}`,
                popup_post_logout_redirect_uri: `${baseUrl}${DEFAULT_SETTINGS.internal.popup_post_logout_redirect_uri}`,
                silent_redirect_uri: `${baseUrl}${DEFAULT_SETTINGS.internal.silent_redirect_uri}`
            }
        }, userSettings);

        // Make sure we are not trapped in the inception loop
        this.#assertNotInInceptionLoop();

        // Configure the user manager
        this.#userManager = new OIDCUserManager(this.#settings);

        // Configure the interceptor
        if (this.#settings.automaticLoginOn401 || this.#settings.automaticInjectToken) {
            new OIDCAuthInterceptor(this, this.#userManager);
        }

        // Listen for events
        this.#userManagerSubs.push(
            this.#userManager.events.addUserLoaded(user => {
                this.user = user;
            }),
            this.#userManager.events.addUserUnloaded(() => {
                if (this.#user) {
                    this.user = null;
                    // If user is kicked out for any reason -> reload the app if login is required
                    if (this.#settings.loginRequired) {
                        location.reload();
                    }
                }
            }),
            this.#userManager.events.addSilentRenewError(async () => {
                await this.#removeUser();
            })
        );

        // Decide what to do..
        if (isUrlMatching(location.href, this.#settings.internal?.redirect_uri)) {
            // Back from signin redirect
            await this.#runSyncOrAsync(async () => {
                const redirectUrl = sessionStorage.getItem(REDIRECT_URL_KEY);
                await this.#callSignin(() => this.#userManager!.signinRedirectCallback(location.href), redirectUrl);
                sessionStorage.removeItem(REDIRECT_URL_KEY);
            });
        } else if (isUrlMatching(location.href, this.#settings.internal?.post_logout_redirect_uri)) {
            // Back from signout redirect
            await this.#runSyncOrAsync(async () => {
                const redirectUrl = sessionStorage.getItem(REDIRECT_URL_KEY);
                await this.#callSignout(() => this.#userManager!.signoutRedirectCallback(location.href), redirectUrl);
                sessionStorage.removeItem(REDIRECT_URL_KEY);
            });
        } else if (this.#settings.retrieveUserSession || this.#settings.loginRequired) {
            // Try to load user from storage
            const user = await this.#userManager.getUser();
            if (!user || user.expired) {
                // on desktop -> try a silent renew with iframe
                if (!isNativeMobilePlatform && this.#settings.retrieveUserSession) {
                    await this.#runSyncOrAsync(() => this.#signinSilent()
                        .catch(async (signinSilentError: unknown) => {
                            const { error, message } = signinSilentError as ErrorResponse;
                            // Ex: login_required, consent_required, interaction_required, account_selection_required
                            if (this.#settings.loginRequired && (error?.includes('_required') || message.includes('_required'))) {
                                await this.login();
                            } else {
                                logger.warn('User\'s session cannot be retrieved:', message);
                                this.#authenticatedSubs.notify(false);
                                if (this.#settings.loginRequired) {
                                    throw signinSilentError;
                                }
                            }
                        }));
                // else -> force login if required
                } else if (this.#settings.loginRequired) {
                    await this.login();
                // else -> gracefully notify that we are not authenticated
                } else {
                    this.user = null;
                }
            } else {
                this.user = user;
            }
        } else {
            this.user = null;
        }
    }

    public async logout(args?: LogoutArgs): Promise<void> {
        const redirectUrl = args?.redirectUrl ?? location.href;
        if (isNativeMobile()) {
            await this.#callSignout(() => this.#userManager!.signoutMobile(args), redirectUrl);
        } else {
            switch (args?.desktopNavigationType ?? this.#settings.desktopNavigationType) {
                case DesktopNavigation.POPUP:
                    await this.#callSignout(() => this.#userManager!.signoutPopup(args), redirectUrl);
                    break;
                case DesktopNavigation.REDIRECT:
                default:
                    sessionStorage.setItem(REDIRECT_URL_KEY, redirectUrl);
                    await this.#userManager?.signoutRedirect(args);
                    break;
            }
        }
    }

    public async login(args?: LoginArgs): Promise<boolean> {
        const redirectUrl = args?.redirectUrl ?? location.href;
        if (isNativeMobile()) {
            await this.#callSignin(() => this.#userManager!.signinMobile(args), redirectUrl);
        } else {
            switch (args?.desktopNavigationType ?? this.#settings.desktopNavigationType) {
                case DesktopNavigation.POPUP:
                    await this.#callSignin(() => this.#userManager!.signinPopup(args), redirectUrl);
                    break;
                case DesktopNavigation.REDIRECT:
                default:
                    sessionStorage.setItem(REDIRECT_URL_KEY, redirectUrl);
                    await this.#userManager?.signinRedirect(args);
                    break;
            }
        }
        return (this.#isAuthenticated);
    }

    public async renew(args?: RenewArgs): Promise<void> {
        return this.#signinSilent(args).catch((error: unknown) => {
            logger.error(error);
        });
    }

    public getSettings(): OIDCAuthSettings {
        return this.#settings;
    }

    public isRenewing(): boolean {
        return this.#isRenewing;
    }

    public async isAuthenticated(): Promise<boolean> {
        await this.#waitForRenew('isAuthenticated()');
        return this.#isAuthenticated;
    }

    public async runGuard(toUrl: string, options?: AuthGuardOptions): Promise<string | boolean> {
        const authGuard = new OIDCAuthGuard(this);
        return authGuard.validate(toUrl, options);
    }

    public async getUserProfile(): Promise<UserProfile | undefined> {
        await this.#waitForRenew('getUserProfile()');
        return this.#userProfile;
    }

    public async getUserSession(): Promise<UserSession | undefined> {
        await this.#waitForRenew('getUserSession()');
        return this.#userSession;
    }

    public async getIdToken(): Promise<string | undefined> {
        await this.#waitForRenew('getIdToken()');
        return this.#idToken;
    }

    public async getIdTokenDecoded(): Promise<IdToken | string | undefined> {
        await this.#waitForRenew('getIdTokenDecoded()');
        return decodeJwt(this.#idToken) as IdToken | string | undefined;
    }

    public async getAccessToken(): Promise<string | undefined> {
        await this.#waitForRenew('getAccessToken()');
        return this.#accessToken;
    }

    public async getAccessTokenDecoded(): Promise<AccessToken | string | undefined> {
        await this.#waitForRenew('getAccessTokenDecoded()');
        return decodeJwt(this.#accessToken) as AccessToken | string | undefined;
    }

    // --- DESTROY ---

    public destroy(): void {
        this.#idTokenSubs.unsubscribe();
        this.#accessTokenSubs.unsubscribe();
        this.#userProfileSubs.unsubscribe();
        this.#userSessionSubs.unsubscribe();
        this.#authenticatedSubs.unsubscribe();
        this.#renewingSubs.unsubscribe();
        this.#redirectSubs.unsubscribe();
        this.#userManagerSubs.forEach(unsub => {
            unsub();
        });
    }

    // --- HANDLER(s) ---

    public onIdTokenChanged(handler: AuthSubscriber<string | undefined>, options?: AuthSubscriberOptions): AuthSubscription {
        return this.#idTokenSubs.add(handler, options);
    }

    public onAccessTokenChanged(handler: AuthSubscriber<string | undefined>, options?: AuthSubscriberOptions): AuthSubscription {
        return this.#accessTokenSubs.add(handler, options);
    }

    public onUserProfileChanged(handler: AuthSubscriber<UserProfile | undefined>, options?: AuthSubscriberOptions): AuthSubscription {
        return this.#userProfileSubs.add(handler, options);
    }

    public onUserSessionChanged(handler: AuthSubscriber<UserSession | undefined>, options?: AuthSubscriberOptions): AuthSubscription {
        return this.#userSessionSubs.add(handler, options);
    }

    public onAuthenticatedChanged(handler: AuthSubscriber<boolean>, options?: AuthSubscriberOptions): AuthSubscription {
        return this.#authenticatedSubs.add(handler, options);
    }

    public onRenewingChanged(handler: AuthSubscriber<boolean>, options?: AuthSubscriberOptions): AuthSubscription {
        return this.#renewingSubs.add(handler, options);
    }

    public onRedirect(handler: AuthSubscriber<URL>, options?: AuthSubscriberOptions): AuthSubscription {
        return this.#redirectSubs.add(handler, options);
    }

    // --- HELPER(s) ---

    /**
     * Makes sure that the execution code is not trapped in an infinite loop.
     * @example
     * 1) signinSilent or signinPopup was asked
     * 2) iframe or popup was created and navigation was made to OP
     * 3) redirection occurs in iframe or popup
     * 4) `silent_redirect_uri` or `popup_redirect_uri` is not found
     * 5) the web app (instead of the proper redirect_uri) is loaded in the iframe or popup
     * 6) an inception loop occurs -> app in iframe in iframe in iframe or popup in popup in popup..
     */
    #assertNotInInceptionLoop(): void {
        [this.#settings.internal?.silent_redirect_uri, this.#settings.internal?.popup_redirect_uri]
            .forEach(uri => {
                const htmlFileName = (new RegExp(/^.*\/(.*).html$/gm).exec(uri ?? ''))?.[1];
                const error = new Error(`${uri ?? 'redirect uri'} was not found.`);
                error.stack = undefined;

                if (isUrlMatching(location.href, uri)) {
                    logger.notif('ⓘ Encountered an error that usually means you forgot to include the redirect html files in your application assets.');
                    throw error;
                } else if (htmlFileName && location.href.includes(`/${htmlFileName}.html`)) {
                    logger.notif('ⓘ Encountered an error that usually means your redirect urls are misconfigured.');
                    throw error;
                }
            });
    }

    /**
     * Waits for a renew to finish or times out after 5s.
     * @param caller
     * @example
     * 1) isNativeMobile = true + app is in background
     * 2) access token expires
     * 3) app is brought back to foreground
     * 4) addAccessTokenExpired event is called
     * 5) signinSilent is called
     * 6) in parallel user navigates somewhere and triggers isAuthenticated
     * 7) isAuthenticated should wait signinSilent to finish before returning
     */
    async #waitForRenew(caller: string): Promise<void> {
        const startTime = Date.now();
        // eslint-disable-next-line no-loops/no-loops
        while (this.#isRenewing) {
            if (Date.now() > (startTime + 5000)) {
                logger.error(`\`${caller}\``, 'timed out waiting for renew to finish.');
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    /**
     * Triggers a re-login after a logout (if required).
     * @param redirectUrlAskedAfterLogout
     * @example
     * 1) user is at http://my-app.com, logged-in and loginRequired=true
     * 2) user triggers a logout and gets redirected to '/'
     * 3) url did not changed, so no navigation occured and no guards either
     * 4) at this point, user is logged-out but still inside the app and able to see it
     */
    #postLogoutVerification(redirectUrlAskedAfterLogout: string | null): void {
        const postLogoutUrl = stringToURL(redirectUrlAskedAfterLogout ?? '/');
        if (this.#settings.loginRequired && (location.origin === postLogoutUrl.origin)) {
            location.reload();
        }
    }

    #notifyRenew(value: boolean): void {
        this.#isRenewing = value;
        this.#renewingSubs.notify(value);
    }

    async #runSyncOrAsync(job: () => Promise<unknown>): Promise<void> {
        if (this.#settings.loginRequired) {
            await job();
        } else {
            void job();
        }
    }

    async #redirect(url: string | null, error?: unknown): Promise<void> {
        if (error) {
            logger.error(error);
            await this.#removeUser();
        }

        const redirectUrl = stringToURL(url ?? '/');
        // History cannot be rewritten when origin is different
        if (location.origin === redirectUrl.origin) {
            history.replaceState(history.state, '', redirectUrl.href);
            this.#redirectSubs.notify(redirectUrl);
        } else {
            location.href = redirectUrl.href;
        }
    }

    async #removeUser(): Promise<void> {
        this.user = null;
        await Promise.all([
            this.#userManager?.clearStaleState(),
            this.#userManager?.removeUser()
        ]);
    }

    async #signinSilent(args?: SigninSilentArgs): Promise<void> {
        this.#notifyRenew(true);

        try {
            await this.#userManager?.signinSilent(args);
        } catch (error) {
            await this.#removeUser();
            throw error;
        } finally {
            this.#notifyRenew(false);
        }
    }

    async #callSignin(managerCall: () => Promise<unknown>, redirectUrl: string | null): Promise<void> {
        try {
            this.#notifyRenew(true);
            await managerCall().catch((err: unknown) => {
                const error = err as Error;
                if (error.message === 'Attempted to navigate on a disposed window') {
                    logger.notif('ⓘ Encountered an error that may be due to an ad blocker.');
                    error.stack = undefined;
                }
                throw error;
            });
            await this.#redirect(redirectUrl);
        } catch (error) {
            await this.#redirect('/', error);
            throw error;
        } finally {
            this.#notifyRenew(false);
        }
    }

    async #callSignout(managerCall: () => Promise<unknown>, redirectUrl: string | null): Promise<void> {
        try {
            await managerCall().catch((err: unknown) => {
                const error = err as Error;
                if (error.message === 'Attempted to navigate on a disposed window') {
                    logger.notif('ⓘ Encountered an error that may be due to an ad blocker.');
                    error.stack = undefined;
                }
                throw error;
            });
            await this.#redirect(redirectUrl);
            await this.#removeUser();
        } catch (error) {
            redirectUrl = '/';
            await this.#redirect(redirectUrl, error);
            throw error;
        } finally {
            this.#postLogoutVerification(redirectUrl);
        }
    }
}
