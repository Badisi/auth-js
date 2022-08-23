/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import {
    ExtraSigninRequestArgs, ExtraSignoutRequestArgs, UserManager as OidcClientUserManager, UserManagerSettings
} from 'oidc-client-ts';

import { MobileNavigator } from './mobile/mobile-navigator';
import { MobileWindowOptions } from './models/mobile-window-options.model';
import { OIDCAuthSettings } from './models/oidc-auth-settings.model';

export type SigninMobileArgs = MobileWindowOptions & ExtraSigninRequestArgs;

export type SignoutMobileArgs = MobileWindowOptions & ExtraSignoutRequestArgs;

/**
 * Extended UserManager class that adds helpers and mobile capabilities
 * (ex: signinMobile, signoutMobile, MobileNavigator, MobileWindow)
 */
export class UserManager extends OidcClientUserManager {
    private _mobileNavigator!: MobileNavigator;

    constructor(
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

        this._mobileNavigator = new MobileNavigator(this.settings);
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
        const { name, ...requestArgs } = args;
        const handle = this._mobileNavigator.prepare({ name }, this.settings.post_logout_redirect_uri as string);

        await this._signout({
            request_type: 'so:m',
            post_logout_redirect_uri: this.settings.post_logout_redirect_uri,
            ...requestArgs
        }, handle);

        logger.info('success');
    }

    public async signinMobile(args: SigninMobileArgs = {}): Promise<void> {
        const logger = this._logger.create('signin');
        const { name, ...requestArgs } = args;
        const handle = this._mobileNavigator.prepare({ name }, this.settings.redirect_uri);

        const user = await this._signin({
            request_type: 'si:m',
            redirect_uri: this.settings.redirect_uri,
            ...requestArgs
        }, handle);

        if (user?.profile?.sub) {
            logger.info('success, signed in subject', user.profile.sub);
        } else {
            logger.info('no subject');
        }
    }
}
