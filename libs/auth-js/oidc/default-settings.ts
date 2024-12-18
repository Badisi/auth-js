/* eslint-disable camelcase, @typescript-eslint/naming-convention */

import { LogLevel } from '../core';
import type { DefaultSettings } from './models/default-settings.model';
import { DesktopNavigation } from './models/desktop-navigation.enum';

export const REDIRECT_URL_KEY = 'auth-js:oidc_manager:redirect_url';

export const DEFAULT_SETTINGS: DefaultSettings = {
    loginRequired: false,
    retrieveUserSession: true,
    loadUserInfo: false,
    automaticSilentRenew: true,
    desktopNavigationType: DesktopNavigation.REDIRECT,
    scope: 'openid profile email phone',
    logLevel: LogLevel.NONE,
    automaticLoginOn401: true,
    automaticInjectToken: {
        include: (url: string): boolean => {
            const res = new URL(url, 'http://default-base');
            return res.hostname.startsWith('api') || res.pathname.startsWith('/api') || false;
        }
    },
    internal: {
        response_type: 'code',
        redirect_uri: '?oidc-callback=login',
        post_logout_redirect_uri: '?oidc-callback=logout',
        popup_redirect_uri: 'oidc/callback/popup_redirect.html',
        popup_post_logout_redirect_uri: 'oidc/callback/popup_redirect.html',
        silent_redirect_uri: 'oidc/callback/silent_redirect.html',
        mobileWindowPresentationStyle: 'popover'
    }
};
