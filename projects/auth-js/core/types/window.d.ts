/* eslint-disable @typescript-eslint/naming-convention */

import type { CapacitorGlobal } from '@capacitor/core/types/definitions';

declare global {
    interface Window {
        handleOpenURL?: (url: string) => void;
        Capacitor?: CapacitorGlobal;
        cordova?: unknown;
        phonegap?: unknown;
        PhoneGap?: unknown;
    }
}
