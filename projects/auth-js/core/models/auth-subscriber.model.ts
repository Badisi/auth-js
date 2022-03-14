/**
 * TODO:
 */
export type AuthSubscriber<T extends unknown[]> = (...args: T) => (Promise<void> | void);
