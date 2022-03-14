import { AuthSubscriber } from './models/auth-subscriber.model';
import { AuthSubscription } from './models/auth-subscription.model';

/**
 * @internal
 */
export class AuthSubscriptions<T extends unknown[]> {
    private subscribers: AuthSubscriber<T>[] = [];
    private lastNotified?: T;

    public add(subscriber: AuthSubscriber<T>): AuthSubscription {
        this.subscribers.push(subscriber);
        if (this.lastNotified) {
            void subscriber(...this.lastNotified);
        }
        return {
            unsubscribe: () => this.unsubscribe(subscriber)
        };
    }

    public notify(...args: T): void {
        this.lastNotified = args;
        this.subscribers.forEach(subscriber => void subscriber(...args));
    }

    public unsubscribe(subscriber?: AuthSubscriber<T>): void {
        if (subscriber) {
            const index = this.subscribers.indexOf(subscriber);
            if (index !== -1) {
                this.subscribers.splice(index, 1);
            }
        } else {
            this.subscribers = [];
        }
    }
}
