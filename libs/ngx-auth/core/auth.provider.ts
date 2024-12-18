import { type EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import type { OIDCAuthManager } from '@badisi/auth-js/oidc';

import { AuthService } from './auth.service';

export const provideAuth = (authManager: OIDCAuthManager): EnvironmentProviders =>
    makeEnvironmentProviders([{
        provide: AuthService,
        useFactory: () => new AuthService(authManager),
        multi: false
    }]);
