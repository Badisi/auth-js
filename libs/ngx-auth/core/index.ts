/* eslint-disable @typescript-eslint/no-empty-object-type */

/**
 * @license GPL-3.0-only
 * Package @badisi/ngx-auth <https://github.com/Badisi/auth-js/tree/main/libs/ngx-auth>
 * Released under GNU General Public License v3.0 only <https://github.com/Badisi/auth-js/blob/main/LICENSE>
 * SPDX-License-Identifier: GPL-3.0-only
 * Copyright (C) 2018 Badisi
 */

// Initialize the logger
import { AuthLogger } from '@badisi/auth-js';
AuthLogger.init('@badisi/ngx-auth');

// @badisi/auth-js re-exports renamed
import { initOidc, type OIDCAuthManager, type OIDCAuthSettings } from '@badisi/auth-js/oidc';
export interface AuthManager extends OIDCAuthManager {};
export interface AuthSettings extends OIDCAuthSettings {};
export const initAuth = (settings: AuthSettings): Promise<AuthManager> => initOidc(settings);

// @badisi/auth-js re-exports
export type {
    AccessToken, AuthGuardOptions, AuthGuardValidator, IdToken, InjectToken, InjectTokenPattern,
    LoginArgs, LogoutArgs, MobileWindowParams, RenewArgs, SigninMobileArgs, SignoutMobileArgs,
    UserProfile
} from '@badisi/auth-js/oidc';
export { AuthUtils, DesktopNavigation, LogLevel, UserSession } from '@badisi/auth-js/oidc';

// Library exports
export { authGuard } from './auth.guard';
export { AuthModule } from './auth.module';
export { provideAuth } from './auth.provider';
export { type AuthService } from './auth.service';
