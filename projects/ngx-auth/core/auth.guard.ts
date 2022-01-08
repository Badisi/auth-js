import { ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
    constructor(
        private authService: AuthService
    ) { }

    canLoad(): Observable<boolean> {
        return this.isAuthorized().pipe(take(1));
    }

    // TODO:
    /* canActivate(): Observable<boolean> {
        return this.isAuthorized().pipe(take(1));
    }*/

    canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.isAuthorized(state.url).pipe(take(1));
    }

    // ---- HELPER(s) ----

    // TODO: private isAuthorized(): Observable<boolean> {
    private isAuthorized(redirectUrl: string = location.pathname): Observable<boolean> {
        return this.authService
            .isAuthenticated()
            .pipe(
                switchMap((isAuthenticated: boolean) => {
                    if (!isAuthenticated) {
                        this.authService.login(redirectUrl);
                        // TODO: this.authService.login(location.pathname);
                    }
                    return of(isAuthenticated);
                })
            );
    }
}
