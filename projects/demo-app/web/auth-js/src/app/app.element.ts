/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AuthSubscription, AuthUtils } from '@badisi/auth-js/core';
import { DemoAppDebugElement, DemoAppMainElement, DemoAppPlaygroundElement } from 'demo-app-common';

const template = document.createElement('template');
template.innerHTML = `
    <demo-app-main>
        <demo-app-playground tabLabel="Playground"></demo-app-playground>
        <demo-app-debug tabLabel="Debug"></demo-app-debug>
        <demo-app-settings tabLabel="Settings"></demo-app-settings>
    </demo-app-main>
`;

export class AppElement extends HTMLElement {
    private demoAppMainEl?: DemoAppMainElement;
    private demoAppPlaygroundEl?: DemoAppPlaygroundElement;
    private demoAppDebugEl?: DemoAppDebugElement;
    private authManagerSubs: AuthSubscription[] = [];
    private listeners: (() => void)[] = [];

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot?.appendChild(document.importNode(template.content, true));
    }

    public connectedCallback(): void {
        this.demoAppMainEl = this.shadowRoot!.querySelector<DemoAppMainElement>('demo-app-main')!;
        this.demoAppPlaygroundEl = this.shadowRoot!.querySelector<DemoAppPlaygroundElement>('demo-app-playground')!;
        this.demoAppDebugEl = this.shadowRoot!.querySelector<DemoAppDebugElement>('demo-app-debug')!;

        this.listenForHeaderEvents();
        this.listenForPlaygroundEvents();
        this.listenForAuthChanges();
    }

    public disconnectedCallback(): void {
        this.authManagerSubs.forEach(sub => sub.unsubscribe());
        this.listeners.forEach(rm => rm());
    }

    // --- HELPER(s) ---

    private async callPrivateApi(url: string, headers: string): Promise<void> {
        if (window.authManager && url) {
            const token = await window.authManager.getAccessToken() ?? '';
            const req = new XMLHttpRequest();
            req.onreadystatechange = (): void => {
                if (req.readyState === 4) { // 4 = DONE
                    let resp;
                    try {
                        resp = JSON.parse(req.responseText ?? '') as string;
                    } catch {
                        resp = `${req.status} ${req.statusText}`;
                    }
                    this.demoAppPlaygroundEl?.setApiStatus(resp, (req.status !== 200));
                }
            };
            req.open('GET', url, true);
            req.setRequestHeader('Authorization', `Bearer ${token}`);
            headers?.split(';').forEach(header => {
                if (header) {
                    const quoteRegex = /^"?([^"]*)"?$/;
                    const item = header.split(':');
                    const name = quoteRegex.exec(item[0]?.trim())?.[1] ?? '';
                    const value = quoteRegex.exec(item[1]?.trim())?.[1] ?? '';
                    req.setRequestHeader(name, value);
                }
            });
            req.send();
        }
    }

    private refreshInfo(key: string, value?: unknown): void {
        if (window.authManager) {
            if (this.demoAppMainEl && this.demoAppDebugEl) {
                switch (key) {
                    case 'renewing':
                        this.demoAppMainEl.isRenewing = value as boolean;
                        break;
                    case 'authenticated':
                        this.demoAppMainEl.isAuthenticated = value as boolean;
                        this.demoAppDebugEl.isAuthenticated = value as boolean;
                        break;
                    case 'userSession':
                        this.demoAppDebugEl.userSession = value;
                        break;
                    case 'accessToken':
                        this.demoAppDebugEl.accessToken = value as string;
                        this.demoAppDebugEl.accessTokenDecoded = AuthUtils.decodeJwt(value as string);
                        break;
                    case 'idToken':
                        this.demoAppDebugEl.idToken = value as string;
                        this.demoAppDebugEl.idTokenDecoded = AuthUtils.decodeJwt(value as string);
                        break;
                    case 'userProfile':
                        this.demoAppDebugEl.userProfile = value;
                        break;
                    default: break;
                }
            }
        }
    }

    private listenForAuthChanges(): void {
        const manager = window.authManager;
        if (manager) {
            this.authManagerSubs.push(
                manager.onRenewingChanged(value => this.refreshInfo('renewing', value)),
                manager.onAuthenticatedChanged(value => this.refreshInfo('authenticated', value)),
                manager.onUserSessionChanged(value => this.refreshInfo('userSession', value)),
                manager.onAccessTokenChanged(value => this.refreshInfo('accessToken', value)),
                manager.onIdTokenChanged(value => this.refreshInfo('idToken', value)),
                manager.onUserProfileChanged(value => this.refreshInfo('userProfile', value))
            );
        }
    }

    private listenForPlaygroundEvents(): void {
        if (this.demoAppPlaygroundEl) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            const callApi = ((event: CustomEvent): void => void this.callPrivateApi(event.detail?.url, event.detail?.headers)) as EventListener;
            this.demoAppPlaygroundEl.addEventListener('api', callApi);
            this.listeners.push(() => this.demoAppPlaygroundEl?.removeEventListener('api', callApi));
        }
    }

    private listenForHeaderEvents(): void {
        const manager = window.authManager;
        if (manager && this.demoAppMainEl) {
            const login = () => void manager.login();
            this.demoAppMainEl.addEventListener('login', login);

            const logout = () => void manager.logout({ redirectUrl: '/' }).then(() => {
                const baseUrl = document.baseURI || document.querySelector('base')?.href || location.origin;
                location.href = (baseUrl.endsWith('/')) ? baseUrl : `${baseUrl}/`;
            });
            this.demoAppMainEl.addEventListener('logout', logout);

            const silentRenew = () => void manager.renew();
            this.demoAppMainEl.addEventListener('silentRenew', silentRenew);

            this.listeners.push(
                () => this.demoAppMainEl?.removeEventListener('login', login),
                () => this.demoAppMainEl?.removeEventListener('logout', logout),
                () => this.demoAppMainEl?.removeEventListener('silentRenew', silentRenew)
            );
        }
    }
}
customElements.define('app-root', AppElement);
