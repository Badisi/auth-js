import { AuthSettings, Log, Navigation } from '@badisi/ngx-auth';
import { environment } from 'projects/demo-app/src/environments/environment';

import { DemoSettings } from '../models/demo-settings.model';
import { DemoView } from '../models/demo-view.enum';
import { LibrarySettings } from '../models/library-settings.model';
import { PlaygroundSettings } from '../models/playground-settings.model';

export const SETTINGS_STORAGE_KEY = 'ngx-auth:demo-app:settings';

// eslint-disable-next-line @typescript-eslint/naming-convention
const CONFIGS: { [key: string]: DemoSettings } = {
    KEYCLOAK_LOCAL: {
        currentView: DemoView.PLAYGROUND,
        playground: {
            roles: 'view-profile',
            privateApiUrl: '/api/my-api'
        },
        library: {
            authorityUrl: 'http://localhost:8080/auth/realms/demo',
            clientId: 'demo-app',
            schemeUri: 'demo-app',
            scope: 'openid profile email phone',
            loginRequired: false,
            loadSession: true,
            loadUserInfo: true,
            automaticLoginOn401: true,
            automaticInjectToken: true,
            automaticSilentRenew: true,
            authGuardRedirectUrl: '/forbidden',
            navigationType: Navigation.REDIRECT,
            logLevel: Log.NONE
        }
    },
    AUTH0: {
        currentView: DemoView.PLAYGROUND,
        playground: {
            roles: 'view-profile',
            privateApiUrl: 'https://dev-fijd1e9x.us.auth0.com/api/v2/users/auth0|620573a0e0fb5b00693d8433'
        },
        library: {
            authorityUrl: 'https://dev-fijd1e9x.us.auth0.com',
            clientId: 'kRVVEnAWKMpxxpcodl0TqLXfIHgQvmmt',
            schemeUri: 'demo-app',
            scope: 'openid profile email phone read:current_user',
            internal: {
                extraQueryParams: {
                    audience: 'https://dev-fijd1e9x.us.auth0.com/api/v2/'
                }
            },
            loginRequired: false,
            loadSession: true,
            loadUserInfo: true,
            automaticLoginOn401: true,
            automaticInjectToken: true,
            automaticSilentRenew: true,
            authGuardRedirectUrl: '/forbidden',
            navigationType: Navigation.REDIRECT,
            logLevel: Log.NONE
        }
    }
};

export class DemoService {
    public static default = CONFIGS[environment.config] || CONFIGS['KEYCLOAK_LOCAL'];

    public static getCurrentView(): DemoView {
        return DemoService.getSettings().currentView;
    }

    public static getPlaygroundSettings(): PlaygroundSettings {
        return DemoService.getSettings().playground;
    }

    public static getLibrarySettings(): AuthSettings {
        return DemoService.getSettings().library;
    }

    public static saveCurrentView(view: DemoView): void {
        const demoSettings = DemoService.getSettings();
        demoSettings.currentView = view;
        DemoService.saveSettings(demoSettings);
    }

    public static savePlaygroundSettings(settings: PlaygroundSettings): void {
        const demoSettings = DemoService.getSettings();
        demoSettings.playground = settings;
        DemoService.saveSettings(demoSettings);
    }

    public static saveLibrarySettings(settings: LibrarySettings): void {
        const demoSettings = DemoService.getSettings();
        demoSettings.library = settings;
        DemoService.saveSettings(demoSettings);
    }

    public static reset(): void {
        DemoService.saveSettings(DemoService.default);
    }

    private static saveSettings(settings: DemoSettings): void {
        sessionStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    }

    private static getSettings(): DemoSettings {
        const data = sessionStorage.getItem(SETTINGS_STORAGE_KEY);
        if (data) {
            return JSON.parse(data) as DemoSettings;
        }
        return DemoService.default;
    }
}
