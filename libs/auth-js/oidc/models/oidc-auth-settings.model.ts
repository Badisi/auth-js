import type { Log, UserManagerSettings } from 'oidc-client-ts';

import type { AuthSettings as CoreAuthSettings } from '../../core';
import type { DesktopNavigation } from './desktop-navigation.enum';
import type { MobileWindowParams } from './mobile-window-params.model';

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
