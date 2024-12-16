/* eslint-disable @typescript-eslint/no-deprecated */
import type { AsyncStorage } from 'oidc-client-ts';

import { AuthLogger } from '../../core';

const logger = new AuthLogger('MobileStorage');

// defaults
const LOCAL_STORAGE = window.localStorage;
// @capacitor < 4.x
const CAPACITOR_STORAGE = window.Capacitor?.Plugins.Storage;
// @capacitor >= 4.x (`Storage` was renamed `Preferences`)
const CAPACITOR_PREFERENCES = window.Capacitor?.Plugins.Preferences;
// most secured
const CAPACITOR_SECURE_STORAGE = window.Capacitor?.Plugins.SecureStoragePlugin;

/**
 * @internal
 */
export class MobileStorage implements AsyncStorage {
    constructor() {
        if (!CAPACITOR_SECURE_STORAGE) {
            let message = '[@badisi/auth-js] This application is currently using an unsafe storage.\n\n';
            message += 'ⓘ Please follow the recommended guide and use `capacitor-secure-storage-plugin` instead.';
            logger.notif(message);
        }

        if (CAPACITOR_SECURE_STORAGE) {
            logger.debug('Using `capacitor-secure-storage-plugin` implementation');
        } else if (CAPACITOR_PREFERENCES) {
            logger.debug('Using `@capacitor/preferences` implementation');
        } else if (CAPACITOR_STORAGE) {
            logger.debug('Using `@capacitor/storage` implementation');
        } else {
            logger.debug('Using `localStorage` implementation');
        }
    }

    public get length(): Promise<number> {
        return (async (): Promise<number> => {
            if (CAPACITOR_SECURE_STORAGE) {
                return (await CAPACITOR_SECURE_STORAGE.keys()).value.length;
            } else if (CAPACITOR_PREFERENCES) {
                return (await CAPACITOR_PREFERENCES.keys()).keys.length;
            } else if (CAPACITOR_STORAGE) {
                return (await CAPACITOR_STORAGE.keys()).keys.length;
            } else {
                return LOCAL_STORAGE.length;
            }
        })();
    }

    public async key(index: number): Promise<string | null> {
        if (CAPACITOR_SECURE_STORAGE) {
            return (await CAPACITOR_SECURE_STORAGE.keys()).value[index];
        } else if (CAPACITOR_PREFERENCES) {
            return (await CAPACITOR_PREFERENCES.keys()).keys[index];
        } else if (CAPACITOR_STORAGE) {
            return (await CAPACITOR_STORAGE.keys()).keys[index];
        } else {
            return LOCAL_STORAGE.key(index);
        }
    }

    public async clear(): Promise<void> {
        logger.debug('clear');

        if (CAPACITOR_SECURE_STORAGE) {
            await CAPACITOR_SECURE_STORAGE.clear();
        } else if (CAPACITOR_PREFERENCES) {
            await CAPACITOR_PREFERENCES.clear();
        } else if (CAPACITOR_STORAGE) {
            await CAPACITOR_STORAGE.clear();
        } else {
            LOCAL_STORAGE.clear();
        }
    }

    public async getItem(key: string): Promise<string | null> {
        logger.debug(`getItem('${key}')`);

        if (CAPACITOR_SECURE_STORAGE) {
            try {
                return (await CAPACITOR_SECURE_STORAGE.get({ key })).value;
            } catch {
                return null;
            }
        } else if (CAPACITOR_PREFERENCES) {
            return (await CAPACITOR_PREFERENCES.get({ key })).value;
        } else if (CAPACITOR_STORAGE) {
            return (await CAPACITOR_STORAGE.get({ key })).value;
        } else {
            return LOCAL_STORAGE.getItem(key);
        }
    }

    public async setItem(key: string, value: string): Promise<void> {
        logger.debug(`setItem('${key}')`);

        if (CAPACITOR_SECURE_STORAGE) {
            await CAPACITOR_SECURE_STORAGE.set({ key, value });
        } else if (CAPACITOR_PREFERENCES) {
            await CAPACITOR_PREFERENCES.set({ key, value });
        } else if (CAPACITOR_STORAGE) {
            await CAPACITOR_STORAGE.set({ key, value });
        } else {
            LOCAL_STORAGE.setItem(key, value);
        }
    }

    public async removeItem(key: string): Promise<void> {
        logger.debug(`removeItem('${key}')`);

        if (CAPACITOR_SECURE_STORAGE) {
            try {
                await CAPACITOR_SECURE_STORAGE.remove({ key });
            } catch {
                /* no-op */
            }
        } else if (CAPACITOR_PREFERENCES) {
            await CAPACITOR_PREFERENCES.remove({ key });
        } else if (CAPACITOR_STORAGE) {
            await CAPACITOR_STORAGE.remove({ key });
        } else {
            LOCAL_STORAGE.removeItem(key);
        }
    }
}
