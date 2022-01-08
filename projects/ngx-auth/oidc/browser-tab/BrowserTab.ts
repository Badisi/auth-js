import { Log, UserManagerSettings } from 'oidc-client';

export class BrowserTab {
    private params: UserManagerSettings;
    private resolve: (value?: any) => void;
    private reject: (reason?: any) => void;

    constructor(params: UserManagerSettings) {
        Log.debug('BrowserTab.ctor: redirect_uri: ' + (params as any).redirect_uri);
        this.params = params;
    }

    // ---- PUBLIC API(s) ----

    navigate(params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;

            if (params && params.url) {
                if ((window as any).cordova) {
                    this.useBrowserTab(params.url);
                } else {
                    this.onError('BrowserTab: cordova is undefined');
                }
            } else {
                this.onError('BrowserTab: no url provided');
            }
        });
    }

    close(): void {
        this.cleanup();
    }

    // ---- HELPER(s) ----

    private useBrowserTab(url: string): void {
        const cordova = (window as any).cordova;
        if (cordova && cordova.plugins.browsertab) {
            cordova.plugins.browsertab.openUrl(
                url,
                { scheme: this.params.redirect_uri },
                (event: string) => this.onSuccess(event),
                () => this.onError('BrowserTab: error opening browser')
            );
        } else {
            this.onError('BrowserTab: cordova.plugins.browsertab is undefined');
        }
    }

    // --- various ---

    private onSuccess(url: string): void {
        Log.debug('BrowserTab: successful response', url);
        this.cleanup();
        this.resolve({ url });
    }

    private onError(message: string): void {
        Log.error(message);
        this.cleanup();
        this.reject(new Error(message));
    }

    private cleanup(): void {
        Log.debug('BrowserTab: cleaning up');
        const cordova = (window as any).cordova;
        if (cordova && cordova.plugins.browsertab) {
            cordova.plugins.browsertab.close();
        }
    }
}
