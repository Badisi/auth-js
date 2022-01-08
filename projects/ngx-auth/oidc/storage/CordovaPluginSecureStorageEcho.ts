import { Log, StateStore } from 'oidc-client';

export class CordovaPluginSecureStorageEcho implements StateStore {
    private _secureStorage: any;

    set(key: string, value: any): Promise<void> {
        Log.debug('CordovaPluginSecureStorageEcho.setItem', key);
        return new Promise(async (resolve) => {
            const store = await this.getStore();
            store.set(
                () => resolve(),
                (error: any) => {
                    Log.error(error);
                    resolve(null);
                },
                key,
                value
            );
        });
    }

    get(key: string): Promise<any> {
        Log.debug('CordovaPluginSecureStorageEcho.getItem', key);
        return new Promise(async (resolve) => {
            const store = await this.getStore();
            store.get(
                (value: any) => resolve(value),
                (error: any) => {
                    Log.error(error);
                    resolve(null);
                },
                key
            );
        });
    }

    remove(key: string): Promise<any> {
        Log.debug('CordovaPluginSecureStorageEcho.removeItem', key);
        return new Promise(async (resolve) => {
            const store = await this.getStore();
            store.remove(
                () => resolve(),
                (error: any) => {
                    Log.error(error);
                    resolve(null);
                },
                key
            );
        });
    }

    getAllKeys(): Promise<string[]> {
        Log.debug('CordovaPluginSecureStorageEcho.getAllKeys');
        return new Promise(async (resolve) => {
            const store = await this.getStore();
            store.keys(
                (keys: string[]) => resolve(keys),
                (error: any) => {
                    Log.error(error);
                    resolve(null);
                },
            );
        });
    }

    // --- HELPER(s) ---

    private getStore(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this._secureStorage) {
                const cordova = (window as any).cordova;
                if (cordova && cordova.plugins.SecureStorage) {
                    const storage = new cordova.plugins.SecureStorage(
                        () => {
                            this._secureStorage = storage;
                            resolve(this._secureStorage);
                        },
                        (error: any) => reject(error),
                        'NGX_AUTH'
                    );
                } else {
                    reject('CordovaPluginSecureStorageEcho: cordova.plugins.SecureStorage is undefined');
                }
            } else {
                resolve(this._secureStorage);
            }
        });
    }
}
