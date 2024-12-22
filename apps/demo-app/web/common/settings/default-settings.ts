import { LogLevel } from '@badisi/auth-js';
import { DesktopNavigation, type OIDCAuthSettings } from '@badisi/auth-js/oidc';
import type { Settings } from 'demo-app-common';

const COMMON_LIBRARY_SETTINGS: Omit<Settings<OIDCAuthSettings>['librarySettings'], 'authorityUrl' | 'clientId'> = {
    mobileScheme: 'demo-app',
    desktopNavigationType: DesktopNavigation.REDIRECT,
    logLevel: LogLevel.NONE,
    loginRequired: false,
    retrieveUserSession: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    automaticLoginOn401: true,
    automaticInjectToken: { include: ['/api'] }
};

const AUTH0_SETTINGS: Settings<OIDCAuthSettings> = {
    name: 'Auth0',
    otherSettings: {
        apiUrl: 'https://dev-fijd1e9x.us.auth0.com/api/v2/users/auth0|631b171682c639d40cb84d5c',
        apiHeaders: '',
        roles: 'view-profile'
    },
    librarySettings: {
        authorityUrl: 'https://dev-fijd1e9x.us.auth0.com',
        clientId: 'kRVVEnAWKMpxxpcodl0TqLXfIHgQvmmt',
        scope: 'openid profile email phone offline_access read:current_user',
        internal: {
            extraQueryParams: {
                audience: 'https://dev-fijd1e9x.us.auth0.com/api/v2/'
            }
        },
        ...COMMON_LIBRARY_SETTINGS
    }
};

const ZITADEL_SETTINGS: Settings<OIDCAuthSettings> = {
    name: 'Zitadel',
    otherSettings: {
        apiUrl: 'http://localhost:8080/api/my-api',
        apiHeaders: '',
        roles: 'view-profile'
    },
    librarySettings: {
        authorityUrl: 'https://auth-js-0pdipf.zitadel.cloud',
        clientId: '178200751804317953@demo-app',
        scope: 'openid profile email phone offline_access',
        ...COMMON_LIBRARY_SETTINGS
    }
};

const KEYCLOAK_LOCAL_SETTINGS: Settings<OIDCAuthSettings> = {
    name: 'Keycloak (local)',
    otherSettings: {
        apiUrl: 'http://localhost:8080/api/my-api',
        apiHeaders: '',
        roles: 'view-profile'
    },
    librarySettings: {
        authorityUrl: 'http://localhost:8080/auth/realms/demo',
        clientId: 'demo-app',
        scope: 'openid profile email phone',
        ...COMMON_LIBRARY_SETTINGS
    }
};

export const DEFAULT_SETTINGS = (isDevMode = false): Settings<OIDCAuthSettings>[] => [
    AUTH0_SETTINGS,
    ZITADEL_SETTINGS,
    ...(isDevMode ? [KEYCLOAK_LOCAL_SETTINGS] : [])
];
