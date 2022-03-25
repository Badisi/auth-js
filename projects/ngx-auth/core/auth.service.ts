import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
    AccessToken, AuthSubscription, IdToken, Navigation, OIDCAuthManager, UserProfile, UserSession
} from '@badisi/auth-js/oidc';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { AuthSettings } from './auth-settings.model';

@Injectable()
export class AuthService implements OnDestroy {
    private _idToken$: ReplaySubject<string | undefined> = new ReplaySubject<string | undefined>(1);
    private _accessToken$: ReplaySubject<string | undefined> = new ReplaySubject<string | undefined>(1);
    private _userProfile$: ReplaySubject<UserProfile | undefined> = new ReplaySubject<UserProfile | undefined>(1);
    private _userSession$: ReplaySubject<UserSession | undefined> = new ReplaySubject<UserSession | undefined>(1);
    private _isAuthenticated$: ReplaySubject<boolean | undefined> = new ReplaySubject<boolean | undefined>(1);
    private _isRenewing$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

    private authManagerSubs: AuthSubscription[] = [];

    constructor(
        private manager: OIDCAuthManager,
        private ngZone: NgZone,
        private router: Router
    ) {
        this.listenForManagerChanges();
    }

    public ngOnDestroy(): void {
        this.authManagerSubs.forEach(sub => sub.unsubscribe());
    }

    public get isRenewing$(): Observable<boolean | undefined> {
        return this._isRenewing$.asObservable().pipe(
            distinctUntilChanged()
        );
    }

    public get isAuthenticated$(): Observable<boolean | undefined> {
        return this._isAuthenticated$.asObservable().pipe(
            distinctUntilChanged()
        );
    }

    public get userProfile$(): Observable<UserProfile | undefined> {
        return this._userProfile$.asObservable().pipe(
            distinctUntilChanged()
        );
    }

    public get userSession$(): Observable<UserSession | undefined> {
        return this._userSession$.asObservable().pipe(
            distinctUntilChanged()
        );
    }

    public get idToken$(): Observable<string | undefined> {
        return this._idToken$.asObservable().pipe(
            distinctUntilChanged()
        );
    }

    public get idTokenDecoded$(): Observable<IdToken | undefined> {
        return this._idToken$.asObservable().pipe(
            distinctUntilChanged(),
            map(token => this.manager.decodeJwt<IdToken>(token))
        );
    }

    public get accessToken$(): Observable<string | undefined> {
        return this._accessToken$.asObservable().pipe(
            distinctUntilChanged()
        );
    }

    public get accessTokenDecoded$(): Observable<AccessToken | undefined> {
        return this._accessToken$.asObservable().pipe(
            distinctUntilChanged(),
            map(token => this.manager.decodeJwt<AccessToken>(token))
        );
    }

    // --- OIDCAuthManager ---

    public login(redirectUrl?: string, navigationType?: Navigation): Promise<boolean> {
        return this.manager.login(redirectUrl, navigationType);
    }

    public logout(redirectUrl?: string, navigationType?: Navigation): Promise<void> {
        return this.manager.logout(redirectUrl, navigationType);
    }

    public renew(): Promise<void> {
        return this.manager.renew();
    }

    public getSettings(): AuthSettings {
        return this.manager.getSettings() as AuthSettings;
    }

    public isAuthenticated(): Promise<boolean | undefined> {
        return this.manager.isAuthenticated();
    }

    public getUserProfile(): Promise<UserProfile | undefined> {
        return this.manager.getUserProfile();
    }

    public getUserSession(): Promise<UserSession | undefined> {
        return this.manager.getUserSession();
    }

    public getIdToken(): Promise<string | undefined> {
        return this.manager.getIdToken();
    }

    public getIdTokenDecoded(): Promise<IdToken | string | undefined> {
        return this.manager.getIdTokenDecoded();
    }

    public getAccessToken(): Promise<string | undefined> {
        return this.manager.getAccessToken();
    }

    public getAccessTokenDecoded(): Promise<AccessToken | string | undefined> {
        return this.manager.getAccessTokenDecoded();
    }

    public isCapacitor(): boolean {
        return this.manager.isCapacitor();
    }

    public isCordova(): boolean {
        return this.manager.isCordova();
    }

    public isNative(): boolean {
        return this.manager.isNative();
    }

    // --- HELPER(s) ----

    private listenForManagerChanges(): void {
        this.authManagerSubs.push(
            this.manager.onIdTokenChanged(value => this.ngZone.run(() => this._idToken$.next(value))),
            this.manager.onAccessTokenChanged(value => this.ngZone.run(() => this._accessToken$.next(value))),
            this.manager.onUserProfileChanged(value => this.ngZone.run(() => this._userProfile$.next(value))),
            this.manager.onUserSessionChanged(value => this.ngZone.run(() => this._userSession$.next(value))),
            this.manager.onAuthenticatedChanged(value => this.ngZone.run(() => this._isAuthenticated$.next(value))),
            this.manager.onRenewingChanged(value => this.ngZone.run(() => this._isRenewing$.next(value))),
            this.manager.onRedirect(value => {
                // Avoid cancelling any current navigation
                if (!this.router.getCurrentNavigation()) {
                    this.ngZone.run(() => {
                        void this.router.navigateByUrl(`${value.pathname}${value.search}`);
                    });
                }
            })
        );
    }
}
