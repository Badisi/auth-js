/* eslint-disable @typescript-eslint/unbound-method */

import { AuthLogger } from '@badisi/auth-js';
import type { OidcMetadata } from 'oidc-client-ts';

import type { InjectToken } from './models/inject-token.model';
import type { OIDCAuthManager } from './oidc-auth-manager';
import type { OIDCUserManager } from './oidc-user-manager';

declare global {
    interface XMLHttpRequest {
        url?: string | URL;
    }
}

const logger = new AuthLogger('OIDCAuthInterceptor');

export class OIDCAuthInterceptor {
    #manager: OIDCAuthManager;
    #userManager: OIDCUserManager;

    #originalFetch = window.fetch;
    #originalXmlHttpRequestOpen = XMLHttpRequest.prototype.open;
    #originalXmlHttpRequestSend = XMLHttpRequest.prototype.send;

    public constructor(manager: OIDCAuthManager, userManager: OIDCUserManager) {
        logger.debug('init');
        this.#manager = manager;
        this.#userManager = userManager;
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
        let isAllowed = (typeof injectToken === 'boolean') ? injectToken : false;

        // 1: filter the url based on authority urls
        //    (to avoid getting stuck, especially with those that return the actual tokens..)
        if (isAllowed) {
            // @ts-expect-error _metadata is accessible because not truly private
            const metadata = this.#userManager.metadataService._metadata as Partial<OidcMetadata> | undefined;
            if (!metadata && url.includes(this.#manager.getSettings().authorityUrl)) {
                logger.debug('matching authority domain but no metadata available yet');
                isAllowed = false;
            } else if (metadata && this.#manager.isRenewing()) {
                logger.debug('matching authority domain but no token available yet');
                isAllowed = false;
            } else if (metadata) {
                const blacklistedUrl = [
                    metadata.authorization_endpoint,
                    metadata.token_endpoint
                ].find(value => value && url.includes(value));
                if (blacklistedUrl) {
                    logger.debug('matching blacklisted authority url:', blacklistedUrl);
                    isAllowed = false;
                }
            }
        }

        // 2: filter the url based on include and/or exclude filters
        if ((typeof injectToken === 'object')) {
            const { include, exclude } = injectToken;

            if (Array.isArray(include)) {
                const matchedPattern = include.find((pattern: string | RegExp) => this.#isMatching(url, pattern));
                if (matchedPattern) {
                    logger.debug('matching include pattern:', matchedPattern);
                    isAllowed = true;
                }
            } else if (include) {
                isAllowed = this.#isMatching(url, include);
                if (isAllowed) {
                    logger.debug('matching include pattern:', include);
                }
            }

            if (Array.isArray(exclude)) {
                const matchedPattern = exclude.some((item: string | RegExp) => this.#isMatching(url, item));
                if (matchedPattern) {
                    logger.debug('matching exclude pattern:', matchedPattern);
                    isAllowed = false;
                }
            } else if (exclude && this.#isMatching(url, exclude)) {
                logger.debug('matching exclude pattern:', exclude);
                isAllowed = false;
            }
        }

        logger.debug(isAllowed ? 'allowed' : 'not allowed');
        return isAllowed;
    }

    #shouldInjectAuthToken(url: string): boolean {
        const injectToken = this.#manager.getSettings().automaticInjectToken ?? false;
        return (injectToken !== false) && this.#isAllowedRequest(url, injectToken);
    }

    #getAuthorizationHeaderName(): string {
        const injectToken = this.#manager.getSettings().automaticInjectToken;
        if (typeof injectToken !== 'boolean' && injectToken?.headerName) {
            return injectToken.headerName;
        }
        return 'Authorization';
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
                            const headerName = this.#getAuthorizationHeaderName();
                            logger.debug(`adding "${headerName}" bearer to header request`);
                            if (Array.isArray(init.headers)) {
                                init.headers.push([headerName, `Bearer ${accessToken}`]);
                            } else if (init.headers instanceof Headers) {
                                init.headers.append(headerName, `Bearer ${accessToken}`);
                            } else {
                                init.headers = {
                                    ...init.headers,
                                    [headerName]: `Bearer ${accessToken}`
                                };
                            }
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

                XMLHttpRequest.prototype.open = function(method: string, url: string | URL, ...rest: unknown[]): void {
                    this.url = url;
                    // @ts-expect-error Rest should not be of type unknown
                    interceptor.#originalXmlHttpRequestOpen.apply(this, [method, url, ...rest]);
                };

                XMLHttpRequest.prototype.send = function(body?: Document | XMLHttpRequestBodyInit | null): void {
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
                    };

                    // Add token to request headers
                    const shouldInjectToken = url ? interceptor.#shouldInjectAuthToken(url) : false;
                    if (this.readyState === XMLHttpRequest.OPENED && shouldInjectToken) {
                        interceptor.#manager.getAccessToken()
                            .then(accessToken => {
                                if (accessToken) {
                                    const headerName = interceptor.#getAuthorizationHeaderName();
                                    logger.debug(`adding "${headerName}" bearer to header request`);
                                    this.setRequestHeader(headerName, `Bearer ${accessToken}`);
                                }
                            })
                            .catch((error: unknown) => {
                                logger.error(error);
                            })
                            .finally(() => {
                                interceptor.#originalXmlHttpRequestSend.apply(this, [body]);
                            });
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
