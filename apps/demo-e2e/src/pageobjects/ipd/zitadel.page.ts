import { $, browser } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';

import { Idp } from '../../specs/oidc/utils';
import { IdpPage } from './idp-page';

class ZitadelPage extends IdpPage {
    public readonly name = Idp.ZITADEL;
    public readonly clientId = '178200751804317953@demo-app';
    public readonly authorityUrl = 'https://auth-js-0pdipf.zitadel.cloud';

    public override get $usernameInput(): ChainablePromiseElement {
        // On the login page the field carries an id, on the password step (reached
        // directly when the `login_hint` is used) it only keeps its name.
        return $('input[name="loginName"]');
    }

    public override get $passwordInput(): ChainablePromiseElement {
        return $('input#password');
    }

    public get $submitButton(): ChainablePromiseElement {
        return $('button#submit-button');
    }

    public override async authenticate(mode: 'redirect' | 'popup' = 'redirect', username?: string, password?: string): Promise<void> {
        const mainWindowHandle = await browser.getWindowHandle();

        if (mode === 'popup') {
            await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1);
            const popupWindowHandle = (await browser.getWindowHandles()).find(handle => handle !== mainWindowHandle) ?? '';
            await browser.switchToWindow(popupWindowHandle);
        }

        await browser.waitUntil(
            async () => {
                const passwordDisplayed = await this.$passwordInput.isDisplayed().catch(() => false);
                const usernameDisplayed = await this.$usernameInput.isDisplayed().catch(() => false);
                return passwordDisplayed || usernameDisplayed;
            },
            { timeout: 20000, timeoutMsg: 'Expected the Zitadel login page to be shown' }
        );

        // Zitadel asks for the login name first and only then for the password
        // (unless a `login_hint` is provided, in which case the password step is
        // shown directly with the login name field hidden). Handle both cases.
        const passwordDisplayed = await this.$passwordInput.isDisplayed().catch(() => false);
        if (!passwordDisplayed) {
            await this.$usernameInput.setValue(username ?? this.username);
            await this.submit();
            await browser.waitUntil(
                async () => await this.$passwordInput.isDisplayed().catch(() => false),
                { timeout: 20000, timeoutMsg: 'Expected the Zitadel password step to be shown' }
            );
        }

        await this.$passwordInput.setValue(password ?? this.password);
        await this.submit();

        if (mode === 'popup') {
            await browser.switchToWindow(mainWindowHandle);
        }
    }

    private async submit(): Promise<void> {
        // In small popup windows the Zitadel footer can overlap the submit button,
        // causing the click to be intercepted.
        await browser.execute(() => {
            document.querySelector<HTMLButtonElement>('button#submit-button')?.click();
        });
    }
}

export default new ZitadelPage();
