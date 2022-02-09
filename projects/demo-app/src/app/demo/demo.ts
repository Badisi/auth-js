export const DEMO_APP_SETTING_STORAGE_KEY = 'demo-app_settings';

export enum DemoAppView {
    PLAYGROUND,
    DEBUG,
    SETTINGS
}

export interface DemoAppSettings {
    currentView: DemoAppView;
    roles: string;
    privateApiUrl: string;
    privateApiHeaders: string;
}
