import { type AuthGuardOptions, type AuthGuardValidator, AuthLogger } from '../core';
import type { OIDCAuthManager } from './oidc-auth-manager';

const logger = new AuthLogger('OIDCAuthGuard');

export class OIDCAuthGuard {
    #manager: OIDCAuthManager;

    public constructor(manager: OIDCAuthManager) {
        this.#manager = manager;
    }

    public async validate(toUrl: string, options?: AuthGuardOptions): Promise<boolean | string> {
        let notAllowedUrl = options?.fallbackUrl ?? this.#manager.getSettings().authGuardFallbackUrl;
        notAllowedUrl = (notAllowedUrl?.trim() !== '') ? notAllowedUrl : undefined;

        const isAuthenticated = await this.#manager.isAuthenticated();
        if (isAuthenticated) {
            const isAllowed = await this.#isAllowed(options?.validator);
            return !isAllowed && notAllowedUrl ? notAllowedUrl : isAllowed;
        } else {
            return notAllowedUrl ?? (await this.#manager.login({ redirectUrl: toUrl }));
        }
    }

    // ---- HELPER(s) ----

    async #isAllowed(validator?: AuthGuardValidator): Promise<boolean | string> {
        if (typeof validator === 'function') {
            const userProfile = await this.#manager.getUserProfile();
            const decodedAccessToken = await this.#manager.getAccessTokenDecoded();
            return await Promise.resolve(validator(userProfile, decodedAccessToken));
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        } else if (validator) {
            logger.error('`authGuardValidator` must be a function');
            return false;
        }
        return true;
    }
}
