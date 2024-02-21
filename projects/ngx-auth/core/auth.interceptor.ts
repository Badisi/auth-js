import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { InjectToken } from './auth-settings.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private injectToken?: InjectToken = false;
    private loginOn401?: boolean = false;

    constructor(
        private authService: AuthService
    ) {
        const settings = authService.getSettings();
        if (settings) {
            this.injectToken = settings.automaticInjectToken;
            this.loginOn401 = settings.automaticLoginOn401;
        }
    }

    public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this.injectAuthTokenIfNeeded$(request)
            .pipe(
                switchMap(req => next.handle(req)),
                catchError((error: HttpErrorResponse) => {
                    if (this.loginOn401 && (error.status === 401)) {
                        void this.authService.login();
                    }
                    return throwError(() => error);
                })
            );
    }

    // ---- HELPER(s) ----

    private getCompleteUrl(url: string): string {
        try {
            return new URL(url).href;
        } catch {
            return new URL(`${location.origin}${url.startsWith('/') ? '' : '/'}${url}`).href;
        }
    }

    private isMatching(url: string, pattern: string | RegExp | ((url: string) => boolean)): boolean {
        const completeUrl = this.getCompleteUrl(url);

        if (typeof pattern === 'function') {
            return pattern(completeUrl);
        } else if (typeof pattern === 'string') {
            // Make the pattern regexp friendly
            const match = pattern
                .replace(/\//g, '\\/') // escape / with \/
                .replace(/\./g, '\\.') // escape . with \.
                .replace(/\*\*/g, '*') // replace ** with *
                .replace(/\*/g, '.*'); // replace * with .*

            return (new RegExp(match).exec(completeUrl) !== null);
        } else {
            return (pattern.exec(completeUrl) !== null);
        }
    }

    private isAllowedRequest(request: HttpRequest<unknown>): boolean {
        let isAllowed = false;
        if (typeof this.injectToken === 'boolean') {
            isAllowed = this.injectToken;
        } else {
            const { include, exclude } = this.injectToken ?? {};

            if (Array.isArray(include)) {
                isAllowed = include.some((pattern: string | RegExp) => this.isMatching(request.url, pattern));
            } else if (include) {
                isAllowed = this.isMatching(request.url, include);
            }

            if (Array.isArray(exclude)) {
                if (exclude.some((item: string | RegExp) => this.isMatching(request.url, item))) {
                    isAllowed = false;
                }
            } else if (exclude && this.isMatching(request.url, exclude)) {
                isAllowed = false;
            }
        }
        return isAllowed;
    }

    private injectAuthTokenIfNeeded$(request: HttpRequest<unknown>): Observable<HttpRequest<unknown>> {
        return this.authService.accessToken$
            .pipe(
                take(1),
                map(token => {
                    if ((this.injectToken !== false) && token && this.isAllowedRequest(request)) {
                        const headers = (request.headers) ? request.headers : new HttpHeaders();
                        return request.clone({
                            headers: headers.append(
                                'Authorization', `Bearer ${token}`
                            )
                        });
                    }
                    return request;
                })
            );
    }
}
