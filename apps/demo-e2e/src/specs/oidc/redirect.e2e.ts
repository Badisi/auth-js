import '../../commands/wait-for-navigation';
import '../../commands/spy-network';

import type { OidcMetadata } from 'oidc-client-ts';

import auth0Page from '../../pageobjects/auth0.page';
import demoPage from '../../pageobjects/demo.page';
// import keycloakPage from '../../pageobjects/keycloak.page';

describe('Auth code + PKCE (with redirect)', () => {
    [auth0Page].forEach(idpPage => {
        const openIdConfig: OidcMetadata = {} as OidcMetadata;

        beforeAll(async () => {
            await demoPage.navigate();

            // if (idpPage.name === 'Auth0') {
            //     await demoPage.selectAuth0();
            await demoPage.selectAuth0();
            // } else if (idpPage.name === 'Keycloak') {
            //     await demoPage.selectKeycloak();
            // }

            await demoPage.logout();

            // const spy = await browser.spyResponse<OidcMetadata>('/.well-known/openid-configuration');
            // await browser.refresh();
            // const response = await spy.wait();
            // openIdConfig = response.body;
            // console.log(openIdConfig);
        });

        describe(idpPage.name, () => {
            describe('login', () => {
                xit('should get .well-known configuration', () => {
                    expect(openIdConfig).toBeDefined();
                });

                // xit('should navigate to the IDP with proper parameters', async () => {
                //     const spy = await browser.spyRequest(openIdConfig.authorization_endpoint);
                //     await demoPage.login();
                //     const { url } = await spy.wait();

                //     expect(url).toContain(openIdConfig.authorization_endpoint);
                //     expect(url).toContain(`client_id=${idpPage.clientId}`);
                //     expect(url).toContain(
                //         `redirect_uri=${encodeURIComponent(`${demoPage.url}${idpPage.config.loginRedirectUrl}`)}`
                //     );
                //     expect(url).toContain(`response_type=${idpPage.config.responseType}`);
                //     expect(url).toMatch(
                //         new RegExp(`^.*scope=${idpPage.config.scope.map(item => `(?=.*${item})`).join('')}.*$`)
                //     );
                //     expect(url).toContain('state=');
                //     expect(url).toContain('code_challenge=');
                //     expect(url).toContain(`code_challenge_method=${idpPage.config.codeChallengeMethod}`);
                //     expect(url).toContain(`response_mode=${idpPage.config.responseMode}`);
                // });

                // xit('should ask for log in', async () => {
                //     await expect(idpPage.$usernameInput).toBeDisplayed();
                //     await expect(idpPage.$passwordInput).toBeDisplayed();
                // });

                // xit('should log in and redirect to the application with proper parameters', async () => {
                //     const [url] = await Promise.all([browser.waitForNavigation(), idpPage.authenticate()]);
                //     expect(url).toContain(idpPage.config.loginRedirectUrl);
                //     expect(url).toContain('state=');
                //     expect(url).toContain('code=');
                //     // NOT part of the OIDC core spec requirement but used by some IdPs (notably Keycloak)
                //     if (idpPage.name === 'Keycloak') {
                //         expect(url).toContain('session_state=');
                //     }
                // });

                // it('should clear parameters from url', async () => {
                //     await demoPage.login();
                //     await idpPage.authenticate();

                //     // Wait for the library to rewrite the url
                //     const url = await browser.waitForNavigation();

                //     await expect(url).not.toContain('code=');
                //     await expect(url).not.toContain('state=');
                //     await expect(url).not.toContain('session_state=');
                // });

                // it('should exchange code with tokens', async () => {
                //     await demoPage.login();

                //     const mock = await browser.mock(openIdConfig.token_endpoint);
                //     const [response] = await Promise.all([mock.waitForResponse(), idpPage.authenticate()]);
                //     await expect(response.request().method()).toEqual('POST');
                //     await expect(response.status()).toEqual(200);

                //     const requestBody = await response.request().fetchPostData();
                //     await expect(requestBody).toContain('code=');
                //     await expect(requestBody).toContain(`client_id=${idpPage.clientId}`);
                //     await expect(requestBody).toContain(`grant_type=${idpPage.config.grantType}`);
                //     await expect(requestBody).toContain(
                //         `redirect_uri=${encodeURIComponent(`${demoPage.url}${idpPage.config.loginRedirectUrl}`)}`
                //     );

                //     const responseBody = (await response.json()) as Record<string, unknown>;
                //     await expect(responseBody).toEqual(
                //         jasmine.objectContaining({
                //             id_token: jasmine.any(String),
                //             access_token: jasmine.any(String),
                //             refresh_token: jasmine.any(String),
                //             session_state: jasmine.any(String),
                //             scope: jasmine.stringContaining('openid'),
                //             token_type: 'Bearer',
                //             expires_in: 900,
                //             refresh_expires_in: 1800
                //         })
                //     );
                // });
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

            xdescribe('api requests', () => {
                // it('should keep custom request headers', async () => {
                //     await demoPage.login();
                //     await idpPage.authenticate();
                //     await demoPage.openPlayground();

                //     const url = '/api/with/custom/headers';

                //     const mock = await browser.mock(url);
                //     const [response] = await Promise.all([
                //         mock.waitForResponse(),
                //         demoPage.playground.submitApi(url, 'my-custom-header: custom-value, my-other-custom-header: 12')
                //     ]);
                //     await expect(response.request().headers()).toEqual(
                //         jasmine.objectContaining({
                //             'my-custom-header': 'custom-value',
                //             'my-other-custom-header': '12'
                //         })
                //     );
                // });
            });

            xdescribe('misc', () => {
                // it('should keep application query parameters after logged in', async () => {
                //     await demoPage.navigate('?my-param=A&my-other-param=B');
                //     await demoPage.login();
                //     await idpPage.authenticate();

                //     // Wait for the library to rewrite the url
                //     const url = await browser.waitForNavigation();

                //     await expect(url).toContain(demoPage.url);
                //     await expect(url).toContain('my-param=A');
                //     await expect(url).toContain('my-other-param=B');
                // });
            });
        });
    });
});
