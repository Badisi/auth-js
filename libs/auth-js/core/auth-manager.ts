import type { AuthGuardOptions } from './models/auth-guard-options.model';
import type { AuthSettings } from './models/auth-settings.model';

export abstract class AuthManager<T extends AuthSettings> {
    public abstract init(settings: T): Promise<unknown>;
    public abstract login(...args: unknown[]): Promise<unknown>;
    public abstract logout(...args: unknown[]): Promise<unknown>;
    public abstract getSettings(): T | undefined;
    public abstract isAuthenticated(): Promise<boolean | undefined>;
    public abstract runGuard(toUrl: string, options?: AuthGuardOptions): Promise<string | boolean>;
}
