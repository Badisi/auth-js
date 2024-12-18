import { DesktopNavigation, LogLevel, type OIDCAuthSettings } from '@badisi/auth-js/oidc';
import type { AuthSettings } from '@badisi/ngx-auth';
import type { LibrarySettingsDefinitionItem } from 'demo-app-common';

export const AUTH_JS_LIBRARY_SETTINGS_DEFINITION: LibrarySettingsDefinitionItem<OIDCAuthSettings>[] = [{
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
    name: 'mobileScheme',
    label: 'Custom mobile scheme name',
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
    name: 'desktopNavigationType',
    label: 'Desktop navigation type',
    type: 'list',
    values: [{
        label: 'REDIRECT',
        value: DesktopNavigation.REDIRECT
    }, {
        label: 'POPUP',
        value: DesktopNavigation.POPUP
    }]
}, {
    name: 'logLevel',
    label: 'Log level',
    type: 'list',
    values: [{
        label: 'NONE',
        value: LogLevel.NONE
    }, {
        label: 'ERROR',
        value: LogLevel.ERROR
    }, {
        label: 'WARN',
        value: LogLevel.WARN
    }, {
        label: 'INFO',
        value: LogLevel.INFO
    }, {
        label: 'DEBUG',
        value: LogLevel.DEBUG
    }]
}, {
    name: 'loginRequired',
    label: 'Login required',
    type: 'boolean'
}, {
    name: 'retrieveUserSession',
    label: 'Retrieve user\'s session',
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

const ngxAuthLibSettingsDef: LibrarySettingsDefinitionItem<AuthSettings>[] = [
    ...AUTH_JS_LIBRARY_SETTINGS_DEFINITION, {
        name: 'automaticLoginOn401',
        label: 'Automatic login on 401',
        type: 'boolean'
    }, {
        name: 'automaticInjectToken',
        label: 'Automatic inject token',
        type: 'boolean'
    }
];
ngxAuthLibSettingsDef.splice(3, 0, {
    name: 'authGuardFallbackUrl',
    label: 'AuthGuard fallback url',
    type: 'string'
});
export const NGX_AUTH_LIBRARY_SETTINGS_DEFINITION = ngxAuthLibSettingsDef;
