import type { AuthSubscriber } from './models/auth-subscriber.model';
import type { AuthSubscriberOptions } from './models/auth-subscriber-options.model';
import type { AuthSubscription } from './models/auth-subscription.model';

/**
 * @internal
 */
interface InternalAuthSubscription<T extends unknown[]> {
    subscriber: AuthSubscriber<T>;
    options?: AuthSubscriberOptions;
}

/**
 * TODO:
 */
export class AuthSubscriptions<T extends unknown[]> {
    #subscriptions: InternalAuthSubscription<T>[] = [];
    #lastNotifiedValue?: T;

    public add(subscriber: AuthSubscriber<T>, options?: AuthSubscriberOptions): AuthSubscription {
        const subscription = { subscriber, options };
        this.#subscriptions.push(subscription);
        if (this.#lastNotifiedValue) {
            void subscriber(...this.#lastNotifiedValue);
            if (options?.once) {
                this.unsubscribe(subscription);
            }
        }
        return {
            unsubscribe: (): void => {
                this.unsubscribe(subscription);
            }
        };
    }

    public notify(...args: T): void {
        this.#lastNotifiedValue = args;
        this.#subscriptions.forEach(subscription => {
            void subscription.subscriber(...args);
            if (subscription.options?.once) {
                this.unsubscribe(subscription);
            }
        });
    }

    public unsubscribe(subscription?: InternalAuthSubscription<T>): void {
        if (subscription) {
            const index = this.#subscriptions.indexOf(subscription);
            if (index !== -1) {
                this.#subscriptions.splice(index, 1);
            }
        } else {
            this.#subscriptions = [];
        }
    }
}
