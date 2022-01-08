import demoPage from '../pageobjects/demo.page';
import keycloakPage from '../pageobjects/keycloak.page';
import { expectRequest, setupInterceptor } from './intercept-service';

const CONFIG = {
    CLIENT_ID: 'demo',
    RESPONSE_TYPE: 'code',
    GRANT_TYPE: 'authorization_code',
    SCOPE: ['openid', 'profile', 'phone', 'email'],
    CODE_CHALLENGE_METHOD: 'S256',
    RESPONSE_MODE: 'query',
    LOGIN_REDIRECT_URI: `${demoPage.url}/oidc/callback/login`
};

describe('Desktop - Auth Code + PKCE', () => {
    /* it('test', async () => {
        const url = 'http://www.google.com';
        const mock = browser.mock(url);
        await expect(mock).toBeRequestedWith({ url: url + '/**' });
        await browser.url(url);
    });*/

    describe('login', () => {
        beforeAll(async () => {
            await setupInterceptor();
            await keycloakPage.init();
            await demoPage.open();
            await demoPage.login();
        });

        it('should navigate to keycloak with proper parameters', async () => {
            const url = await browser.getUrl();
            expect(url).toContain(`${keycloakPage.url}/auth/realms/demo/protocol/openid-connect/auth`);
            expect(url).toContain(`client_id=${CONFIG.CLIENT_ID}`);
            expect(url).toContain(`redirect_uri=${encodeURIComponent(CONFIG.LOGIN_REDIRECT_URI)}`);
            expect(url).toContain(`response_type=${CONFIG.RESPONSE_TYPE}`);
            expect(url).toMatch(new RegExp(`^.*scope=${CONFIG.SCOPE.map(scope => `(?=.*${scope})`).join('')}.*$`));
            expect(url).toContain('state=');
            expect(url).toContain('code_challenge=');
            expect(url).toContain(`code_challenge_method=${CONFIG.CODE_CHALLENGE_METHOD}`);
            expect(url).toContain(`response_mode=${CONFIG.RESPONSE_MODE}`);
        });

        it('should require log in', async () => {
            await expect(keycloakPage.usernameInput).toBeDisplayed();
            await expect(keycloakPage.passwordInput).toBeDisplayed();
        });

        it('should log in and redirect to the application with proper parameters', async () => {
            await keycloakPage.login();

            const url = await browser.getUrl();
            expect(url).toContain(CONFIG.LOGIN_REDIRECT_URI);
            expect(url).toContain('state=');
            expect(url).toContain('session_state=');
            expect(url).toContain('code=');
        });

        it('should clear parameters from url', async () => {
            await browser.pause(1000);

            const url = await browser.getUrl();
            expect(url).not.toContain('state=');
            expect(url).not.toContain('session_state=');
            expect(url).not.toContain('code=');
        });

        it('should get .well-known configuration', async () => {
            await expectRequest('GET', `${keycloakPage.url}/auth/realms/demo/.well-known/openid-configuration`, 200);
        });

        it('should exchange code with tokens', async () => {
            const tokenUrl = `${keycloakPage.url}/auth/realms/demo/protocol/openid-connect/token`;
            const tokenRequest = (await browser.getRequests()).find(req => (req.url === tokenUrl));
            const responseBody = JSON.stringify(tokenRequest.response.body);

            expect(tokenRequest.method).toEqual('POST');
            expect(tokenRequest.body).toContain(`client_id=${CONFIG.CLIENT_ID}`);
            expect(tokenRequest.body).toContain('code=');
            expect(tokenRequest.body).toContain(`redirect_uri=${encodeURIComponent(CONFIG.LOGIN_REDIRECT_URI)}`);
            expect(tokenRequest.body).toContain(`grant_type=${CONFIG.GRANT_TYPE}`);
            expect(tokenRequest.response.statusCode).toEqual(200);
            expect(responseBody).toContain('"id_token":');
            expect(responseBody).toContain('"access_token":');
            expect(responseBody).toContain('"refresh_token":');
            expect(responseBody).toContain('"expires_in":900');
            expect(responseBody).toContain('"refresh_expires_in":1800');
            expect(responseBody).toMatch(new RegExp(`^.*,"scope":"${CONFIG.SCOPE.map(scope => `(?=.*${scope})`).join('')}.*$`));
            expect(responseBody).toContain('"session_state":');
            expect(responseBody).toContain('"token_type":"Bearer"');
        });
    });

    describe('logout', () => {
    });

    describe('access token', () => {
        beforeAll(async () => {
            await setupInterceptor();
            await keycloakPage.init();
            await demoPage.open();
            await demoPage.login();
            await keycloakPage.login();
            await browser.pause(1000);
        });

        it('should be injected in matching requests', async () => {
            const urls = [
                'http://localhost:4200/api/users',
                '/api/cars'
            ];
            for (const url of urls) {
                await demoPage.getApi(url);
                await expectRequest('GET', url, 404);
                const apiRequest = (await browser.getRequests()).find(req => (req.url === url));
                expect(Object.keys(apiRequest.headers)).withContext(url).toContain('authorization');
                expect(apiRequest.headers['authorization']).withContext(url).toContain('Bearer ');
            }
        });

        it('should not be injected in not matching requests', async () => {
            const urls = [
                'http://localhost:4200/other/api/users',
                '/other/api/cars',
                'http://localhost:4200/other-api/users',
                '/other-api/cars'
            ];
            for (const url of urls) {
                await demoPage.getApi(url);
                await expectRequest('GET', url, 404);
                const apiRequest = (await browser.getRequests()).find(req => (req.url === url));
                expect(Object.keys(apiRequest.headers)).withContext(url).not.toContain('authorization');
            }
        });

        it('should keep custom request headers', async () => {
            const url = '/api/with/custom/headers';
            await demoPage.getApi(url, 'my-custom-header: custom-value; my-other-custom-header: 12');
            await expectRequest('GET', url, 404);
            const apiRequest = (await browser.getRequests()).find(req => (req.url === url));
            expect(apiRequest.headers).toEqual(jasmine.objectContaining({
                'my-custom-header': 'custom-value',
                'my-other-custom-header': '12'
            }));
        });
    });

    describe('misc', () => {
        beforeEach(async () => {
            await setupInterceptor();
            await keycloakPage.init();
        });

        it('should keep application query parameters after redirect', async () => {
            await demoPage.open('?my-param=A&my-other-param=B');
            await demoPage.login();
            await keycloakPage.login();
            await browser.pause(1000);

            const url = await browser.getUrl();
            expect(url).toContain(demoPage.url);
            expect(url).toContain('my-param=A');
            expect(url).toContain('my-other-param=B');
        });
    });
});
