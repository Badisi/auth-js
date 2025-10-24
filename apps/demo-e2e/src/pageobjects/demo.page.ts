/* eslint-disable @typescript-eslint/naming-convention */
import { $, browser } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';

const CONFIG = {
    AUTH0: 0,
    KEYCLOAK: 1,
    ZITADEL: 2
};

class DemoPage {
    public readonly url = 'http://localhost:4200';

    public appMain(selector: string): ChainablePromiseElement {
        return $('//app-demo').shadow$('demo-app-main').shadow$(selector);
    }

    public appHeader(selector: string): ChainablePromiseElement {
        return this.appMain('demo-app-header').shadow$(selector);
    }

    public appPlayground(selector: string): ChainablePromiseElement {
        return $('//app-demo').shadow$('demo-app-playground').shadow$(selector);
    }

    public appSettings(selector: string): ChainablePromiseElement {
        return $('//app-demo').shadow$('demo-app-settings').shadow$(selector);
    }

    public get loginButton(): ChainablePromiseElement {
        return this.appHeader('button#login-button');
    }

    public get logoutButton(): ChainablePromiseElement {
        return this.appHeader('button#logout-button');
    }

    public get silentRenewButton(): ChainablePromiseElement {
        return this.appHeader('button#silent-renew-button');
    }

    public get playgroundButton(): ChainablePromiseElement {
        return this.appMain('#tabs a#playground-button');
    }

    public get debugButton(): ChainablePromiseElement {
        return this.appMain('#tabs a#debug-button');
    }

    public get settingsButton(): ChainablePromiseElement {
        return this.appMain('#tabs a#settings-button');
    }

    public get apiUrlInput(): ChainablePromiseElement {
        return this.appPlayground('input#api-url-input');
    }

    public get apiHeadersInput(): ChainablePromiseElement {
        return this.appPlayground('input#api-headers-input');
    }

    public get apiGetButton(): ChainablePromiseElement {
        return this.appPlayground('button#api-get-button');
    }

    public get settingsSelect(): ChainablePromiseElement {
        return this.appSettings('select#settings-select');
    }

    public async navigate(route = ''): Promise<void> {
        await browser.url(`${this.url}${route}`);
    }

    public async login(): Promise<void> {
        await this.loginButton.click();
    }

    public async logout(): Promise<void> {
        await this.logoutButton.click();
    }

    public async silentRenew(): Promise<void> {
        await this.silentRenewButton.click();
    }

    public async openPlayground(): Promise<void> {
        await this.playgroundButton.click();
    }

    public async openDebug(): Promise<void> {
        await this.debugButton.click();
    }

    public async openSettings(): Promise<void> {
        await this.settingsButton.click();
    }

    public async selectAuth0(): Promise<void> {
        await this.settingsSelect.selectByIndex(CONFIG.AUTH0);
    }

    public async selectKeycloak(): Promise<void> {
        await this.settingsSelect.selectByIndex(CONFIG.KEYCLOAK);
    }

    public async selectZitadel(): Promise<void> {
        await this.settingsSelect.selectByIndex(CONFIG.ZITADEL);
    }

    public async api(url: string, headers = ''): Promise<void> {
        await this.apiUrlInput.setValue(url);
        await this.apiHeadersInput.setValue(headers);
        await this.apiGetButton.click();
    }
}

export default new DemoPage();
