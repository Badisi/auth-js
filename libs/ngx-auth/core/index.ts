/**
 * @license GPL-3.0-only
 * Package @badisi/ngx-auth (core build) <https://github.com/Badisi/auth-js/tree/main/projects/ngx-auth>
 * Released under GNU General Public License v3.0 only <https://github.com/Badisi/auth-js/blob/main/LICENSE>
 * SPDX-License-Identifier: GPL-3.0-only
 * Copyright (C) 2018 Badisi
 */

export { initAuth } from './auth';
export type { AuthGuardData, AuthGuardValidator } from './auth.guard';
export { AuthGuard } from './auth.guard';
export { AuthInterceptor } from './auth.interceptor';
export { AuthModule } from './auth.module';
export { provideAuth } from './auth.provider';
export { AuthService } from './auth.service';
export type { AuthSettings, InjectToken, InjectTokenPattern } from './auth-settings.model';
export type {
    AccessToken, IdToken, LoginArgs, LogoutArgs, MobileWindowParams, RenewArgs, SigninMobileArgs, SignoutMobileArgs,
    UserProfile
} from '@badisi/auth-js/oidc';
export { AuthUtils, DesktopNavigation, Log, UserSession } from '@badisi/auth-js/oidc';
