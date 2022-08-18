import jwtDecode from 'jwt-decode';

export class AuthUtils {
    public static isCordova = (): boolean => !!(window.cordova || window.phonegap || window.PhoneGap);

    public static isCapacitor = (): boolean => !!(window.Capacitor?.isNativePlatform());

    public static isNativeMobile = (): boolean => AuthUtils.isCapacitor() || AuthUtils.isCordova();

    public static decodeJwt = <O>(value?: string): O | string | undefined => {
        try {
            if (value) {
                return jwtDecode<O>(value);
            }
            return value;
        } catch {
            console.warn('[@badisi/auth-js] Access token was not decoded as it is not a valid JWT.');
            return value;
        }
    };

    public static isUrlMatching = (url1: string, url2?: string): boolean => ((url2 !== undefined) && url1.includes(url2));

    public static getBaseUrl = (): string => {
        const baseUrl = document.baseURI || document.querySelector('base')?.href || location.origin;
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
