/* eslint-disable @typescript-eslint/naming-convention */

import '../../polyfills/puppeteer';

import { browser, expect } from '@wdio/globals';
import type { OidcMetadata } from 'oidc-client-ts';

import demoPage from '../../pageobjects/demo.page';
import keycloakPage from '../../pageobjects/keycloak.page';

const CONFIG = {
    CLIENT_ID: 'demo',
    RESPONSE_TYPE: 'code',
    GRANT_TYPE: 'authorization_code',
    SCOPE: ['openid', 'profile', 'phone', 'email'],
    CODE_CHALLENGE_METHOD: 'S256',
    RESPONSE_MODE: 'query',
    LOGIN_REDIRECT_URI: `${demoPage.url}/?oidc-callback=login`
};

describe('Auth code + PKCE (with redirect)', () => {
    [keycloakPage].forEach(idpPage => {
        describe(idpPage.name, () => {
            let openIdConfig: OidcMetadata;

            beforeAll(async () => {
                await demoPage.navigate();
                await demoPage.openSettings();

                let selectIdpAction;
                switch (idpPage.name) {
                    default:
                        selectIdpAction = (): Promise<void> => demoPage.selectKeycloak();
                }

                const mock = await browser.mock('*/.well-known/openid-configuration');
                const [response] = await Promise.all([
                    mock.waitForResponse(),
                    selectIdpAction()
                ]);
                openIdConfig = await response.json() as OidcMetadata;
            });

            beforeEach(async () => {
                await demoPage.navigate();
                await demoPage.logout();
            });

            describe('login', () => {
                it('should get .well-known configuration', async () => {
                    await expect(openIdConfig).toBeDefined();
                });

                it('should navigate to the IDP with proper parameters', async () => {
                    const [url] = await Promise.all([
                        browser.waitForNavigation(),
                        demoPage.login()
                    ]);
                    await expect(url).toContain(openIdConfig.authorization_endpoint);
                    await expect(url).toContain(`client_id=${CONFIG.CLIENT_ID}`);
                    await expect(url).toContain(`redirect_uri=${encodeURIComponent(CONFIG.LOGIN_REDIRECT_URI)}`);
                    await expect(url).toContain(`response_type=${CONFIG.RESPONSE_TYPE}`);
                    await expect(url).toMatch(new RegExp(`^.*scope=${CONFIG.SCOPE.map(scope => `(?=.*${scope})`).join('')}.*$`));
                    await expect(url).toContain('state=');
                    await expect(url).toContain('code_challenge=');
                    await expect(url).toContain(`code_challenge_method=${CONFIG.CODE_CHALLENGE_METHOD}`);
                    await expect(url).toContain(`response_mode=${CONFIG.RESPONSE_MODE}`);
                });

                it('should ask for log in', async () => {
                    await demoPage.login();

                    await expect(idpPage.usernameInput).toBeDisplayed();
                    await expect(idpPage.passwordInput).toBeDisplayed();
                });

                it('should log in and redirect to the application with proper parameters', async () => {
                    await demoPage.login();
                    await idpPage.authenticate();

                    const url = await browser.getUrl();
                    await expect(url).toContain(CONFIG.LOGIN_REDIRECT_URI);
                    await expect(url).toContain('state=');
                    await expect(url).toContain('session_state=');
                    await expect(url).toContain('code=');
                });

                it('should clear parameters from url', async () => {
                    await demoPage.login();
                    await idpPage.authenticate();

                    // Wait for the library to rewrite the url
                    const url = await browser.waitForNavigation();

                    await expect(url).not.toContain('code=');
                    await expect(url).not.toContain('state=');
                    await expect(url).not.toContain('session_state=');
                });

                it('should exchange code with tokens', async () => {
                    await demoPage.login();

                    const mock = await browser.mock(openIdConfig.token_endpoint);
                    const [response] = await Promise.all([
                        mock.waitForResponse(),
                        idpPage.authenticate()
                    ]);
                    await expect(response.request().method()).toEqual('POST');
                    await expect(response.status()).toEqual(200);

                    const requestBody = response.request().postData();
                    await expect(requestBody).toContain('code=');
                    await expect(requestBody).toContain(`client_id=${CONFIG.CLIENT_ID}`);
                    await expect(requestBody).toContain(`grant_type=${CONFIG.GRANT_TYPE}`);
                    await expect(requestBody).toContain(`redirect_uri=${encodeURIComponent(CONFIG.LOGIN_REDIRECT_URI)}`);

                    const responseBody = await response.json() as Record<string, unknown>;
                    await expect(responseBody).toEqual(jasmine.objectContaining({
                        'id_token': jasmine.any(String),
                        'access_token': jasmine.any(String),
                        'refresh_token': jasmine.any(String),
                        'session_state': jasmine.any(String),
                        'scope': jasmine.stringContaining('openid'),
                        'token_type': 'Bearer',
                        'expires_in': 900,
                        'refresh_expires_in': 1800
                    }));
                });
            });

            //     // describe('logout', () => {
            //     // });

            // describe('access token', () => {
            //         beforeAll(async () => {
            //             // await setupInterceptor();
            //             await idpPage.init();
            //             await demoPage.open();
            //             await demoPage.login();
            //             await idpPage.login();
            //             await browser.pause(1000);
            //         });

            //         [
            //             'http://localhost:4200/api/users',
            //             '/api/cars'
            //         ].forEach(url => {
            //             it(`should be injected in matching requests: ${url}`, async () => {
            //                 // await demoPage.api(url);
            //                 // await expectRequest('GET', url, 404);
            //                 // const apiRequest = (await browser.getRequests()).find(req => (req.url === url));
            //                 // await expect(Object.keys(apiRequest.headers)).toContain('authorization');
            //                 // await expect(apiRequest.headers.authorization).toContain('Bearer ');
            //             });
            //         });

            //         /* it('should not be injected in non matching requests', async () => {
            //             const urls = [
            //                 'http://localhost:4200/other/api/users',
            //                 '/other/api/cars',
            //             ];
            //             for (const url of urls) {
            //                 await demoPage.api(url);
            //                 await expectRequest('GET', url, 404);
            //                 const apiRequest = (await browser.getRequests()).find(req => (req.url === url));
            //                 expect(Object.keys(apiRequest.headers)).withContext(url).not.toContain('authorization');
            //             }
            //         });*/
            // });

            describe('api requests', () => {
                it('should keep custom request headers', async () => {
                    await demoPage.login();
                    await idpPage.authenticate();
                    await demoPage.openPlayground();

                    const url = '/api/with/custom/headers';

                    const mock = await browser.mock(url);
                    const [response] = await Promise.all([
                        mock.waitForResponse(),
                        demoPage.api(url, 'my-custom-header: custom-value; my-other-custom-header: 12')
                    ]);
                    await expect(response.request().headers()).toEqual(jasmine.objectContaining({
                        'my-custom-header': 'custom-value',
                        'my-other-custom-header': '12'
                    }));
                });
            });

            describe('misc', () => {
                it('should keep application query parameters after logged in', async () => {
                    await demoPage.navigate('?my-param=A&my-other-param=B');
                    await demoPage.login();
                    await idpPage.authenticate();

                    // Wait for the library to rewrite the url
                    const url = await browser.waitForNavigation();

                    await expect(url).toContain(demoPage.url);
                    await expect(url).toContain('my-param=A');
                    await expect(url).toContain('my-other-param=B');
                });
            });
        });
    });
});
