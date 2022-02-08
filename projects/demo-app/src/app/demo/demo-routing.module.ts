import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessToken, AuthGuard, AuthGuardValidator, UserProfile } from '@badisi/ngx-auth';

import { DemoComponent } from './demo.component';

type AccessTokenWithRoles = AccessToken & {
    // eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
    resource_access?: { account?: { roles?: string[] } };
};

const roleValidator = (): AuthGuardValidator =>
    (_userProfile?: UserProfile, accessToken?: AccessToken): boolean => {
        const requiredRolesInput = document.getElementById('roles-input') as HTMLInputElement;
        const requiredRoles = requiredRolesInput?.value?.split(',') || [];
        const tokenRoles = (accessToken as AccessTokenWithRoles)?.resource_access?.account?.roles || [];
        return requiredRoles.every(role => tokenRoles.includes(role));
    };

const routes: Routes = [
    {
        path: '',
        component: DemoComponent,
        children: [
            {
                path: 'public',
                loadChildren: (): Promise<unknown> => import('./page/page.module').then(m => m.PageModule),
                runGuardsAndResolvers: 'always',
                data: {
                    title: 'PUBLIC CONTENT'
                }
            },
            {
                path: 'private',
                loadChildren: (): Promise<unknown> => import('./page/page.module').then(m => m.PageModule),
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
                loadChildren: (): Promise<unknown> => import('./page/page.module').then(m => m.PageModule),
                runGuardsAndResolvers: 'always',
                data: {
                    title: 'ACCESS FORBIDDEN'
                }
            },
            {
                path: 'protected',
                loadChildren: (): Promise<unknown> => import('./page/page.module').then(m => m.PageModule),
                runGuardsAndResolvers: 'always',
                canLoad: [AuthGuard],
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                data: {
                    title: 'PROTECTED CONTENT',
                    authGuardValidator: roleValidator()
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
