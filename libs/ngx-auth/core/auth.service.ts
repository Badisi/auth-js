import { inject, Injectable, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
    AccessToken, AuthSubscription, AuthUtils, IdToken, OIDCAuthManager, OIDCAuthService, UserProfile, UserSession
} from '@badisi/auth-js/oidc';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable()
export class AuthService extends OIDCAuthService implements OnDestroy {
    #authManagerSubs: AuthSubscription[] = [];

    #idToken$: ReplaySubject<string | undefined> = new ReplaySubject<string | undefined>(1);
    #accessToken$: ReplaySubject<string | undefined> = new ReplaySubject<string | undefined>(1);
    #userProfile$: ReplaySubject<UserProfile | undefined> = new ReplaySubject<UserProfile | undefined>(1);
    #userSession$: ReplaySubject<UserSession | undefined> = new ReplaySubject<UserSession | undefined>(1);
    #isAuthenticated$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    #isRenewing$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

    #ngZone = inject(NgZone);
    #router = inject(Router);

    constructor(manager: OIDCAuthManager) {
        super(manager);
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

    // --- HELPER(s) ----

    #listenForManagerChanges(): void {
        this.#authManagerSubs.push(
            this.manager.onIdTokenChanged(value => { this.#ngZone.run(() => { this.#idToken$.next(value); }); }),
            this.manager.onAccessTokenChanged(value => { this.#ngZone.run(() => { this.#accessToken$.next(value); }); }),
            this.manager.onUserProfileChanged(value => { this.#ngZone.run(() => { this.#userProfile$.next(value); }); }),
            this.manager.onUserSessionChanged(value => { this.#ngZone.run(() => { this.#userSession$.next(value); }); }),
            this.manager.onAuthenticatedChanged(value => { this.#ngZone.run(() => { this.#isAuthenticated$.next(value); }); }),
            this.manager.onRenewingChanged(value => { this.#ngZone.run(() => { this.#isRenewing$.next(value); }); }),
            this.manager.onRedirect(value => {
                // Avoid cancelling any current navigation
                if (!this.#router.getCurrentNavigation()) {
                    this.#ngZone.run(() => {
                        /**
                         * Make sure to navigate to a relative path from the base url.
                         * => we need to substract the base url from the received url.
                         * ex: transform 'http://domain/base/private?param' to '/private?param'
                         */
                        const relativeUrl = value.href.replace(AuthUtils.getBaseUrl(), '');
                        void this.#router.navigateByUrl(relativeUrl);
                    });
                }
            })
        );
    }
}
