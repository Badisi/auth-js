export class InstallOptions {
    public project!: string;
    public authorityUrl!: string;
    public clientId!: string;
    public loginRequired?: boolean;
    public retrieveUserSession?: boolean;
    public loadUserInfo?: boolean;
}
