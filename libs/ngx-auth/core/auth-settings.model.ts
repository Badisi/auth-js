import type { OIDCAuthSettings } from '@badisi/auth-js/oidc';

export type InjectTokenPattern = (string | RegExp)[] | ((url: string) => boolean);

export type InjectToken = boolean | { include?: InjectTokenPattern; exclude?: InjectTokenPattern; };

export interface AuthSettings extends OIDCAuthSettings {
    automaticLoginOn401?: boolean;
    automaticInjectToken?: InjectToken;
    authGuardRedirectUrl?: string;
}
