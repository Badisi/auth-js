import { UserManagerSettings } from 'oidc-client';

export interface UserConfig extends UserManagerSettings {
    scheme_uri?: string;
    autoLoginOnInit?: boolean;
}
