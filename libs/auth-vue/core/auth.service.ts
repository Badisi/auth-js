import {
    type AccessToken, type AuthSubscription, decodeJwt, getBaseUrl, type IdToken,
    type OIDCAuthManager, OIDCAuthService, type UserProfile, type UserSession
} from '@badisi/auth-js/oidc';
import { computed, type ComputedRef, inject, type Ref, ref } from 'vue';
import type { Router } from 'vue-router';

export const useAuthService = (): AuthService => {
    const authService = inject<AuthService>('$authService');
    if (!authService) {
        throw new Error('AuthService is not provided');
    }
    return authService;
};

export class AuthService extends OIDCAuthService {
    #authManagerSubs: AuthSubscription[] = [];
    #router: Router;

    public constructor(manager: OIDCAuthManager, router: Router) {
        super(manager);
        this.#router = router;
        this.#listenForManagerChanges();
    }

    public destroy(): void {
        this.#authManagerSubs.forEach(sub => {
            sub.unsubscribe();
        });
    }

    /* eslint-disable @typescript-eslint/member-ordering */
    public readonly isRenewingRef: Ref<boolean | undefined> = ref();
    public readonly isAuthenticatedRef: Ref<boolean | undefined> = ref();
    public readonly userProfileRef: Ref<UserProfile | undefined> = ref();
    public readonly userSessionRef: Ref<UserSession | undefined> = ref();

    public readonly idTokenRef: Ref<string | undefined> = ref();
    public readonly idTokenDecodedRef: ComputedRef<IdToken | string | undefined> = computed(() =>
        this.idTokenRef.value ? decodeJwt(this.idTokenRef.value) as IdToken | string | undefined : undefined
    );

    public readonly accessTokenRef: Ref<string | undefined> = ref();
    public readonly accessTokenDecodedRef: ComputedRef<AccessToken | string | undefined> = computed(() =>
        this.accessTokenRef.value ? decodeJwt(this.accessTokenRef.value) as AccessToken | string | undefined : undefined
    );
    /* eslint-enable @typescript-eslint/member-ordering */

    // --- HELPER(s) ----

    #listenForManagerChanges(): void {
        this.#authManagerSubs.push(
            this.manager.onIdTokenChanged(value => {
                this.idTokenRef.value = value;
            }),
            this.manager.onAccessTokenChanged(value => {
                this.accessTokenRef.value = value;
            }),
            this.manager.onUserProfileChanged(value => {
                this.userProfileRef.value = value;
            }),
            this.manager.onUserSessionChanged(value => {
                this.userSessionRef.value = value;
            }),
            this.manager.onAuthenticatedChanged(value => {
                this.isAuthenticatedRef.value = value;
            }),
            this.manager.onRenewingChanged(value => {
                this.isRenewingRef.value = value;
            }),
            this.manager.onRedirect(value => {
                /**
                 * Make sure to navigate to a relative path from the base url.
                 * => we need to substract the base url from the received url.
                 * ex: transform 'http://domain/base/private?param' to '/private?param'
                 */
                let relativeUrl = value.href.replace(getBaseUrl(), '');
                if (relativeUrl.startsWith('#')) {
                    relativeUrl = relativeUrl.slice(1); // in case of hash mode, remove the leading '#'
                }
                void this.#router.isReady().then(() => this.#router.push(relativeUrl));
            })
        );
    }
}
