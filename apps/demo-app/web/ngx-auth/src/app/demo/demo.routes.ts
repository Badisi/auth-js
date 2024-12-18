import type { Routes } from '@angular/router';
import type { OIDCAuthSettings } from '@badisi/auth-js/oidc';
import { type AccessToken, authGuard, type AuthGuardValidator, type UserProfile } from '@badisi/ngx-auth';
import type { UserSettings } from 'demo-app-common';

import { DemoComponent } from './demo.component';

const rolesValidator = (): AuthGuardValidator =>
    (_userProfile?: UserProfile, accessToken?: AccessToken): boolean | string => {
        const { otherSettings, librarySettings } = window.appSettings.getCurrentUserSettings() as UserSettings<OIDCAuthSettings>;
        const requiredRoles = (otherSettings) ? (otherSettings['roles'] as string | undefined ?? '').split(',') : [];

        let tokenRoles: string[] | undefined;
        // auth0
        if (librarySettings.authorityUrl.includes('auth0')) {
            tokenRoles = (accessToken as Record<string, string[] | undefined>)['http://ngx-auth.com/roles'];
        // zitadel
        } else if (librarySettings.authorityUrl.includes('zitadel')) {
            const roles = (accessToken as Record<string, string[] | undefined>)['urn:zitadel:iam:org:project:roles'];
            tokenRoles = Object.keys(roles ?? {});
        // keycloak
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
            tokenRoles = (accessToken as any)?.resource_access?.account?.roles;
        }

        const isAllowed = requiredRoles.every(role => (tokenRoles ?? []).includes(role));
        return isAllowed ? true : 'forbidden';
    };

const rolesGuard = authGuard({ validator: rolesValidator() });

export const routes: Routes = [
    {
        path: '',
        component: DemoComponent,
        children: [
            {
                path: 'public',
                loadComponent: () => import('./components/page/page.component').then(m => m.PageComponent),
                runGuardsAndResolvers: 'always',
                data: {
                    title: 'PUBLIC CONTENT'
                }
            },
            {
                path: 'private',
                loadComponent: () => import('./components/page/page.component').then(m => m.PageComponent),
                runGuardsAndResolvers: 'always',
                canMatch: [authGuard()],
                canActivate: [authGuard()],
                canActivateChild: [authGuard()],
                data: {
                    title: 'PRIVATE CONTENT'
                }
            },
            {
                path: 'forbidden',
                loadComponent: () => import('./components/page/page.component').then(m => m.PageComponent),
                runGuardsAndResolvers: 'always',
                data: {
                    title: 'ACCESS FORBIDDEN'
                }
            },
            {
                path: 'protected',
                loadComponent: () => import('./components/page/page.component').then(m => m.PageComponent),
                runGuardsAndResolvers: 'always',
                canMatch: [rolesGuard],
                canActivate: [rolesGuard],
                canActivateChild: [rolesGuard],
                data: {
                    title: 'PROTECTED CONTENT'
                }
            }
        ]
    }
];
