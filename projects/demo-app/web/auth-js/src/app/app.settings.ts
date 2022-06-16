import { Log, Navigation, OIDCAuthSettings } from '@badisi/auth-js/oidc';
import { DemoAppSettings, LibrarySettingsDefinitionItem, Settings } from 'demo-app-common';
import pkgJson from 'projects/auth-js/package.json';

const settings: Settings<OIDCAuthSettings>[] = [{
    name: 'Auth0',
    librarySettings: {
        authorityUrl: 'https://dev-fijd1e9x.us.auth0.com',
        clientId: 'kRVVEnAWKMpxxpcodl0TqLXfIHgQvmmt',
        schemeUri: 'demo-app',
        scope: 'openid profile email phone offline_access read:current_user',
        internal: {
            extraQueryParams: {
                audience: 'https://dev-fijd1e9x.us.auth0.com/api/v2/'
            }
        },
        navigationType: Navigation.REDIRECT,
        logLevel: Log.NONE,
        loginRequired: false,
        loadUserSession: true,
        loadUserInfo: true,
        automaticSilentRenew: true
    }
}, {
    name: 'Keycloak (local)',
    librarySettings: {
        authorityUrl: 'http://localhost:8080/auth/realms/demo',
        clientId: 'demo-app',
        schemeUri: 'demo-app',
        scope: 'openid profile email phone',
        navigationType: Navigation.REDIRECT,
        logLevel: Log.NONE,
        loginRequired: false,
        loadUserSession: true,
        loadUserInfo: true,
        automaticSilentRenew: true
    }
}];

const librarySettingsDefinition: LibrarySettingsDefinitionItem<OIDCAuthSettings>[] = [{
    name: 'authorityUrl',
    label: 'Authority url',
    type: 'string',
    required: true
}, {
    name: 'clientId',
    label: 'Client id',
    type: 'string',
    required: true
}, {
    name: 'schemeUri',
    label: 'Scheme uri',
    type: 'string'
}, {
    name: 'scope',
    label: 'Scope',
    type: 'string'
}, {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    name: 'internal.extraQueryParams',
    label: 'Extra query params',
    type: 'json'
}, {
    name: 'navigationType',
    label: 'Navigation type',
    type: 'list',
    values: [{
        label: 'REDIRECT',
        value: Navigation.REDIRECT
    }, {
        label: 'POPUP',
        value: Navigation.POPUP
    }]
}, {
    name: 'logLevel',
    label: 'Log level',
    type: 'list',
    values: [{
        label: 'NONE',
        value: Log.NONE
    }, {
        label: 'ERROR',
        value: Log.ERROR
    }, {
        label: 'WARN',
        value: Log.WARN
    }, {
        label: 'INFO',
        value: Log.INFO
    }, {
        label: 'DEBUG',
        value: Log.DEBUG
    }]
}, {
    name: 'loginRequired',
    label: 'Login required',
    type: 'boolean'
}, {
    name: 'loadUserSession',
    label: 'Load user\'s session',
    type: 'boolean'
}, {
    name: 'loadUserInfo',
    label: 'Load user\'s info',
    type: 'boolean'
}, {
    name: 'automaticSilentRenew',
    label: 'Automatic silent renew',
    type: 'boolean'
}];

export const authSettings: DemoAppSettings<OIDCAuthSettings> = new DemoAppSettings(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    `auth-js:${(pkgJson as any).version as string}:demo-app:settings`, {
        showTip: true,
        currentTabIndex: 0,
        currentSettingsIndex: 0,
        librarySettingsDefinition,
        settings
    });
