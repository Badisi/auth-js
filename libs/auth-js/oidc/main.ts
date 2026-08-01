import { AuthLogger, createAuthManager } from '@badisi/auth-js';

import type { OIDCAuthSettings } from './models/oidc-auth-settings.model';
import { OIDCAuthManager } from './oidc-auth-manager';

export const initOidc = async (settings: OIDCAuthSettings, libName = '@badisi/auth-js'): Promise<OIDCAuthManager> => {
    AuthLogger.setLibName(libName);
    return await createAuthManager(settings, OIDCAuthManager);
};
