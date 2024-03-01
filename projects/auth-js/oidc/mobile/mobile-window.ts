/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-assignment */

import type { PluginListenerHandle } from '@capacitor/core';
import { IWindow, Logger, NavigateParams, NavigateResponse } from 'oidc-client-ts';

import { AuthUtils } from '../../core';
import { MobileWindowParams } from '../models/mobile-window-params.model';

const CUSTOM_URL_SCHEME_HANDLER_TIMEOUT = 10 * 1000; // 10s
const CAPACITOR_APP = window.Capacitor?.Plugins?.App;
const CAPACITOR_BROWSER = window.Capacitor?.Plugins?.Browser;
const BROWSER_TAB = undefined; // cordova?.plugins?.browsertab;

/**
 * @internal
 */
export class MobileWindow implements IWindow {
    private readonly _logger = new Logger('MobileWindow');

    private capacitorAppUrlOpenHandle?: PluginListenerHandle;
    private capacitorBrowserFinishedHandle?: PluginListenerHandle;
    private originalHandleOpenURL = window.handleOpenURL;

    private timer?: number;
    private navigateLogger?: Logger;
    private _resolve?: (value: NavigateResponse) => void;
    private _reject?: (reason?: unknown) => void;
    private _isClosed = true;
    private _receivedResult = false;

    constructor(
        public redirectUrl: string,
        public params: MobileWindowParams
    ) {
        if (!AuthUtils.isCapacitor() && !AuthUtils.isCordova()) {
            let message = '[@badisi/auth-js] Required core dependency not found.\n\n';
            message += 'ⓘ Please follow the recommended guide and install either `Capacitor` or `Cordova` dependency.';
            console.error(message);
        }

        if (!BROWSER_TAB && !CAPACITOR_BROWSER) {
            let message = '[@badisi/auth-js] Required plugin not found.\n\n';
            message += 'ⓘ Please follow the recommended guide and install either `@badisi/capacitor-browsertab` or `@capacitor/browser` plugin.';
            console.error(message);
        }

        /* TODO: if (!BROWSER_TAB && CAPACITOR_BROWSER) {
            let message = '[@badisi/auth-js] This application is currently using a non recommended browser plugin.\n\n';
            message += 'ⓘ Please follow the recommended guide and use `@badisi/capacitor-browsertab` instead.';
            console.warn(message);
        }*/

        if (BROWSER_TAB) {
            this._logger.debug('Using `@badisi/capacitor-browsertab` implementation');
        } else if (CAPACITOR_BROWSER) {
            this._logger.debug('Using `@capacitor/browser` implementation');
        }
    }

    public async navigate(params: NavigateParams): Promise<NavigateResponse> {
        this.navigateLogger = this._logger.create('navigate');
        this.navigateLogger.debug('url', params.url);

        this._isClosed = false;
        this._receivedResult = false;

        return new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;

            void this.installCustomUrlSchemeHandler()
                .then(() => {
                    if (BROWSER_TAB) {
                        void this.useBrowserTab(params);
                    } else if (CAPACITOR_BROWSER) {
                        void this.useCapacitorBrowser(params);
                    }
                });
        });
    }

    public async close(): Promise<void> {
        const logger = this._logger.create('close');
        /**
         * Trying to close the browser while it's actually closing, can cause issues on Android.
         * So we make sure it is not already closed before calling it.
         * @see https://github.com/ionic-team/capacitor-plugins/issues/2045
         */
        if (!this._isClosed) {
            await CAPACITOR_BROWSER?.close().catch(err => logger.error(err));
            // TODO: BROWSER_TAB?.close();
        }
        logger.debug('success');
    }

    // --- HELPER(s) ---

    private async cleanup(): Promise<void> {
        const logger = this._logger.create('cleanup');
        window.handleOpenURL = this.originalHandleOpenURL;
        await this.capacitorBrowserFinishedHandle?.remove();
        await this.capacitorAppUrlOpenHandle?.remove();
        clearTimeout(this.timer);
        logger.debug('success');
    }

    private async onError(message: string): Promise<void> {
        this.navigateLogger?.error('error response:', message);
        await this.close();
        await this.cleanup();
        this._reject?.(new Error(message));
        this._receivedResult = true;
    }

    private async onSuccess(url: string): Promise<void> {
        this.navigateLogger?.debug('successful response:', url);
        await this.close();
        await this.cleanup();
        this._resolve?.({ url });
        this._receivedResult = true;
    }

    private async useCapacitorBrowser(params: NavigateParams): Promise<void> {
        this.capacitorBrowserFinishedHandle = await CAPACITOR_BROWSER?.addListener(
            'browserFinished',
            (): void => {
                this._isClosed = true;
                /**
                 * Browser can close before custom url scheme handler finishes its job (ie. onSuccess, onError is called).
                 * So we give it some extra time, and in case we still didn't received any results, we consider that the
                 * browser was simply closed by the user.
                 */
                setTimeout(() => {
                    if (!this._receivedResult) {
                        void this.cleanup();
                        this._reject?.('Capacitor browser closed by user');
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

    private async useBrowserTab(_params: NavigateParams): Promise<void> {
        /* TODO: BROWSER_TAB?.openUrl(
            url,
            { scheme: this.params.redirect_uri },
            (event: string) => this.onSuccess(event),
            () => this.onError('BrowserTab: error opening browser')
        );*/
    }

    private async installCustomUrlSchemeHandler(): Promise<void> {
        const logger = this._logger.create('installCustomUrlSchemeHandler');

        // Set a timeout in case no response is received
        this.timer = setTimeout(
            () => void this.onError('Installing custom url scheme handler, timed out without a response'),
            CUSTOM_URL_SCHEME_HANDLER_TIMEOUT
        );

        // Clean-up
        await this.cleanup();

        // Install handler
        if (AuthUtils.isCapacitor()) {
            logger.debug('listening to Capacitor `appUrlOpen` event');

            this.capacitorAppUrlOpenHandle = await CAPACITOR_APP?.addListener?.(
                'appUrlOpen',
                ({ url }): void => {
                    if (AuthUtils.isUrlMatching(url, this.redirectUrl)) {
                        void this.onSuccess(url);
                    }
                }
            );
        } else if (AuthUtils.isCordova()) {
            logger.debug('waiting for Cordova `handleOpenURL` callback');

            window.handleOpenURL = (url: string): void => {
                this.originalHandleOpenURL?.(url);
                if (AuthUtils.isUrlMatching(url, this.redirectUrl)) {
                    void this.onSuccess(url);
                }
            };
        }

        logger.debug('success');
    }
}
