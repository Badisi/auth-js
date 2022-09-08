import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessToken, AuthGuard, AuthGuardValidator, UserProfile } from '@badisi/ngx-auth';

import { DemoComponent } from './demo.component';

/* eslint-disable
    @typescript-eslint/no-explicit-any,
    @typescript-eslint/no-unsafe-assignment,
    @typescript-eslint/no-unsafe-member-access
*/
const rolesValidator = (): AuthGuardValidator =>
    (_userProfile?: UserProfile, accessToken?: AccessToken): boolean => {
        const { otherSettings } = window.appSettings.getCurrentUserSettings();
        const requiredRoles = (otherSettings) ? (otherSettings['roles'] as string)?.split(',') || [] : [];
        let tokenRoles: string[] = (accessToken as any).resource_access?.account?.roles; // keycloak
        if (!tokenRoles) {
            tokenRoles = (accessToken as any)?.['http://ngx-auth.com/roles']; // auth0
        }
        return requiredRoles.every(role => (tokenRoles || []).includes(role));
    };
/* eslint-enable
    @typescript-eslint/no-explicit-any,
    @typescript-eslint/no-unsafe-assignment,
    @typescript-eslint/no-unsafe-member-access
*/

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
