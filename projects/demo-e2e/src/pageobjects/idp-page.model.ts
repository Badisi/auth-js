export abstract class IdpPage {
    protected username = 'admin';
    protected password = 'Pa55w0rd';

    public abstract readonly name: string;
    public abstract readonly url: string;
    public abstract get usernameInput(): ChainablePromiseElement;
    public abstract get passwordInput(): ChainablePromiseElement;

    public abstract openUserAccount(): Promise<void>;
    public abstract login(): Promise<void>;
    public abstract logout(): Promise<void>;
}
