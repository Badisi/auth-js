/* eslint-disable @typescript-eslint/restrict-template-expressions, @typescript-eslint/naming-convention, camelcase */

import { merge } from 'lodash-es';
import { ErrorResponse, InMemoryWebStorage, Log, User, UserProfile, WebStorageStateStore } from 'oidc-client-ts';

import { AuthManager, AuthSubscriber, AuthSubscription, AuthSubscriptions, AuthUtils, Optional } from '../core';
import { MobileStorage } from './mobile/mobile-storage';
import { AccessToken } from './models/access-token.model';
import { IdToken } from './models/id-token.model';
import { Navigation, OIDCAuthSettings } from './models/oidc-auth-settings.model';
import { UserSession } from './models/user-session.model';
import { UserManager } from './user-manager';

const REDIRECT_URL_KEY = 'auth-js:oidc_manager:redirect_url';

const DEFAULT_SETTINGS: Optional<OIDCAuthSettings, 'authorityUrl' | 'clientId'> = {
    loginRequired: false,
    loadUserSession: true,
    loadUserInfo: false,
    automaticSilentRenew: true,
    navigationType: Navigation.REDIRECT,
    scope: 'openid profile email phone',
    logLevel: Log.NONE,
    internal: {
        response_type: 'code',
        redirect_uri: '?oidc-callback=login',
        post_logout_redirect_uri: '?oidc-callback=logout',
        popup_redirect_uri: 'oidc/callback/popup_redirect.html',
        popup_post_logout_redirect_uri: 'oidc/callback/popup_redirect.html',
        silent_redirect_uri: 'oidc/callback/silent_redirect.html'
    }
};

export class OIDCAuthManager extends AuthManager<OIDCAuthSettings> {
    private idTokenSubs: AuthSubscriptions<[string | undefined]> = new AuthSubscriptions();
    private accessTokenSubs: AuthSubscriptions<[string | undefined]> = new AuthSubscriptions();
    private userProfileSubs: AuthSubscriptions<[UserProfile | undefined]> = new AuthSubscriptions();
    private userSessionSubs: AuthSubscriptions<[UserSession | undefined]> = new AuthSubscriptions();
    private authenticatedSubs: AuthSubscriptions<[boolean]> = new AuthSubscriptions();
    private renewingSubs: AuthSubscriptions<[boolean]> = new AuthSubscriptions();
    private redirectSubs: AuthSubscriptions<[URL]> = new AuthSubscriptions();
    private userManagerSubs: (() => void)[] = [];

    private _idToken?: string;
    private _accessToken?: string;
    private _userProfile?: UserProfile;
    private _userSession?: UserSession;
    private _isAuthenticated?: boolean;
    private _isRenewing = false;

    private userManager?: UserManager;
    private settings = DEFAULT_SETTINGS as OIDCAuthSettings;

    private _user?: User | null;
    private set user(value: User | null | undefined) {
        if (this._user !== value) {
            this._user = value;

            this._idToken = (value) ? value.id_token : undefined;
            this._accessToken = (value) ? value.access_token : undefined;
            this._userProfile = (value?.profile) ? value.profile : undefined;
            this._userSession = (value) ? UserSession.deserialize(value) : undefined;
            this._isAuthenticated = !!(value && !value.expired);

            this.idTokenSubs.notify(this._idToken);
            this.accessTokenSubs.notify(this._accessToken);
            this.userProfileSubs.notify(this._userProfile);
            this.userSessionSubs.notify(this._userSession);
            this.authenticatedSubs.notify(this._isAuthenticated);
        }
    }

    // --- PUBLIC API(s) ---

    public async init(userSettings: OIDCAuthSettings): Promise<void> {
        Log.setLevel(userSettings.logLevel || DEFAULT_SETTINGS.logLevel || Log.NONE);
        Log.setLogger(console);

        const isNativeMobile = AuthUtils.isNativeMobile();
        /**
         * Providers like Keycloak does not handle custom redirect urls like `demo-app://?oidc-callback=login`,
         * because they lack a host name. To fix this, `demo-app://localhost/?oidc-callback=login` is used instead.
         */
        const baseUrl = (isNativeMobile) ? `${userSettings.schemeUri}://localhost/` : AuthUtils.getBaseUrl();

        // Initialize settings
        this.settings = merge({}, DEFAULT_SETTINGS, {
            internal: {
                userStore: new WebStorageStateStore({
                    store: (isNativeMobile) ? new MobileStorage() as unknown as Storage : new InMemoryWebStorage()
                }),
                redirect_uri: `${baseUrl}${DEFAULT_SETTINGS.internal?.redirect_uri}`,
                post_logout_redirect_uri: `${baseUrl}${DEFAULT_SETTINGS.internal?.post_logout_redirect_uri}`,
                popup_redirect_uri: `${baseUrl}${DEFAULT_SETTINGS.internal?.popup_redirect_uri}`,
                popup_post_logout_redirect_uri: `${baseUrl}${DEFAULT_SETTINGS.internal?.popup_post_logout_redirect_uri}`,
                silent_redirect_uri: `${baseUrl}${DEFAULT_SETTINGS.internal?.silent_redirect_uri}`
            }
        }, userSettings);

        // Apply some patches
        this.patchAuth0Logout();

        // Configure the user manager
        this.userManager = new UserManager(this.settings);

        // Listen for events
        this.userManagerSubs.push(
            this.userManager.events.addUserLoaded(user => {
                this.user = user;
            }),
            this.userManager.events.addUserUnloaded(() => {
                this.user = null;
            }),
            this.userManager.events.addAccessTokenExpired(() => {
                // Token can expire while the app is in background
                //   -> try a silent renew in that case and otherwise redirect to home
                if (this.settings.automaticSilentRenew) {
                    this.signinSilent().catch(error => this.redirect('/', error));
                }
            })
        );

        // Make sure we are not trapped in the inception loop
        this.assertNotInInceptionLoop();

        // Decide what to do..
        if (AuthUtils.isUrlMatching(location.href, this.settings.internal?.redirect_uri)) {
            await this.runSyncOrAsync(() => this.backFromSigninRedirect());
        } else if (AuthUtils.isUrlMatching(location.href, this.settings.internal?.post_logout_redirect_uri)) {
            await this.runSyncOrAsync(() => this.backFromSignoutRedirect());
        } else if (this.settings.loadUserSession || this.settings.loginRequired) {
            const signinSilent = async (): Promise<void> => {
                await this.runSyncOrAsync(() => this.signinSilent()
                    .catch(async (signinSilentError: ErrorResponse) => {
                        if (this.settings.loginRequired) {
                            const { error, message } = signinSilentError;
                            if ([error, message].includes('login_required')) {
                                await this.login();
                            } else {
                                throw signinSilentError;
                            }
                        } else {
                            this.authenticatedSubs.notify(false);
                        }
                    }));
            };

            // Try to load user from storage
            const user = await this.userManager?.getUser();
            if (!user || user.expired) {
                // on desktop -> try a silent renew with iframe
                if (!isNativeMobile && this.settings.loadUserSession) {
                    await signinSilent();
                // else -> force login if required
                } else if (this.settings.loginRequired) {
                    await this.login();
                // else -> gracefully notify that we are not authenticated
                } else {
                    this.authenticatedSubs.notify(false);
                }
            } else {
                this.user = user;
            }
        } else {
            this.authenticatedSubs.notify(false);
        }
    }

    public async logout(redirectUrl = location.href, navigationType?: Navigation): Promise<void> {
        if (AuthUtils.isNativeMobile()) {
            await this.userManager?.signoutMobile();
            await this.redirect(redirectUrl);
        } else {
            switch (navigationType || this.settings.navigationType) {
                case Navigation.POPUP:
                    await this.userManager?.signoutPopup();
                    await this.redirect(redirectUrl);
                    break;
                case Navigation.REDIRECT:
                default:
                    sessionStorage.setItem(REDIRECT_URL_KEY, redirectUrl);
                    await this.userManager?.signoutRedirect();
                    break;
            }
        }
    }

    public async login(redirectUrl = location.href, navigationType?: Navigation): Promise<boolean> {
        if (AuthUtils.isNativeMobile()) {
            this.notifyRenew(true);
            await this.userManager?.signinMobile();
            this.notifyRenew(false);
            await this.redirect(redirectUrl);
        } else {
            switch (navigationType || this.settings.navigationType) {
                case Navigation.POPUP:
                    this.notifyRenew(true);
                    await this.userManager?.signinPopup().catch((error: Error) => {
                        if (error?.message === 'Attempted to navigate on a disposed window') {
                            error = new Error('[OIDCAuthManager] Attempted to navigate on a disposed window.');
                            error.stack = undefined;
                            error.message += '\n\nⓘ This may be due to an ad blocker.';
                        }
                        throw error;
                    });
                    this.notifyRenew(false);
                    await this.redirect(redirectUrl);
                    break;
                case Navigation.REDIRECT:
                default:
                    sessionStorage.setItem(REDIRECT_URL_KEY, redirectUrl);
                    await this.userManager?.signinRedirect();
                    break;
            }
        }
        return (this._isAuthenticated === true);
    }

    public async renew(): Promise<void> {
        return this.signinSilent().catch(error => console.error(error));
    }

    public getSettings(): OIDCAuthSettings {
        return this.settings;
    }

    public isRenewing(): boolean {
        return this._isRenewing;
    }

    public async isAuthenticated(): Promise<boolean | undefined> {
        await this.waitForRenew('isAuthenticated()');
        return this._isAuthenticated;
    }

    public async getUserProfile(): Promise<UserProfile | undefined> {
        await this.waitForRenew('getUserProfile()');
        return this._userProfile;
    }

    public async getUserSession(): Promise<UserSession | undefined> {
        await this.waitForRenew('getUserSession()');
        return this._userSession;
    }

    public async getIdToken(): Promise<string | undefined> {
        await this.waitForRenew('getIdToken()');
        return this._idToken;
    }

    public async getIdTokenDecoded(): Promise<IdToken | string | undefined> {
        await this.waitForRenew('getIdTokenDecoded()');
        return AuthUtils.decodeJwt<IdToken>(this._idToken);
    }

    public async getAccessToken(): Promise<string | undefined> {
        await this.waitForRenew('getAccessToken()');
        return this._accessToken;
    }

    public async getAccessTokenDecoded(): Promise<AccessToken | string | undefined> {
        await this.waitForRenew('getAccessTokenDecoded()');
        return AuthUtils.decodeJwt<AccessToken>(this._accessToken);
    }

    // --- DESTROY ---

    public destroy(): void {
        this.idTokenSubs.unsubscribe();
        this.accessTokenSubs.unsubscribe();
        this.userProfileSubs.unsubscribe();
        this.userSessionSubs.unsubscribe();
        this.authenticatedSubs.unsubscribe();
        this.renewingSubs.unsubscribe();
        this.redirectSubs.unsubscribe();
        this.userManagerSubs.forEach(unsub => unsub());
    }

    // --- HANDLER(s) ---

    public onIdTokenChanged(handler: AuthSubscriber<[string | undefined]>): AuthSubscription {
        return this.idTokenSubs.add(handler);
    }

    public onAccessTokenChanged(handler: AuthSubscriber<[string | undefined]>): AuthSubscription {
        return this.accessTokenSubs.add(handler);
    }

    public onUserProfileChanged(handler: AuthSubscriber<[UserProfile | undefined]>): AuthSubscription {
        return this.userProfileSubs.add(handler);
    }

    public onUserSessionChanged(handler: AuthSubscriber<[UserSession | undefined]>): AuthSubscription {
        return this.userSessionSubs.add(handler);
    }

    public onAuthenticatedChanged(handler: AuthSubscriber<[boolean]>): AuthSubscription {
        return this.authenticatedSubs.add(handler);
    }

    public onRenewingChanged(handler: AuthSubscriber<[boolean]>): AuthSubscription {
        return this.renewingSubs.add(handler);
    }

    public onRedirect(handler: AuthSubscriber<[URL]>): AuthSubscription {
        return this.redirectSubs.add(handler);
    }

    // --- HELPER(s) ---

    /**
     *  Scenario :
     *  1) signinSilent or signinPopup was asked
     *  2) iframe or popup was created and navigation was made to OP
     *  3) redirection occurs in iframe or popup
     *  4) `silent_redirect_uri` or `popup_redirect_uri` is not found
     *  5) the web app (instead of the proper redirect_uri) is loaded in the iframe or popup
     *  6) an inception loop occurs -> app in iframe in iframe in iframe or popup in popup in popup..
     */
    private assertNotInInceptionLoop(): void {
        [this.settings.internal?.silent_redirect_uri, this.settings.internal?.popup_redirect_uri]
            .forEach(uri => {
                const htmlFileName = (new RegExp(/^.*\/(.*).html$/gm).exec(uri || ''))?.[1];
                const error = new Error(`[OIDCAuthManager] ${uri || 'redirect uri'} was not found.`);
                error.stack = undefined;

                if (AuthUtils.isUrlMatching(location.href, uri)) {
                    error.message += '\n\nⓘ This usually means you forgot to include the redirect html files in your application assets.';
                    throw error;
                } else if (location.href.includes(`/${htmlFileName}.html`)) {
                    error.message += '\n\nⓘ This usually means your redirect urls are misconfigured.';
                    throw error;
                }
            });
    }

    /**
     *  Scenario example :
     *  1) isNativeMobile = true + app is in background
     *  2) access token expires
     *  3) app is brought back to foreground
     *  4) addAccessTokenExpired event is called
     *  5) signinSilent is called
     *  6) in parallel user navigates somewhere and triggers isAuthenticated
     *  7) isAuthenticated should wait signinSilent to finish before returning
     */
    private async waitForRenew(caller: string): Promise<void> {
        const startTime = new Date().getTime();
        // eslint-disable-next-line no-loops/no-loops
        while (this._isRenewing) {
            if (new Date().getTime() > (startTime + 5000)) {
                console.warn('[@badisi/auth-js]', `\`${caller}\``, 'timed out waiting for renew to finish.');
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    private notifyRenew(value: boolean): void {
        this._isRenewing = value;
        this.renewingSubs.notify(value);
    }

    private async runSyncOrAsync(job: () => Promise<unknown>): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/brace-style, max-statements-per-line
        if (this.settings.loginRequired) { await job(); } else { void job(); }
    }

    private async redirect(url: string | null, error?: unknown): Promise<void> {
        if (error) {
            console.error(error);
            await this.removeUser();
        }

        const redirectUrl = AuthUtils.stringToURL(url || '/');
        // History cannot be rewritten when origin is different
        if (location.origin === redirectUrl.origin) {
            history.replaceState(history.state, '', redirectUrl.href);
            this.redirectSubs.notify(redirectUrl);
        } else {
            location.href = redirectUrl.href;
        }
    }

    private async removeUser(): Promise<void> {
        this.user = null;
        await Promise.all([
            this.userManager?.clearStaleState(),
            this.userManager?.removeUser()
        ]);
    }

    private async signinSilent(): Promise<void> {
        this.notifyRenew(true);

        try {
            await this.userManager?.signinSilent();
        } catch (error) {
            await this.removeUser();
            throw error;
        } finally {
            this.notifyRenew(false);
        }
    }

    private async backFromSigninRedirect(): Promise<void> {
        try {
            await this.userManager?.signinRedirectCallback(location.href);
            await this.redirect(sessionStorage.getItem(REDIRECT_URL_KEY));
        } catch (error) {
            await this.redirect('/', error);
        } finally {
            sessionStorage.removeItem(REDIRECT_URL_KEY);
        }
    }

    private async backFromSignoutRedirect(): Promise<void> {
        try {
            await this.userManager?.signoutRedirectCallback(location.href);
            await this.redirect(sessionStorage.getItem(REDIRECT_URL_KEY));
            await this.removeUser();
        } catch (error) {
            await this.redirect('/', error);
        } finally {
            sessionStorage.removeItem(REDIRECT_URL_KEY);
        }
    }

    // --- PATCHE(s) ---

    /**
     * Auth0 does not conform to OIDC's logout session and as such does not provide an `end_session_endpoint`.
     * This patch make sure the `end_session_endpoint` is set in that case.
     * @see https://github.com/damienbod/angular-auth-oidc-client/issues/1197
     * @see https://auth0.com/docs/api/authentication#logout
     */
    private patchAuth0Logout(): void {
        if (this.settings.authorityUrl.endsWith('auth0.com')) {
            const { authorityUrl, clientId, navigationType } = this.settings;
            const returnTo = (navigationType === Navigation.POPUP) ?
                this.settings.internal?.popup_post_logout_redirect_uri :
                this.settings.internal?.post_logout_redirect_uri;
            this.settings.internal = merge({}, {
                metadataSeed: {
                    end_session_endpoint: `${authorityUrl}/v2/logout?client_id=${clientId}&returnTo=${returnTo}`
                }
            }, this.settings.internal);
        }
    }
}
