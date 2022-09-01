import { Log, Navigation, OIDCAuthSettings } from '@badisi/auth-js/oidc';
import { AuthSettings } from '@badisi/ngx-auth';
import { LibrarySettingsDefinitionItem } from 'demo-app-common';

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
    name: 'authGuardRedirectUrl',
    label: 'AuthGuard redirect url',
    type: 'string'
});
export const NGX_AUTH_LIBRARY_SETTINGS_DEFINITION = ngxAuthLibSettingsDef;
