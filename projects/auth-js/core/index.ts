/**
 * @license
 * @badisi/auth-js (core build) <https://github.com/Badisi/auth-js/tree/main/projects/auth-js>
 * Released under GNU General Public License v3.0 only <https://github.com/Badisi/auth-js/blob/main/LICENSE>
 * SPDX-License-Identifier: GPL-3.0-only
 * Copyright (C) 2022 Badisi
 */

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type { AuthSettings } from './models/auth-settings.model';
export type { AuthSubscriber } from './models/auth-subscriber.model';
export type { AuthSubscription } from './models/auth-subscription.model';

export * from './auth-subscriptions';
export * from './auth-manager';
export * from './auth-utils';
export * from './main';
