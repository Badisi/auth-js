import { Log, Navigation } from '@badisi/auth-js/oidc';
import { AuthSettings } from '@badisi/ngx-auth';
import { DemoAppSettings, LibrarySettingsDefinitionItem, Settings } from 'demo-app-common';

import pkgJson from '../../../../ngx-auth/package.json';

const settings: Settings<AuthSettings>[] = [{
    name: 'Auth0',
    otherSettings: {
        roles: 'view-profile',
        privateApiUrl: 'https://dev-fijd1e9x.us.auth0.com/api/v2/users/auth0|620573a0e0fb5b00693d8433',
        privateApiHeaders: ''
    },
    librarySettings: {
        authorityUrl: 'https://dev-fijd1e9x.us.auth0.com',
        clientId: 'kRVVEnAWKMpxxpcodl0TqLXfIHgQvmmt',
        schemeUri: 'demo-app',
        authGuardRedirectUrl: '/forbidden',
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
        automaticSilentRenew: true,
        automaticLoginOn401: true,
        automaticInjectToken: true
    }
}, {
    name: 'Keycloak (local)',
    otherSettings: {
        roles: 'view-profile',
        privateApiUrl: '/api/my-api',
        privateApiHeaders: ''
    },
    librarySettings: {
        authorityUrl: 'http://localhost:8080/auth/realms/demo',
        clientId: 'demo-app',
        schemeUri: 'demo-app',
        authGuardRedirectUrl: '/forbidden',
        scope: 'openid profile email phone',
        navigationType: Navigation.REDIRECT,
        logLevel: Log.NONE,
        loginRequired: false,
        loadUserSession: true,
        loadUserInfo: true,
        automaticSilentRenew: true,
        automaticLoginOn401: true,
        automaticInjectToken: true
    }
}];

const librarySettingsDefinition: LibrarySettingsDefinitionItem<AuthSettings>[] = [{
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
    name: 'authGuardRedirectUrl',
    label: 'AuthGuard redirect url',
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
}, {
    name: 'automaticLoginOn401',
    label: 'Automatic login on 401',
    type: 'boolean'
}, {
    name: 'automaticInjectToken',
    label: 'Automatic inject token',
    type: 'boolean'
}];

export const authSettings: DemoAppSettings<AuthSettings> = new DemoAppSettings(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    `ngx-auth:${(pkgJson as any).version as string}:demo-app:settings`, {
        currentTabIndex: 0,
        currentSettingsIndex: 0,
        librarySettingsDefinition,
        settings
    });
