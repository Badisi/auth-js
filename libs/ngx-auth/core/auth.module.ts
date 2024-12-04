import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
    providers: [
        AuthGuard,
        RouterModule,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ]
})
export class AuthModule { }
