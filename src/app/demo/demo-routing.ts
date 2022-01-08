import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@badisi/ngx-auth/core';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';
import { DemoComponent } from './demo.component';

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
                path: 'private',
                component: PrivateComponent,
                canLoad: [AuthGuard],
                canActivate: [AuthGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoRoutingModule { }
