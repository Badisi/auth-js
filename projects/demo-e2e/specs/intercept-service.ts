let { setup } = require('wdio-intercept-service/lib/interceptor');
setup = setup
    .toString()
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*/gm, '') // remove comments
    .replace(/\n?\r|\n/gm, '') // remove new lines
    .replace(/\s+/gm, ' '); // remove consecutive white spaces

export const setupInterceptor = async (url = 'http://localhost:4200/**'): Promise<void> => {
    const mock = await browser.mock(url);
    mock.respond(({ body }) => {
        if ((typeof body === 'string') && body.includes('<body>')) {
            return body.replace('<body>', `<body><script>${setup}; setup(function() {});</script>`);
        }
        return body;
    });
};

export const expectRequest = async (
    method: WdioInterceptorService.HTTPMethod,
    url: string | RegExp,
    statusCode: number
): Promise<void> => {
    await browser.expectRequest(method, url, statusCode);
    await browser.assertExpectedRequestsOnly();
    await browser.resetExpectations();
};
