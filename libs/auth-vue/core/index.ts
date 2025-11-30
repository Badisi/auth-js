/* eslint-disable no-duplicate-imports, @typescript-eslint/no-empty-object-type */

/**
 * @license GPL-3.0-only
 * Package `@badisi/auth-vue` <https://github.com/Badisi/auth-js/tree/main/libs/auth-vue>
 * Released under GNU General Public License v3.0 only <https://github.com/Badisi/auth-js/blob/main/LICENSE>
 * SPDX-License-Identifier: GPL-3.0-only
 * Copyright (C) 2018 Badisi
 */

// Initialize the logger
import { AuthLogger } from '@badisi/auth-js';

AuthLogger.init('@badisi/auth-vue');

// @badisi/auth-js re-exports renamed
import type { OIDCAuthManager, OIDCAuthSettings } from '@badisi/auth-js/oidc';
export interface AuthManager extends OIDCAuthManager {}
export interface AuthSettings extends OIDCAuthSettings {}

// @badisi/auth-js re-exports
export type {
    AccessToken,
    AuthGuardOptions,
    AuthGuardValidator,
    IdToken,
    InjectToken,
    InjectTokenPattern,
    LoginArgs,
    LogoutArgs,
    MobileWindowParams,
    RenewArgs,
    SigninMobileArgs,
    SignoutMobileArgs,
    UserProfile,
    UserSession
} from '@badisi/auth-js/oidc';
export {
    decodeJwt,
    DesktopNavigation,
    getBaseUrl,
    isCapacitor,
    isCordova,
    isNativeMobile,
    LogLevel
} from '@badisi/auth-js/oidc';

// Library augmentations
import type { AuthService } from './auth.service';

declare module 'vue' {
    interface ComponentCustomProperties {
        $authService: AuthService;
    }
}

import type { AuthGuardOptions } from '@badisi/auth-js/oidc';

declare module 'vue-router' {
    export interface RouteMeta {
        authGuard?: boolean | AuthGuardOptions;
    }
}

// Library exports
export { useAuthGuard } from './auth.guard';
export { initAuth } from './auth.provider';
export { AuthService, useAuthService } from './auth.service';
