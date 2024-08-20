import { Log, UserManagerSettings } from 'oidc-client-ts';

import { AuthSettings as CoreAuthSettings } from '../../core';
import { DesktopNavigation } from './desktop-navigation.enum';
import { MobileWindowParams } from './mobile-window-params.model';

// TODO: check if `monitorSession` and `revokeAccessTokenOnSignout` might be useful too ?
type UsefulSettings = 'scope' | 'loadUserInfo' | 'automaticSilentRenew';

export interface OIDCAuthSettings extends CoreAuthSettings, Partial<Pick<UserManagerSettings, UsefulSettings>> {
    authorityUrl: string;
    clientId: string;
    mobileScheme?: string;
    retrieveUserSession?: boolean;
    desktopNavigationType?: DesktopNavigation;
    logLevel?: Log;
    internal?: Partial<Omit<UserManagerSettings, UsefulSettings | 'authority' | 'client_id'>> & MobileWindowParams;
}
