/* eslint-disable rxjs/finnish */

import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Data, Route, Router, RouterStateSnapshot, UrlTree
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
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    public canLoad(route: Route): Observable<UrlTree | boolean> {
        return this.isAllowed(route.data);
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UrlTree | boolean> {
        return this.isAllowed(route.data, state.url);
    }

    public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UrlTree | boolean> {
        return this.isAllowed(childRoute.data, state.url);
    }

    public isAuthorized(): Observable<boolean> | Promise<boolean> | boolean {
        return true;
    }

    // ---- HELPER(s) ----

    private isPromise(value: Promise<unknown>): value is Promise<unknown> {
        return Boolean(value?.then && typeof value.then === 'function');
    }

    private isAuthorized$(data?: AuthGuardData): Observable<boolean> {
        const transformToObs = (value: Observable<boolean> | Promise<boolean> | boolean): Observable<boolean> => {
            if (typeof value === 'boolean') {
                return of(value);
            } else if (isObservable(value)) {
                return value;
            } else if (this.isPromise(value)) {
                return from(value);
            } else {
                return of(false);
            }
        };

        const validator = data?.authGuardValidator;
        if (typeof validator === 'function') {
            return forkJoin({
                userProfile: this.authService.userProfile$.pipe(take(1)),
                accessToken: this.authService.accessTokenDecoded$.pipe(take(1))
            }).pipe(
                switchMap(({ userProfile, accessToken }) => transformToObs(validator(userProfile, accessToken)))
            );
        } else if (validator) {
            console.error('authGuardValidator must be a function');
            return of(false);
        } else {
            return transformToObs(this.isAuthorized());
        }
    }

    private isAuthenticated$(redirectUrl = location.href): Observable<boolean> {
        return this.authService
            .isAuthenticated$
            .pipe(
                take(1),
                switchMap(isAuthenticated => {
                    if (!isAuthenticated) {
                        return from(this.authService.login(redirectUrl))
                            .pipe(
                                catchError(error => of(error)),
                                switchMap(error => of(!error))
                            );
                    }
                    return of(isAuthenticated);
                })
            );
    }

    private isAllowed(data?: AuthGuardData, redirectUrl = location.href): Observable<UrlTree | boolean> {
        return forkJoin({
            isAuthenticated: this.isAuthenticated$(redirectUrl),
            isAuthorized: this.isAuthorized$(data)
        }).pipe(
            map(({ isAuthenticated, isAuthorized }) => {
                const isAllowed = isAuthenticated && isAuthorized;
                if (!isAllowed) {
                    const notAllowedUrl = data?.authGuardRedirectUrl || this.authService.getSettings()?.authGuardRedirectUrl;
                    return this.router.parseUrl(notAllowedUrl ? notAllowedUrl : this.router.url);
                }
                return isAllowed;
            })
        );
    }
}
