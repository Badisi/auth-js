import type { AuthManager } from './auth-manager';
import type { AuthSettings } from './models/auth-settings.model';

export const createAuthManager = async <
    S extends AuthSettings = AuthSettings,
    M extends AuthManager<S> = AuthManager<S>
>(settings: S, impl: (new () => M)): Promise<M> => {
    const manager = new impl();
    await manager.init(settings);
    return manager;
};
