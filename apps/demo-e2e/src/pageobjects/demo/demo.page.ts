import { $, browser } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';

import { DemoPageDebug } from './demo-debug';
import { DemoPagePlayground } from './demo-playground';

interface DemoAppSettings {
    currentTabIndex: number;
    currentSettingsIndex: number;
    settings: {
        name: string;
        librarySettings: Record<string, unknown>;
        otherSettings: Record<string, unknown>;
    }[];
}

class DemoPage {
    public config = {
        responseType: 'code',
        responseMode: 'query',
        grantType: 'authorization_code',
        scope: ['openid', 'profile', 'phone', 'email'],
        codeChallengeMethod: 'S256',
        redirectUrl: '/?oidc-callback=login',
        popupRedirectUrl: '/oidc/callback/popup_redirect.html',
        silentRedirectUrl: '/oidc/callback/silent_renew.html'
    };

    public readonly url = 'http://localhost:4200';
    public readonly playground = new DemoPagePlayground();
    public readonly debug = new DemoPageDebug();

    // --- MAIN ELEMENT(s) ---

    public $mainEl(selector: string): ChainablePromiseElement {
        return $('app-demo').shadow$('demo-app-main').shadow$(selector);
    }

    public get $playgroundButton(): ChainablePromiseElement {
        return this.$mainEl('#tabs a#playground-button');
    }

    public get $debugButton(): ChainablePromiseElement {
        return this.$mainEl('#tabs a#debug-button');
    }

    // --- HEADER ELEMENT(s) ---

    public $headerEl(selector: string): ChainablePromiseElement {
        return this.$mainEl('demo-app-header').shadow$(selector);
    }

    public get $implementationSelect(): ChainablePromiseElement {
        return this.$headerEl('select#implementation-select');
    }

    public get $settingSelect(): ChainablePromiseElement {
        return this.$headerEl('select#setting-select');
    }

    public get $loginButton(): ChainablePromiseElement {
        return this.$headerEl('button#login-button');
    }

    public get $logoutButton(): ChainablePromiseElement {
        return this.$headerEl('button#logout-button');
    }

    public get $silentRenewButton(): ChainablePromiseElement {
        return this.$headerEl('button#silent-renew-button');
    }

    public get $statusEl(): ChainablePromiseElement {
        return this.$headerEl('.status');
    }

    public get $retryLoginButton(): ChainablePromiseElement {
        return $('#loginButton');
    }

    // --- API(s) ---

    public async selectSettings(name: string): Promise<void> {
        await this.$settingSelect.selectByAttribute('value', name);
        // Selecting a setting triggers a page reload: wait for the reload to complete
        // and for the select to reflect the newly selected settings.
        await browser.waitUntil(async () => {
            try {
                return (await this.$settingSelect.getValue()) === name;
            } catch {
                return false;
            }
        }, { timeout: 30000, timeoutMsg: `Expected the "${name}" setting to be selected after reload` });
    }

    public async navigate(route = ''): Promise<void> {
        await browser.url(`${this.url}${route}`);
    }

    public async login(): Promise<void> {
        await this.$loginButton.click();
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

    public async updateLibrarySettings(patch: Record<string, unknown>): Promise<void> {
        const settingsKey = 'auth-js:playground:settings';

        // The app only writes its settings to sessionStorage once it has rendered
        await this.waitForAppReady();

        await browser.waitUntil(
            async () => await browser.execute(key => (sessionStorage.getItem(key) !== null), settingsKey),
            { timeout: 15000, interval: 250, timeoutMsg: `Item "${settingsKey}" was not found in sessionStorage.` }
        );

        const result = await browser.execute(item => {
            try {
                const rawSettings = sessionStorage.getItem(item.settingsKey);
                if (rawSettings) {
                    const settings = JSON.parse(rawSettings) as DemoAppSettings;
                    const current = settings.settings[settings.currentSettingsIndex];
                    current.librarySettings = { ...current.librarySettings, ...item.patch };
                    sessionStorage.setItem(item.settingsKey, JSON.stringify(settings));
                    // Use localStorage as a copy in case sessionStorage is cleared
                    localStorage.setItem('auth-js:e2e:settings', JSON.stringify(settings));
                    return true;
                }
                return false;
            } catch (browserError) {
                const error = browserError as Error;
                return `Runtime Exception: ${error.message}\nStack: ${error.stack ?? ''}`;
            }
        }, { patch, settingsKey });

        expect(result).toBe(true);
    }

    public async clearSettings(): Promise<void> {
        await browser.execute(() => {
            sessionStorage.clear();
        });
    }

    public async waitForAppReady(): Promise<void> {
        await $('app-demo').waitForExist({ timeout: 30000 });
    }

    public async waitForAuthenticated(): Promise<void> {
        await browser.waitUntil(
            async () => {
                try {
                    return (await this.$statusEl.getAttribute('class'))?.includes('authenticated') === true;
                } catch {
                    // The demo app may not be on the page yet (e.g. while redirected to the IdP),
                    // in which case resolving the status element throws. Keep polling instead.
                    return false;
                }
            },
            { timeout: 30000, timeoutMsg: 'Expected the application to be authenticated' }
        );
    }
}

export default new DemoPage();
