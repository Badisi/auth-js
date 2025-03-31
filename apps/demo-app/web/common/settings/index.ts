import type { AuthSettings } from '@badisi/auth-js';

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

export interface DemoAppSettings<LS extends AuthSettings = AuthSettings> {
    currentTabIndex: number;
    currentSettingsIndex: number;
    settings: Settings<LS>[];
}

export { DemoAppSettingsService } from './demo-app-settings.service';
