import { createAuthManager } from '../core';
import type { OIDCAuthSettings } from './models/oidc-auth-settings.model';
import { OIDCAuthManager } from './oidc-auth-manager';

export const initOidc = async (settings: OIDCAuthSettings): Promise<OIDCAuthManager> =>
    await createAuthManager(settings, OIDCAuthManager);
