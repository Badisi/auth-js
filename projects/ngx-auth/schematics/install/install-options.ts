export class InstallOptions {
    public project?: string;
    public authorityUrl!: string;
    public clientId!: string;
    public loginRequired?: boolean;
    public loadUserSession?: boolean;
    public loadUserInfo?: boolean;
}
