import { AuthService, UserProfile, UserSession, UserConfig } from '@badisi/ngx-auth/core';
import { NgZone, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { UserManager, User, WebStorageStateStore, Log, InMemoryWebStorage } from 'oidc-client';
import { delayWhen, distinctUntilChanged, skipWhile, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { merge } from 'lodash-es';

import { CordovaPluginSecureStorageEcho } from './storage/CordovaPluginSecureStorageEcho';
import { BrowserTabNavigator } from './browser-tab/BrowserTabNavigator';

@Injectable()
export class OIDCAuthService implements AuthService {
    private readonly REDIRECT_URL_KEY = 'OIDCAuthService.REDIRECT_URL';
    private readonly DEFAULT_CONFIG: UserConfig = {
        redirect_uri: 'oidc/callback/login',
        post_logout_redirect_uri: 'oidc/callback/logout',
        silent_redirect_uri: 'oidc/callback/silent_redirect.html',
        scope: 'openid profile email phone',
        response_type: 'code',
        automaticSilentRenew: true,
        autoLoginOnInit: true,
        monitorSession: false
        // revokeAccessTokenOnSignout: true
    };

    private signinSilent$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private isAuthenticated$: ReplaySubject<boolean> = new ReplaySubject(1);
    private userManager: UserManager;
    private userProfile: UserProfile;
    private userSession: UserSession;
    private config: UserConfig;

    private _user: User;
    private set user(value: User) {
        this._user = value;
        // TODO: check if we need UserProfile.deserialize(value.profile)
        this.userProfile = (value) ? value.profile : null;
        this.userSession = (value) ? UserSession.deserialize(value) : null;

        this.isAuthenticated$.next(!!(value && !value.expired));
    }
    private get user(): User {
        return this._user;
    }

    constructor(
        private injector: Injector,
        private zone: NgZone
    ) { }

    // --- PUBLIC API(s) ---

    async init(userConfig: UserConfig, logLevel: number = Log.NONE): Promise<UserProfile | void> {
        Log.level = logLevel;
        Log.logger = console;

        const isNative = this.isNative();

        // Initialize config
        const baseUrl = (isNative) ? `${userConfig.scheme_uri}://` : `${location.origin}/`;
        let store = new WebStorageStateStore({ store: new InMemoryWebStorage() });
        if (isNative && (userConfig.autoLoginOnInit || this.DEFAULT_CONFIG.autoLoginOnInit)) {
            store = new CordovaPluginSecureStorageEcho();
        }

        this.config = merge({}, this.DEFAULT_CONFIG, {
            userStore: store,
            redirect_uri: `${baseUrl}${this.DEFAULT_CONFIG.redirect_uri}`,
            post_logout_redirect_uri: `${baseUrl}${this.DEFAULT_CONFIG.post_logout_redirect_uri}`,
            silent_redirect_uri: `${location.origin}/${this.DEFAULT_CONFIG.silent_redirect_uri}`
        }, userConfig);

        // Configure the user manager
        this.userManager = new UserManager(this.config);

        // Listen for events (do not care about unsubscribing as the connector will die along with the app)
        this.userManager.events.addUserLoaded((user) => this.user = user);
        this.userManager.events.addUserUnloaded(() => this.user = null);
        this.userManager.events.addAccessTokenExpired(() => {
            if (!this.isNative()) {
                // On desktop, if token expires -> simply log out the user
                this.logout();
            } else if (this.config.automaticSilentRenew) {
                // On mobile, token can expire while the app is in background
                //   -> try a silent renew in that case and otherwise redirect to home
                this.signinSilent((error: any) => this.redirect('/', error));
            }
        });

        // Decide what to do..
        if (isNative) {
            this.installCustomUrlSchemeCallback();
            if (this.config.autoLoginOnInit) {
                // Try to load user from storage
                await this.loadUser();

                // If user credentials have expired -> try a silent renew
                if (this.user) {
                    return (!this.user.expired) ? this.userProfile : this.signinSilent();
                }
                return null;
            }
        } else {
            switch (`${location.origin}${location.pathname}`) {
                case this.config.redirect_uri:
                    return this.backFromLogin();
                case this.config.post_logout_redirect_uri:
                    return this.backFromLogout();
                default:
                    if (this.config.autoLoginOnInit) {
                        return this.signinSilent();
                    }
            }
        }

        // ..otherwise start with clean state
        return this.removeUser();
    }

    async login(redirectUrl: string = location.search): Promise<void> {
        sessionStorage.setItem(this.REDIRECT_URL_KEY, redirectUrl);

        const isNative = this.isNative();
        const manager = (this.userManager as any);
        const navigator = (isNative) ? new BrowserTabNavigator() : manager._redirectNavigator;
        const navigatorParams = (isNative) ? { redirect_uri: this.config.redirect_uri } : undefined;

        try {
            await manager._signinStart(undefined, navigator, navigatorParams);
        } catch (error) {
            await this.redirect('/', error);
        }
    }

    async logout(redirectUrl: string = '/'): Promise<void> {
        sessionStorage.setItem(this.REDIRECT_URL_KEY, redirectUrl);

        const isNative = this.isNative();
        const manager = (this.userManager as any);
        const navigator = (isNative) ? new BrowserTabNavigator() : manager._redirectNavigator;
        const navigatorParams = (isNative) ? { redirect_uri: this.config.post_logout_redirect_uri } : undefined;

        try {
            await manager._signoutStart(undefined, navigator, navigatorParams);
        } catch (error) {
            await this.redirect('/', error);
            // TODO: finally needed ?
            await this.removeUser();
        }
    }

    refresh(): Promise<UserProfile> {
        return this.signinSilent();
    }

    getAccessToken(): string {
        return (this.user) ? this.user.access_token : null;
    }

    getUserProfile(): UserProfile {
        return this.userProfile;
    }

    getUserSession(): UserSession {
        return this.userSession;
    }

    isAuthenticated(): Observable<boolean> {
        // TODO: Maybe this also apply to getUserProfile, getUserSession, .... ?

        /**
         *  Scenario :
         *  1) isNative = true + app is in background
         *  2) access token expires
         *  3) app is brought back to foreground
         *  4) addAccessTokenExpired event is called
         *  5) signinSilent is called
         *  6) in parallel user navigates somewhere and triggers an ng-guard
         *  7) the guard calls isAuthenticated
         *  8) isAuthenticated should wait signinSilent to finish before returning
         */
        return this.isAuthenticated$.asObservable()
            .pipe(
                distinctUntilChanged(),
                delayWhen(() => this.signinSilent$.asObservable().pipe(
                    switchMap((signinSilent: boolean) => {
                        if (signinSilent) {
                            // Wait for signinSilent to finished
                            return of(signinSilent).pipe(
                                skipWhile(value => value === true)
                            );
                        }
                        return of(null);
                    })
                ))
            );
    }

    isCapacitor(): boolean {
        const capacitor = (window as any).Capacitor;
        return !!(capacitor && capacitor.isNative);
    }

    isCordova(): boolean {
        return !!((window as any).cordova || (window as any).phonegap || (window as any).PhoneGap);
    }

    isNative(): boolean {
        return this.isCapacitor() || this.isCordova();
    }

    // --- HELPER(s) ---

    private async redirect(url: string, error?: any): Promise<void> {
        sessionStorage.removeItem(this.REDIRECT_URL_KEY);
        if (error) {
            console.error(error);
            await this.removeUser();
        }
        // TODO: history cannot be rewritten when domain is different (ie. app logout redirects to google.com)
        history.replaceState(history.state, null, (url || '/'));

        /**
         *  Use timeout to give router-outlet a chance to be initialized
         *  https://github.com/angular/angular/issues/38804
         */
        setTimeout(() => this.injector.get(Router).navigateByUrl(url || '/'));
    }

    private async removeUser(): Promise<void> {
        this.user = null;
        await Promise.all([
            this.userManager.clearStaleState(),
            this.userManager.removeUser()
        ]);
    }

    private async loadUser(): Promise<void> {
        this.user = await this.userManager.getUser();
    }

    private async signinSilent(errorCallback?: (error: any) => void): Promise<UserProfile> {
        this.signinSilent$.next(true);

        try {
            const user = await this.userManager.signinSilent();

            /** Fix oidc-client issue : profile is not updated after silent refresh */
            // https://github.com/IdentityModel/oidc-client-js/issues/1034
            const idTokenDecoded = (this.userManager as any)._joseUtil.parseJwt(user.id_token).payload;
            if (user !== null) {
                Object.assign(user.profile, idTokenDecoded);
                await this.userManager.storeUser(user);
            }

            this.user = user;
            return this.userProfile;
        } catch (error: any) {
            if (errorCallback) {
                errorCallback(error);
            } else {
                await this.removeUser();
            }
            return null;
        } finally {
            this.signinSilent$.next(false);
        }
    }

    private async backFromLogin(url?: string): Promise<UserProfile> {
        try {
            this.user = await this.userManager.signinRedirectCallback(url);
            await this.redirect(sessionStorage.getItem(this.REDIRECT_URL_KEY));
            return this.userProfile;
        } catch (error) {
            await this.redirect('/', error);
            return null;
        }
    }

    private async backFromLogout(url?: string): Promise<void> {
        try {
            await this.userManager.signoutRedirectCallback(url);
            await this.redirect(sessionStorage.getItem(this.REDIRECT_URL_KEY));
            await this.removeUser();
        } catch (error) {
            await this.redirect('/', error);
        }
    }

    private installCustomUrlSchemeCallback(): void {
        const onCallback = (url: string) => {
            this.zone.run(() => {
                if (url.indexOf(this.config.redirect_uri) === 0) {
                    this.backFromLogin(url);
                } else if (url.indexOf(this.config.post_logout_redirect_uri) === 0) {
                    this.backFromLogout(url);
                }
            });
        };

        if (this.isCapacitor()) {
            (window as any).Capacitor.Plugins.App.addListener('appUrlOpen', (data: any) => {
                onCallback(data.url);
            });
        } else if (this.isCordova()) {
            (window as any).handleOpenURL = (url: string) => {
                onCallback(url);
            };
        }
    }
}
