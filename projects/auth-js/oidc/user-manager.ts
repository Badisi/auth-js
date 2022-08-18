/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import {
    ExtraSigninRequestArgs, ExtraSignoutRequestArgs, UserManager as OidcClientUserManager, UserManagerSettings
} from 'oidc-client-ts';

import { MobileNavigator } from './mobile/mobile-navigator';
import { MobileWindowOptions } from './models/mobile-window-options.model';

export type SigninMobileArgs = MobileWindowOptions & ExtraSigninRequestArgs;

export type SignoutMobileArgs = MobileWindowOptions & ExtraSignoutRequestArgs;

/**
 * Extended UserManager class that simply adds mobile capabilities
 * (ex: signinMobile, signoutMobile, MobileNavigator, MobileWindow)
 */
export class UserManager extends OidcClientUserManager {
    private _mobileNavigator!: MobileNavigator;

    constructor(settings: UserManagerSettings) {
        super(settings);

        this._mobileNavigator = new MobileNavigator(this.settings);
    }

    public async signoutMobile(args: SignoutMobileArgs = {}): Promise<void> {
        const logger = this._logger.create('signout');
        const { name, ...requestArgs } = args;
        const handle = this._mobileNavigator.prepare({ name });

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
        const handle = this._mobileNavigator.prepare({ name });

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
