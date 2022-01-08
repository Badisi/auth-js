import { Type, InjectionToken } from '@angular/core';
import { AuthService } from '../auth.service';

export const AUTH_CONFIG = new InjectionToken<AuthConfig>('auth-config');

export type AutoInjectToken = boolean | { include?: string[], exclude?: string[] };

// tslint:disable:no-inferrable-types
export class AuthConfig {
    serviceClass: Type<AuthService>;
    initializerFactory?: any;
    autoLoginOn401?: boolean = true;
    autoInjectToken?: AutoInjectToken = { include: ['/api'] };
    deps?: any[];
}
