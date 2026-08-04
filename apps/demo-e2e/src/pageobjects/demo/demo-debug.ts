export class DemoPageDebug {
    // --- ELEMENT(s) ---

    public getElement(selector: string): ChainablePromiseElement {
        return $('app-demo').shadow$('demo-app-debug').shadow$(selector);
    }

    public get $isAuthenticatedEl(): ChainablePromiseElement {
        return this.getElement('pre#isAuthenticated');
    }

    public get $userSessionEl(): ChainablePromiseElement {
        return this.getElement('pre#userSession');
    }

    public get $userProfileEl(): ChainablePromiseElement {
        return this.getElement('pre#userProfile');
    }

    public get $accessTokenEl(): ChainablePromiseElement {
        return this.getElement('pre#accessToken');
    }

    public get $accessTokenDecodedEl(): ChainablePromiseElement {
        return this.getElement('pre#accessTokenDecoded');
    }

    public get $idTokenEl(): ChainablePromiseElement {
        return this.getElement('pre#idToken');
    }

    public get $idTokenDecodedEl(): ChainablePromiseElement {
        return this.getElement('pre#idTokenDecoded');
    }
}
