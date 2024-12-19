/* eslint-disable @typescript-eslint/unbound-method */

import { AuthLogger } from '@badisi/auth-js';

import type { InjectToken } from './models/inject-token.model';
import type { OIDCAuthManager } from './oidc-auth-manager';

declare global {
    interface XMLHttpRequest {
        url?: string | URL;
    }
}

const logger = new AuthLogger('OIDCAuthInterceptor');

export class OIDCAuthInterceptor {
    #manager: OIDCAuthManager;

    #originalFetch = window.fetch;
    #originalXmlHttpRequestOpen = XMLHttpRequest.prototype.open;
    #originalXmlHttpRequestSend = XMLHttpRequest.prototype.send;

    constructor(manager: OIDCAuthManager) {
        logger.debug('init');
        this.#manager = manager;
        this.#monkeyPathFetch();
        this.#monkeyPatchXmlHttpRequest();
    }

    // ---- HELPER(s) ----

    #getCompleteUrl(url: string): string {
        try {
            return new URL(url).href;
        } catch {
            return new URL(`${location.origin}${url.startsWith('/') ? '' : '/'}${url}`).href;
        }
    }

    #isMatching(url: string, pattern: string | RegExp | ((url: string) => boolean)): boolean {
        const completeUrl = this.#getCompleteUrl(url);
        if (typeof pattern === 'function') {
            return pattern(completeUrl);
        } else if (typeof pattern === 'string') {
            // Make the pattern regexp friendly
            const match = pattern
                .replace(/\//g, '\\/') // escape / with \/
                .replace(/\./g, '\\.') // escape . with \.
                .replace(/\*\*/g, '*') // replace ** with *
                .replace(/\*/g, '.*'); // replace * with .*

            return (new RegExp(match).exec(completeUrl) !== null);
        } else {
            return (pattern.exec(completeUrl) !== null);
        }
    }

    #isAllowedRequest(url: string, injectToken: InjectToken): boolean {
        let isAllowed = false;
        if (typeof injectToken === 'boolean') {
            isAllowed = injectToken;
        } else {
            const { include, exclude } = injectToken;

            if (Array.isArray(include)) {
                isAllowed = include.some((pattern: string | RegExp) => this.#isMatching(url, pattern));
            } else if (include) {
                isAllowed = this.#isMatching(url, include);
            }

            if (Array.isArray(exclude)) {
                if (exclude.some((item: string | RegExp) => this.#isMatching(url, item))) {
                    isAllowed = false;
                }
            } else if (exclude && this.#isMatching(url, exclude)) {
                isAllowed = false;
            }
        }
        return isAllowed;
    }

    #shouldInjectAuthToken(url: string): boolean {
        const injectToken = this.#manager.getSettings().automaticInjectToken ?? false;
        return (injectToken !== false) && this.#isAllowedRequest(url, injectToken);
    }

    #monkeyPathFetch(enable = true): void {
        const _logger = logger.createChild('monkeyPathFetch');
        _logger.debug(enable ? 'enabling..' : 'disabling..');

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (window.fetch) {
            if (enable) {
                window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
                    const url = (input instanceof Request) ? input.url : input.toString();
                    logger.debug('received fetch url:', url);

                    // Add token to request headers
                    if (this.#shouldInjectAuthToken(url)) {
                        const accessToken = await this.#manager.getAccessToken();
                        if (init && accessToken) {
                            logger.debug('adding bearer to url:', url);
                            init.headers = {
                                // eslint-disable-next-line @typescript-eslint/naming-convention
                                'Authorization': `Bearer ${accessToken}`,
                                ...init.headers
                            };
                        }
                    }

                    // Proceed with request
                    const response = await this.#originalFetch.apply(window, [input, init]);

                    // Do a login on 401
                    if (response.status === 401) {
                        const shouldLoginOn401 = this.#manager.getSettings().automaticLoginOn401 ?? false;
                        if (shouldLoginOn401) {
                            await this.#manager.login();
                        }
                    }

                    return response;
                };
            } else {
                window.fetch = this.#originalFetch;
            }

            _logger.debug('done');
        }
    }

    #monkeyPatchXmlHttpRequest(enable = true): void {
        const _logger = logger.createChild('monkeyPatchXmlHttpRequest');
        _logger.debug(enable ? 'enabling..' : 'disabling..');

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (XMLHttpRequest.prototype.open && XMLHttpRequest.prototype.send) {
            if (enable) {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const interceptor = this;

                XMLHttpRequest.prototype.open = function (method: string, url: string | URL, ...rest: unknown[]): void {
                    this.url = url;
                    // @ts-expect-error Rest should not be of type unknown
                    interceptor.#originalXmlHttpRequestOpen.apply(this, [method, url, ...rest]);
                };

                XMLHttpRequest.prototype.send = function (body?: Document | XMLHttpRequestBodyInit | null): void {
                    const url = (typeof this.url === 'string') ? this.url : this.url?.href;
                    logger.debug('received xhr url:', url);

                    // Do a login on 401
                    const originalReadyStateChange = this.onreadystatechange;
                    this.onreadystatechange = (event: Event): void => {
                        originalReadyStateChange?.apply(this, [event]);

                        if (this.readyState === XMLHttpRequest.DONE) {
                            if (this.status === 401) {
                                const shouldLoginOn401 = interceptor.#manager.getSettings().automaticLoginOn401 ?? false;
                                if (shouldLoginOn401) {
                                    void interceptor.#manager.login();
                                }
                            }
                        }
                    }

                    // Add token to request headers
                    const shouldInjectToken = url ? interceptor.#shouldInjectAuthToken(url) : false;
                    if (this.readyState === XMLHttpRequest.OPENED && shouldInjectToken) {
                        interceptor.#manager.getAccessToken()
                            .then(accessToken => {
                                if (accessToken) {
                                    logger.debug('adding bearer to url:', url);
                                    this.setRequestHeader('Authorization', `Bearer ${accessToken}`);
                                }
                            })
                            .catch((error: unknown) => {
                                logger.error(error)
                            })
                            .finally(() => {
                                interceptor.#originalXmlHttpRequestSend.apply(this, [body]);
                            })
                    } else {
                        interceptor.#originalXmlHttpRequestSend.apply(this, [body]);
                    }
                };
            } else {
                XMLHttpRequest.prototype.open = this.#originalXmlHttpRequestOpen;
                XMLHttpRequest.prototype.send = this.#originalXmlHttpRequestSend;
            }

            _logger.debug('done');
        }
    }
}
