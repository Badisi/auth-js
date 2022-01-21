import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@badisi/ngx-auth';

import { DemoComponent } from './demo.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { PublicComponent } from './public/public.component';

/* type AccessTokenWithRoles = AccessToken & {
    // eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
    resource_access?: { account?: { roles?: string[] } };
};

const roleValidator = (...roles: string[]): AuthGuardValidator =>
    (_userProfile?: UserProfile, accessToken?: AccessToken): boolean => {
        const tokenRoles = (accessToken as AccessTokenWithRoles)?.resource_access?.account?.roles || [];
        return roles.every(role => tokenRoles.includes(role));
    };*/

const routes: Routes = [
    {
        path: '',
        component: DemoComponent,
        children: [
            {
                path: 'public',
                component: PublicComponent
            },
            {
                path: 'forbidden',
                component: ForbiddenComponent
            },
            {
                path: 'private',
                loadChildren: (): Promise<unknown> => import('./private/private.module').then(m => m.PrivateModule),
                canLoad: [AuthGuard],
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                data: {
                    // authGuardValidator: roleValidator('manage-account', 'view-profile'),
                    authGuardRedirectUrl: '/forbidden'
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
