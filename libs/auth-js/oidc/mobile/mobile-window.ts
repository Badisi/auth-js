/* eslint-disable @typescript-eslint/no-deprecated */
import type { PluginListenerHandle } from '@capacitor/core';
import type { IWindow, NavigateParams, NavigateResponse } from 'oidc-client-ts';

import { AuthLogger, AuthUtils } from '../../core';
import type { MobileWindowParams } from '../models/mobile-window-params.model';

const CUSTOM_URL_SCHEME_HANDLER_TIMEOUT = 10 * 1000; // 10s
const CAPACITOR_APP = window.Capacitor?.Plugins.App;
const CAPACITOR_BROWSER = window.Capacitor?.Plugins.Browser;
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
const BROWSER_TAB = undefined; // cordova?.plugins?.browsertab;

const logger = new AuthLogger('MobileWindow');
const navigateLogger = logger.createChild('navigate');

/**
 * @internal
 */
export class MobileWindow implements IWindow {
    #capacitorAppUrlOpenHandle?: PluginListenerHandle;
    #capacitorBrowserFinishedHandle?: PluginListenerHandle;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    #originalHandleOpenURL = window.handleOpenURL;

    #timer?: number;
    #resolve?: (value: NavigateResponse) => void;
    #reject?: (reason?: unknown) => void;
    #isClosed = true;
    #receivedResult = false;

    constructor(
        public redirectUrl: string,
        public params: MobileWindowParams
    ) {
        if (!AuthUtils.isCapacitor() && !AuthUtils.isCordova()) {
            logger.notif('ⓘ Please follow the installation guide and install either `Capacitor` or `Cordova` dependency.');
            throw logger.getError('Required core dependency `Capacitor` or `Cordova` not found');
        }

        if (!BROWSER_TAB && !CAPACITOR_BROWSER) {
            // TODO:
            // logger.notif('ⓘ Please follow the installation guide and install either `@badisi/capacitor-browsertab` or `@capacitor/browser` plugin.');
            logger.notif('ⓘ Please follow the installation guide and install `@capacitor/browser` plugin.');
            throw logger.getError('Required browser plugin not found');
        }

        /* TODO: if (!BROWSER_TAB && CAPACITOR_BROWSER) {
            let message = '[@badisi/auth-js] This application is currently using a non recommended browser plugin.\n\n';
            message += 'ⓘ Please follow the recommended guide and use `@badisi/capacitor-browsertab` instead.';
            console.warn(message);
        }*/

        if (BROWSER_TAB) {
            logger.debug('Using `@badisi/capacitor-browsertab` implementation');
        } else if (CAPACITOR_BROWSER) {
            logger.debug('Using `@capacitor/browser` implementation');
        }
    }

    public async navigate(params: NavigateParams): Promise<NavigateResponse> {
        navigateLogger.debug(params.url);

        this.#isClosed = false;
        this.#receivedResult = false;

        return new Promise((resolve, reject) => {
            this.#resolve = resolve;
            this.#reject = reject;

            void this.#installCustomUrlSchemeHandler()
                .then(() => {
                    if (BROWSER_TAB) {
                        void this.#useBrowserTab(params);
                    } else if (CAPACITOR_BROWSER) {
                        void this.#useCapacitorBrowser(params);
                    }
                });
        });
    }

    // TODO: oidc-client-ts impose a sync method but an async one is needed because of Capacitor Browser
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    public async close(): Promise<void> {
        const _logger = logger.createChild('cleanup');
        _logger.debug('begin');
        /**
         * Trying to close the browser while it's actually closing, can cause issues on Android.
         * So we make sure it is not already closed before calling it.
         * @see https://github.com/ionic-team/capacitor-plugins/issues/2045
         */
        if (!this.#isClosed) {
            await CAPACITOR_BROWSER?.close().catch((err: unknown) => { _logger.error(err); });
            // TODO: BROWSER_TAB?.close();
        }
        _logger.debug('success');
    }

    // --- HELPER(s) ---

    async #cleanup(): Promise<void> {
        const _logger = logger.createChild('cleanup');
        _logger.debug('begin');
        window.handleOpenURL = this.#originalHandleOpenURL;
        await this.#capacitorBrowserFinishedHandle?.remove();
        await this.#capacitorAppUrlOpenHandle?.remove();
        clearTimeout(this.#timer);
        _logger.debug('success');
    }

    async #onError(message: string): Promise<void> {
        navigateLogger.error('error response:', message);
        await this.close();
        await this.#cleanup();
        this.#reject?.(new Error(message));
        this.#receivedResult = true;
    }

    async #onSuccess(url: string): Promise<void> {
        navigateLogger.debug('successful response:', url);
        await this.close();
        await this.#cleanup();
        this.#resolve?.({ url });
        this.#receivedResult = true;
    }

    async #useCapacitorBrowser(params: NavigateParams): Promise<void> {
        this.#capacitorBrowserFinishedHandle = await CAPACITOR_BROWSER?.addListener(
            'browserFinished',
            (): void => {
                this.#isClosed = true;
                /**
                 * Browser can close before custom url scheme handler finishes its job (ie. onSuccess, onError is called).
                 * So we give it some extra time, and in case we still didn't received any results, we consider that the
                 * browser was simply closed by the user.
                 */
                setTimeout(() => {
                    if (!this.#receivedResult) {
                        void this.#cleanup();
                        this.#reject?.('Capacitor browser closed by user');
                    }
                }, 1000);
            }
        );

        await CAPACITOR_BROWSER?.open({
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
        const _logger = logger.createChild('installCustomUrlSchemeHandler');

        // Set a timeout in case no response is received
        this.#timer = setTimeout(
            () => void this.#onError('Installing custom url scheme handler, timed out without a response'),
            CUSTOM_URL_SCHEME_HANDLER_TIMEOUT
        );

        // Clean-up
        await this.#cleanup();

        // Install handler
        if (AuthUtils.isCapacitor()) {
            _logger.debug('listening to Capacitor `appUrlOpen` event');

            this.#capacitorAppUrlOpenHandle = await CAPACITOR_APP?.addListener?.(
                'appUrlOpen',
                ({ url }): void => {
                    if (AuthUtils.isUrlMatching(url, this.redirectUrl)) {
                        void this.#onSuccess(url);
                    }
                }
            );
        } else if (AuthUtils.isCordova()) {
            _logger.debug('waiting for Cordova `handleOpenURL` callback');

            window.handleOpenURL = (url: string): void => {
                this.#originalHandleOpenURL?.(url);
                if (AuthUtils.isUrlMatching(url, this.redirectUrl)) {
                    void this.#onSuccess(url);
                }
            };
        }

        _logger.debug('success');
    }
}
