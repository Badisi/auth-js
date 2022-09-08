import { AuthSettings } from '@badisi/auth-js/core';
import authJsPkgJson from 'projects/auth-js/package.json';
import ngxAuthPkgJson from 'projects/ngx-auth/package.json';

export interface Implementation {
    label: string;
    demoUrl: string;
    version: string;
}

export interface UserSettings<LS extends AuthSettings = AuthSettings> {
    name: string;
    librarySettings: LS;
    otherSettings?: Record<string, unknown>;
}

export interface LibrarySettingsDefinitionItem<LS extends AuthSettings = AuthSettings>{
    _sortIndex?: number;
    name: keyof LS;
    label: string;
    type: 'string' | 'boolean' | 'list' | 'json';
    required?: boolean;
    values?: { label: string; value: unknown }[];
}

export interface AppSettings<LS extends AuthSettings = AuthSettings> {
    showTip: boolean;
    currentTabIndex: number;
    currentUserSettingsId?: string;
    userSettings: UserSettings<LS>[];
    librarySettingsDefinition: LibrarySettingsDefinitionItem<LS>[];
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
        this.defaultAppSettings.librarySettingsDefinition.forEach((item, index) => item._sortIndex = index);
    }

    public getImplementations(): Implementation[] {
        return this.implementations;
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

    public addOrUpdateUserSettings(settings: UserSettings<S>): void {
        const appSettings = this.get();
        const findIndex = appSettings.userSettings.findIndex(s => s.name === settings.name);
        if (findIndex !== -1) {
            appSettings.userSettings[findIndex] = settings;
        } else {
            appSettings.userSettings.push(settings);
        }
        this.saveAppSettings(appSettings);
    }

    public deleteCurrentUserSettings(): void {
        const appSettings = this.get();
        const findIndex = appSettings.userSettings.findIndex(s => s.name === appSettings.currentUserSettingsId);
        if (findIndex !== -1) {
            appSettings.userSettings.splice(findIndex, 1);
            delete appSettings.currentUserSettingsId;
            this.saveAppSettings(appSettings);
        }
    }

    public setCurrentUserSettings(name: string): void {
        const appSettings = this.get();
        const findIndex = appSettings.userSettings.findIndex(s => s.name === name);
        if (findIndex !== -1) {
            appSettings.currentUserSettingsId = name;
            this.saveAppSettings(appSettings);
        }
    }

    public getCurrentUserSettings(): UserSettings<S> {
        const appSettings = this.get();
        const findIndex = appSettings.userSettings.findIndex(s => s.name === appSettings.currentUserSettingsId);
        if (findIndex !== -1) {
            return appSettings.userSettings[findIndex];
        }
        return appSettings.userSettings[0];
    }

    public get(): AppSettings<S> {
        const data = sessionStorage.getItem(this.storageKey);
        if (data) {
            const settings = {
                ...this.defaultAppSettings,
                ...JSON.parse(data) as AppSettings<S>
            };
            this.defaultAppSettings.userSettings.forEach(defaultUserSettings => {
                if (!settings.userSettings.find(s => s.name === defaultUserSettings.name)) {
                    settings.userSettings.push(defaultUserSettings);
                }
            });
            return settings;
        }
        return { ...this.defaultAppSettings };
    }

    // --- HELPER(s) ---

    private saveAppSettings(settings: AppSettings<S>): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        delete (settings as any).librarySettingsDefinition;
        sessionStorage.setItem(this.storageKey, JSON.stringify(settings));
    }
}
