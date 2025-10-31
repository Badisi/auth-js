import type { UserManagerSettings } from 'oidc-client-ts';

import type { AuthSettings as CoreAuthSettings, LogLevel } from '../../core';
import type { DesktopNavigation } from './desktop-navigation.enum';
import type { InjectToken } from './inject-token.model';
import type { MobileWindowParams } from './mobile-window-params.model';

// TODO: check if `monitorSession` and `revokeAccessTokenOnSignout` might be useful too ?
type UsefulSettings = 'scope' | 'loadUserInfo' | 'automaticSilentRenew';

export interface OIDCAuthSettings extends CoreAuthSettings, Partial<Pick<UserManagerSettings, UsefulSettings>> {
    authorityUrl: string;
    clientId: string;
    mobileScheme?: string;
    retrieveUserSession?: boolean;
    automaticLoginOn401?: boolean;
    automaticInjectToken?: InjectToken;
    desktopNavigationType?: DesktopNavigation;
    logLevel?: LogLevel;
    internal?: Partial<Omit<UserManagerSettings, UsefulSettings | 'authority' | 'client_id'>> & MobileWindowParams;
}
