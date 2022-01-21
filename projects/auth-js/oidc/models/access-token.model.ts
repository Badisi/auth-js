import { JwtClaims } from 'oidc-client-ts';

export type AccessToken = string | (JwtClaims & {
    [customClaimKey: string]: unknown;
});
