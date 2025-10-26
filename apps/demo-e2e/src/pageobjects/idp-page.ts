export abstract class IdpPage {
    public config = {
        responseType: 'code',
        responseMode: 'query',
        grantType: 'authorization_code',
        scope: ['openid', 'profile', 'phone', 'email'],
        codeChallengeMethod: 'S256',
        loginRedirectUrl: '/?oidc-callback=login'
    };

    protected username = 'admin';
    protected password = 'Pa55w0rd';

    public abstract readonly name: string;
    public abstract readonly clientId: string;

    // --- ELEMENT(s) ---

    public get $usernameInput(): ChainablePromiseElement {
        return $('input#username');
    }

    public get $passwordInput(): ChainablePromiseElement {
        return $('input#password');
    }

    public abstract get $submitButton(): ChainablePromiseElement;

    // --- API(s) ---

    public async authenticate(username?: string, password?: string): Promise<void> {
        await this.$usernameInput.setValue(username ?? this.username);
        await this.$passwordInput.setValue(password ?? this.password);
        await this.$submitButton.click();
    }

    // public abstract readonly url: string;
    // public abstract openUserAccount(): Promise<void>;
    // public abstract logout(): Promise<void>;
}
