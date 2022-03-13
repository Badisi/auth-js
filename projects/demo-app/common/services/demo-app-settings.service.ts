import { AuthSettings } from '@badisi/auth-js/core';

export interface Implementation {
    label: string;
    url: string;
}

export interface Settings<S extends AuthSettings = AuthSettings> {
    name: string;
    librarySettings: S;
    otherSettings?: Record<string, unknown>;
}

export interface LibrarySettingsDefinitionItem<S extends AuthSettings = AuthSettings>{
    _index?: number;
    name: keyof S;
    label: string;
    type: 'string' | 'boolean' | 'list' | 'json';
    required?: boolean;
    values?: { label: string; value: unknown }[];
}

export interface AppSettings<S extends AuthSettings = AuthSettings> {
    currentImplementationIndex: number;
    currentTabIndex: number;
    currentSettingsIndex: number;
    librarySettingsDefinition: LibrarySettingsDefinitionItem<S>[];
    settings: Settings<S>[];
}

export class DemoAppSettings<S extends AuthSettings = AuthSettings> {
    private implementations = [{
        label: 'auth-js',
        url: 'https://badisi.github.io/auth-js/demo-app/auth-js'
    }, {
        label: 'ngx-auth',
        url: 'https://badisi.github.io/auth-js/demo-app/ngx-auth'
    }];

    constructor(
        private storageKey: string,
        private defaultAppSettings: AppSettings<S>
    ) {
        this.defaultAppSettings.librarySettingsDefinition.forEach((item, index) => item._index = index);
    }

    public getCurrentImplementationIndex(): number {
        return this.getAppSettings().currentImplementationIndex;
    }

    public saveCurrentImplementationIndex(index: number): void {
        const appSettings = this.getAppSettings();
        appSettings.currentImplementationIndex = index;
        this.saveAppSettings(appSettings);
    }

    public getCurrentTabIndex(): number {
        return this.getAppSettings().currentTabIndex;
    }

    public saveCurrentTabIndex(index: number): void {
        const appSettings = this.getAppSettings();
        appSettings.currentTabIndex = index;
        this.saveAppSettings(appSettings);
    }

    public getImplementations(): Implementation[] {
        return this.implementations;
    }

    public getSettings(): Settings<S>[] {
        return this.getAppSettings().settings;
    }

    public getCurrentSettings(): Settings<S> {
        const appSettings = this.getAppSettings();
        return appSettings.settings[appSettings.currentSettingsIndex];
    }

    public resetCurrentSettings(settingsName?: string): void {
        const appSettings = this.getAppSettings();
        let index = appSettings.currentSettingsIndex;
        if (settingsName) {
            const findIndex = appSettings.settings.findIndex(s => s.name === settingsName);
            if (findIndex !== -1) {
                index = findIndex;
            }
        }
        appSettings.settings[index] = this.defaultAppSettings.settings[index];
        appSettings.currentSettingsIndex = index;
        this.saveAppSettings(appSettings);
    }

    public getLibrarySettingsDefinition(): LibrarySettingsDefinitionItem<S>[] {
        return this.getAppSettings().librarySettingsDefinition;
    }

    public saveCurrentLibrarySettings(value: S): void {
        const appSettings = this.getAppSettings();
        appSettings.settings[appSettings.currentSettingsIndex].librarySettings = value;
        this.saveAppSettings(appSettings);
    }

    public saveCurrentOtherSettings(value: Record<string, unknown>): void {
        const appSettings = this.getAppSettings();
        appSettings.settings[appSettings.currentSettingsIndex].otherSettings = value;
        this.saveAppSettings(appSettings);
    }

    // --- HELPER(s) ---

    private saveAppSettings(settings: AppSettings<S>): void {
        sessionStorage.setItem(this.storageKey, JSON.stringify(settings));
    }

    private getAppSettings(): AppSettings<S> {
        const data = sessionStorage.getItem(this.storageKey);
        if (data) {
            return JSON.parse(data) as AppSettings<S>;
        }
        return this.defaultAppSettings;
    }
}
