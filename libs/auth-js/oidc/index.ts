/**
 * @license GPL-3.0-only
 * Package `@badisi/auth-js` <https://github.com/Badisi/auth-js/tree/main/libs/auth-js>
 * Released under GNU General Public License v3.0 only <https://github.com/Badisi/auth-js/blob/main/LICENSE>
 * SPDX-License-Identifier: GPL-3.0-only
 * Copyright (C) 2018 Badisi
 */

import { AuthLogger } from '../core';

AuthLogger.init('@badisi/auth-js');

export type {
    AuthGuardOptions,
    AuthGuardValidator,
    AuthSubscriber,
    AuthSubscriberOptions,
    AuthSubscription,
    Optional
} from '../core';
export { AuthManager, AuthSubscriptions, AuthUtils, LogLevel } from '../core';
export { initOidc } from './main';
export type { AccessToken } from './models/access-token.model';
export type { LoginArgs, LogoutArgs, RenewArgs, SigninMobileArgs, SignoutMobileArgs } from './models/args.model';
export { DesktopNavigation } from './models/desktop-navigation.enum';
export type { IdToken } from './models/id-token.model';
export type { InjectToken } from './models/inject-token.model';
export type { InjectTokenPattern } from './models/inject-token-pattern.model';
export type { MobileWindowParams } from './models/mobile-window-params.model';
export type { OIDCAuthSettings } from './models/oidc-auth-settings.model';
export { UserSession } from './models/user-session.model';
export { OIDCAuthManager } from './oidc-auth-manager';
export { OIDCAuthService } from './oidc-auth-service';
export type { UserProfile } from 'oidc-client-ts';
