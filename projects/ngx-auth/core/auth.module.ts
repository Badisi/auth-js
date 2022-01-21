import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, NgZone } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OIDCAuthManager } from '@badisi/auth-js/oidc';

import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { AUTH_MANAGER } from './main';

@NgModule({
    providers: [
        AuthGuard,
        RouterModule,
        {
            provide: AuthService,
            useFactory: (manager: OIDCAuthManager, zone: NgZone, router: Router): AuthService =>
                new AuthService(manager, zone, router),
            deps: [AUTH_MANAGER, NgZone, Router]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            deps: [AuthService],
            multi: true
        }
    ]
})
export class AuthModule {}
