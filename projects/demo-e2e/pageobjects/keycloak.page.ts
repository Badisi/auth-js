class KeyCloakPage {
    get url() { return 'http://localhost:8080'; }
    get accountUrl() { return `${this.url}/auth/realms/demo/account`; }

    get usernameInput() { return $('input#username'); }
    get passwordInput() { return $('input#password'); }
    get submitButton() { return $('input#kc-login'); }
    get logoutButton() { return $('button#landingSignOutButton'); }
    get spinnerScreen() { return $('#spinner_screen'); }

    /**
     * Makes sure that the current user is logged off.
     */
    async init() {
        await this.openUserAccount();
        await this.logout();
    }

    /**
     * Navigates to the current user account page.
     */
    async openUserAccount() {
        await browser.url(this.accountUrl);
        await browser.waitUntil(
            async () => ((await this.spinnerScreen.isDisplayed()) === false),
            { timeout: 2000, timeoutMsg: 'Expected loading screen to hide' }
        );
    }

    async login(username = 'admin', password = 'Pa55w0rd') {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.submitButton.click();
    }

    async logout() {
        if (await this.logoutButton.isDisplayed()) {
            await this.logoutButton.click();
        }
    }
}

export default new KeyCloakPage();
