class DemoPage {
    get url() { return 'http://localhost:4200'; }

    get loginButton() { return $('button#login-button'); }
    get logoutButton() { return $('button#logout-button'); }
    get silentRefreshButton() { return $('button#silent-refresh-button'); }
    get getApiUrlInput() { return $('input#get-api-url-input'); }
    get getApiHeadersInput() { return $('input#get-api-headers-input'); }
    get getApiButton() { return $('button#get-api-button'); }

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

    async silentRefresh() {
        await this.silentRefreshButton.click();
    }

    async getApi(url: string, headers = '') {
        await this.getApiUrlInput.setValue(url);
        await this.getApiHeadersInput.setValue(headers);
        await this.getApiButton.click();
        await browser.pause(100);
    }
}

export default new DemoPage();
