import { Log, UserManagerSettings } from 'oidc-client-ts';

import { AuthSettings as CoreAuthSettings } from '../../core';

export enum Navigation {
    REDIRECT = 'REDIRECT',
    POPUP = 'POPUP'
}

// TODO: check if `monitorSession` and `revokeAccessTokenOnSignout` might be useful too ?
type UsefulSettings = 'scope' | 'loadUserInfo' | 'automaticSilentRenew';

export interface OIDCAuthSettings extends CoreAuthSettings, Pick<UserManagerSettings, UsefulSettings> {
    authorityUrl: string;
    clientId: string;
    schemeUri?: string;
    retrieveUserSession?: boolean;
    navigationType?: Navigation;
    logLevel?: Log;
    internal?: Partial<Omit<UserManagerSettings, UsefulSettings | 'authority' | 'client_id'>>;
}
