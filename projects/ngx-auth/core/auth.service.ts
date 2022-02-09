import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AccessToken, Navigation, OIDCAuthManager, UserProfile, UserSession } from '@badisi/auth-js/oidc';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { AuthSettings } from './auth-settings.model';

@Injectable()
export class AuthService {
    private _accessToken$: ReplaySubject<string | undefined> = new ReplaySubject<string | undefined>(1);
    private _userProfile$: ReplaySubject<UserProfile | undefined> = new ReplaySubject<UserProfile | undefined>(1);
    private _userSession$: ReplaySubject<UserSession | undefined> = new ReplaySubject<UserSession | undefined>(1);
    private _isAuthenticated$: ReplaySubject<boolean | undefined> = new ReplaySubject<boolean | undefined>(1);
    private _isRenewing$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

    constructor(
        private manager: OIDCAuthManager,
        private ngZone: NgZone,
        private router: Router
    ) {
        void this.initObservables();
        this.listenForChanges();
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

    public get accessToken$(): Observable<string | undefined> {
        return this._accessToken$.asObservable().pipe(
            distinctUntilChanged()
        );
    }

    public get accessTokenDecoded$(): Observable<AccessToken | string | undefined> {
        return this._accessToken$.asObservable().pipe(
            distinctUntilChanged(),
            map(accessToken => this.manager.decodeJwt(accessToken))
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

    private listenForChanges(): void {
        this.manager.listeners = {
            onAccessTokenChanged: (value): void => this.ngZone.run(() => this._accessToken$.next(value)),
            onUserProfileChanged: (value): void => this.ngZone.run(() => this._userProfile$.next(value)),
            onUserSessionChanged: (value): void => this.ngZone.run(() => this._userSession$.next(value)),
            onAuthenticatedChanged: (value): void => this.ngZone.run(() => this._isAuthenticated$.next(value)),
            onRenewingChanged: (value): void => this.ngZone.run(() => this._isRenewing$.next(value)),
            onRedirect: (value): void => {
                // Avoid cancelling any current navigation
                if (!this.router.getCurrentNavigation()) {
                    this.ngZone.run(() => {
                        void this.router.navigateByUrl(`${value.pathname}${value.search}`);
                    });
                }
            }
        };
    }

    private async initObservables(): Promise<void> {
        this._accessToken$.next(await this.manager.getAccessToken());
        this._userProfile$.next(await this.manager.getUserProfile());
        this._userSession$.next(await this.manager.getUserSession());
        this._isAuthenticated$.next(await this.manager.isAuthenticated());
        this._isRenewing$.next(this.manager.isRenewing());
    }
}
