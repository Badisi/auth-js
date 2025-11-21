import { type EnvironmentProviders, InjectionToken, makeEnvironmentProviders, type StaticProvider } from '@angular/core';
import { initOidc, type OIDCAuthManager } from '@badisi/auth-js/oidc';

import type { AuthSettings } from '.';

export const AUTH_MANAGER = new InjectionToken<OIDCAuthManager>('AUTH_MANAGER');

export const initAuth = async (settings: AuthSettings): Promise<StaticProvider> => ({
    provide: AUTH_MANAGER,
    useValue: await initOidc(settings),
    multi: false
});

export const provideAuth = (authProvider: StaticProvider): EnvironmentProviders =>
    makeEnvironmentProviders([
        authProvider
    ]);
