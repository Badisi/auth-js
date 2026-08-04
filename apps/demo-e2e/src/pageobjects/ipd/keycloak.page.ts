import { $ } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';

import { Idp } from '../../specs/oidc/utils';
import { IdpPage } from './idp-page';

class KeyCloakPage extends IdpPage {
    public readonly name = Idp.KEYCLOAK;
    public readonly clientId = 'demo';
    public readonly authorityUrl = 'http://localhost:8080/auth/realms/demo';
    // public readonly accountUrl = `http://localhost:8080/auth/realms/demo/account`;

    public get $submitButton(): ChainablePromiseElement {
        return $('input#kc-login');
    }

    // public get logoutButton(): ChainablePromiseElement {
    //     return $('button#landingSignOutButton');
    // }

    // public get spinnerScreen(): ChainablePromiseElement {
    //     return $('#spinner_screen');
    // }

    // public async openUserAccount(): Promise<void> {
    //     await browser.url(this.accountUrl);
    //     await browser.waitUntil(
    //         async () => (!(await this.spinnerScreen.isDisplayed())),
    //         { timeout: 5000, timeoutMsg: 'Expected Keycloak loading screen to hide' }
    //     );
    // }

    // public async logout(): Promise<void> {
    //     if (await this.logoutButton.isDisplayed()) {
    //         await this.logoutButton.click();
    //     }
    // }
}

export default new KeyCloakPage();
