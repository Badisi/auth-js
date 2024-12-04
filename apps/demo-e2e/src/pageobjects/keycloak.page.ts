import { $, browser } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';

import { IdpPage } from './idp-page.model';

class KeyCloakPage extends IdpPage {
    public readonly name = 'Keycloak';
    public readonly url = 'http://localhost:8080';
    public readonly accountUrl = `${this.url}/auth/realms/demo/account`;
    public get usernameInput(): ChainablePromiseElement { return $('input#username'); }
    public get passwordInput(): ChainablePromiseElement { return $('input#password'); }
    public get submitButton(): ChainablePromiseElement { return $('input#kc-login'); }
    public get logoutButton(): ChainablePromiseElement { return $('button#landingSignOutButton'); }
    public get spinnerScreen(): ChainablePromiseElement { return $('#spinner_screen'); }

    public async openUserAccount(): Promise<void> {
        await browser.url(this.accountUrl);
        await browser.waitUntil(
            async () => (!(await this.spinnerScreen.isDisplayed())),
            { timeout: 5000, timeoutMsg: 'Expected Keycloak loading screen to hide' }
        );
    }

    public async login(): Promise<void> {
        await this.usernameInput.setValue(this.username);
        await this.passwordInput.setValue(this.password);
        await this.submitButton.click();
    }

    public async logout(): Promise<void> {
        if (await this.logoutButton.isDisplayed()) {
            await this.logoutButton.click();
        }
    }
}

export default new KeyCloakPage();
