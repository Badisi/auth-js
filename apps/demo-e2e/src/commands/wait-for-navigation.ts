import { browser } from '@wdio/globals';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace WebdriverIO {
        interface Browser {
            waitForNavigation: () => Promise<string>;
        }
    }
}

browser.addCommand('waitForNavigation', async (): Promise<string> => {
    const currentUrl = await browser.getUrl();
    let newUrl = '';
    await browser.waitUntil(async () => {
        newUrl = await browser.getUrl();
        return newUrl !== currentUrl;
    });
    return newUrl;
});
