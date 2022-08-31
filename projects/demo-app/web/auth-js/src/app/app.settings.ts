import { OIDCAuthSettings } from '@badisi/auth-js/oidc';
import { AUTH_JS_LIBRARY_SETTINGS_DEFINITION, DEFAULT_AUTH_JS_SETTINGS, DemoAppSettings } from 'demo-app-common';
import pkgJson from 'projects/auth-js/package.json';

import { environment } from '../environments/environment';

export const appSettings: DemoAppSettings<OIDCAuthSettings> = new DemoAppSettings(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    `auth-js:${(pkgJson as any).version as string}:demo-app:settings`, {
        showTip: true,
        currentTabIndex: 0,
        currentUserSettingsIndex: 0,
        userSettings: DEFAULT_AUTH_JS_SETTINGS(environment.production),
        librarySettingsDefinition: AUTH_JS_LIBRARY_SETTINGS_DEFINITION
    });
