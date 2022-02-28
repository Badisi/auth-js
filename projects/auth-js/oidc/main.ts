import { createAuthManager } from '../core/main';
import { OIDCAuthSettings } from './models/oidc-auth-settings.model';
import { OIDCAuthManager } from './oidc-auth-manager';

export const initOidc = async (settings: OIDCAuthSettings): Promise<OIDCAuthManager> =>
    await createAuthManager(settings, OIDCAuthManager);
