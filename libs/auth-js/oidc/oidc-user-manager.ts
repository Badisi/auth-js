/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import { UserManager, type UserManagerSettings } from 'oidc-client-ts';

import { MobileNavigator } from './mobile/mobile-navigator';
import type { SigninMobileArgs, SignoutMobileArgs } from './models/args.model';
import type { OIDCAuthSettings } from './models/oidc-auth-settings.model';

/**
 * UserManager class that adds helpers and mobile capabilities
 * (ex: signinMobile, signoutMobile, MobileNavigator, MobileWindow)
 * @internal
 */
export class OIDCUserManager extends UserManager {
    #mobileNavigator!: MobileNavigator;

    public constructor(
        public libSettings: OIDCAuthSettings
    ) {
        super({
            authority: libSettings.authorityUrl,
            client_id: libSettings.clientId,
            scope: libSettings.scope,
            loadUserInfo: libSettings.loadUserInfo,
            automaticSilentRenew: libSettings.automaticSilentRenew,
            ...libSettings.internal
        } as UserManagerSettings);

        this.#mobileNavigator = new MobileNavigator();
    }

    /* public async readRequestTypeFromState(url = location.href): Promise<string | null> {
        const parsedUrl = new URL(url, location.origin);
        const params = parsedUrl[this.settings.response_mode === 'fragment' ? 'hash' : 'search'];
        const stateParam = new URLSearchParams(params.slice(1)).get('state');
        if (stateParam) {
            const storedStateString = await this.settings.stateStore.get(stateParam);
            if (storedStateString) {
                const state = JSON.parse(storedStateString) as { request_type: string };
                return state.request_type;
            }
        }
        return null;
    }*/

    public async signoutMobile(args: SignoutMobileArgs = {}): Promise<void> {
        const logger = this._logger.create('signout');

        const {
            mobileWindowToolbarColor,
            mobileWindowPresentationStyle,
            mobileWindowWidth,
            mobileWindowHeight,
            ...requestArgs
        } = args;

        const params = {
            mobileWindowToolbarColor: mobileWindowToolbarColor ?? this.libSettings.internal?.mobileWindowToolbarColor,
            mobileWindowPresentationStyle: mobileWindowPresentationStyle ?? this.libSettings.internal?.mobileWindowPresentationStyle,
            mobileWindowWidth: mobileWindowWidth ?? this.libSettings.internal?.mobileWindowWidth,
            mobileWindowHeight: mobileWindowHeight ?? this.libSettings.internal?.mobileWindowHeight
        };

        const handle = this.#mobileNavigator.prepare(this.settings.post_logout_redirect_uri!, params);

        await this._signout({
            request_type: 'so:m',
            post_logout_redirect_uri: this.settings.post_logout_redirect_uri,
            ...requestArgs
        }, handle);

        logger.info('success');
    }

    public async signinMobile(args: SigninMobileArgs = {}): Promise<void> {
        const logger = this._logger.create('signin');

        const {
            mobileWindowToolbarColor,
            mobileWindowPresentationStyle,
            mobileWindowWidth,
            mobileWindowHeight,
            ...requestArgs
        } = args;

        const params = {
            mobileWindowToolbarColor: mobileWindowToolbarColor ?? this.libSettings.internal?.mobileWindowToolbarColor,
            mobileWindowPresentationStyle: mobileWindowPresentationStyle ?? this.libSettings.internal?.mobileWindowPresentationStyle,
            mobileWindowWidth: mobileWindowWidth ?? this.libSettings.internal?.mobileWindowWidth,
            mobileWindowHeight: mobileWindowHeight ?? this.libSettings.internal?.mobileWindowHeight
        };

        const handle = this.#mobileNavigator.prepare(this.settings.redirect_uri, params);

        const user = await this._signin({
            request_type: 'si:m',
            redirect_uri: this.settings.redirect_uri,
            ...requestArgs
        }, handle);

        if (user.profile.sub) {
            logger.info('success, signed in subject', user.profile.sub);
        } else {
            logger.info('no subject');
        }
    }
}
