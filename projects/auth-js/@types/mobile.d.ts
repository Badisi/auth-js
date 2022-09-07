/* eslint-disable @typescript-eslint/naming-convention */

import type { AppPlugin } from '@capacitor/app';
import type { BrowserPlugin } from '@capacitor/browser';
import type { CapacitorGlobal } from '@capacitor/core';
import type { PreferencesPlugin } from '@capacitor/preferences';
import type { Cordova } from '@types/Cordova';
import type { SecureStoragePluginPlugin } from 'capacitor-secure-storage-plugin';

declare global {
    interface Window {
        // Cordova
        cordova?: Cordova;
        phonegap?: unknown;
        PhoneGap?: unknown;
        handleOpenURL?: (url: string) => void;

        // Capacitor
        Capacitor?: CapacitorGlobal & {
            Plugins?: {
                App: AppPlugin;
                Browser: BrowserPlugin;
                Storage?: PreferencesPlugin; // StoragePlugin was renamed PreferencesPlugin in @capacitor@4.x
                Preferences?: PreferencesPlugin;
                SecureStoragePlugin?: SecureStoragePluginPlugin;
            };
        };
    }
}
