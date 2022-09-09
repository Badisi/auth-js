import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OIDCAuthSettings } from '@badisi/auth-js/oidc';
import { AccessToken, AuthGuard, AuthGuardValidator, UserProfile } from '@badisi/ngx-auth';
import { UserSettings } from 'demo-app-common';

import { DemoComponent } from './demo.component';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
const rolesValidator = (): AuthGuardValidator =>
    (_userProfile?: UserProfile, accessToken?: AccessToken): boolean => {
        const { otherSettings, librarySettings } = window.appSettings.getCurrentUserSettings() as UserSettings<OIDCAuthSettings>;
        const requiredRoles = (otherSettings) ? (otherSettings['roles'] as string)?.split(',') || [] : [];

        let tokenRoles: string[];
        // auth0
        if (librarySettings.authorityUrl.includes('auth0')) {
            tokenRoles = (accessToken as any)?.['http://ngx-auth.com/roles'];
        // zitadel
        } else if (librarySettings.authorityUrl.includes('zitadel')) {
            const roles: Record<string, unknown> = (accessToken as any)?.['urn:zitadel:iam:org:project:roles'];
            tokenRoles = Object.keys(roles ?? {});
        // keycloak
        } else {
            tokenRoles = (accessToken as any).resource_access?.account?.roles;
        }

        return requiredRoles.every(role => (tokenRoles ?? []).includes(role));
    };
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

const routes: Routes = [
    {
        path: '',
        component: DemoComponent,
        children: [
            {
                path: 'public',
                loadChildren: (): Promise<unknown> => import('./components/page/page.module').then(m => m.PageModule),
                runGuardsAndResolvers: 'always',
                data: {
                    title: 'PUBLIC CONTENT'
                }
            },
            {
                path: 'private',
                loadChildren: (): Promise<unknown> => import('./components/page/page.module').then(m => m.PageModule),
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
                loadChildren: (): Promise<unknown> => import('./components/page/page.module').then(m => m.PageModule),
                runGuardsAndResolvers: 'always',
                data: {
                    title: 'ACCESS FORBIDDEN'
                }
            },
            {
                path: 'protected',
                loadChildren: (): Promise<unknown> => import('./components/page/page.module').then(m => m.PageModule),
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

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoRoutingModule { }
