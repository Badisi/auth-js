import type { Routes } from '@angular/router';

import { routes as demoRoutes } from './demo/demo.routes';

export const routes: Routes = [
    { path: '', children: demoRoutes },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];
