export class UserSession {
    expired: boolean = void 0;
    expires_in: number = void 0;
    expires_at: number = void 0;

    static deserialize(data: any): UserSession {
        const ref = new UserSession();
        for (const key of Object.keys(ref)) {
            ref[key] = data[key];
        }
        return ref;
    }
}
