/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-assignment */

import type { StoragePlugin } from '@capacitor/storage/dist/esm/definitions';
import type { SecureStoragePluginPlugin } from 'capacitor-secure-storage-plugin/dist/esm/definitions';
import { Logger } from 'oidc-client-ts';

import { AsyncStorage } from '../models/async-storage.model';

const LOCAL_STORAGE = window.localStorage;
const CAPACITOR_STORAGE = window.Capacitor?.Plugins?.['Storage'] as StoragePlugin;
const CAPACITOR_SECURE_STORAGE = window.Capacitor?.Plugins?.['SecureStoragePlugin'] as SecureStoragePluginPlugin;

export class MobileStorage implements AsyncStorage {
    private readonly _logger = new Logger('MobileStorage');

    constructor() {
        if (!CAPACITOR_SECURE_STORAGE) {
            let message = '[@badisi/auth-js] This application is currently using an unsafe storage.\n\n';
            message += 'ⓘ Please follow the recommended guide and use `capacitor-secure-storage-plugin` instead.';
            console.warn(message);
        }

        if (CAPACITOR_SECURE_STORAGE) {
            this._logger.debug('Using `capacitor-secure-storage-plugin` implementation');
        } else if (CAPACITOR_STORAGE) {
            this._logger.debug('Using `@capacitor/storage` implementation');
        } else {
            this._logger.debug('Using `localStorage` implementation');
        }
    }

    public async length(): Promise<number> {
        if (CAPACITOR_SECURE_STORAGE) {
            return (await CAPACITOR_SECURE_STORAGE.keys()).value.length;
        } else if (CAPACITOR_STORAGE) {
            return (await CAPACITOR_STORAGE.keys()).keys.length;
        } else {
            return LOCAL_STORAGE.length;
        }
    }

    public async key(index: number): Promise<string | null> {
        if (CAPACITOR_SECURE_STORAGE) {
            return (await CAPACITOR_SECURE_STORAGE.keys()).value[index];
        } else if (CAPACITOR_STORAGE) {
            return (await CAPACITOR_STORAGE.keys()).keys[index];
        } else {
            return LOCAL_STORAGE.key(index);
        }
    }

    public async clear(): Promise<void> {
        this._logger.create('clear');

        if (CAPACITOR_SECURE_STORAGE) {
            await CAPACITOR_SECURE_STORAGE.clear();
        } else if (CAPACITOR_STORAGE) {
            await CAPACITOR_STORAGE.clear();
        } else {
            LOCAL_STORAGE.clear();
        }
    }

    public async getItem(key: string): Promise<string | null> {
        this._logger.create(`getItem('${key}')`);

        if (CAPACITOR_SECURE_STORAGE) {
            try {
                return (await CAPACITOR_SECURE_STORAGE.get({ key })).value;
            } catch {
                return null;
            }
        } else if (CAPACITOR_STORAGE) {
            return (await CAPACITOR_STORAGE.get({ key })).value;
        } else {
            return LOCAL_STORAGE.getItem(key);
        }
    }

    public async setItem(key: string, value: string): Promise<void> {
        this._logger.create(`setItem('${key}')`);

        if (CAPACITOR_SECURE_STORAGE) {
            await CAPACITOR_SECURE_STORAGE.set({ key, value });
        } else if (CAPACITOR_STORAGE) {
            await CAPACITOR_STORAGE.set({ key, value });
        } else {
            LOCAL_STORAGE.setItem(key, value);
        }
    }

    public async removeItem(key: string): Promise<void> {
        this._logger.create(`removeItem('${key}')`);

        if (CAPACITOR_SECURE_STORAGE) {
            await CAPACITOR_SECURE_STORAGE.remove({ key });
        } else if (CAPACITOR_STORAGE) {
            await CAPACITOR_STORAGE.remove({ key });
        } else {
            LOCAL_STORAGE.removeItem(key);
        }
    }
}
