import { browser } from '@wdio/globals';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace WebdriverIO {
        interface Browser {
            waitForNavigation: (timeout?: number, timeoutMsg?: string) => Promise<string>;
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
browser.addCommand('waitForNavigation', async (timeout: number = 20000, timeoutMsg?: string): Promise<string> => {
    const currentUrl = await browser.getUrl();
    timeoutMsg ??= `No navigation happened within ${timeout}ms (url stayed "${currentUrl}").`;
    let newUrl = '';
    await browser.waitUntil(async () => {
        newUrl = await browser.getUrl();
        return newUrl !== currentUrl;
    }, { timeout, timeoutMsg });
    return newUrl;
});
