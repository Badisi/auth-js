import { AuthSubscription, AuthUtils } from '@badisi/auth-js/core';
import { DemoAppDebugElement, DemoAppMainElement, DemoAppSettingsElement } from 'demo-app-common';

import { environment } from '../environments/environment';

const template = document.createElement('template');
template.innerHTML = `
    <demo-app-main>
        <demo-app-debug tabLabel="Debug"></demo-app-debug>
        <demo-app-settings tabLabel="Settings"></demo-app-settings>
    </demo-app-main>
`;

export class AppElement extends HTMLElement {
    private demoAppMainEl?: DemoAppMainElement;
    private demoAppDebugEl?: DemoAppDebugElement;
    private authManagerSubs: AuthSubscription[] = [];
    private listeners: (() => void)[] = [];

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot?.appendChild(document.importNode(template.content, true));
    }

    public connectedCallback(): void {
        this.demoAppMainEl = this.shadowRoot?.querySelector('demo-app-main') as DemoAppMainElement;
        this.demoAppDebugEl = this.shadowRoot?.querySelector('demo-app-debug') as DemoAppDebugElement;

        const demoAppSettingsEl = this.shadowRoot?.querySelector('demo-app-settings') as DemoAppSettingsElement;
        demoAppSettingsEl.isDev = !environment.production;

        this.listenForHeaderEvents();
        this.listenForAuthChanges();
    }

    public disconnectedCallback(): void {
        this.authManagerSubs.forEach(sub => sub.unsubscribe());
        this.listeners.forEach(rm => rm());
    }

    // --- HELPER(s) ---

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

    private listenForHeaderEvents(): void {
        const manager = window.authManager;
        if (manager && this.demoAppMainEl) {
            const login = () => void manager.login();
            this.demoAppMainEl.addEventListener('login', login);

            const logout = () => void manager.logout('/').then(() => location.href = '/');
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
