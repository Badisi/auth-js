/* eslint-disable @typescript-eslint/naming-convention */

import { InjectionToken, StaticProvider } from '@angular/core';
import { initOidc, Optional } from '@badisi/auth-js/oidc';

import { AuthSettings } from './auth-settings.model';

const DEFAULT_SETTINGS: Optional<AuthSettings, 'authorityUrl' | 'clientId'> = {
    automaticLoginOn401: true,
    automaticInjectToken: {
        include: (url: string): boolean => {
            const matches = new RegExp(/^.*?(?<!\/)\/(?!\/)(.*$)/gm).exec(url);
            return (matches?.[1]?.startsWith('api')) || false;
        }
    }
};

/**
 * @internal
 */
export const AUTH_MANAGER = new InjectionToken<string>('AUTH_MANAGER');

export const initAuth = async (settings: AuthSettings): Promise<StaticProvider> => ({
    provide: AUTH_MANAGER,
    useValue: await initOidc({ ...DEFAULT_SETTINGS, ...settings }),
    multi: false
});
