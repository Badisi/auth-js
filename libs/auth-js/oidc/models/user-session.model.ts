/* eslint-disable @typescript-eslint/naming-convention */

export interface UserSession {
    expired?: boolean;
    expires_in?: number;
    expires_at?: number;
    token_type: string;
    scope?: string;
    scopes: string[];
    session_state: string | null;
}
