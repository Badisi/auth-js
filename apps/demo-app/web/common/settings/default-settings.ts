import type { OIDCAuthSettings } from '@badisi/auth-js/oidc';
import authJsPkgJson from 'libs/auth-js/package.json';
import authVuePkgJson from 'libs/auth-vue/package.json';
import ngxAuthPkgJson from 'libs/ngx-auth/package.json';

import { DEFAULT_SETTINGS as DEFAULT_AUTH_JS_SETTINGS } from '../../../../../libs/auth-js/oidc/default-settings';
import type { LibraryImplementation, Settings } from '.';

export const LIBRARY_IMPLEMENTATIONS: LibraryImplementation[] = [{
    label: 'VanillaJS',
    demoUrl: 'https://badisi.github.io/auth-js/demo-app/auth-js',
    version: authJsPkgJson.version
}, {
    label: 'Angular',
    demoUrl: 'https://badisi.github.io/auth-js/demo-app/ngx-auth',
    version: ngxAuthPkgJson.version
}, {
    label: 'Vue.js',
    demoUrl: 'https://badisi.github.io/auth-js/demo-app/auth-vue',
    version: authVuePkgJson.version
}];

export const DEFAULT_LIBRARY_SETTINGS = {
    ...DEFAULT_AUTH_JS_SETTINGS,
    automaticInjectToken: { headerName: 'Authorization', include: ['/api'] }
};

const AUTH0_SETTINGS: Settings<OIDCAuthSettings> = {
    name: 'Auth0',
    otherSettings: {
        apiUrl: 'https://dev-fijd1e9x.us.auth0.com/api/v2/users/auth0|631b171682c639d40cb84d5c',
        apiHeaders: '',
        roles: 'view-profile'
    },
    librarySettings: {
        ...DEFAULT_LIBRARY_SETTINGS,
        authorityUrl: 'https://dev-fijd1e9x.us.auth0.com',
        clientId: 'kRVVEnAWKMpxxpcodl0TqLXfIHgQvmmt',
        mobileScheme: 'demo-app',
        loadUserInfo: true,
        scope: 'openid profile email phone offline_access read:current_user',
        internal: {
            extraQueryParams: {
                audience: 'https://dev-fijd1e9x.us.auth0.com/api/v2/'
            }
        }
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
        ...DEFAULT_LIBRARY_SETTINGS,
        authorityUrl: 'https://auth-js-0pdipf.zitadel.cloud',
        clientId: '178200751804317953@demo-app',
        mobileScheme: 'demo-app',
        loadUserInfo: true,
        scope: 'openid profile email phone offline_access',
        internal: {
            extraQueryParams: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'login_hint': 'demo'
            }
        }
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
        ...DEFAULT_LIBRARY_SETTINGS,
        authorityUrl: 'http://localhost:8080/auth/realms/demo',
        clientId: 'demo-app',
        mobileScheme: 'demo-app',
        loadUserInfo: true
    }
};

export const DEFAULT_SETTINGS = (isDevMode = false): Settings<OIDCAuthSettings>[] => [
    AUTH0_SETTINGS,
    ZITADEL_SETTINGS,
    ...(isDevMode ? [KEYCLOAK_LOCAL_SETTINGS] : [])
];
