import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { type EnvironmentProviders, makeEnvironmentProviders, type StaticProvider } from '@angular/core';

import { authInterceptorFn } from './auth.interceptor';

export const provideAuth = (authProvider: StaticProvider): EnvironmentProviders =>
    makeEnvironmentProviders([
        authProvider,
        provideHttpClient(withInterceptors([authInterceptorFn]))
    ]);
