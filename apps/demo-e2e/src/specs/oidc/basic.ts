/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import { expect } from 'expect-webdriverio';
import { styleText } from 'node:util';

import type { Spy, SpyNetwork } from '../../commands/spy-network';
import demoPage from '../../pageobjects/demo/demo.page';
import type { IdpPage } from '../../pageobjects/ipd/idp-page';
import { getRequestHeader, Idp, initTests, type TestContext } from './utils';

export const basicTestsWithMode = (idpPage: IdpPage, mode: 'redirect' | 'popup'): void => {
    describe(styleText('blue', `${idpPage.name} - Basic (with ${mode})`), () => {
        let context!: TestContext;
        let tokenEndpointSpy!: Spy<SpyNetwork<Record<string, unknown>>>;
        let mainWindowHandle = '';
        let popupWindowHandle = '';

        before(async () => {
            context = await initTests({ idpPage, mode, oidcConfig: true, resetSettings: true, logout: true });
            mainWindowHandle = await browser.getWindowHandle();
        });

        describe(styleText('cyan', 'Login'), () => {
            it('should get .well-known configuration', () => {
                expect(context.openIdConfig).toBeDefined();
            });

            it('should navigate to the IDP with proper parameters', async () => {
                const spy = await browser.spyRequest(context.openIdConfig!.authorization_endpoint);
                await demoPage.login();
                const url = (await spy.wait()).url;

                expect(url).toContain(context.openIdConfig!.authorization_endpoint);
                expect(url).toContain(`client_id=${encodeURIComponent(idpPage.clientId)}`);
                if (mode === 'popup') {
                    expect(url).toContain(`redirect_uri=${encodeURIComponent(`${demoPage.url}${demoPage.config.popupRedirectUrl}`)}`);
                } else {
                    expect(url).toContain(`redirect_uri=${encodeURIComponent(`${demoPage.url}${demoPage.config.redirectUrl}`)}`);
                }
                expect(url).toContain(`response_type=${demoPage.config.responseType}`);
                expect(url).toMatch(new RegExp(`^.*scope=${demoPage.config.scope.map(item => `(?=.*${item})`).join('')}.*$`));
                expect(url).toContain('state=');
                expect(url).toContain('code_challenge=');
                expect(url).toContain(`code_challenge_method=${demoPage.config.codeChallengeMethod}`);
                expect(url).toContain(`response_mode=${demoPage.config.responseMode}`);
            });

            if (mode === 'popup') {
                it('should open a popup', async () => {
                    await browser.waitUntil(
                        async () => (await browser.getWindowHandles()).length > 1,
                        { timeout: 30000, timeoutMsg: 'Expected a popup window to be opened' }
                    );

                    const handles = await browser.getWindowHandles();
                    popupWindowHandle = handles.find(handle => handle !== mainWindowHandle) ?? '';
                    expect(popupWindowHandle).not.toBe('');
                });
            }

            it('should ask for log in', async () => {
                if (mode === 'popup') {
                    await browser.switchToWindow(popupWindowHandle);
                }
                await expect(idpPage.$passwordInput).toBeDisplayed();
                // Zitadel pre-fills the login name via the `login_hint` and hides the field
                if (idpPage.name !== Idp.ZITADEL) {
                    await expect(idpPage.$usernameInput).toBeDisplayed();
                }
            });

            if (mode === 'popup') {
                it('should log in and close the popup', async () => {
                    tokenEndpointSpy = await browser.spyNetwork(context.openIdConfig!.token_endpoint);

                    await browser.switchToWindow(popupWindowHandle);
                    await idpPage.authenticate();

                    await browser.waitUntil(
                        async () => (await browser.getWindowHandles()).length === 1,
                        { timeout: 20000, timeoutMsg: 'Expected the popup window to be closed' }
                    );
                    await browser.switchToWindow(mainWindowHandle);
                    const currentHandle = await browser.getWindowHandle();
                    expect(currentHandle).toBe(mainWindowHandle);
                });
            } else {
                it('should log in and redirect to the application with proper parameters', async () => {
                    tokenEndpointSpy = await browser.spyNetwork(context.openIdConfig!.token_endpoint);

                    const [url] = await Promise.all([browser.waitForNavigation(), idpPage.authenticate()]);
                    expect(url).toContain(demoPage.url);
                    expect(url).toContain('oidc-callback=login');
                    expect(url).toContain('state=');
                    expect(url).toContain('code=');
                    // NOT part of the OIDC core spec requirement but used by some IdPs (notably Keycloak)
                    if (idpPage.name === Idp.KEYCLOAK) {
                        expect(url).toContain('session_state=');
                    }
                });
            }

            it('should clear parameters from url', async () => {
                // Wait for the library to rewrite the url
                await browser.waitUntil(
                    async () => {
                        const url = await browser.getUrl();
                        return !url.includes('state=') && !url.includes('code=');
                    },
                    { timeout: 15000, timeoutMsg: 'Expected the url parameters to be cleared' }
                );

                const url = await browser.getUrl();
                expect(url).not.toContain('state=');
                expect(url).not.toContain('code=');
                if (idpPage.name === Idp.KEYCLOAK) {
                    expect(url).not.toContain('session_state=');
                }
            });

            it('should exchange code with tokens', async () => {
                const { request, response } = await tokenEndpointSpy.wait(30000);

                expect(request.method).toEqual('POST');
                expect(response.status).toEqual(200);

                const requestBody = request.postData ?? '';
                expect(requestBody).toContain('code=');
                expect(requestBody).toContain(`client_id=${encodeURIComponent(idpPage.clientId)}`);
                expect(requestBody).toContain(`grant_type=${demoPage.config.grantType}`);
                if (mode === 'popup') {
                    expect(requestBody).toContain(`redirect_uri=${encodeURIComponent(`${demoPage.url}${demoPage.config.popupRedirectUrl}`)}`);
                } else {
                    expect(requestBody).toContain(`redirect_uri=${encodeURIComponent(`${demoPage.url}${demoPage.config.redirectUrl}`)}`);
                }

                const responseBody = response.body;
                expect(responseBody).toEqual(
                    expect.objectContaining({
                        id_token: expect.any(String),
                        access_token: expect.any(String),
                        refresh_token: expect.any(String),
                        // Zitadel only includes the granted scope when it differs from the requested one
                        ...(idpPage.name === Idp.ZITADEL ? {} : { scope: expect.stringContaining('openid') }),
                        token_type: 'Bearer',
                        expires_in: { [Idp.AUTH0]: 120, [Idp.ZITADEL]: 43199, [Idp.KEYCLOAK]: 900 }[idpPage.name]
                    })
                );
                // NOT part of the OIDC core spec requirement but used by some IdPs (notably Keycloak)
                if (idpPage.name === Idp.KEYCLOAK) {
                    expect(responseBody).toEqual(
                        expect.objectContaining({
                            session_state: expect.any(String),
                            refresh_expires_in: 1800
                        })
                    );
                }
            });
        });

        describe(styleText('cyan', 'User session'), () => {
            before(async () => {
                await demoPage.openDebug();
            });

            it('should be authenticated', async () => {
                await expect(demoPage.$statusEl).toHaveElementClass('authenticated');
                await expect(demoPage.debug.$isAuthenticatedEl).toHaveText('true');
            });

            it('should expose access and id tokens', async () => {
                const accessToken = await demoPage.debug.$accessTokenEl.getText();
                const idToken = await demoPage.debug.$idTokenEl.getText();
                const jwtRegex = /^[\w-]+\.[\w-]+\.[\w-]+$/;
                expect(accessToken).toMatch(jwtRegex);
                expect(idToken).toMatch(jwtRegex);
            });

            it('should expose a decodable access token', async () => {
                const decoded = await demoPage.debug.$accessTokenDecodedEl.getText();
                expect(decoded).toContain('iss:');
                expect(decoded).toContain('aud:');
                expect(decoded).toContain('exp:');
            });

            it('should expose the user session', async () => {
                const userSession = await demoPage.debug.$userSessionEl.getText();
                expect(userSession).toContain('expired: false');
                expect(userSession).toContain('token_type: "Bearer"');
                expect(userSession).toContain('openid');
            });

            it('should load the user profile', async () => {
                const userProfile = await demoPage.debug.$userProfileEl.getText();
                expect(userProfile).toContain('sub:');
                expect(userProfile).toContain('email');
            });
        });

        describe(styleText('cyan', 'Access token'), () => {
            before(async () => {
                await demoPage.openPlayground();
            });

            it('should be injected in matching requests', async () => {
                const url = `${demoPage.url}/api/users`;
                const spy = await browser.spyRequest(url);
                const [request] = await Promise.all([spy.wait(), demoPage.playground.submitApi(url)]);

                const authorization = getRequestHeader(request, 'authorization');
                expect(authorization).toBeDefined();
                expect(authorization).toContain('Bearer ');
            });

            it('should not be injected in non matching requests', async () => {
                const url = `${demoPage.url}/users`;
                const spy = await browser.spyRequest(url);
                const [request] = await Promise.all([spy.wait(), demoPage.playground.submitApi(url)]);

                expect(getRequestHeader(request, 'authorization')).toBeUndefined();
            });
        });

        describe(styleText('cyan', 'API requests'), () => {
            it('should keep custom request headers', async () => {
                await demoPage.openPlayground();

                const url = `${demoPage.url}/api/with/custom/headers`;
                const spy = await browser.spyRequest(url);
                const [request] = await Promise.all([
                    spy.wait(),
                    demoPage.playground.submitApi(url, 'my-custom-header: custom-value, my-other-custom-header: 12')
                ]);

                expect(getRequestHeader(request, 'my-custom-header')).toBe('custom-value');
                expect(getRequestHeader(request, 'my-other-custom-header')).toBe('12');
                expect(getRequestHeader(request, 'authorization')).toContain('Bearer ');
            });
        });

        describe(styleText('cyan', 'Guards'), () => {
            before(async () => {
                await demoPage.openPlayground();
            });

            it('should allow public access', async () => {
                await demoPage.playground.goTo('public');
                await browser.waitUntil(async () => (await browser.getUrl()).includes('/public'));
                await expect(demoPage.playground.$guardContentEl).toHaveText('PUBLIC CONTENT');
            });

            it('should require authentication for private access', async () => {
                await demoPage.playground.goTo('private');
                await browser.waitUntil(async () => (await browser.getUrl()).includes('/private'));
                await expect(demoPage.playground.$guardContentEl).toHaveText('PRIVATE CONTENT');
            });

            it('should check roles for protected access', async () => {
                await demoPage.playground.goTo('protected');
                await browser.waitUntil(async () => {
                    const url = await browser.getUrl();
                    return url.includes('/protected') || url.includes('/forbidden');
                });

                const url = await browser.getUrl();
                if (url.includes('/protected')) {
                    await expect(demoPage.playground.$guardContentEl).toHaveText('PROTECTED CONTENT');
                } else {
                    await expect(demoPage.playground.$guardContentEl).toHaveText('ACCESS FORBIDDEN');
                }
            });

            it('should go back home', async () => {
                await demoPage.playground.goTo('home');
                await browser.waitUntil(async () => (await browser.getUrl()) === `${demoPage.url}/`);
            });
        });

        describe(styleText('cyan', 'Silent renew'), () => {
            it('should silently renew the user session', async () => {
                const spy = await browser.spyNetwork<Record<string, unknown>>(context.openIdConfig!.token_endpoint);
                const [{ request, response }] = await Promise.all([
                    spy.wait(20000),
                    demoPage.silentRenew()
                ]);

                expect(request.method).toEqual('POST');
                expect(response.status).toEqual(200);

                const responseBody = response.body;
                expect(responseBody['access_token']).toEqual(expect.any(String));
                expect(responseBody['id_token']).toEqual(expect.any(String));
            });
        });

        describe(styleText('cyan', 'Logout'), () => {
            it('should log out and redirect back to the application', async () => {
                await demoPage.logout();
                await browser.waitUntil(
                    async () => (await browser.getUrl()) === `${demoPage.url}/`,
                    { timeout: 30000, timeoutMsg: 'Expected to be redirected back to the application after logout' }
                );

                await demoPage.openDebug();
                await browser.waitUntil(
                    async () => (await demoPage.$statusEl.getAttribute('class'))?.includes('not-authenticated') === true,
                    { timeout: 15000, timeoutMsg: 'Expected the application to be marked as not authenticated' }
                );
                await expect(demoPage.debug.$isAuthenticatedEl).toHaveText('false');
                await expect(demoPage.debug.$accessTokenEl).not.toBeDisplayed();
            });
        });
    });
};
