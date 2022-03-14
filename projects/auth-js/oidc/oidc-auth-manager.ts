/* eslint-disable @typescript-eslint/restrict-template-expressions, @typescript-eslint/naming-convention, camelcase */

import jwtDecode from 'jwt-decode';
import { merge } from 'lodash-es';
import {
    InMemoryWebStorage, Log, User, UserManager, UserManagerSettings, UserProfile, WebStorageStateStore
} from 'oidc-client-ts';

import { AuthManager, AuthSubscriber, AuthSubscription, Optional } from '../core';
import { AuthSubscriptions } from '../core/auth-subscriptions';
import { MobileStorage } from './mobile/mobile-storage';
import { AccessToken } from './models/access-token.model';
import { IdToken } from './models/id-token.model';
import { Navigation, OIDCAuthSettings } from './models/oidc-auth-settings.model';
import { UserSession } from './models/user-session.model';

const REDIRECT_URL_KEY = 'auth-js:oidc_manager:redirect_url';

const DEFAULT_SETTINGS: Optional<OIDCAuthSettings, 'authorityUrl' | 'clientId'> = {
    loginRequired: true,
    loadSession: true,
    loadUserInfo: false,
    automaticSilentRenew: true,
    navigationType: Navigation.REDIRECT,
    scope: 'openid profile email phone',
    logLevel: Log.NONE,
    internal: {
        response_type: 'code',
        redirectMethod: 'replace',
        redirect_uri: 'oidc/callback/login',
        post_logout_redirect_uri: 'oidc/callback/logout',
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

        const isNative = this.isNative();
        const baseUrl = (isNative) ? `${userSettings.schemeUri}://` : this.getBaseUrl();

        // Initialize settings
        this.settings = merge({}, DEFAULT_SETTINGS, {
            internal: {
                userStore: new WebStorageStateStore({
                    store: (isNative) ? new MobileStorage() : new InMemoryWebStorage()
                }),
                redirect_uri: `${baseUrl}${DEFAULT_SETTINGS.internal?.redirect_uri}`,
                popup_redirect_uri: `${baseUrl}${DEFAULT_SETTINGS.internal?.popup_redirect_uri}`,
                post_logout_redirect_uri: `${baseUrl}${DEFAULT_SETTINGS.internal?.post_logout_redirect_uri}`,
                popup_post_logout_redirect_uri: `${baseUrl}${DEFAULT_SETTINGS.internal?.popup_post_logout_redirect_uri}`,
                silent_redirect_uri: `${baseUrl}${DEFAULT_SETTINGS.internal?.silent_redirect_uri}`
            }
        }, userSettings);

        // Apply some patches
        this.patchAuth0Logout();

        // Configure the user manager
        this.userManager = new UserManager({
            authority: this.settings.authorityUrl,
            client_id: this.settings.clientId,
            scope: this.settings.scope,
            loadUserInfo: this.settings.loadUserInfo,
            automaticSilentRenew: this.settings.automaticSilentRenew,
            ...this.settings.internal
        } as UserManagerSettings);

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
        if (isNative) {
            this.installCustomUrlSchemeCallback();
            /* if (this.settings.autoLoginOnInit) {
                // Try to load user from storage
                await this.loadUser();

                // If user credentials have expired -> try a silent renew
                if (this.user) {
                    return (!this.user.expired) ? this.userProfile : this.signinSilent();
                }
                return null;
            }*/
        } else if (this.urlMatching(location.href, this.settings.internal?.redirect_uri)) {
            await this.backFromLogin();
        } else if (this.urlMatching(location.href, this.settings.internal?.post_logout_redirect_uri)) {
            await this.backFromLogout();
        } else if (this.settings.loadSession) {
            await this.signinSilent().catch(async (signinSilentError: Error) => {
                if (this.settings.loginRequired) {
                    if (signinSilentError.message === 'login_required') {
                        await this.login();
                    } else {
                        throw signinSilentError;
                    }
                }
            });
        } else if (this.settings.loginRequired) {
            await this.login();
        }
    }

    public async login(redirectUrl = location.href, navigationType?: Navigation): Promise<boolean> {
        switch (navigationType || this.settings.navigationType) {
            case Navigation.POPUP:
                await this.userManager?.signinPopup().catch((error: Error) => {
                    if (error?.message === 'Attempted to navigate on a disposed window') {
                        error = new Error('[OIDCAuthManager] Attempted to navigate on a disposed window.');
                        error.stack = undefined;
                        error.message += '\n\nⓘ This may be due to an ad blocker.';
                    }
                    throw error;
                });
                await this.redirect(redirectUrl);
                break;
            default:
                sessionStorage.setItem(REDIRECT_URL_KEY, redirectUrl);
                await this.userManager?.signinRedirect();
                break;
        }
        return (this._isAuthenticated === true);
    }

    public async logout(redirectUrl = location.href, navigationType?: Navigation): Promise<void> {
        switch (navigationType || this.settings.navigationType) {
            case Navigation.POPUP:
                await this.userManager?.signoutPopup();
                await this.redirect(redirectUrl);
                break;
            default:
                sessionStorage.setItem(REDIRECT_URL_KEY, redirectUrl);
                await this.userManager?.signoutRedirect();
                break;
        }
    }

    public async renew(): Promise<void> {
        return this.signinSilent().catch(error => console.error(error));
    }

    public decodeJwt<T>(value?: string): T | string | undefined {
        try {
            if (value) {
                return jwtDecode<T>(value);
            }
            return value;
        } catch {
            console.warn('[OIDCAuthManager] Access token was not decoded as it is not a valid JWT.');
            return value;
        }
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
        return this.decodeJwt<IdToken>(this._idToken);
    }

    public async getAccessToken(): Promise<string | undefined> {
        await this.waitForRenew('getAccessToken()');
        return this._accessToken;
    }

    public async getAccessTokenDecoded(): Promise<AccessToken | string | undefined> {
        await this.waitForRenew('getAccessTokenDecoded()');
        return this.decodeJwt<AccessToken>(this._accessToken);
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
     *  5) the angular app is loaded in the iframe or popup instead
     *  6) an inception loop occurs -> app in iframe in iframe in iframe or popup in popup in popup..
     */
    private assertNotInInceptionLoop(): void {
        [this.settings.internal?.silent_redirect_uri, this.settings.internal?.popup_redirect_uri]
            .forEach(uri => {
                const htmlFileName = (new RegExp(/^.*\/(.*).html$/gm).exec(uri || ''))?.[1];
                const error = new Error(`[OIDCAuthManager] ${uri || 'redirect uri'} was not found.`);
                error.stack = undefined;

                if (this.urlMatching(location.href, uri)) {
                    error.message += '\n\nⓘ This usually means you forgot to include the redirect html files in your application assets.';
                    throw error;
                } else if (this.urlMatching(location.href, `/${htmlFileName}.html`)) {
                    error.message += '\n\nⓘ This usually means your redirect urls are misconfigured.';
                    throw error;
                }
            });
    }

    /**
     *  Scenario example :
     *  1) isNative = true + app is in background
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
                console.warn('[OIDCAuthManager]', caller, 'timed out waiting for renew to finish.');
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    private urlMatching(url1: string, url2?: string): boolean {
        return ((url2 !== undefined) && url1.includes(url2));
    }

    private getBaseUrl(): string {
        const baseUrl = document.baseURI || document.querySelector('base')?.href || location.origin;
        return (baseUrl.endsWith('/')) ? baseUrl : `${baseUrl}/`;
    }

    private getURL(url: string): URL {
        try {
            return new URL(url);
        } catch {
            const pathUrl = (!url.startsWith('/')) ? url : url.substring(1, url.length);
            return new URL(`${this.getBaseUrl()}${pathUrl}`);
        }
    }

    private async redirect(url: string | null, error?: unknown): Promise<void> {
        if (error) {
            console.error(error);
            await this.removeUser();
        }

        const redirectUrl = this.getURL(url || '/');
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

    /* private async loadUser(): Promise<void> {
        this.user = await this.userManager?.getUser();
    }*/

    private async signinSilent(): Promise<void> {
        this._isRenewing = true;
        this.renewingSubs.notify(true);

        try {
            await this.userManager?.signinSilent();
        } catch (error) {
            await this.removeUser();
            throw error;
        } finally {
            this._isRenewing = false;
            this.renewingSubs.notify(false);
        }
    }

    private async backFromLogin(url?: string): Promise<void> {
        try {
            await this.userManager?.signinCallback(url);
            await this.redirect(sessionStorage.getItem(REDIRECT_URL_KEY));
        } catch (error) {
            await this.redirect('/', error);
        } finally {
            sessionStorage.removeItem(REDIRECT_URL_KEY);
        }
    }

    private async backFromLogout(url?: string): Promise<void> {
        try {
            await this.userManager?.signoutCallback(url);
            await this.redirect(sessionStorage.getItem(REDIRECT_URL_KEY));
            await this.removeUser();
        } catch (error) {
            await this.redirect('/', error);
        } finally {
            sessionStorage.removeItem(REDIRECT_URL_KEY);
        }
    }

    private installCustomUrlSchemeCallback(): void {
        const onCallback = (url: string): void => {
            if (this.urlMatching(url, this.settings.internal?.redirect_uri)) {
                void this.backFromLogin(url);
            } else if (this.urlMatching(url, this.settings.internal?.post_logout_redirect_uri)) {
                void this.backFromLogout(url);
            }
        };

        if (this.isCapacitor()) {
            window.Capacitor.addListener('App', 'appUrlOpen', (data: unknown) => {
                onCallback((data as { url: string }).url);
            });
        } else if (this.isCordova()) {
            window.handleOpenURL = (url: string): void => {
                onCallback(url);
            };
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
