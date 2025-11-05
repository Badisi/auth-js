import type { AuthSettings } from '@badisi/auth-js';
import type { OIDCAuthSettings } from '@badisi/auth-js/oidc';

import type { DemoAppSettings, LibraryImplementation, LibrarySettingsDefinitionItem, Settings } from '.';
import { DEFAULT_SETTINGS, LIBRARY_IMPLEMENTATIONS } from './default-settings';
import { LIBRARY_SETTINGS_DEFINITION } from './library-settings-definition';

export class DemoAppSettingsService<S extends AuthSettings = AuthSettings> {
    #storageKey = 'auth-js:playground:settings';
    #librarySettingsDefinition = LIBRARY_SETTINGS_DEFINITION;
    #defaultDemoAppSettings: DemoAppSettings<S>;

    public constructor(isDevMode: boolean) {
        this.#librarySettingsDefinition.forEach((item, index) => {
            item._sortIndex = index;
        });
        this.#defaultDemoAppSettings = {
            currentTabIndex: 0,
            currentSettingsIndex: 0,
            settings: DEFAULT_SETTINGS(isDevMode) as unknown as Settings<S>[]
        };
    }

    public getLibrarySettingsDefinition(): LibrarySettingsDefinitionItem<OIDCAuthSettings>[] {
        return this.#librarySettingsDefinition;
    }

    public getLibraryImplementations(): LibraryImplementation[] {
        return LIBRARY_IMPLEMENTATIONS;
    }

    public getSettings(): Settings<S>[] {
        return this.get().settings;
    }

    public addOrUpdateSettings(settings: Settings<S>, index: number | undefined = undefined): undefined | number {
        const appSettings = this.get();
        let settingsIndex = index;
        if (index !== undefined) {
            appSettings.settings[index] = settings;
        } else {
            appSettings.settings.push(settings);
            const sortedSettings = appSettings.settings.sort((a, b) => a.name.localeCompare(b.name));
            settingsIndex = sortedSettings.indexOf(settings);
        }
        this.saveDemoAppSettings(appSettings);
        return settingsIndex;
    }

    public deleteCurrentSettings(): void {
        const appSettings = this.get();
        const index = appSettings.currentSettingsIndex;
        if (index >= 0 && index < appSettings.settings.length) {
            appSettings.settings.splice(index, 1);
            this.saveDemoAppSettings(appSettings);
        }
    }

    public setCurrentTabIndex(index: number): void {
        const appSettings = this.get();
        appSettings.currentTabIndex = index;
        this.saveDemoAppSettings(appSettings);
    }

    public setCurrentSettingsIndex(index: number): void {
        const appSettings = this.get();
        appSettings.currentSettingsIndex = index;
        this.saveDemoAppSettings(appSettings);
    }

    public getCurrentSettings(): Settings<S> {
        const appSettings = this.get();
        const index = appSettings.currentSettingsIndex;
        if (index >= 0 && index < appSettings.settings.length) {
            return appSettings.settings[index];
        }
        return appSettings.settings[0];
    }

    public get(): DemoAppSettings<S> {
        const data = sessionStorage.getItem(this.#storageKey);
        if (data) {
            const appSettings = {
                ...this.#defaultDemoAppSettings,
                ...JSON.parse(data) as DemoAppSettings<S>
            };
            this.#defaultDemoAppSettings.settings.forEach(defaultSettings => {
                if (!appSettings.settings.find(s => s.name === defaultSettings.name)) {
                    appSettings.settings.push(defaultSettings);
                }
            });
            appSettings.settings = appSettings.settings.sort((a, b) => a.name.localeCompare(b.name));
            return appSettings;
        }
        return { ...this.#defaultDemoAppSettings };
    }

    // --- HELPER(s) ---

    private saveDemoAppSettings(settings: DemoAppSettings<S>): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        delete (settings as any).librarySettingsDefinition;
        sessionStorage.setItem(this.#storageKey, JSON.stringify(settings));
    }
}
