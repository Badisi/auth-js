/* eslint-disable @typescript-eslint/naming-convention */
import { $, browser } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';

const SETTING = {
    AUTH0: 0,
    KEYCLOAK: 1,
    ZITADEL: 2
};

class DemoPageSettings {

    // --- ELEMENT(s) ---

    public getElement(selector: string): ChainablePromiseElement {
        return $('app-demo').shadow$('demo-app-settings').shadow$(selector);
    }

    public get $settingSelect(): ChainablePromiseElement {
        return this.getElement('select#settings-select');
    }

    // --- API(s) ---

    public async selectAuth0(): Promise<void> {
        await this.$settingSelect.selectByIndex(SETTING.AUTH0);
    }

    public async selectKeycloak(): Promise<void> {
        await this.$settingSelect.selectByIndex(SETTING.KEYCLOAK);
    }

    public async selectZitadel(): Promise<void> {
        await this.$settingSelect.selectByIndex(SETTING.ZITADEL);
    }
}

class DemoPagePlayground {

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

    // --- API(s) ---

    public async submitApi(url: string, headers = ''): Promise<void> {
        await this.$apiUrlInput.setValue(url);
        await this.$apiHeadersInput.setValue(headers);
        await this.$apiGetButton.click();
    }
};

class DemoPage {
    public readonly url = 'http://localhost:4200';
    public readonly playground = new DemoPagePlayground();
    public readonly settings = new DemoPageSettings();

    // --- MAIN ELEMENT(s) ---

    public getMainElement(selector: string): ChainablePromiseElement {
        return $('app-demo').shadow$('demo-app-main').shadow$(selector);
    }

    public get $playgroundButton(): ChainablePromiseElement {
        return this.getMainElement('#tabs a#playground-button');
    }

    public get $debugButton(): ChainablePromiseElement {
        return this.getMainElement('#tabs a#debug-button');
    }

    public get $settingsButton(): ChainablePromiseElement {
        return this.getMainElement('#tabs a#settings-button');
    }

    // --- HEADER ELEMENT(s) ---

    public getHeaderElement(selector: string): ChainablePromiseElement {
        return this.getMainElement('demo-app-header').shadow$(selector);
    }

    public get $implementationSelect(): ChainablePromiseElement {
        return this.getHeaderElement('select#implementation-select');
    }

    public get $settingSelect(): ChainablePromiseElement {
        return this.getHeaderElement('select#setting-select');
    }

    public get $loginButton(): ChainablePromiseElement {
        return this.getHeaderElement('button#login-button');
    }

    public get $logoutButton(): ChainablePromiseElement {
        return this.getHeaderElement('button#logout-button');
    }

    public get $silentRenewButton(): ChainablePromiseElement {
        return this.getHeaderElement('button#silent-renew-button');
    }

    // --- API(s) ---

    public async navigate(route = ''): Promise<void> {
        await browser.url(`${this.url}${route}`);
    }

    public async login(): Promise<void> {
        await this.$loginButton.click();
    }

    public async selectAuth0(): Promise<void> {
        await this.$settingSelect.selectByIndex(SETTING.AUTH0);
    }

    public async selectKeycloak(): Promise<void> {
        await this.$settingSelect.selectByIndex(SETTING.KEYCLOAK);
    }

    public async selectZitadel(): Promise<void> {
        await this.$settingSelect.selectByIndex(SETTING.ZITADEL);
    }

    public async logout(): Promise<void> {
        await this.$logoutButton.click();
    }

    public async silentRenew(): Promise<void> {
        await this.$silentRenewButton.click();
    }

    public async openPlayground(): Promise<void> {
        await this.$playgroundButton.click();
    }

    public async openDebug(): Promise<void> {
        await this.$debugButton.click();
    }

    public async openSettings(): Promise<void> {
        await this.$settingsButton.click();
    }
}

export default new DemoPage();
