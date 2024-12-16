import jwtDecode from 'jwt-decode';

import { AuthLogger } from './auth-logger';

const logger = new AuthLogger('AuthUtils');

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthUtils {
    public static isCordova = (): boolean =>
        typeof window.cordova !== 'undefined' || typeof window.phonegap !== 'undefined' || typeof window.PhoneGap !== 'undefined';

    public static isCapacitor = (): boolean => !!(window.Capacitor?.isNativePlatform());

    public static isNativeMobile = (): boolean => AuthUtils.isCapacitor() || AuthUtils.isCordova();

    public static decodeJwt = (value?: string): unknown => {
        try {
            return value ? jwtDecode(value) : value;
        } catch {
            logger.createChild('decodeJwt').warn('Token was not decoded as it is not a valid JWT.');
            return value;
        }
    };

    /**
     * Matches a full or partial url against another one.
     * Search parameters will be matched no matter their order.
     * @param url1 Reference url
     * @param url2 Url to match against the reference url
     * @returns
     */
    public static isUrlMatching = (url1: string, url2?: string): boolean => {
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
                if ((uri1.protocol !== uri2.protocol) ||
                    (uri1.origin !== uri2.origin) ||
                    !`${uri1.origin}${uri1.pathname}}`.includes(`${uri2.origin}${uri2.pathname}`)
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

    public static getBaseUrl = (): string => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        let baseUrl = document.baseURI ?? document.querySelector('base')?.href ?? location;
        baseUrl = new URL(baseUrl).origin; // remove query params
        return (baseUrl.endsWith('/')) ? baseUrl : `${baseUrl}/`;
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static stringToURL = (url: string): URL => {
        try {
            return new URL(url);
        } catch {
            const pathUrl = (!url.startsWith('/')) ? url : url.substring(1, url.length);
            return new URL(`${AuthUtils.getBaseUrl()}${pathUrl}`);
        }
    };
}
