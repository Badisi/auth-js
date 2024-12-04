import {
    HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor,
    HttpInterceptorFn, HttpRequest
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { InjectToken } from './auth-settings.model';

export const authInterceptorFn: HttpInterceptorFn =
    (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
        const getCompleteUrl = (url: string): string => {
            try {
                return new URL(url).href;
            } catch {
                return new URL(`${location.origin}${url.startsWith('/') ? '' : '/'}${url}`).href;
            }
        };

        const isMatching = (url: string, pattern: string | RegExp | ((url: string) => boolean)): boolean => {
            const completeUrl = getCompleteUrl(url);

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
        };

        const isAllowedRequest = (req: HttpRequest<unknown>, injectToken: InjectToken): boolean => {
            let isAllowed = false;
            if (typeof injectToken === 'boolean') {
                isAllowed = injectToken;
            } else {
                const { include, exclude } = injectToken;

                if (Array.isArray(include)) {
                    isAllowed = include.some((pattern: string | RegExp) => isMatching(req.url, pattern));
                } else if (include) {
                    isAllowed = isMatching(req.url, include);
                }

                if (Array.isArray(exclude)) {
                    if (exclude.some((item: string | RegExp) => isMatching(req.url, item))) {
                        isAllowed = false;
                    }
                } else if (exclude && isMatching(req.url, exclude)) {
                    isAllowed = false;
                }
            }
            return isAllowed;
        };

        const injectAuthTokenIfNeeded$ =
            (authService: AuthService, req: HttpRequest<unknown>, injectToken: InjectToken): Observable<HttpRequest<unknown>> =>
                authService.accessToken$
                    .pipe(
                        take(1),
                        map(token => {
                            if ((injectToken !== false) && token && isAllowedRequest(req, injectToken)) {
                                return req.clone({
                                    headers: req.headers.append(
                                        'Authorization', `Bearer ${token}`
                                    )
                                });
                            }
                            return req;
                        })
                    );

        const authService = inject(AuthService);
        const settings = authService.getSettings();
        const loginOn401 = settings.automaticLoginOn401 ?? false;
        const injectToken = settings.automaticInjectToken ?? false;

        return injectAuthTokenIfNeeded$(authService, request, injectToken)
            .pipe(
                switchMap(req => next(req)),
                catchError((error: unknown) => {
                    if (loginOn401 && error instanceof HttpErrorResponse && (error.status === 401)) {
                        void authService.login();
                    }
                    return throwError(() => error);
                })
            );
    };

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return authInterceptorFn(req, next.handle.bind(this));
    }
}
