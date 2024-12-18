/**
 * @license GPL-3.0-only
 * Package @badisi/auth-js (core build) <https://github.com/Badisi/auth-js/tree/main/projects/auth-js>
 * Released under GNU General Public License v3.0 only <https://github.com/Badisi/auth-js/blob/main/LICENSE>
 * SPDX-License-Identifier: GPL-3.0-only
 * Copyright (C) 2018 Badisi
 */

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export { AuthLogger, LogLevel } from './auth-logger';
export { AuthManager } from './auth-manager';
export { AuthSubscriptions } from './auth-subscriptions';
export { AuthUtils } from './auth-utils';
export { createAuthManager } from './main';
export type { AuthGuardOptions } from './models/auth-guard-options.model';
export type { AuthGuardValidator } from './models/auth-guard-validator.model';
export type { AuthSettings } from './models/auth-settings.model';
export type { AuthSubscriber } from './models/auth-subscriber.model';
export type { AuthSubscriberOptions } from './models/auth-subscriber-options.model';
export type { AuthSubscription } from './models/auth-subscription.model';
