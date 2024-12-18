/**
 * @license GPL-3.0-only
 * Package @badisi/ngx-auth (core build) <https://github.com/Badisi/auth-js/tree/main/projects/ngx-auth>
 * Released under GNU General Public License v3.0 only <https://github.com/Badisi/auth-js/blob/main/LICENSE>
 * SPDX-License-Identifier: GPL-3.0-only
 * Copyright (C) 2018 Badisi
 */

import { AuthLogger } from '@badisi/auth-js';
AuthLogger.init('@badisi/ngx-auth');

export { authGuard } from './auth.guard';
export { AuthModule } from './auth.module';
export { provideAuth } from './auth.provider';
export { AuthService } from './auth.service';
export type {
    AccessToken, AuthGuardOptions, AuthGuardValidator, OIDCAuthSettings as AuthSettings, IdToken, InjectToken,
    InjectTokenPattern, LoginArgs, LogoutArgs, MobileWindowParams, RenewArgs, SigninMobileArgs, SignoutMobileArgs,
    UserProfile
} from '@badisi/auth-js/oidc';
export { AuthUtils, DesktopNavigation, initOidc as initAuth, LogLevel, UserSession } from '@badisi/auth-js/oidc';
