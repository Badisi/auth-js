import { AuthLogger } from '@badisi/auth-js';
import type { PreferencesPlugin } from '@capacitor/preferences';
import type { SecureStoragePluginPlugin } from 'capacitor-secure-storage-plugin';
import type { AsyncStorage } from 'oidc-client-ts';

// defaults
const getLocalStorage = (): Storage => window.localStorage;
// @capacitor < 4.x
const getCapacitorStorage = (): PreferencesPlugin | undefined => window.Capacitor?.Plugins.Storage;
// @capacitor >= 4.x (`Storage` was renamed `Preferences`)
const getCapacitorPreferences = (): PreferencesPlugin | undefined => window.Capacitor?.Plugins.Preferences;
// most secured
const getCapacitorSecureStorage = (): SecureStoragePluginPlugin | undefined => window.Capacitor?.Plugins.SecureStoragePlugin;

/**
 * @internal
 */
export class MobileStorage implements AsyncStorage {
    #logger = new AuthLogger('MobileStorage');

    public constructor() {
        if (!getCapacitorSecureStorage()) {
            let message = '[@badisi/auth-js] This application is currently using an unsafe storage.\n\n';
            message += 'ⓘ Please follow the recommended guide and use `capacitor-secure-storage-plugin` instead.';
            this.#logger.notif(message);
        }

        if (getCapacitorSecureStorage()) {
            this.#logger.debug('Using `capacitor-secure-storage-plugin` implementation');
        } else if (getCapacitorPreferences()) {
            this.#logger.debug('Using `@capacitor/preferences` implementation');
        } else if (getCapacitorStorage()) {
            this.#logger.debug('Using `@capacitor/storage` implementation');
        } else {
            this.#logger.debug('Using `localStorage` implementation');
        }
    }

    public get length(): Promise<number> {
        return (async (): Promise<number> => {
            const secureStorage = getCapacitorSecureStorage();
            if (secureStorage) {
                return (await secureStorage.keys()).value.length;
            }
            const preferences = getCapacitorPreferences();
            if (preferences) {
                return (await preferences.keys()).keys.length;
            }
            const storage = getCapacitorStorage();
            if (storage) {
                return (await storage.keys()).keys.length;
            }
            return getLocalStorage().length;
        })();
    }

    public async key(index: number): Promise<string | null> {
        const secureStorage = getCapacitorSecureStorage();
        if (secureStorage) {
            return (await secureStorage.keys()).value[index];
        }
        const preferences = getCapacitorPreferences();
        if (preferences) {
            return (await preferences.keys()).keys[index];
        }
        const storage = getCapacitorStorage();
        if (storage) {
            return (await storage.keys()).keys[index];
        }
        return getLocalStorage().key(index);
    }

    public async clear(): Promise<void> {
        this.#logger.debug('clear');

        const secureStorage = getCapacitorSecureStorage();
        if (secureStorage) {
            await secureStorage.clear();
            return;
        }
        const preferences = getCapacitorPreferences();
        if (preferences) {
            await preferences.clear();
            return;
        }
        const storage = getCapacitorStorage();
        if (storage) {
            await storage.clear();
            return;
        }
        getLocalStorage().clear();
    }

    public async getItem(key: string): Promise<string | null> {
        this.#logger.debug(`getItem('${key}')`);

        const secureStorage = getCapacitorSecureStorage();
        if (secureStorage) {
            try {
                return (await secureStorage.get({ key })).value;
            } catch {
                return null;
            }
        }
        const preferences = getCapacitorPreferences();
        if (preferences) {
            return (await preferences.get({ key })).value;
        }
        const storage = getCapacitorStorage();
        if (storage) {
            return (await storage.get({ key })).value;
        }
        return getLocalStorage().getItem(key);
    }

    public async setItem(key: string, value: string): Promise<void> {
        this.#logger.debug(`setItem('${key}')`);

        const secureStorage = getCapacitorSecureStorage();
        if (secureStorage) {
            await secureStorage.set({ key, value });
            return;
        }
        const preferences = getCapacitorPreferences();
        if (preferences) {
            await preferences.set({ key, value });
            return;
        }
        const storage = getCapacitorStorage();
        if (storage) {
            await storage.set({ key, value });
            return;
        }
        getLocalStorage().setItem(key, value);
    }

    public async removeItem(key: string): Promise<void> {
        this.#logger.debug(`removeItem('${key}')`);

        const secureStorage = getCapacitorSecureStorage();
        if (secureStorage) {
            try {
                await secureStorage.remove({ key });
            } catch {
                /* no-op */
            }
            return;
        }
        const preferences = getCapacitorPreferences();
        if (preferences) {
            await preferences.remove({ key });
            return;
        }
        const storage = getCapacitorStorage();
        if (storage) {
            await storage.remove({ key });
            return;
        }
        getLocalStorage().removeItem(key);
    }
}
