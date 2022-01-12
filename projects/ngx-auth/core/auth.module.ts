import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { OIDCAuthManager } from '@badisi/auth-js/oidc';

import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { AUTH_MANAGER } from './main';

@NgModule({
    providers: [
        AuthGuard,
        Router,
        {
            provide: AuthService,
            useFactory: (manager: OIDCAuthManager, router: Router): AuthService => new AuthService(manager, router),
            deps: [AUTH_MANAGER, Router]
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
