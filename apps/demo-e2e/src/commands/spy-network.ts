// /* eslint-disable @typescript-eslint/no-non-null-assertion */
// /* eslint-disable @stylistic/max-statements-per-line */

// import { browser } from '@wdio/globals';
// import type { local } from 'webdriver';

// export interface SpyOptions {
//     once?: boolean;
// }

// export interface Spy<T> {
//     wait: (timeout?: number) => Promise<T>;
// }

// export type SpyRequest = local.NetworkRequestData;
// export type SpyRequestFunction = (urlPattern: string, options?: SpyOptions) => Promise<Spy<SpyRequest>>;

// export interface SpyResponse<T> {
//     status: number;
//     headers: local.NetworkHeader[];
//     rawBody: string;
//     body: T;
// };
// export type SpyResponseFunction = <T>(urlPattern: string, options?: SpyOptions) => Promise<Spy<SpyResponse<T>>>;

// export interface SpyNetwork<T> {
//     request: SpyRequest;
//     response: SpyResponse<T>;
// }
// export type SpyNetworkFunction = <T>(urlPattern: string, options?: SpyOptions) => Promise<Spy<SpyNetwork<T>>>;

// declare global {
//     // eslint-disable-next-line @typescript-eslint/no-namespace
//     namespace WebdriverIO {
//         interface Browser {
//             spyRequest: SpyRequestFunction;
//             spyResponse: SpyResponseFunction;
//             spyNetwork: SpyNetworkFunction;
//         }
//     }
// }

// // --- COMMAND(s) ---

// browser.addCommand('spyRequest',
//     (urlPattern: string, options: SpyOptions = {}) => spy(urlPattern, 'request', options.once ?? true)
// );

// browser.addCommand('spyResponse',
//     (urlPattern: string, options: SpyOptions = {}) => spy(urlPattern, 'response', options.once ?? true)
// );

// browser.addCommand('spyNetwork',
//     (urlPattern: string, options: SpyOptions = {}) => spy(urlPattern, 'network', options.once ?? true)
// );

// // --- HELPER(s) ---

// const spy = async <T>(urlPattern: string, mode: 'request' | 'response' | 'network', once: boolean): Promise<Spy<T>> => {
//     // --- Events ---
//     const events: string[] = [];
//     if (['request', 'network'].includes(mode)) {
//         events.push('network.beforeRequestSent');
//     }
//     if (['response', 'network'].includes(mode)) {
//         events.push('network.responseCompleted');
//     }
//     await browser.sessionSubscribe({ events });

//     // -- Request ---
//     let capturedRequest: local.NetworkBeforeRequestSentParameters | null = null;
//     const requestListener = (data: local.NetworkBeforeRequestSentParameters): void => {
//         if (data.request.url.includes(urlPattern)) {
//             capturedRequest = data;
//             if (once) { browser.off('network.beforeRequestSent', requestListener); }
//         }
//     };
//     if (['request', 'network'].includes(mode)) {
//         browser.on('network.beforeRequestSent', requestListener);
//     }

//     // -- Response ---
//     let capturedResponse: local.NetworkResponseCompletedParameters | null = null;
//     const responseListener = (data: local.NetworkResponseCompletedParameters): void => {
//         if (data.request.url.includes(urlPattern)) {
//             capturedResponse = data;
//             if (once) { browser.off('network.responseCompleted', responseListener); }
//         }
//     };
//     if (['response', 'network'].includes(mode)) {
//         browser.on('network.responseCompleted', responseListener);
//     }

//     // --- Data collector ---
//     let collectorResult: local.NetworkAddDataCollectorResult | null = null;
//     if (['response', 'network'].includes(mode)) {
//         const currentContext = await browser.getWindowHandle();
//         collectorResult = await browser.networkAddDataCollector({
//             contexts: [currentContext],
//             dataTypes: ['response'],
//             maxEncodedDataSize: 10 * 1024 * 1024 // Buffer of 10 Mo
//         });
//     }

//     return {
//         wait: async (timeout = 5000): Promise<T> => {
//             try {
//                 await browser.waitUntil(() => {
//                     if (mode === 'request') { return capturedRequest !== null; }
//                     if (mode === 'response') { return capturedResponse !== null; }
//                     return capturedRequest !== null && capturedResponse !== null;
//                 }, {
//                     timeout,
//                     timeoutMsg: `Aucun événement réseau correspondant à "${urlPattern}" n'a été intercepté.`
//                 });

//                 if (mode === 'request') {
//                     return capturedRequest!.request as unknown as T;
//                 }

//                 const { bytes } = await browser.networkGetData({
//                     request: capturedResponse!.request.request,
//                     dataType: 'response'
//                 });

//                 if (collectorResult) {
//                     await browser.networkDisownData({
//                         request: capturedResponse!.request.request,
//                         dataType: 'response',
//                         collector: collectorResult.collector
//                     }).catch(() => { /** */ });
//                 }

//                 const rawBody = bytes.value;
//                 let body: unknown;
//                 try {
//                     body = JSON.parse(rawBody);
//                 } catch {
//                     body = rawBody;
//                 }

//                 const responseData = {
//                     status: capturedResponse!.response.status,
//                     headers: capturedResponse!.response.headers,
//                     rawBody,
//                     body
//                 };

//                 if (mode === 'response') {
//                     return responseData as unknown as T;
//                 }
//                 return {
//                     request: capturedRequest!.request,
//                     response: responseData
//                 } as unknown as T;
//             } finally {
//                 if (['request', 'network'].includes(mode)) {
//                     browser.off('network.beforeRequestSent', requestListener);
//                 }

//                 if (['response', 'network'].includes(mode)) {
//                     browser.off('network.responseCompleted', responseListener);
//                 }

//                 await browser.sessionUnsubscribe({
//                     events
//                 }).catch(() => { /** */ });

//                 if (collectorResult) {
//                     await browser.networkRemoveDataCollector({
//                         collector: collectorResult.collector
//                     }).catch(() => { /** */ });
//                 }
//             }
//         }
//     };
// };
