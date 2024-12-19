import type { AuthSettings } from '@badisi/auth-js';
import type { OIDCAuthSettings } from '@badisi/auth-js/oidc';
import authJsPkgJson from 'libs/auth-js/package.json';
import ngxAuthPkgJson from 'libs/ngx-auth/package.json';

import { LIBRARY_SETTINGS_DEFINITION } from './library-settings-definition';

export interface LibraryImplementation {
    label: string;
    demoUrl: string;
    version: string;
}

export interface LibrarySettingsDefinitionItem<LS extends AuthSettings = AuthSettings> {
    _sortIndex?: number;
    name: keyof LS;
    label: string;
    type: 'string' | 'boolean' | 'list' | 'json';
    placeholder?: string;
    required?: boolean;
    values?: { label: string; value: unknown; }[];
}

export interface Settings<LS extends AuthSettings = AuthSettings> {
    name: string;
    otherSettings?: {
        apiUrl?: string;
        apiHeaders?: string;
        queryParams?: string;
        roles?: string;
    };
    librarySettings: LS;
}

export interface AppSettings<LS extends AuthSettings = AuthSettings> {
    showTip: boolean;
    currentTabIndex: number;
    currentSettingsId?: string;
    settings: Settings<LS>[];
}

const LIBRARY_IMPLEMENTATIONS: LibraryImplementation[] = [{
    label: 'VanillaJS',
    demoUrl: 'https://badisi.github.io/auth-js/demo-app/auth-js',
    version: `<a href="${authJsPkgJson.homepage}" target="_blank">${authJsPkgJson.name}@main</a>`
}, {
    label: 'Angular',
    demoUrl: 'https://badisi.github.io/auth-js/demo-app/ngx-auth',
    version: `<a href="${ngxAuthPkgJson.homepage}" target="_blank">${ngxAuthPkgJson.name}@main</a>`
}];

export class DemoAppSettings<S extends AuthSettings = AuthSettings> {
    #librarySettingsDefinition = LIBRARY_SETTINGS_DEFINITION;
    #defaultAppSettings: AppSettings<S>;

    constructor(
        private storageKey: string,
        defaultSettings: Settings<S>[]
    ) {
        this.#librarySettingsDefinition.forEach((item, index) => item._sortIndex = index);
        this.#defaultAppSettings = {
            showTip: true,
            currentTabIndex: 0,
            settings: defaultSettings
        };
    }

    public getLibrarySettingsDefinition(): LibrarySettingsDefinitionItem<OIDCAuthSettings>[] {
        return this.#librarySettingsDefinition;
    }

    public getLibraryImplementations(): LibraryImplementation[] {
        return LIBRARY_IMPLEMENTATIONS;
    }

    public setShowTip(value: boolean): void {
        const appSettings = this.get();
        appSettings.showTip = value;
        this.saveAppSettings(appSettings);
    }

    public setCurrentTabIndex(index: number): void {
        const appSettings = this.get();
        appSettings.currentTabIndex = index;
        this.saveAppSettings(appSettings);
    }

    public addOrUpdateSettings(settings: Settings<S>): void {
        const appSettings = this.get();
        const findIndex = appSettings.settings.findIndex(s => s.name === settings.name);
        if (findIndex !== -1) {
            appSettings.settings[findIndex] = settings;
        } else {
            appSettings.settings.push(settings);
        }
        this.saveAppSettings(appSettings);
    }

    public setCurrentSettings(name: string): void {
        const appSettings = this.get();
        const findIndex = appSettings.settings.findIndex(s => s.name === name);
        if (findIndex !== -1) {
            appSettings.currentSettingsId = name;
            this.saveAppSettings(appSettings);
        }
    }

    public getCurrentSettings(): Settings<S> {
        const appSettings = this.get();
        const findIndex = appSettings.settings.findIndex(s => s.name === appSettings.currentSettingsId);
        if (findIndex !== -1) {
            return appSettings.settings[findIndex];
        }
        return appSettings.settings.sort((a, b) => a.name.localeCompare(b.name))[0];
    }

    public deleteCurrentSettings(): void {
        const appSettings = this.get();
        const { name } = this.getCurrentSettings();
        const findIndex = appSettings.settings.findIndex(s => s.name === name);
        if (findIndex !== -1) {
            appSettings.settings.splice(findIndex, 1);
            delete appSettings.currentSettingsId;
            this.saveAppSettings(appSettings);
        }
    }

    public get(): AppSettings<S> {
        const data = sessionStorage.getItem(this.storageKey);
        if (data) {
            const appSettings = {
                ...this.#defaultAppSettings,
                ...JSON.parse(data) as AppSettings<S>
            };
            this.#defaultAppSettings.settings.forEach(defaultSettings => {
                if (!appSettings.settings.find(s => s.name === defaultSettings.name)) {
                    appSettings.settings.push(defaultSettings);
                }
            });
            return appSettings;
        }
        return { ...this.#defaultAppSettings };
    }

    // --- HELPER(s) ---

    private saveAppSettings(settings: AppSettings<S>): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        delete (settings as any).librarySettingsDefinition;
        sessionStorage.setItem(this.storageKey, JSON.stringify(settings));
    }
}
