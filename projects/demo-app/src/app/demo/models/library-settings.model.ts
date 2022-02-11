import { AuthSettings, Log, Navigation } from '@badisi/ngx-auth';

export interface LibrarySettings extends AuthSettings {
    authorityUrl: string;
    clientId: string;
    schemeUri: string;
    scope: string;
    internal?: {
        extraQueryParams: {
            audience: string;
        };
    };
    loginRequired: boolean;
    loadSession: boolean;
    loadUserInfo: boolean;
    automaticLoginOn401: boolean;
    automaticInjectToken: boolean;
    automaticSilentRenew: boolean;
    authGuardRedirectUrl: string;
    navigationType: Navigation;
    logLevel: Log;
}
