/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { styleText } from 'node:util';

import demoPage from '../../pageobjects/demo/demo.page';
import type { IdpPage } from '../../pageobjects/ipd/idp-page';
import { getRequestHeader, Idp, initTests, type TestContext } from './utils';

export const miscTestsUsingMode = (idpPage: IdpPage, mode: 'redirect' | 'popup'): void => {
    describe(styleText('magenta', `${idpPage.name} - Misc (with ${mode})`), () => {
        beforeEach(async () => {
            await initTests({ idpPage, mode, resetSettings: true, logout: true });
        });

        it('should require the user to log in when loginRequired is enabled', async () => {
            await demoPage.updateLibrarySettings({ loginRequired: true });
            await demoPage.navigate();

            if (mode === 'popup') {
                const mainWindowHandle = await browser.getWindowHandle();
                await browser.waitUntil(
                    async () => (await browser.getWindowHandles()).length > 1,
                    { timeout: 30000, timeoutMsg: 'Expected the login popup to be opened' }
                );
                const popupWindowHandle = (await browser.getWindowHandles()).find(handle => handle !== mainWindowHandle) ?? '';
                expect(popupWindowHandle).toBeDefined();

                await browser.switchToWindow(popupWindowHandle);
                await idpPage.authenticate();
                await browser.switchToWindow(mainWindowHandle);

                // The main window only renders the application once the popup login
                // has completed and the tokens have been exchanged.
                await browser.waitUntil(
                    async () => (await browser.getWindowHandles()).length === 1,
                    { timeout: 30000, timeoutMsg: 'Expected the login popup to be closed' }
                );
                await demoPage.waitForAppReady();
            } else {
                await browser.waitUntil(
                    async () => (await browser.getUrl()).includes(idpPage.authorityUrl),
                    { timeout: 30000, timeoutMsg: 'Expected to be redirected to the IdP login page' }
                );
                await idpPage.authenticate();
            }

            await demoPage.openDebug();
            await expect(demoPage.debug.$isAuthenticatedEl).toHaveText('true');
        });

        if (mode === 'popup') {
            it('should show a retry login screen when the popup is closed without authenticating', async () => {
                await demoPage.updateLibrarySettings({ loginRequired: true });
                await demoPage.navigate();

                const mainWindowHandle = await browser.getWindowHandle();
                await browser.waitUntil(
                    async () => (await browser.getWindowHandles()).length > 1,
                    { timeout: 30000, timeoutMsg: 'Expected the login popup to be opened' }
                );
                const popupWindowHandle = (await browser.getWindowHandles()).find(handle => handle !== mainWindowHandle) ?? '';
                expect(popupWindowHandle).toBeDefined();

                await browser.switchToWindow(popupWindowHandle);
                await browser.waitUntil(
                    async () => (await browser.getUrl()).includes(idpPage.authorityUrl),
                    { timeout: 30000, timeoutMsg: 'Expected the popup to load the IdP login page' }
                );
                await browser.closeWindow();
                await browser.switchToWindow(mainWindowHandle);

                await browser.waitUntil(
                    async () => (await browser.getWindowHandles()).length === 1,
                    { timeout: 30000, timeoutMsg: 'Expected the popup to be closed' }
                );

                // The user never got access to the application: it must show the retry
                // login screen (bootstrap failure) instead of the app content.
                await browser.waitUntil(
                    async () => await demoPage.$retryLoginButton.isDisplayed(),
                    { timeout: 30000, timeoutMsg: 'Expected the retry login screen to be shown' }
                );
                await expect($('app-demo')).not.toBeExisting();
            });
        }

        it('should keep application query parameters after logged in', async () => {
            await demoPage.navigate('?my-param=A&my-other-param=B');
            await demoPage.login();
            await Promise.all([demoPage.waitForAuthenticated(), idpPage.authenticate(mode)]);

            // Wait for the library to rewrite the url
            await browser.waitUntil(
                async () => (await browser.getUrl()).includes('my-param=A'),
                { timeout: 30000, timeoutMsg: 'Expected the url parameters to be kept after login' }
            );

            const url = await browser.getUrl();
            expect(url).toContain(demoPage.url);
            expect(url).toContain('my-param=A');
            expect(url).toContain('my-other-param=B');
        });
    });
};

export const miscTestsUsingWellKnown = (idpPage: IdpPage): void => {
    describe(styleText('magenta', `${idpPage.name} - Misc (using .well-known)`), () => {
        let context: TestContext;

        beforeEach(async () => {
            context = await initTests({ idpPage, oidcConfig: true, resetSettings: true, logout: true });
        });

        it('should not load the user info when loadUserInfo is disabled', async () => {
            await demoPage.updateLibrarySettings({ loadUserInfo: false });

            const userInfoSpy = await browser.spyRequest(context.openIdConfig!.userinfo_endpoint, { methods: ['GET'] });
            await demoPage.login();
            await Promise.all([demoPage.waitForAuthenticated(), idpPage.authenticate()]);
            await expect(userInfoSpy.wait()).rejects.toThrow('No network event was intercepted for');
        });

        it('should load the user info when loadUserInfo is enabled', async () => {
            await demoPage.updateLibrarySettings({ loadUserInfo: true });

            const userInfoSpy = await browser.spyResponse(context.openIdConfig!.userinfo_endpoint, { methods: ['GET'] });
            await demoPage.login();
            await Promise.all([demoPage.waitForAuthenticated(), idpPage.authenticate()]);
            const resp = await userInfoSpy.wait();
            expect(resp.status).toBe(200);
        });
    });
};

export const miscTests = (idpPage: IdpPage): void => {
    describe(styleText('magenta', `${idpPage.name} - Misc`), () => {
        beforeEach(async () => {
            await initTests({ idpPage, resetSettings: true, logout: true });
        });

        it('should not inject the access token when automaticInjectToken is disabled', async () => {
            await demoPage.updateLibrarySettings({ automaticInjectToken: false });
            await demoPage.login();
            await Promise.all([demoPage.waitForAuthenticated(), idpPage.authenticate()]);

            await demoPage.openPlayground();
            const url = `${demoPage.url}/api/users`;
            const spy = await browser.spyRequest(url);
            const [request] = await Promise.all([spy.wait(20000), demoPage.playground.submitApi(url)]);
            expect(getRequestHeader(request, 'authorization')).toBeUndefined();
        });

        it('should inject the access token in fetch requests', async () => {
            await demoPage.updateLibrarySettings({ automaticInjectToken: { headerName: 'Authorization', include: ['/api'] } });
            await demoPage.login();
            await Promise.all([demoPage.waitForAuthenticated(), idpPage.authenticate()]);

            const url = `${demoPage.url}/api/fetch`;
            const spy = await browser.spyRequest(url);
            const [request] = await Promise.all([
                spy.wait(),
                browser.execute((requestUrl: string) => {
                    void fetch(requestUrl, { method: 'GET' });
                }, url)
            ]);
            expect(getRequestHeader(request, 'authorization')).toContain('Bearer ');
        });

        it('should inject the access token in XMLHttpRequest requests', async () => {
            await demoPage.updateLibrarySettings({ automaticInjectToken: { headerName: 'Authorization', include: ['/api'] } });
            await demoPage.login();
            await Promise.all([demoPage.waitForAuthenticated(), idpPage.authenticate()]);

            const url = `${demoPage.url}/api/xhr`;
            const spy = await browser.spyRequest(url);
            const [request] = await Promise.all([
                spy.wait(),
                browser.execute((requestUrl: string) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', requestUrl);
                    xhr.send();
                }, url)
            ]);
            expect(getRequestHeader(request, 'authorization')).toContain('Bearer ');
        });

        it('should not automatically log in on 401 when already authenticated', async () => {
            await demoPage.updateLibrarySettings({ automaticLoginOn401: true });
            await demoPage.login();
            await Promise.all([demoPage.waitForAuthenticated(), idpPage.authenticate()]);

            await demoPage.openPlayground();
            const url = `${demoPage.url}/api/unauthorized`;
            const spy = await browser.mock(url);
            try {
                spy.respond('Unauthorized', { statusCode: 401 });
                await Promise.all([spy.waitForResponse({ timeout: 20000 }), demoPage.playground.submitApi(url)]);
                expect(await browser.getUrl()).toContain(demoPage.url);
            } finally {
                await spy.restore();
            }
        });

        it('should automatically log in on 401 when not authenticated', async () => {
            await demoPage.updateLibrarySettings({ automaticLoginOn401: true, loginRequired: false });
            await demoPage.navigate();
            await demoPage.openPlayground();

            const url = `${demoPage.url}/api/unauthorized`;
            const spy = await browser.mock(url);
            try {
                spy.respond('Unauthorized', { statusCode: 401 });
                await Promise.all([spy.waitForResponse({ timeout: 20000 }), demoPage.playground.submitApi(url)]);
                await browser.waitUntil(
                    async () => (await browser.getUrl()).includes(idpPage.authorityUrl),
                    { timeout: 30000, timeoutMsg: 'Expected a login to be triggered on 401' }
                );
            } finally {
                await spy.restore();
            }
        });

        it('should redirect to the login when accessing a protected route directly while not authenticated', async () => {
            await demoPage.navigate('/private');
            await browser.waitUntil(
                async () => (await browser.getUrl()).includes(idpPage.authorityUrl),
                { timeout: 30000, timeoutMsg: 'Expected to be redirected to the IdP login page' }
            );
        });

        it('should allow access to a public route directly without logging in', async () => {
            await demoPage.navigate('/public');
            await browser.waitUntil(async () => (await browser.getUrl()).includes('/public'));
            await expect(demoPage.playground.$guardContentEl).toHaveText('PUBLIC CONTENT');
        });

        it('should redirect to the home page when accessing a non existing route directly', async () => {
            await demoPage.navigate('/non-existing-route');
            await browser.waitUntil(
                async () => (await browser.getUrl()) === `${demoPage.url}/`,
                { timeout: 10000, timeoutMsg: 'Expected to be redirected to the home page' }
            );
        });

        // TODO: not working on localhost with Auth0 -> requires consent
        if (idpPage.name !== Idp.AUTH0) {
            it('should retrieve the user session on reload when retrieveUserSession is enabled', async () => {
                await demoPage.openDebug();
                await expect(demoPage.debug.$isAuthenticatedEl).toHaveText('false');

                await demoPage.login();
                await idpPage.authenticate();
                await expect(demoPage.debug.$isAuthenticatedEl).toHaveText('true');

                await demoPage.updateLibrarySettings({ retrieveUserSession: true });
                await browser.refresh();

                await expect(demoPage.debug.$isAuthenticatedEl).toHaveText('true');
            });
        }

        it('should not retrieve the user session on reload when retrieveUserSession is disabled', async () => {
            await demoPage.openDebug();
            await expect(demoPage.debug.$isAuthenticatedEl).toHaveText('false');

            await demoPage.login();
            await idpPage.authenticate();
            await expect(demoPage.debug.$isAuthenticatedEl).toHaveText('true');

            await demoPage.updateLibrarySettings({ retrieveUserSession: false });
            await browser.refresh();
        });

        it('should redirect to the authGuardFallbackUrl when access is not allowed', async () => {
            await demoPage.updateLibrarySettings({ authGuardFallbackUrl: '/forbidden' });

            await demoPage.navigate('/private');
            await browser.waitUntil(async () => (await browser.getUrl()).includes('/forbidden'), {
                timeout: 30000,
                timeoutMsg: 'Expected to be redirected to the authGuardFallbackUrl'
            });

            await demoPage.openPlayground();
            await expect(demoPage.playground.$guardContentEl).toHaveText('ACCESS FORBIDDEN');
        });
    });
};
