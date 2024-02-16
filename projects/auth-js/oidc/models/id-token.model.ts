import { IdTokenClaims } from 'oidc-client-ts';

export type IdToken = string | (IdTokenClaims & Record<string, unknown>);
