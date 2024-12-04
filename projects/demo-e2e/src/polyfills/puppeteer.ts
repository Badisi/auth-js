import { browser } from '@wdio/globals';
import { Page } from 'puppeteer-core';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace WebdriverIO {
        interface Browser {
            getPage: () => Promise<Page>;
        }
    }
}

browser.addCommand('getPage', async (): Promise<Page> => {
    if (!browser.__propertiesObject__.page) {
        const puppeteerBrowser = await browser.getPuppeteer();
        const pages = await puppeteerBrowser.pages();
        const controledPageUrl = await browser.getUrl();
        const page = pages.find(p => p.url() === controledPageUrl);
        if (!page) {
            throw new Error('Error: not able to find the current page using Puppeteer');
        }
        browser.__propertiesObject__.page = { value: page };
    }
    return browser.__propertiesObject__.page.value;
});
