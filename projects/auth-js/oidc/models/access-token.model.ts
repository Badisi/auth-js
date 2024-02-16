import { JwtClaims } from 'oidc-client-ts';

export type AccessToken = string | (JwtClaims & Record<string, unknown>);
