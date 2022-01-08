import { AuthManager } from './models/auth-manager.model';
import { AuthSettings } from './models/auth-settings.model';

export const createAuthManager = async (
    settings: AuthSettings,
    impl: (new () => AuthManager<AuthSettings>)
): Promise<AuthManager<AuthSettings>> => {
    const manager = new impl();
    await manager.init(settings);
    return manager;
};
