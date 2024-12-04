import type { Routes } from '@angular/router';
import type { OIDCAuthSettings } from '@badisi/auth-js/oidc';
import { type AccessToken, AuthGuard, type AuthGuardValidator, type UserProfile } from '@badisi/ngx-auth';
import type { UserSettings } from 'demo-app-common';

import { DemoComponent } from './demo.component';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
const rolesValidator = (): AuthGuardValidator =>
    (_userProfile?: UserProfile, accessToken?: AccessToken): boolean => {
        const { otherSettings, librarySettings } = window.appSettings.getCurrentUserSettings() as UserSettings<OIDCAuthSettings>;
        const requiredRoles = (otherSettings) ? (otherSettings['roles'] as string | undefined ?? '').split(',') : [];

        let tokenRoles: string[] | undefined;
        // auth0
        if (librarySettings.authorityUrl.includes('auth0')) {
            tokenRoles = (accessToken as any)?.['http://ngx-auth.com/roles'];
        // zitadel
        } else if (librarySettings.authorityUrl.includes('zitadel')) {
            const roles: Record<string, unknown> | undefined = (accessToken as any)?.['urn:zitadel:iam:org:project:roles'];
            tokenRoles = Object.keys(roles ?? {});
        // keycloak
        } else {
            tokenRoles = (accessToken as any).resource_access?.account?.roles;
        }

        return requiredRoles.every(role => (tokenRoles ?? []).includes(role));
    };
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

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
                canLoad: [AuthGuard],
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
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
                canLoad: [AuthGuard],
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                data: {
                    title: 'PROTECTED CONTENT',
                    authGuardValidator: rolesValidator()
                }
            }
        ]
    }
];
