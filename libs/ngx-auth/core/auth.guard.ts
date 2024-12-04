/* eslint-disable rxjs/finnish */

import { inject, Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Data, Route, Router,
    RouterStateSnapshot, UrlTree
} from '@angular/router';
import { AccessToken, UserProfile } from '@badisi/auth-js/oidc';
import { forkJoin, from, isObservable, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

export type AuthGuardValidator = (userProfile?: UserProfile, accessToken?: AccessToken) => Observable<boolean> | Promise<boolean> | boolean;

export interface AuthGuardData extends Data {
    authGuardValidator?: AuthGuardValidator;
    authGuardRedirectUrl?: string;
}

@Injectable()
// TODO:
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {
    #authService = inject(AuthService);
    #router = inject(Router);

    public canLoad(route: Route): Observable<UrlTree | boolean> {
        const inFlightUrl = this.#router.getCurrentNavigation()?.extractedUrl.toString();
        return this.#isAllowed(route.data, inFlightUrl);
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UrlTree | boolean> {
        return this.#isAllowed(route.data, state.url);
    }

    public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UrlTree | boolean> {
        return this.#isAllowed(childRoute.data, state.url);
    }

    public isAuthorized(): Observable<boolean> | Promise<boolean> | boolean {
        return true;
    }

    // ---- HELPER(s) ----

    #isPromise(value: unknown): value is Promise<unknown> {
        return Boolean(value && typeof value === 'object' && 'then' in value && typeof value.then === 'function');
    }

    #isAuthorized$(data?: AuthGuardData): Observable<boolean> {
        const transformToObs = (value: Observable<boolean> | Promise<boolean> | boolean): Observable<boolean> => {
            if (typeof value === 'boolean') {
                return of(value);
            } else if (isObservable(value)) {
                return value;
            } else if (this.#isPromise(value)) {
                return from(value);
            } else {
                return of(false);
            }
        };

        const validator = data?.authGuardValidator;
        if (typeof validator === 'function') {
            return forkJoin({
                userProfile: this.#authService.userProfile$.pipe(take(1)),
                accessToken: this.#authService.accessTokenDecoded$.pipe(take(1))
            }).pipe(
                switchMap(({ userProfile, accessToken }) => transformToObs(validator(userProfile, accessToken)))
            );
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        } else if (validator) {
            console.error('authGuardValidator must be a function');
            return of(false);
        } else {
            return transformToObs(this.isAuthorized());
        }
    }

    #isAuthenticated$(redirectUrl = location.href): Observable<boolean> {
        return this.#authService
            .isAuthenticated$
            .pipe(
                take(1),
                switchMap(isAuthenticated => {
                    if (!isAuthenticated) {
                        return from(this.#authService.login({ redirectUrl }))
                            .pipe(
                                catchError(() => of(false))
                            );
                    }
                    return of(isAuthenticated);
                })
            );
    }

    #isAllowed(data?: AuthGuardData, redirectUrl = location.href): Observable<UrlTree | boolean> {
        return this.#isAuthenticated$(redirectUrl)
            .pipe(
                switchMap(isAuthenticated => (isAuthenticated) ? this.#isAuthorized$(data) : of(false)),
                map(isAuthorized => {
                    if (!isAuthorized) {
                        const notAllowedUrl = data?.authGuardRedirectUrl || this.#authService.getSettings().authGuardRedirectUrl;
                        return this.#router.parseUrl(notAllowedUrl ? notAllowedUrl : this.#router.url);
                    }
                    return true;
                })
            );
    }
}
