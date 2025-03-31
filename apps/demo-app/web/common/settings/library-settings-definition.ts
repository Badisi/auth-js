import { DesktopNavigation, LogLevel, type OIDCAuthSettings } from '@badisi/auth-js/oidc';

import type { LibrarySettingsDefinitionItem } from '.';

export const LIBRARY_SETTINGS_DEFINITION: LibrarySettingsDefinitionItem<OIDCAuthSettings>[] = [{
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
    type: 'string',
    placeholder: 'ex: openid profile email phone offline_access'
}, {
    // @ts-expect-error Not a key of OIDCAuthSettings
    name: 'internal.extraQueryParams',
    label: 'Extra query params',
    type: 'json',
    placeholder: 'ex: {"audience":"value"}'
}, {
    name: 'authGuardFallbackUrl',
    label: 'AuthGuard fallback url',
    type: 'string',
    placeholder: 'ex: forbidden'
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
}, {
    name: 'automaticInjectToken',
    label: 'Automatic inject token',
    type: 'boolean'
}, {
    // @ts-expect-error Not a key of OIDCAuthSettings
    name: 'automaticInjectToken.include',
    label: 'Include url(s)',
    type: 'string',
    placeholder: 'ex: http://localhost, /pathname'
}, {
    // @ts-expect-error Not a key of OIDCAuthSettings
    name: 'automaticInjectToken.exclude',
    label: 'Exclude url(s)',
    type: 'string',
    placeholder: 'ex: http://localhost, /pathname'
}, {
    name: 'automaticLoginOn401',
    label: 'Automatic login on 401',
    type: 'boolean'
}];
