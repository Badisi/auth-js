/**
 * TODO:
 */
export type AuthSubscriber<T> = (value: T) => (Promise<void> | void);
