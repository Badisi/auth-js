import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { EnvironmentProviders, makeEnvironmentProviders, StaticProvider } from '@angular/core';

import { AuthGuard } from './auth.guard';
import { authInterceptorFn } from './auth.interceptor';

export const provideAuth = (authProvider: StaticProvider): EnvironmentProviders =>
    makeEnvironmentProviders([
        authProvider,
        AuthGuard,
        provideHttpClient(withInterceptors([authInterceptorFn]))
    ]);
