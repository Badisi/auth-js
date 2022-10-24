/* eslint-disable @typescript-eslint/naming-convention */

import { Log, Navigation, OIDCAuthSettings } from '@badisi/auth-js/oidc';
import { AuthSettings } from '@badisi/ngx-auth';
import { UserSettings } from 'demo-app-common';

export const DEFAULT_AUTH_JS_SETTINGS = (production = false): UserSettings<OIDCAuthSettings>[] => {
    const settings: UserSettings<OIDCAuthSettings>[] = [{
        name: 'Auth0',
        otherSettings: {
            privateApiUrl: 'https://dev-fijd1e9x.us.auth0.com/api/v2/users/auth0|631b171682c639d40cb84d5c',
            privateApiHeaders: ''
        },
        librarySettings: {
            authorityUrl: 'https://dev-fijd1e9x.us.auth0.com',
            clientId: 'kRVVEnAWKMpxxpcodl0TqLXfIHgQvmmt',
            mobileScheme: 'demo-app',
            scope: 'openid profile email phone offline_access read:current_user',
            internal: {
                extraQueryParams: {
                    audience: 'https://dev-fijd1e9x.us.auth0.com/api/v2/'
                }
            },
            navigationType: Navigation.REDIRECT,
            logLevel: Log.NONE,
            loginRequired: false,
            retrieveUserSession: true,
            loadUserInfo: true,
            automaticSilentRenew: true
        }
    }, {
        name: 'Zitadel',
        otherSettings: {
            privateApiUrl: '',
            privateApiHeaders: ''
        },
        librarySettings: {
            authorityUrl: 'https://auth-js-0pdipf.zitadel.cloud',
            clientId: '178200751804317953@demo-app',
            mobileScheme: 'demo-app',
            scope: 'openid profile email phone offline_access',
            navigationType: Navigation.REDIRECT,
            logLevel: Log.NONE,
            loginRequired: false,
            retrieveUserSession: true,
            loadUserInfo: true,
            automaticSilentRenew: true
        }
    }];

    if (!production) {
        settings.push({
            name: 'Keycloak (local)',
            otherSettings: {
                privateApiUrl: '/api/my-api',
                privateApiHeaders: ''
            },
            librarySettings: {
                authorityUrl: 'http://localhost:8080/auth/realms/demo',
                clientId: 'demo-app',
                mobileScheme: 'demo-app',
                scope: 'openid profile email phone',
                navigationType: Navigation.REDIRECT,
                logLevel: Log.NONE,
                loginRequired: false,
                retrieveUserSession: true,
                loadUserInfo: true,
                automaticSilentRenew: true
            }
        });
    }

    return settings;
};

export const DEFAULT_NGX_AUTH_SETTINGS = (production = false): UserSettings<AuthSettings>[] => {
    const defaultAuthJsSettings = DEFAULT_AUTH_JS_SETTINGS(production);

    const settings: UserSettings<AuthSettings>[] = [{
        name: 'Auth0',
        otherSettings: {
            ...defaultAuthJsSettings[0].otherSettings,
            roles: 'view-profile'
        },
        librarySettings: {
            ...defaultAuthJsSettings[0].librarySettings,
            authGuardRedirectUrl: '/forbidden',
            automaticLoginOn401: true,
            automaticInjectToken: true
        }
    }, {
        name: 'Zitadel',
        otherSettings: {
            ...defaultAuthJsSettings[1].otherSettings,
            roles: 'view-profile'
        },
        librarySettings: {
            ...defaultAuthJsSettings[1].librarySettings,
            authGuardRedirectUrl: '/forbidden',
            automaticLoginOn401: true,
            automaticInjectToken: true
        }
    }];

    if (!production) {
        settings.push({
            name: 'Keycloak (local)',
            otherSettings: {
                ...defaultAuthJsSettings[defaultAuthJsSettings.length - 1].otherSettings,
                roles: 'view-profile'
            },
            librarySettings: {
                ...defaultAuthJsSettings[defaultAuthJsSettings.length - 1].librarySettings,
                authGuardRedirectUrl: '/forbidden',
                automaticLoginOn401: true,
                automaticInjectToken: true
            }
        });
    }

    return settings;
};
