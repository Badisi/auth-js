import { inject, Injectable, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
    AccessToken, AuthSubscription, AuthUtils, IdToken, LoginArgs, LogoutArgs, OIDCAuthManager,
    RenewArgs, UserProfile, UserSession
} from '@badisi/auth-js/oidc';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { AUTH_MANAGER } from './auth';
import { AuthSettings } from './auth-settings.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {
    #manager = inject<OIDCAuthManager>(AUTH_MANAGER);
    #ngZone = inject(NgZone);
    #router = inject(Router);

    #idToken$: ReplaySubject<string | undefined> = new ReplaySubject<string | undefined>(1);
    #accessToken$: ReplaySubject<string | undefined> = new ReplaySubject<string | undefined>(1);
    #userProfile$: ReplaySubject<UserProfile | undefined> = new ReplaySubject<UserProfile | undefined>(1);
    #userSession$: ReplaySubject<UserSession | undefined> = new ReplaySubject<UserSession | undefined>(1);
    #isAuthenticated$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    #isRenewing$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

    #authManagerSubs: AuthSubscription[] = [];

    constructor() {
        this.#listenForManagerChanges();
    }

    public ngOnDestroy(): void {
        this.#authManagerSubs.forEach(sub => { sub.unsubscribe(); });
    }

    /* eslint-disable @typescript-eslint/member-ordering */
    public readonly isRenewing$: Observable<boolean> =
        this.#isRenewing$.asObservable().pipe(
            distinctUntilChanged()
        );

    public readonly isAuthenticated$: Observable<boolean> =
        this.#isAuthenticated$.asObservable().pipe(
            distinctUntilChanged()
        );

    public readonly userProfile$: Observable<UserProfile | undefined> =
        this.#userProfile$.asObservable().pipe(
            distinctUntilChanged()
        );

    public readonly userSession$: Observable<UserSession | undefined> =
        this.#userSession$.asObservable().pipe(
            distinctUntilChanged()
        );

    public readonly idToken$: Observable<string | undefined> =
        this.#idToken$.asObservable().pipe(
            distinctUntilChanged()
        );

    public readonly idTokenDecoded$: Observable<IdToken | undefined> =
        this.#idToken$.asObservable().pipe(
            distinctUntilChanged(),
            map(token => AuthUtils.decodeJwt(token) as IdToken | string | undefined)
        );

    public readonly accessToken$: Observable<string | undefined> =
        this.#accessToken$.asObservable().pipe(
            distinctUntilChanged()
        );

    public readonly accessTokenDecoded$: Observable<AccessToken | undefined> =
        this.#accessToken$.asObservable().pipe(
            distinctUntilChanged(),
            map(token => AuthUtils.decodeJwt(token) as AccessToken | string | undefined)
        );
    /* eslint-enable @typescript-eslint/member-ordering */

    // --- OIDCAuthManager ---

    /**
     * @param args
     * @see {@link OIDCAuthManager.login}
     */
    public async login(args?: LoginArgs): Promise<boolean> {
        return this.#manager.login(args);
    }

    /**
     * @param args
     * @see {@link OIDCAuthManager.logout}
     */
    public async logout(args?: LogoutArgs): Promise<void> {
        return this.#manager.logout(args);
    }

    /**
     * @param args
     * @see {@link OIDCAuthManager.renew}
     */
    public async renew(args?: RenewArgs): Promise<void> {
        return this.#manager.renew(args);
    }

    /**
     * @see {@link OIDCAuthManager.getSettings}
     */
    public getSettings(): AuthSettings {
        return this.#manager.getSettings() as AuthSettings;
    }

    /**
     * @see {@link OIDCAuthManager.isRenewing}
     */
    public isRenewing(): boolean {
        return this.#manager.isRenewing();
    }

    /**
     * @see {@link OIDCAuthManager.isAuthenticated}
     */
    public async isAuthenticated(): Promise<boolean> {
        return this.#manager.isAuthenticated();
    }

    /**
     * @see {@link OIDCAuthManager.getUserProfile}
     */
    public async getUserProfile(): Promise<UserProfile | undefined> {
        return this.#manager.getUserProfile();
    }

    /**
     * @see {@link OIDCAuthManager.getUserSession}
     */
    public async getUserSession(): Promise<UserSession | undefined> {
        return this.#manager.getUserSession();
    }

    /**
     * @see {@link OIDCAuthManager.getIdToken}
     */
    public async getIdToken(): Promise<string | undefined> {
        return this.#manager.getIdToken();
    }

    /**
     * @see {@link OIDCAuthManager.getIdTokenDecoded}
     */
    public async getIdTokenDecoded(): Promise<IdToken | string | undefined> {
        return this.#manager.getIdTokenDecoded();
    }

    /**
     * @see {@link OIDCAuthManager.getAccessToken}
     */
    public async getAccessToken(): Promise<string | undefined> {
        return this.#manager.getAccessToken();
    }

    /**
     * @see {@link OIDCAuthManager.getAccessTokenDecoded}
     */
    public async getAccessTokenDecoded(): Promise<AccessToken | string | undefined> {
        return this.#manager.getAccessTokenDecoded();
    }

    // --- HELPER(s) ----

    #listenForManagerChanges(): void {
        this.#authManagerSubs.push(
            this.#manager.onIdTokenChanged(value => { this.#ngZone.run(() => { this.#idToken$.next(value); }); }),
            this.#manager.onAccessTokenChanged(value => { this.#ngZone.run(() => { this.#accessToken$.next(value); }); }),
            this.#manager.onUserProfileChanged(value => { this.#ngZone.run(() => { this.#userProfile$.next(value); }); }),
            this.#manager.onUserSessionChanged(value => { this.#ngZone.run(() => { this.#userSession$.next(value); }); }),
            this.#manager.onAuthenticatedChanged(value => { this.#ngZone.run(() => { this.#isAuthenticated$.next(value); }); }),
            this.#manager.onRenewingChanged(value => { this.#ngZone.run(() => { this.#isRenewing$.next(value); }); }),
            this.#manager.onRedirect(value => {
                // Avoid cancelling any current navigation
                if (!this.#router.getCurrentNavigation()) {
                    this.#ngZone.run(() => {
                        /**
                         * Angular only navigates to an absolute path from the base url.
                         * So we need to substract the base url from the received url.
                         * ex: transform 'http://domain/base/private' to '/private'
                         */
                        const absoluteUrl = value.href.replace(AuthUtils.getBaseUrl(), '');
                        void this.#router.navigateByUrl(absoluteUrl);
                    });
                }
            })
        );
    }
}
