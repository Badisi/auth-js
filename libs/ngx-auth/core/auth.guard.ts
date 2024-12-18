import { inject } from '@angular/core';
import {
    type ActivatedRouteSnapshot, type CanActivateFn, type CanMatchFn, type GuardResult, type Route, Router,
    type RouterStateSnapshot, type UrlSegment
} from '@angular/router';
import type { AuthGuardOptions } from '@badisi/auth-js/oidc';
import { AuthService } from '@badisi/ngx-auth';

export const authGuard = (options?: AuthGuardOptions): CanMatchFn | CanActivateFn =>
    async (_route: Route | ActivatedRouteSnapshot, segmentsOrState: UrlSegment[] | RouterStateSnapshot): Promise<GuardResult> => {
        const authService = inject(AuthService);
        const router = inject(Router);

        // In case of CanMatch guard we have to extract the inflight url, otherwise use the url from the state
        const url = Array.isArray(segmentsOrState) ?
            router.getCurrentNavigation()?.extractedUrl.toString() :
            segmentsOrState.url;

        const isAllowed = await authService.runGuard(url ?? location.href, options);
        if (typeof isAllowed === 'string') {
            return router.parseUrl(isAllowed);
        }
        return isAllowed;
    };
