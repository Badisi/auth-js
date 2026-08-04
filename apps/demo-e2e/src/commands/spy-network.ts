/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { browser } from '@wdio/globals';
import type { local } from 'webdriver';

export type HttpMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'CONNECT' | 'TRACE';

export interface SpyOptions {
    once?: boolean;
    methods?: HttpMethod[];
}

export interface Spy<T> {
    wait: (timeout?: number, timeoutMsg?: string) => Promise<T>;
    wasCalled: (timeout?: number, timeoutMsg?: string) => Promise<boolean>;
}

export interface SpyRequest extends local.NetworkRequestData {
    postData?: string;
}
export type SpyRequestFunction = (urlPattern: string, options?: SpyOptions) => Promise<Spy<SpyRequest>>;

export interface SpyResponse<T> {
    status: number;
    headers: local.NetworkHeader[];
    rawBody: string;
    body: T;
};
export type SpyResponseFunction = <T>(urlPattern: string, options?: SpyOptions) => Promise<Spy<SpyResponse<T>>>;

export interface SpyNetwork<T> {
    request: SpyRequest;
    response: SpyResponse<T>;
}
export type SpyNetworkFunction = <T>(urlPattern: string, options?: SpyOptions) => Promise<Spy<SpyNetwork<T>>>;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace WebdriverIO {
        interface Browser {
            spyRequest: SpyRequestFunction;
            spyResponse: SpyResponseFunction;
            spyNetwork: SpyNetworkFunction;
        }
    }
}

// --- COMMAND(s) ---

browser.addCommand('spyRequest',
    (urlPattern: string, options: SpyOptions = {}) => spy(urlPattern, 'request', options)
);

browser.addCommand('spyResponse',
    (urlPattern: string, options: SpyOptions = {}) => spy(urlPattern, 'response', options)
);

browser.addCommand('spyNetwork',
    (urlPattern: string, options: SpyOptions = {}) => spy(urlPattern, 'network', options)
);

// --- HELPER(s) ---

type SpyMode = 'request' | 'response' | 'network';

// Network events are subscribed at the session level and shared with other
// consumers (ex: `browser.mock()`). They are subscribed once and never
// unsubscribed so that unsubscribing here cannot break other consumers.
const subscribedEvents = new Set<string>();

const ensureEventsSubscribed = async (): Promise<void> => {
    // Subscribe to all the events needed by any spy mode in a single call so
    // that no later incremental `session.subscribe` call can interfere with the
    // events already subscribed (some implementations may reset subscriptions).
    const events = ['network.beforeRequestSent', 'network.responseStarted', 'network.responseCompleted'];
    const missingEvents = events.filter(event => !subscribedEvents.has(event));
    if (missingEvents.length > 0) {
        await browser.sessionSubscribe({ events });
        events.forEach(event => subscribedEvents.add(event));
    }
};

const spy = async <T>(urlPattern: string, mode: SpyMode, { once = true, methods }: SpyOptions = {}): Promise<Spy<T>> => {
    const watchRequest = ['request', 'network'].includes(mode);
    const watchResponse = ['response', 'network'].includes(mode);

    // --- Events ---

    // Subscribe all network events in a single `session.subscribe` call so that
    // subsequent spies do not need to (and cannot) race or disrupt the already
    // subscribed events. Event subscriptions are shared with other consumers
    // (ex: `browser.mock()`) and are never unsubscribed here.
    await ensureEventsSubscribed();

    const matches = (data: Pick<local.NetworkBaseParameters, 'request'>): boolean =>
        data.request.url.includes(urlPattern)
        && (!methods?.length || methods.includes(data.request.method as HttpMethod));

    // -- Request ---

    let capturedRequest: local.NetworkBeforeRequestSentParameters | null = null;
    const requestListener = (data: local.NetworkBeforeRequestSentParameters): void => {
        if (matches(data)) {
            capturedRequest = data;
            if (once) { browser.off('network.beforeRequestSent', requestListener); }
        }
    };
    if (watchRequest) { browser.on('network.beforeRequestSent', requestListener); }

    // -- Response ---

    // `network.responseStarted` is emitted more reliably than
    // `network.responseCompleted` (the latter may be dropped under load), so
    // use it to capture the response metadata (status/headers). `responseCompleted`
    // is only used as a signal that the body is available to be fetched.
    let capturedResponse: local.NetworkResponseStartedParameters | null = null;
    const responseMetaListener = (data: local.NetworkResponseStartedParameters): void => {
        if (matches(data)) {
            capturedResponse = data;
            if (once) { browser.off('network.responseStarted', responseMetaListener); }
        }
    };
    let responseCompleted = false;
    const responseCompletedListener = (data: local.NetworkResponseCompletedParameters): void => {
        if (data.request.url.includes(urlPattern)) {
            responseCompleted = true;
            if (once) { browser.off('network.responseCompleted', responseCompletedListener); }
        }
    };
    if (watchResponse) {
        browser.on('network.responseStarted', responseMetaListener);
        browser.on('network.responseCompleted', responseCompletedListener);
    }

    // --- Data collector ---

    let collectorResult: local.NetworkAddDataCollectorResult | null = null;
    if (watchResponse) {
        collectorResult = await browser.networkAddDataCollector({
            dataTypes: (mode === 'network') ? ['request', 'response'] : ['response'],
            maxEncodedDataSize: 10 * 1024 * 1024 // Buffer of 10 Mo
        });
    }

    const isCaptured = (): boolean => {
        if (mode === 'request') { return capturedRequest !== null; }
        if (mode === 'response') { return capturedResponse !== null; }
        return capturedRequest !== null && capturedResponse !== null;
    };

    // Fetches the buffered body for a request, waiting for it to become
    // available (the body is only buffered once the response has completed).
    const fetchBody = async (requestId: string, dataType: 'request' | 'response'): Promise<string> => {
        let body = '';
        await browser.waitUntil(async () => {
            const { bytes } = await browser.networkGetData({
                request: requestId,
                dataType
            }).catch(() => ({ bytes: undefined }));
            if (bytes?.value) {
                body = bytes.value;
                return true;
            }
            // For request bodies there is nothing to wait for, and if the
            // response completed the response body must already be buffered.
            return responseCompleted || dataType === 'request';
        }, {
            timeout: 5000,
            timeoutMsg: `Couldn't fetch the ${dataType} body for "${urlPattern}".`
        }).catch(() => { /** */ });
        return body;
    };

    const cleanup = async (): Promise<void> => {
        if (watchRequest) { browser.off('network.beforeRequestSent', requestListener); }
        if (watchResponse) {
            browser.off('network.responseStarted', responseMetaListener);
            browser.off('network.responseCompleted', responseCompletedListener);
        }

        if (collectorResult) {
            await browser.networkRemoveDataCollector({
                collector: collectorResult.collector
            }).catch(() => { /** */ });
        }
    };

    const collect = async (): Promise<T> => {
        if (mode === 'request') {
            return capturedRequest!.request as unknown as T;
        }

        // -- Response body ---

        const responseRequestId = capturedResponse!.request.request;
        const rawBody = await fetchBody(responseRequestId, 'response');

        if (collectorResult) {
            await browser.networkDisownData({
                request: responseRequestId,
                dataType: 'response',
                collector: collectorResult.collector
            }).catch(() => { /** */ });
        }

        let body: unknown;
        try {
            body = JSON.parse(rawBody);
        } catch {
            body = rawBody;
        }

        const responseData: SpyResponse<unknown> = {
            status: capturedResponse!.response.status,
            headers: capturedResponse!.response.headers,
            rawBody,
            body
        };

        if (mode === 'response') {
            return responseData as unknown as T;
        }

        // -- Request body (postData) ---

        const requestData = capturedRequest!.request as SpyRequest;
        if (collectorResult) {
            requestData.postData = await fetchBody(requestData.request, 'request');

            await browser.networkDisownData({
                request: requestData.request,
                dataType: 'request',
                collector: collectorResult.collector
            }).catch(() => { /** */ });
        }

        return {
            request: requestData,
            response: responseData
        } as unknown as T;
    };

    return {
        wait: async (timeout = 10000, timeoutMsg = `No network event was intercepted for "${urlPattern}".`): Promise<T> => {
            try {
                await browser.waitUntil(isCaptured, { timeout, timeoutMsg });
                return await collect();
            } finally {
                await cleanup();
            }
        },
        wasCalled: async (timeout = 5000, timeoutMsg = `No network event was intercepted for "${urlPattern}".`): Promise<boolean> => {
            try {
                await browser.waitUntil(isCaptured, { timeout, timeoutMsg }).catch(() => { /** */ });
                return isCaptured();
            } finally {
                await cleanup();
            }
        }
    };
};
