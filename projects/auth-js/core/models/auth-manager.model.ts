import { AuthSettings } from './auth-settings.model';

export abstract class AuthManager<T extends AuthSettings> {
    public isCapacitor(): boolean {
        const capacitor = window.Capacitor;
        return !!(capacitor?.isNativePlatform());
    }

    public isCordova(): boolean {
        return !!(window.cordova || window.phonegap || window.PhoneGap);
    }

    public isNative(): boolean {
        return this.isCapacitor() || this.isCordova();
    }

    public abstract init(settings: T): Promise<unknown> | unknown;
    public abstract login(...args: unknown[]): Promise<unknown>;
    public abstract logout(...args: unknown[]): Promise<unknown>;
    public abstract getSettings(): T | undefined;
    public abstract isAuthenticated(): Promise<boolean | undefined>;
}
