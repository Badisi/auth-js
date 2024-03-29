import { AuthSubscriber } from './models/auth-subscriber.model';
import { AuthSubscription } from './models/auth-subscription.model';

export class AuthSubscriptions<T extends unknown[]> {
    private subscribers: AuthSubscriber<T>[] = [];
    private lastNotifiedValue?: T;

    public add(subscriber: AuthSubscriber<T>): AuthSubscription {
        this.subscribers.push(subscriber);
        if (this.lastNotifiedValue) {
            void subscriber(...this.lastNotifiedValue);
        }
        return {
            unsubscribe: () => this.unsubscribe(subscriber)
        };
    }

    public notify(...args: T): void {
        this.lastNotifiedValue = args;
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
