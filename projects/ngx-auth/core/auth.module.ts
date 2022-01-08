import { NgModule, ModuleWithProviders, Provider, APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthConfig, AUTH_CONFIG } from './models/auth-config.model';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

export function provideAuthService(config: AuthConfig): Provider[] {
    return [{
        provide: AuthService,
        useClass: config.serviceClass,
        multi: false
    }, {
        provide: APP_INITIALIZER,
        useFactory: config.initializerFactory,
        deps: [AuthService, ...((config.deps) ? [...config.deps] : [])],
        multi: true
    }];
}

export function provideAuthInterceptor(config: AuthConfig): Provider[] {
    return (config.autoInjectToken === false && config.autoLoginOn401 === false) ? [] : [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        deps: [AuthService, AUTH_CONFIG],
        multi: true
    }, {
        provide: AUTH_CONFIG,
        useValue: config
    }];
}

/**
 *  The @dynamic comment is required here in order for the compilation to succeed
 *  See related issue : https://github.com/angular/angular/issues/19698#issuecomment-349222734
 */
// @dynamic()
@NgModule()
export class AuthModule {
    public static forRoot(config: AuthConfig): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
                AuthGuard,
                provideAuthService(config),
                // use spread operator to avoid adding an undefined item (in case useInterceptor is false)
                ...provideAuthInterceptor(config)
            ]
        };
    }
}
