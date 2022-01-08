/* eslint-disable @typescript-eslint/naming-convention */

type PluginCallback = (data: PluginResultData, error?: PluginResultError) => void;

interface PluginListenerHandle {
    remove: () => Promise<void>;
}

interface PluginResultData {
    [key: string]: unknown;
}

interface PluginResultError {
    message: string;
}

interface CapacitorGlobal {
    isNativePlatform: () => boolean;
    addListener: (pluginName: string, eventName: string, callback: PluginCallback) => PluginListenerHandle;
}

interface Window {
    handleOpenURL: (url: string) => void;
    Capacitor: CapacitorGlobal;
    cordova: unknown;
    phonegap: unknown;
    PhoneGap: unknown;
}
