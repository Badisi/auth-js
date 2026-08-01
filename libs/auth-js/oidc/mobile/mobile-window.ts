import { AuthLogger, isCapacitor, isCordova, isUrlMatching } from '@badisi/auth-js';
import type { AppPlugin } from '@capacitor/app';
import type { BrowserPlugin } from '@capacitor/browser';
import type { PluginListenerHandle } from '@capacitor/core';
import type { IWindow, NavigateParams, NavigateResponse } from 'oidc-client-ts';

import type { MobileWindowParams } from '../models/mobile-window-params.model';

const CUSTOM_URL_SCHEME_HANDLER_TIMEOUT = 10 * 1000; // 10s
const getCapacitorApp = (): AppPlugin | undefined => window.Capacitor?.Plugins.App;
const getCapacitorBrowser = (): BrowserPlugin | undefined => window.Capacitor?.Plugins.Browser;
const getBrowserTab = (): BrowserPlugin | undefined => undefined; // cordova?.plugins?.browsertab;

/**
 * @internal
 */
export class MobileWindow implements IWindow {
    #logger = new AuthLogger('MobileWindow');
    #navigateLogger = this.#logger.createChild('navigate');

    #capacitorAppUrlOpenHandle?: PluginListenerHandle;
    #capacitorBrowserFinishedHandle?: PluginListenerHandle;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    #originalHandleOpenURL = window.handleOpenURL;

    #timer?: number;
    #resolve?: (value: NavigateResponse) => void;
    #reject?: (reason?: unknown) => void;
    #isClosed = true;
    #receivedResult = false;

    public constructor(
        public redirectUrl: string,
        public params: MobileWindowParams
    ) {
        if (!isCapacitor() && !isCordova()) {
            this.#logger.notif('ⓘ Please follow the installation guide and install either `Capacitor` or `Cordova` dependency.');
            throw this.#logger.getError('Required core dependency `Capacitor` or `Cordova` not found');
        }

        if (!getBrowserTab() && !getCapacitorBrowser()) {
            // TODO:
            // this.#logger.notif('ⓘ Please follow the installation guide and install either `@badisi/capacitor-browsertab` or `@capacitor/browser` plugin.');
            this.#logger.notif('ⓘ Please follow the installation guide and install `@capacitor/browser` plugin.');
            throw this.#logger.getError('Required browser plugin not found');
        }

        /* TODO: if (!BROWSER_TAB && getCapacitorBrowser()) {
            let message = '[@badisi/auth-js] This application is currently using a non recommended browser plugin.\n\n';
            message += 'ⓘ Please follow the recommended guide and use `@badisi/capacitor-browsertab` instead.';
            console.warn(message);
        }*/

        if (getBrowserTab()) {
            this.#logger.debug('Using `@badisi/capacitor-browsertab` implementation');
        } else if (getCapacitorBrowser()) {
            this.#logger.debug('Using `@capacitor/browser` implementation');
        }
    }

    public async navigate(params: NavigateParams): Promise<NavigateResponse> {
        this.#navigateLogger.debug(params.url);

        this.#isClosed = false;
        this.#receivedResult = false;

        return new Promise((resolve, reject) => {
            this.#resolve = resolve;
            this.#reject = reject;

            void this.#installCustomUrlSchemeHandler()
                .then(() => {
                    if (getBrowserTab()) {
                        void this.#useBrowserTab(params);
                    } else if (getCapacitorBrowser()) {
                        void this.#useCapacitorBrowser(params);
                    }
                });
        });
    }

    // TODO: oidc-client-ts impose a sync method but an async one is needed because of Capacitor Browser
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    public async close(): Promise<void> {
        const _logger = this.#logger.createChild('cleanup');
        _logger.debug('begin');
        /**
         * Trying to close the browser while it's actually closing, can cause issues on Android.
         * So we make sure it is not already closed before calling it.
         * @see https://github.com/ionic-team/capacitor-plugins/issues/2045
         */
        if (!this.#isClosed) {
            await getCapacitorBrowser()?.close().catch((err: unknown) => {
                _logger.error(err);
            });
            // TODO: BROWSER_TAB?.close();
        }
        _logger.debug('success');
    }

    // --- HELPER(s) ---

    async #cleanup(): Promise<void> {
        const _logger = this.#logger.createChild('cleanup');
        _logger.debug('begin');
        window.handleOpenURL = this.#originalHandleOpenURL;
        await this.#capacitorBrowserFinishedHandle?.remove();
        await this.#capacitorAppUrlOpenHandle?.remove();
        clearTimeout(this.#timer);
        _logger.debug('success');
    }

    async #onError(message: string): Promise<void> {
        this.#navigateLogger.error('error response:', message);
        await this.close();
        await this.#cleanup();
        this.#reject?.(new Error(message));
        this.#receivedResult = true;
    }

    async #onSuccess(url: string): Promise<void> {
        this.#navigateLogger.debug('successful response:', url);
        await this.close();
        await this.#cleanup();
        this.#resolve?.({ url });
        this.#receivedResult = true;
    }

    async #useCapacitorBrowser(params: NavigateParams): Promise<void> {
        this.#capacitorBrowserFinishedHandle = await getCapacitorBrowser()?.addListener(
            'browserFinished',
            (): void => {
                this.#isClosed = true;
                /**
                 * Browser can close before custom url scheme handler finishes its job (ie. onSuccess, onError is called).
                 * So we give it some extra time, and in case we still didn't received any results, we consider that the
                 * browser was simply closed by the user.
                 */
                window.setTimeout(() => {
                    if (!this.#receivedResult) {
                        void this.#cleanup();
                        this.#reject?.('Capacitor browser closed by user');
                    }
                }, 1000);
            }
        );

        await getCapacitorBrowser()?.open({
            url: params.url,
            toolbarColor: this.params.mobileWindowToolbarColor,
            presentationStyle: this.params.mobileWindowPresentationStyle,
            width: this.params.mobileWindowWidth,
            height: this.params.mobileWindowWidth
        });
    }

    async #useBrowserTab(_params: NavigateParams): Promise<void> {
        /* TODO: BROWSER_TAB?.openUrl(
            url,
            { scheme: this.params.redirect_uri },
            (event: string) => this.onSuccess(event),
            () => this.onError('BrowserTab: error opening browser')
        );*/
    }

    async #installCustomUrlSchemeHandler(): Promise<void> {
        const _logger = this.#logger.createChild('installCustomUrlSchemeHandler');

        // Set a timeout in case no response is received
        this.#timer = window.setTimeout(
            () => void this.#onError('Installing custom url scheme handler, timed out without a response'),
            CUSTOM_URL_SCHEME_HANDLER_TIMEOUT
        );

        // Clean-up
        await this.#cleanup();

        // Install handler
        if (isCapacitor()) {
            _logger.debug('listening to Capacitor `appUrlOpen` event');

            this.#capacitorAppUrlOpenHandle = await getCapacitorApp()?.addListener(
                'appUrlOpen',
                ({ url }): void => {
                    if (isUrlMatching(url, this.redirectUrl)) {
                        void this.#onSuccess(url);
                    }
                }
            );
        } else if (isCordova()) {
            _logger.debug('waiting for Cordova `handleOpenURL` callback');

            window.handleOpenURL = (url: string): void => {
                this.#originalHandleOpenURL?.(url);
                if (isUrlMatching(url, this.redirectUrl)) {
                    void this.#onSuccess(url);
                }
            };
        }

        _logger.debug('success');
    }
}
