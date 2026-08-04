import { $, browser } from '@wdio/globals';

import type { Idp } from '../../specs/oidc/utils';

export abstract class IdpPage {
    protected username = 'demo';
    protected password = 'Pa55w0rd!';

    public abstract readonly name: Idp;
    public abstract readonly clientId: string;
    public abstract readonly authorityUrl: string;

    // --- ELEMENT(s) ---

    public get $usernameInput(): ChainablePromiseElement {
        return $('input#username');
    }

    public get $passwordInput(): ChainablePromiseElement {
        return $('input#password');
    }

    public abstract get $submitButton(): ChainablePromiseElement;

    // --- API(s) ---

    public async authenticate(mode: 'redirect' | 'popup' = 'redirect', username?: string, password?: string): Promise<void> {
        const mainWindowHandle = await browser.getWindowHandle();

        if (mode === 'popup') {
            await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1);
            const popupWindowHandle = (await browser.getWindowHandles()).find(handle => handle !== mainWindowHandle) ?? '';
            await browser.switchToWindow(popupWindowHandle);
        }

        await this.$usernameInput.setValue(username ?? this.username);
        await this.$passwordInput.setValue(password ?? this.password);
        await this.$submitButton.click();

        if (mode === 'popup') {
            await browser.switchToWindow(mainWindowHandle);
        }
    }

    // public abstract openUserAccount(): Promise<void>;
    // public abstract logout(): Promise<void>;
}
