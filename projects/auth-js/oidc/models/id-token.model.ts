import { IdTokenClaims } from 'oidc-client-ts';

export type IdToken = string | (IdTokenClaims & {
    [customClaimKey: string]: unknown;
});
