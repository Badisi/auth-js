import type { AuthSubscriber } from './models/auth-subscriber.model';
import type { AuthSubscriberOptions } from './models/auth-subscriber-options.model';
import type { AuthSubscription } from './models/auth-subscription.model';

/**
 * @internal
 */
interface InternalAuthSubscription<T> {
    subscriber: AuthSubscriber<T>;
    options?: AuthSubscriberOptions;
}

/**
 * TODO:
 */
export class AuthSubscriptions<T> {
    #subscriptions: InternalAuthSubscription<T>[] = [];
    #lastNotifiedValue?: T;

    public add(subscriber: AuthSubscriber<T>, options?: AuthSubscriberOptions): AuthSubscription {
        const subscription = { subscriber, options };
        this.#subscriptions.push(subscription);
        if (this.#lastNotifiedValue) {
            void subscriber(this.#lastNotifiedValue);
            if (options?.once) {
                this.unsubscribe(subscriber);
            }
        }
        return {
            unsubscribe: (): void => {
                this.unsubscribe(subscriber);
            }
        };
    }

    public notify(value: T): void {
        this.#lastNotifiedValue = value;
        this.#subscriptions.forEach(subscription => {
            void subscription.subscriber(value);
            if (subscription.options?.once) {
                this.unsubscribe(subscription.subscriber);
            }
        });
    }

    public unsubscribe(subscriber?: AuthSubscriber<T>): void {
        if (subscriber) {
            const index = this.#subscriptions.findIndex(item => item.subscriber === subscriber);
            if (index !== -1) {
                this.#subscriptions.splice(index, 1);
            }
        } else {
            this.#subscriptions = [];
        }
    }
}
