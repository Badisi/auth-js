import { AuthSettings } from '@badisi/ngx-auth';
import { DEFAULT_NGX_AUTH_SETTINGS, DemoAppSettings, NGX_AUTH_LIBRARY_SETTINGS_DEFINITION } from 'demo-app-common';
import pkgJson from 'projects/ngx-auth/package.json';

import { environment } from '../environments/environment';

export const appSettings = new DemoAppSettings<AuthSettings>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    `ngx-auth:${(pkgJson as any).version as string}:demo-app:settings`, {
        showTip: true,
        currentTabIndex: 0,
        userSettings: DEFAULT_NGX_AUTH_SETTINGS(environment.production),
        librarySettingsDefinition: NGX_AUTH_LIBRARY_SETTINGS_DEFINITION
    });
