export class DemoPagePlayground {
    // --- ELEMENT(s) ---

    public getElement(selector: string): ChainablePromiseElement {
        return $('app-demo').shadow$('demo-app-playground').shadow$(selector);
    }

    public get $apiUrlInput(): ChainablePromiseElement {
        return this.getElement('input#api-url-input');
    }

    public get $apiHeadersInput(): ChainablePromiseElement {
        return this.getElement('input#api-headers-input');
    }

    public get $apiGetButton(): ChainablePromiseElement {
        return this.getElement('button#api-get-button');
    }

    public get $guardsHomeButton(): ChainablePromiseElement {
        return this.getElement('button#guards-home-button');
    }

    public get $guardsPublicButton(): ChainablePromiseElement {
        return this.getElement('button#guards-public-button');
    }

    public get $guardsPrivateButton(): ChainablePromiseElement {
        return this.getElement('button#guards-private-button');
    }

    public get $guardsProtectedButton(): ChainablePromiseElement {
        return this.getElement('button#guards-protected-button');
    }

    public get $guardContentEl(): ChainablePromiseElement {
        return $('app-demo').shadow$('app-page h2');
    }

    // --- API(s) ---

    public async submitApi(url: string, headers = ''): Promise<void> {
        await this.$apiUrlInput.setValue(url);
        await this.$apiHeadersInput.setValue(headers);
        await this.$apiGetButton.click();
    }

    public async goTo(route: 'home' | 'public' | 'private' | 'protected'): Promise<void> {
        const button = {
            home: this.$guardsHomeButton,
            public: this.$guardsPublicButton,
            private: this.$guardsPrivateButton,
            protected: this.$guardsProtectedButton
        }[route];
        await button.click();
    }
}
