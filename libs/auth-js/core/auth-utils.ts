import jwtDecode from 'jwt-decode';

import { AuthLogger } from './auth-logger';

let _logger: AuthLogger | undefined;
const getLogger = (): AuthLogger => (_logger ??= new AuthLogger('AuthUtils'));

export const isCordova = (): boolean =>
    typeof window.cordova !== 'undefined' || typeof window.phonegap !== 'undefined' || typeof window.PhoneGap !== 'undefined';

export const isCapacitor = (): boolean => !!(window.Capacitor?.isNativePlatform());

export const isNativeMobile = (): boolean => isCapacitor() || isCordova();

export const decodeJwt = (value?: string): unknown => {
    try {
        return value ? jwtDecode(value) : value;
    } catch {
        getLogger().createChild('decodeJwt').warn('Token was not decoded as it is not a valid JWT.');
        return value;
    }
};

/**
 * Matches a full or partial url against another one.
 * Search parameters will be matched no matter their order.
 * @internal
 * @param url1 Reference url
 * @param url2 Url to match against the reference url
 * @returns Returns true if both urls matches pathname, origin and search parameters, or false otherwise.
 */
export const isUrlMatching = (url1: string, url2?: string): boolean => {
    if (url2 !== undefined) {
        const uri1 = new URL(url1, 'http://test');
        const uri2 = new URL(url2, 'http://test');

        // Check pathnames
        if ((uri2.pathname !== '') && (uri2.pathname !== '/')) {
            if (!uri1.pathname.includes(uri2.pathname)) {
                return false;
            }
        }
        // Check origins (if uri2 has one)
        if (uri2.origin !== 'http://test') {
            if ((uri1.protocol !== uri2.protocol)
              || (uri1.origin !== uri2.origin)
              || !`${uri1.origin}${uri1.pathname}}`.includes(`${uri2.origin}${uri2.pathname}`)
            ) {
                return false;
            }
        }
        // Check search params
        let matching = true;
        uri2.searchParams.forEach((value, key) => {
            if (!uri1.searchParams.getAll(key).includes(value)) {
                matching = false;
            }
        });
        return matching;
    }
    return false;
};

/**
 * Gets the base url of the application, by looking at the <base> tag if it exists, or using the window location otherwise.
 * @internal
 * @returns The base url of the application, with a trailing slash.
 */
export const getBaseUrl = (): string => {
    let baseUrl = document.querySelector('base')?.href ?? window.location.origin;
    const url = new URL(baseUrl);
    baseUrl = `${url.origin}${url.pathname}`; // remove any query params (just in case)
    return (baseUrl.endsWith('/')) ? baseUrl : `${baseUrl}/`;
};

/**
 * Converts a string to a URL object.
 * If the string is a relative url, it will be resolved against the base url of the application.
 * @internal
 * @param url The string to convert.
 * @returns The URL object corresponding to the given string.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const stringToURL = (url: string): URL => {
    try {
        return new URL(url);
    } catch {
        const pathUrl = (!url.startsWith('/')) ? url : url.substring(1, url.length);
        return new URL(`${getBaseUrl()}${pathUrl}`);
    }
};

type PlainObject = Record<string, unknown>;

const isPlainObject = (item: unknown): item is PlainObject => {
    if (item && (typeof item === 'object')) {
        const proto = Object.getPrototypeOf(item) as unknown;
        return ((proto === null) || (proto === Object.prototype));
    }
    return false;
};

export const deepMerge = <T extends object>(target: T, ...sources: unknown[]): T => {
    const result = isPlainObject(target) ? target : {};

    sources.reduce<PlainObject>((acc, source) => {
        if (!isPlainObject(source)) { return acc; }

        Object.keys(source).forEach(key => {
            const sourceValue = source[key];
            const targetValue = acc[key];

            if (isPlainObject(sourceValue)) {
                if (!isPlainObject(targetValue)) {
                    acc[key] = {};
                }
                deepMerge(acc[key] as object, sourceValue);
            } else if (Array.isArray(sourceValue)) {
                if (!Array.isArray(targetValue)) {
                    acc[key] = [];
                }

                const targetArray = acc[key] as unknown[];

                sourceValue.forEach((item, i) => {
                    if (isPlainObject(item)) {
                        if (!isPlainObject(targetArray[i])) {
                            targetArray[i] = {};
                        }
                        deepMerge(targetArray[i] as object, item);
                    } else {
                        targetArray[i] = item;
                    }
                });
            } else if (sourceValue !== undefined) {
                acc[key] = sourceValue;
            }
        });

        return acc;
    }, result);

    return result as unknown as T;
};
