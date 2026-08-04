import type { OidcMetadata } from 'oidc-client-ts';

import type { SpyRequest } from '../../commands/spy-network';
import demoPage from '../../pageobjects/demo/demo.page';
import type { IdpPage } from '../../pageobjects/ipd/idp-page';

export enum Idp {
    AUTH0 = 'Auth0',
    ZITADEL = 'Zitadel',
    KEYCLOAK = 'Keycloak'
}

export enum OidcSuite {
    BASIC_POPUP,
    BASIC_REDIRECT,
    MISC_POPUP,
    MISC_REDIRECT,
    MISC_WELL_KNOWN,
    MISC
};

// ---

export const getRequestHeaders = (request: SpyRequest): Record<string, string> =>
    Object.fromEntries(
        request.headers.map(({ name, value }) => [
            name,
            (value.type === 'base64') ? Buffer.from(value.value, 'base64').toString() : value.value
        ])
    );

export const getRequestHeader = (request: SpyRequest, name: string): string | undefined => {
    const headers = getRequestHeaders(request);
    const headerName = Object.keys(headers).find(key => key.toLowerCase() === name.toLowerCase());
    return (headerName) ? headers[headerName] : undefined;
};

// ---

export interface DescribeContext {
    idpPage: IdpPage;
    mode?: 'redirect' | 'popup';
    oidcConfig?: boolean;
    resetSettings?: boolean;
    logout?: boolean;
}

export interface TestContext {
    openIdConfig?: OidcMetadata;
}

export const initTests = async (context: DescribeContext): Promise<TestContext> => {
    const { oidcConfig = false, resetSettings = false, logout = false } = context;
    const testContext: TestContext = {};

    if (!(await browser.getUrl()).includes(demoPage.url)) {
        await demoPage.navigate();
    }

    if (resetSettings) {
        await demoPage.clearSettings();
        await demoPage.navigate();
    }

    await demoPage.waitForAppReady();

    // Make sure the expected IdP settings are selected BEFORE patching the library settings,
    // since `updateLibrarySettings` only patches the currently selected entry.
    if ((await demoPage.$settingSelect.getValue()) !== context.idpPage.name.toString()) {
        await demoPage.selectSettings(context.idpPage.name);
    }

    if (context.mode === 'popup') {
        await demoPage.updateLibrarySettings({ desktopNavigationType: 'POPUP' });
        await demoPage.navigate();
        await demoPage.waitForAppReady();
    }

    if (logout) {
        await demoPage.logout();
        await browser.deleteAllCookies();
        if (context.mode === 'popup') {
            await browser.waitUntil(async () => (await browser.getWindowHandles()).length === 1);
        }
    }

    if (oidcConfig) {
        // Fetch the discovery document directly instead of relying on the app's
        // network traffic, which is subject to IdP latency.
        const response = await fetch(`${context.idpPage.authorityUrl}/.well-known/openid-configuration`);
        if (!response.ok) {
            throw new Error(`Failed to fetch the OIDC discovery document: HTTP ${response.status}`);
        }
        testContext.openIdConfig = await response.json() as OidcMetadata;
        await browser.refresh();
    }

    await demoPage.waitForAppReady();

    return testContext;
};
