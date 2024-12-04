/* eslint-disable @typescript-eslint/naming-convention */

import '../../polyfills/puppeteer';

import { browser, expect } from '@wdio/globals';
import type { Page } from 'puppeteer-core';

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
            let currentPage: Page;

            beforeAll(async () => {
                currentPage = await browser.getPage();

                await demoPage.navigate();
                await demoPage.openSettings();
                switch (idpPage.name) {
                    case 'Keycloak':
                        await demoPage.selectKeycloak();
                        break;
                    default:
                        throw new Error(`No select option for idp '${idpPage.name as string}'`);
                }
            });

            beforeEach(async () => {
                await demoPage.navigate();
                await demoPage.logout();
            });

            describe('login', () => {
                it('should get .well-known configuration', async () => {
                    const [response] = await Promise.all([
                        currentPage.waitForResponse(resp => resp.url().includes('/.well-known/openid-configuration')),
                        browser.refresh()
                    ]);
                    await expect(response).toBeDefined();
                });

                it('should navigate to the IDP with proper parameters', async () => {
                    const [response] = await Promise.all([
                        currentPage.waitForNavigation(),
                        demoPage.login()
                    ]);
                    const url = response?.url();
                    await expect(url).toContain(`${idpPage.url}/auth/realms/demo/protocol/openid-connect/auth`);
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
                    await Promise.all([currentPage.waitForNavigation(), demoPage.login()]);
                    await expect(idpPage.usernameInput).toBeDisplayed();
                    await expect(idpPage.passwordInput).toBeDisplayed();
                });

                it('should log in and redirect to the application with proper parameters', async () => {
                    await demoPage.login();
                    const [response] = await Promise.all([
                        currentPage.waitForNavigation(),
                        idpPage.login()
                    ]);
                    const url = response?.url();
                    await expect(url).toContain(CONFIG.LOGIN_REDIRECT_URI);
                    await expect(url).toContain('state=');
                    await expect(url).toContain('session_state=');
                    await expect(url).toContain('code=');
                });

                it('should clear parameters from url', async () => {
                    await demoPage.login();
                    await idpPage.login();
                    await browser.pause(1000);

                    const url = await browser.getUrl();
                    await expect(url).not.toContain('code=');
                    await expect(url).not.toContain('state=');
                    await expect(url).not.toContain('session_state=');
                });

                it('should exchange code with tokens', async () => {
                    await demoPage.login();
                    const [response] = await Promise.all([
                        currentPage.waitForResponse(resp => resp.url().includes('/auth/realms/demo/protocol/openid-connect/token')),
                        idpPage.login()
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
                        'expires_in': 120,
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

            fdescribe('api requests', () => {
                it('should keep custom request headers', async () => {
                    await demoPage.openPlayground();
                    await demoPage.login();
                    await idpPage.login();

                    const url = '/api/with/custom/headers';
                    const [response] = await Promise.all([
                        currentPage.waitForResponse(resp => resp.url().includes(url)),
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
                    await idpPage.login();
                    await browser.pause(1000);

                    const url = await browser.getUrl();
                    await expect(url).toContain(demoPage.url);
                    await expect(url).toContain('my-param=A');
                    await expect(url).toContain('my-other-param=B');
                });
            });
        });
    });
});
