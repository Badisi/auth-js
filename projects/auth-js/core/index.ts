/**
 * @license
 * @badisi/auth-js (core build) <https://github.com/Badisi/auth-js/tree/main/projects/auth-js>
 * Released under GNU General Public License v3.0 only <https://github.com/Badisi/auth-js/blob/main/LICENSE>
 * SPDX-License-Identifier: GPL-3.0-only
 * Copyright (C) 2022 Badisi
 */
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export * from './models/auth-settings.model';
export * from './models/auth-subscriber.model';
export * from './models/auth-subscription.model';
export * from './auth-manager';
export * from './main';
