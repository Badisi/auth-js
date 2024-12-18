import { AuthLogger } from '@badisi/auth-js';
import { initOidc, type OIDCAuthManager, type Optional } from '@badisi/auth-js/oidc';

import type { AuthSettings } from './auth-settings.model';

const DEFAULT_SETTINGS: Optional<AuthSettings, 'authorityUrl' | 'clientId'> = {
    automaticLoginOn401: true,
    automaticInjectToken: {
        include: (url: string): boolean => {
            const res = new URL(url, 'http://default-base');
            return res.hostname.startsWith('api') || res.pathname.startsWith('/api') || false;
        }
    }
};

AuthLogger.init('@badisi/ngx-auth');

export const initAuth = (settings: AuthSettings): Promise<OIDCAuthManager> =>
    initOidc({ ...DEFAULT_SETTINGS, ...settings });
