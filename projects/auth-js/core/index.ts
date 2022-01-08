export * from './models/auth-manager.model';
export * from './models/auth-settings.model';
export * from './auth-manager';

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
