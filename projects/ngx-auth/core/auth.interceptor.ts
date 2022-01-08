import { Injectable, Inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { merge } from 'lodash-es';

import { AuthConfig, AUTH_CONFIG } from './models/auth-config.model';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private config: AuthConfig;

    constructor(
        private authService: AuthService,
        @Inject(AUTH_CONFIG) private authConfig: AuthConfig
    ) {
        this.config = merge(new AuthConfig(), this.authConfig);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.injectAuthTokenIfNeeded(request))
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.catch401(error);
                    return throwError(error);
                })
            );
    }

    // ---- HELPER(s) ----

    private isMatching(url: string, pattern: string): boolean {
        // Make sure the pattern does not start with a '/'
        let match = (pattern.startsWith('/')) ? pattern.substring(1) : pattern;

        // Make the pattern regexp friendly
        match = match
            .replace(/\//g, '\\/') // escape / with \/
            .replace(/\./g, '\\.') // escape . with \.
            .replace(/\*\*/g, '*') // replace ** with *
            .replace(/\*/g, '.*'); // replace * with .*

        // Exec the regexp
        const regex = new RegExp(`^(\\/?)${match}`);
        return (regex.exec(url) !== null);
    }

    private isAllowedRequest(request: HttpRequest<any>): boolean {
        let isAllowed = false;
        if (typeof this.config.autoInjectToken === 'boolean') {
            isAllowed = this.config.autoInjectToken;
        } else {
            const { include, exclude } = this.config.autoInjectToken as any;
            if (include && include.length) {
                isAllowed = include.some((item: string) => this.isMatching(request.url, item));
            }
            if (exclude && exclude.length) {
                if (exclude.some((item: string) => this.isMatching(request.url, item))) {
                    isAllowed = false;
                }
            }
        }
        return isAllowed;
    }

    private injectAuthTokenIfNeeded(request: HttpRequest<any>): HttpRequest<any> {
        const token = this.authService.getAccessToken();
        if (token && this.isAllowedRequest(request)) {
            const headers = (request.headers) ? request.headers : new HttpHeaders();
            return request.clone({
                headers: headers.append(
                    'Authorization', `Bearer ${token}`
                )
            });
        }
        return request;
    }

    private catch401(error: HttpErrorResponse): void {
        if (this.config.autoLoginOn401 && (error.status === 401)) {
            this.authService.login();
        }
    }
}
