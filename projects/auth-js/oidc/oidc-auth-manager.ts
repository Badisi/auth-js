/* eslint-disable @typescript-eslint/restrict-template-expressions, @typescript-eslint/naming-convention, camelcase */

import jwtDecode from 'jwt-decode';
import { merge } from 'lodash-es';
import { InMemoryWebStorage, Log, User, UserManager, UserManagerSettings, WebStorageStateStore } from 'oidc-client-ts';

import { AuthManager, Optional } from '../core';
import { MobileStorage } from './mobile/mobile-storage';
import { Navigation, OIDCAuthSettings } from './models/oidc-auth-settings.model';
import { AccessToken, UserProfile } from './models/user-profile.model';
import { UserSession } from './models/user-session.model';

export interface Listeners {
    onAccessTokenChanged?: (value: string | undefined) => void;
    onUserProfileChanged?: (value: UserProfile | undefined) => void;
    onUserSessionChanged?: (value: UserSession | undefined) => void;
    onAuthenticatedChanged?: (value: boolean) => void;
    onRefreshingChanged?: (value: boolean) => void;
    onRedirect?: (value: URL) => void;
}

const REDIRECT_URL_KEY = 'oidc_manager_redirect';
const DEFAULT_SETTINGS: Optional<OIDCAuthSettings, 'authorityUrl' | 'clientId'> = {
    loginRequired: true,
    automaticSilentRenew: true,
    loadSession: true,
    loadUserInfo: false,
    logLevel: Log.NONE,
    navigationType: Navigation.REDIRECT,
    scope: 'openid profile email phone',
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
    public listeners: Listeners = {};

    private _accessToken?: string;
    private _userProfile?: UserProfile;
    private _userSession?: UserSession;
    private _isAuthenticated?: boolean;
    private _isRefreshing = false;

    private userManager?: UserManager;
    private settings = DEFAULT_SETTINGS as OIDCAuthSettings;

    private _user?: User | null;
    private set user(value: User | null | undefined) {
        if (this._user !== value) {
            this._user = value;

            this._accessToken = (value) ? value.access_token : undefined;
            this._userProfile = (value?.profile) ? value.profile as UserProfile : undefined;
            this._userSession = (value) ? UserSession.deserialize(value) : undefined;
            this._isAuthenticated = !!(value && !value.expired);

            this.listeners.onAccessTokenChanged?.(this._accessToken);
            this.listeners.onUserProfileChanged?.(this._userProfile);
            this.listeners.onUserSessionChanged?.(this._userSession);
            this.listeners.onAuthenticatedChanged?.(this._isAuthenticated);
        }
    }

    // --- PUBLIC API(s) ---

    public async init(userSettings: OIDCAuthSettings): Promise<void> {
        Log.level = userSettings.logLevel || DEFAULT_SETTINGS.logLevel || Log.NONE;
        Log.logger = console;

        const isNative = this.isNative();
        const baseUrl = (isNative) ? `${userSettings.schemeUri}://` : `${location.origin}/`;

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

        // Configure the user manager
        this.userManager = new UserManager({
            authority: this.settings.authorityUrl,
            client_id: this.settings.clientId,
            scope: this.settings.scope,
            loadUserInfo: this.settings.loadUserInfo,
            automaticSilentRenew: this.settings.automaticSilentRenew,
            ...this.settings.internal
        } as UserManagerSettings);

        // Listen for events (do not care about unsubscribing as the manager should be a singleton)
        this.userManager.events.addUserLoaded(user => {
            this.user = user;
        });
        this.userManager.events.addUserUnloaded(() => {
            this.user = null;
        });
        this.userManager.events.addAccessTokenExpired(() => {
            // Token can expire while the app is in background
            //   -> try a silent renew in that case and otherwise redirect to home
            if (this.settings.automaticSilentRenew) {
                this.signinSilent().catch(error => this.redirect('/', error));
            }
        });

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

    public async login(redirectUrl = location.href, navigationType?: Navigation): Promise<void> {
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

    public async refresh(): Promise<void> {
        return this.signinSilent().catch(error => console.error(error));
    }

    public decodeJwt(value?: string): AccessToken | string | undefined {
        try {
            if (value) {
                return jwtDecode<AccessToken>(value);
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

    public isRefreshing(): boolean {
        return this._isRefreshing;
    }

    public async isAuthenticated(): Promise<boolean | undefined> {
        await this.waitForRefresh('isAuthenticated()');
        return this._isAuthenticated;
    }

    public async getUserProfile(): Promise<UserProfile | undefined> {
        await this.waitForRefresh('getUserProfile()');
        return this._userProfile;
    }

    public async getUserSession(): Promise<UserSession | undefined> {
        await this.waitForRefresh('getUserSession()');
        return this._userSession;
    }

    public async getAccessToken(): Promise<string | undefined> {
        await this.waitForRefresh('getAccessToken()');
        return this._accessToken;
    }

    public async getAccessTokenDecoded(): Promise<AccessToken | string | undefined> {
        await this.waitForRefresh('getAccessTokenDecoded()');
        return this.decodeJwt(this._accessToken);
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
    private async waitForRefresh(caller: string): Promise<void> {
        const startTime = new Date().getTime();
        // eslint-disable-next-line no-loops/no-loops
        while (this._isRefreshing) {
            if (new Date().getTime() > (startTime + 5000)) {
                console.warn('[OIDCAuthManager]', caller, 'timed out waiting for refresh to finish.');
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    private urlMatching(url1: string, url2?: string): boolean {
        return ((url2 !== undefined) && url1.includes(url2));
    }

    private getCompleteUrl(url: string): URL {
        try {
            return new URL(url);
        } catch {
            return new URL(`${location.origin}${url.startsWith('/') ? '' : '/'}${url}`);
        }
    }

    private async redirect(url: string | null, error?: unknown): Promise<void> {
        if (error) {
            console.error(error);
            await this.removeUser();
        }

        const redirectUrl = this.getCompleteUrl(url || '/');
        // History cannot be rewritten when origin is different
        if (location.origin === redirectUrl.origin) {
            history.replaceState(history.state, '', redirectUrl.href);
            this.listeners.onRedirect?.(redirectUrl);
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
        this._isRefreshing = true;
        this.listeners.onRefreshingChanged?.(true);

        try {
            // TODO: when fix is done on odic-client side, there should be no need to reassign this.user as
            // a UserLoaded event will be triggered.
            const user = await this.userManager?.signinSilent();

            /** Fix oidc-client issue : profile is not updated after silent refresh */
            // https://github.com/IdentityModel/oidc-client-js/issues/1034
            if (user?.id_token) {
                Object.assign(user.profile, jwtDecode<{
                    iss?: string;
                    aud?: string | string[];
                    azp?: string;
                    iat?: number;
                    nbf?: number;
                    exp?: number;
                    sub?: string;
                    auth_time?: number;
                }>(user.id_token));
                await this.userManager?.storeUser(user);
            }

            this.user = user;
        } catch (error) {
            await this.removeUser();
            throw error;
        } finally {
            this._isRefreshing = false;
            this.listeners.onRefreshingChanged?.(false);
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
}
