import { browser } from '@wdio/globals';
import type { HTTPResponse, Page } from 'puppeteer-core';
import type { MockFilterOptions, WaitForOptions } from 'webdriverio';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace WebdriverIO {
        interface Browser {
            getPage: () => Promise<Page>;
            waitForNavigation: () => Promise<string>;
        }
        interface Mock {
            waitForResponse: ({ timeout }?: WaitForOptions) => Promise<HTTPResponse>;
        }
    }
}

type MockFunction = (url: string, filterOptions?: MockFilterOptions) => Promise<WebdriverIO.Mock>;

// @ts-expect-error Webdriverio wrongly typed the origCommand and expect it to be `() => MockFunction` instead of `MockFunction`
browser.overwriteCommand('mock', async (origCommand: MockFunction, url: string, _filterOptions?: MockFilterOptions): Promise<WebdriverIO.Mock> => {
    const currentPage = await browser.getPage();
    /**
     * BiDi seems very unstable if many mocks are used and it slowed everything down.
     * So if original mock's methods are not used we can get rid of them to improve performances.
     */
    // const mock = await origCommand(url, filterOptions);
    const mock = {} as unknown as WebdriverIO.Mock;
    mock.waitForResponse = async (options?: WaitForOptions): Promise<HTTPResponse> => {
        // eslint-disable-next-line no-nested-ternary
        const pattern = (typeof url === 'object') ? url : (url.startsWith('http') ? new URLPattern(url) : new URLPattern({ pathname: url }));
        return await currentPage.waitForResponse(resp => pattern.test(resp.url()), { timeout: options?.timeout });
    }
    return mock;
});

browser.addCommand('waitForNavigation', async (): Promise<string> => {
    const currentUrl = await browser.getUrl();
    await browser.waitUntil(async () => (await browser.getUrl()) !== currentUrl);
    return await browser.getUrl();
});

browser.addCommand('getPage', async (): Promise<Page> => {
    if (!('page' in browser.__propertiesObject__)) {
        const puppeteerBrowser = await browser.getPuppeteer();
        const pages = await puppeteerBrowser.pages();
        const controledPageUrl = await browser.getUrl();
        const page = pages.find(p => p.url() === controledPageUrl);
        if (!page) {
            throw new Error('Error: not able to find the current page using Puppeteer');
        }
        browser.__propertiesObject__['page'] = { value: page };
    }
    return browser.__propertiesObject__['page'].value;
});
