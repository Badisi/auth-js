import type { Routes } from '@angular/router';
import { authGuard } from '@badisi/ngx-auth';
import { rolesValidator } from 'demo-app-common';

import { DemoComponent } from './demo.component';

const rolesGuard = authGuard({ validator: rolesValidator() });

export const routes: Routes = [
    {
        path: '',
        component: DemoComponent,
        children: [
            {
                path: 'forbidden',
                loadComponent: () => import('./components/page/page.component').then(m => m.PageComponent),
                runGuardsAndResolvers: 'always',
                data: {
                    title: 'ACCESS FORBIDDEN'
                }
            },
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
