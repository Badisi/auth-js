class DemoPage {
    get url() { return 'http://localhost:4200'; }

    get loginButton() { return $('button#login-button'); }
    get logoutButton() { return $('button#logout-button'); }
    get silentRenewButton() { return $('button#silent-renew-button'); }
    get apiUrlInput() { return $('input#api-url-input'); }
    get apiHeadersInput() { return $('input#api-headers-input'); }
    get apiGetButton() { return $('button#api-get-button'); }

    async open(route = '') {
        await browser.url(`${this.url}${route}`);
    }

    async login() {
        await this.loginButton.click();
        await browser.pause(100);
    }

    async logout() {
        await this.logoutButton.click();
    }

    async silentRenew() {
        await this.silentRenewButton.click();
    }

    async api(url: string, headers = '') {
        await this.apiUrlInput.setValue(url);
        await this.apiHeadersInput.setValue(headers);
        await this.apiGetButton.click();
        await browser.pause(100);
    }
}

export default new DemoPage();
