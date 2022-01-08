/* eslint-disable @typescript-eslint/naming-convention, camelcase */

export class UserSession {
    public expired?: boolean = void 0;
    public expires_in?: number = void 0;
    public expires_at?: number = void 0;

    public static deserialize(data: unknown): UserSession {
        const ref: UserSession = new UserSession();
        const keys = Object.keys(ref);
        // eslint-disable-next-line no-loops/no-loops
        for (const key of keys) {
            ref[key as keyof UserSession] = (data as Record<string, unknown>)[key] as (keyof UserSession & undefined);
        }
        return ref;
    }
}
