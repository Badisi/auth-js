import { AuthSettings } from '@badisi/auth-js/core';
import authJsPkgJson from 'projects/auth-js/package.json';
import ngxAuthPkgJson from 'projects/ngx-auth/package.json';

export interface Implementation {
    label: string;
    demoUrl: string;
    version: string;
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
    currentTabIndex: number;
    currentSettingsIndex: number;
    librarySettingsDefinition: LibrarySettingsDefinitionItem<S>[];
    settings: Settings<S>[];
}

export class DemoAppSettings<S extends AuthSettings = AuthSettings> {
    private implementations: Implementation[] = [{
        label: 'VanillaJS',
        demoUrl: 'https://badisi.github.io/auth-js/demo-app/auth-js',
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
        version: `<a href="${authJsPkgJson.homepage}" target="_blank">${authJsPkgJson.name}@main</a>`
    }, {
        label: 'Angular',
        demoUrl: 'https://badisi.github.io/auth-js/demo-app/ngx-auth',
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
        version: `<a href="${ngxAuthPkgJson.homepage}" target="_blank">${ngxAuthPkgJson.name}@main</a>`
    }];

    constructor(
        private storageKey: string,
        private defaultAppSettings: AppSettings<S>
    ) {
        this.defaultAppSettings.librarySettingsDefinition.forEach((item, index) => item._index = index);
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
