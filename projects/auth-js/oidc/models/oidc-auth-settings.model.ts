import { Log as OidcClientLog, UserManagerSettings } from 'oidc-client-ts';

import { AuthSettings as CoreAuthSettings } from '../../core';

export enum Log {
    NONE = OidcClientLog.NONE,
    ERROR = OidcClientLog.ERROR,
    WARN = OidcClientLog.WARN,
    INFO = OidcClientLog.INFO,
    DEBUG = OidcClientLog.DEBUG
}

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
    loadSessionOnInit?: boolean;
    navigationType?: Navigation;
    logLevel?: Log;
    // ---
    // TODO: how to call it : internal, extras, overrides ?
    internal?: Omit<UserManagerSettings, UsefulSettings | 'authority' | 'client_id'>;
}
