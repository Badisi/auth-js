// import { Log } from 'oidc-client-ts';

// TODO: fallback to localStorage if plugin does not exists
export class MobileStorage implements Storage {
    public get length(): number {
        return 0;
    }

    public clear(): void {
        throw new Error('Method not implemented.');
    }

    public getItem(_key: string): string | null {
        throw new Error('Method not implemented.');
    }

    public key(_index: number): string | null {
        throw new Error('Method not implemented.');
    }

    public removeItem(_key: string): void {
        throw new Error('Method not implemented.');
    }

    public setItem(_key: string, _value: string): void {
        throw new Error('Method not implemented.');
    }

    /* private _secureStorage: any;

    set(key: string, value: string): Promise<void> {
        Log.logger.debug('CordovaPluginSecureStorageEcho.setItem', key);
        return new Promise(async (resolve) => {
            const store = await this.getStore();
            store.set(
                () => resolve(),
                (error: any) => {
                    Log.logger.error(error);
                    resolve();
                },
                key,
                value
            );
        });
    }

    get(key: string): Promise<string | null> {
        Log.logger.debug('CordovaPluginSecureStorageEcho.getItem', key);
        return new Promise(async (resolve) => {
            const store = await this.getStore();
            store.get(
                (value: any) => resolve(value),
                (error: any) => {
                    Log.logger.error(error);
                    resolve(null);
                },
                key
            );
        });
    }

    remove(key: string): Promise<string | null> {
        Log.logger.debug('CordovaPluginSecureStorageEcho.removeItem', key);
        return new Promise(async (resolve) => {
            const store = await this.getStore();
            store.remove(
                () => resolve(null),
                (error: any) => {
                    Log.logger.error(error);
                    resolve(null);
                },
                key
            );
        });
    }

    getAllKeys(): Promise<string[]> {
        Log.logger.debug('CordovaPluginSecureStorageEcho.getAllKeys');
        return new Promise(async (resolve) => {
            const store = await this.getStore();
            store.keys(
                (keys: string[]) => resolve(keys),
                (error: any) => {
                    Log.logger.error(error);
                    resolve([]);
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
    }*/
}
