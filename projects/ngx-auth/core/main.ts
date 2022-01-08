import { StaticProvider } from '@angular/core';
import { createAuthManager, Optional } from '@badisi/auth-js/core';
import { OIDCAuthManager } from '@badisi/auth-js/oidc';

import { AuthService } from './auth.service';
import { AuthSettings } from './auth-settings.model';

// eslint-disable-next-line @typescript-eslint/naming-convention
const DEFAULT_SETTINGS: Optional<AuthSettings, 'authorityUrl' | 'clientId'> = {
    loginOn401: true,
    injectToken: {
        include: (url: string): boolean => {
            const matches = new RegExp(/^.*?(?<!\/)\/(?!\/)(.*$)/gm).exec(url);
            return (matches?.[1]?.startsWith('api')) || false;
        }
    }
};

export const initAuth = async (settings: AuthSettings): Promise<StaticProvider> => {
    const manager = await createAuthManager({ ...DEFAULT_SETTINGS, ...settings }, OIDCAuthManager);
    return {
        provide: AuthService,
        useFactory: (): AuthService => new AuthService(manager as OIDCAuthManager),
        multi: false
    };
};
