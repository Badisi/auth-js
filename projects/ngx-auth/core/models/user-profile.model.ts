import { OidcAddress, IDTokenClaims, ProfileStandardClaims } from 'oidc-client';

export class UserProfile implements IDTokenClaims, ProfileStandardClaims {
    name?: string = void 0;
    given_name?: string = void 0;
    family_name?: string = void 0;
    middle_name?: string = void 0;
    nickname?: string = void 0;
    preferred_username?: string = void 0;
    profile?: string = void 0;
    picture?: string = void 0;
    website?: string = void 0;
    email?: string = void 0;
    email_verified?: boolean = void 0;
    gender?: string = void 0;
    birthdate?: string = void 0;
    zoneinfo?: string = void 0;
    locale?: string = void 0;
    phone_number?: string = void 0;
    phone_number_verified?: boolean = void 0;
    address?: OidcAddress = void 0;
    updated_at?: number = void 0;

    // ---

    iss: string = void 0;
    sub: string = void 0;
    aud: string = void 0;
    exp: number = void 0;
    iat: number = void 0;
    auth_time?: number = void 0;
    nonce?: number = void 0;
    at_hash?: string = void 0;
    acr?: string = void 0;
    amr?: string[] = void 0;
    azp?: string = void 0;
    sid?: string;
    [claimKey: string]: any;

    // ---

    static deserialize(data: any): UserProfile {
        const ref = new UserProfile();
        for (const key of Object.keys(ref)) {
            ref[key] = data[key];
        }
        return ref;
    }
}
