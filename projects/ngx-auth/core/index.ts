/**
 * @license
 * @badisi/ngx-auth (core build) <https://github.com/Badisi/auth-js/tree/main/projects/ngx-auth>
 * Released under GNU General Public License v3.0 only <https://github.com/Badisi/auth-js/blob/main/LICENSE>
 * SPDX-License-Identifier: GPL-3.0-only
 * Copyright (C) 2018 Badisi
 */

export { Log, AuthUtils, User, UserSession, DesktopNavigation } from '@badisi/auth-js/oidc';
export type {
    UserProfile, AccessToken, IdToken, MobileWindowParams, LoginArgs, LogoutArgs, RenewArgs, SigninMobileArgs, SignoutMobileArgs
} from '@badisi/auth-js/oidc';

export type { AuthSettings, InjectToken, InjectTokenPattern } from './auth-settings.model';
export type { AuthGuardValidator, AuthGuardData } from './auth.guard';

export { AuthInterceptor } from './auth.interceptor';
export { AuthService } from './auth.service';
export { provideAuth } from './auth.provider';
export { AuthModule } from './auth.module';
export { AuthGuard } from './auth.guard';
export { initAuth } from './auth';
