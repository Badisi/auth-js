import { type AuthSubscription, AuthUtils } from '@badisi/auth-js';
import { type DemoAppDebugElement, type DemoAppMainElement, type DemoAppPlaygroundElement, rolesValidator } from 'demo-app-common';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host #demo-app-playground-content {
            display: flex;
            justify-content: center;
            align-items: center;
            text-transform: uppercase;
            height: 100%;
            margin: 0;
            color: #bdbdbd;
        }
    </style>

    <demo-app-main>
        <demo-app-playground tabLabel="Playground">
            <h2 id="demo-app-playground-content"></h2>
        </demo-app-playground>
        <demo-app-debug tabLabel="Debug"></demo-app-debug>
        <demo-app-settings tabLabel="Settings"></demo-app-settings>
    </demo-app-main>
`;

export class AppElement extends HTMLElement {
    private demoAppMainEl?: DemoAppMainElement | null;
    private demoAppPlaygroundEl?: DemoAppPlaygroundElement | null;
    private demoAppDebugEl?: DemoAppDebugElement | null;
    private authManagerSubs: AuthSubscription[] = [];
    private listeners: (() => void)[] = [];

    public constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot?.appendChild(document.importNode(template.content, true));
    }

    public connectedCallback(): void {
        this.demoAppMainEl = this.shadowRoot?.querySelector<DemoAppMainElement>('demo-app-main');
        this.demoAppPlaygroundEl = this.shadowRoot?.querySelector<DemoAppPlaygroundElement>('demo-app-playground');
        this.demoAppDebugEl = this.shadowRoot?.querySelector<DemoAppDebugElement>('demo-app-debug');

        this.listenForHeaderEvents();
        this.listenForPlaygroundEvents();
        this.listenForAuthChanges();
        this.installGuard();
    }

    public disconnectedCallback(): void {
        this.authManagerSubs.forEach(sub => {
            sub.unsubscribe();
        });
        this.listeners.forEach(rm => {
            rm();
        });
    }

    // --- HELPER(s) ---

    private callPrivateApi(url: string, headers?: Record<string, string | number>): void {
        if (url) {
            const req = new XMLHttpRequest();
            req.onreadystatechange = (): void => {
                if (req.readyState === XMLHttpRequest.DONE) {
                    let resp: string | Record<string, unknown>;
                    try {
                        resp = JSON.parse(req.responseText) as string;
                    } catch {
                        resp = {
                            status: req.status,
                            statusText: (req.statusText !== '') ? req.statusText : 'Unknown Error',
                            url: req.url
                        };
                    }
                    this.demoAppPlaygroundEl?.setApiStatus(resp, (req.status !== 200));
                }
            };
            req.open('GET', url, true);
            if (headers) {
                Object.entries(headers).forEach(([key, value]) => {
                    req.setRequestHeader(key, String(value));
                });
            }
            req.send();
        }
    }

    private async callGuard(url = location.href): Promise<void> {
        const contentEl = this.demoAppPlaygroundEl?.querySelector('#demo-app-playground-content');
        if (contentEl) {
            const pathname = (new URL(url)).pathname.slice(1);
            if (['protected', 'private'].includes(pathname)) {
                const options = (pathname === 'protected') ? { validator: rolesValidator() } : undefined;
                const isAllowed = await window.authManager.runGuard(url, options);

                if (typeof isAllowed === 'string') {
                    contentEl.textContent = isAllowed;
                } else if (isAllowed) {
                    contentEl.textContent = `${pathname} content`;
                }
            } else if (pathname === 'public') {
                contentEl.textContent = 'public content';
            } else {
                contentEl.textContent = '';
            }
        }
    }

    private installGuard(): void {
        const originalPushState = history.pushState.bind(history);
        history.pushState = (...args): void => {
            originalPushState(...args);
            void this.callGuard();
        };
        const originalReplaceState = history.replaceState.bind(history);
        history.replaceState = (...args): void => {
            originalReplaceState(...args);
            void this.callGuard();
        };
    }

    private refreshInfo(key: string, value?: boolean | string | Record<string, unknown>): void {
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
                    this.demoAppDebugEl.userSession = value as Record<string, unknown>;
                    break;
                case 'accessToken':
                    this.demoAppDebugEl.accessToken = value as string;
                    this.demoAppDebugEl.accessTokenDecoded = AuthUtils.decodeJwt(value as string) as Record<string, unknown>;
                    break;
                case 'idToken':
                    this.demoAppDebugEl.idToken = value as string;
                    this.demoAppDebugEl.idTokenDecoded = AuthUtils.decodeJwt(value as string) as Record<string, unknown>;
                    break;
                case 'userProfile':
                    this.demoAppDebugEl.userProfile = value as Record<string, unknown>;
                    break;
                default: break;
            }
        }
    }

    private listenForAuthChanges(): void {
        const manager = window.authManager;
        this.authManagerSubs.push(
            manager.onRenewingChanged(value => {
                this.refreshInfo('renewing', value);
            }),
            manager.onAuthenticatedChanged(value => {
                this.refreshInfo('authenticated', value);
            }),
            manager.onUserSessionChanged(value => {
                this.refreshInfo('userSession', value as Record<string, unknown> | undefined);
            }),
            manager.onAccessTokenChanged(value => {
                this.refreshInfo('accessToken', value);
            }),
            manager.onIdTokenChanged(value => {
                this.refreshInfo('idToken', value);
            }),
            manager.onUserProfileChanged(value => {
                this.refreshInfo('userProfile', value);
            })
        );
    }

    private listenForPlaygroundEvents(): void {
        /* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access */
        if (this.demoAppPlaygroundEl) {
            const callApi = ((event: CustomEvent): void => {
                this.callPrivateApi(event.detail?.url, event.detail?.headers);
            }) as EventListener;
            this.demoAppPlaygroundEl.addEventListener('api', callApi);
            this.listeners.push(() => this.demoAppPlaygroundEl?.removeEventListener('api', callApi));

            const callNavigate = ((event: CustomEvent): void => {
                const url = new URL(event.type, location.origin);
                Object.entries(event.detail?.queryParams as Record<string, string>).forEach(([key, value]) => {
                    url.searchParams.set(key, value);
                });
                history.pushState({}, '', url);
            }) as EventListener;
            this.demoAppPlaygroundEl.addEventListener('home', callNavigate);
            this.listeners.push(() => this.demoAppPlaygroundEl?.removeEventListener('home', callNavigate));
            this.demoAppPlaygroundEl.addEventListener('public', callNavigate);
            this.listeners.push(() => this.demoAppPlaygroundEl?.removeEventListener('public', callNavigate));
            this.demoAppPlaygroundEl.addEventListener('private', callNavigate);
            this.listeners.push(() => this.demoAppPlaygroundEl?.removeEventListener('private', callNavigate));
            this.demoAppPlaygroundEl.addEventListener('protected', callNavigate);
            this.listeners.push(() => this.demoAppPlaygroundEl?.removeEventListener('protected', callNavigate));
        }
        /* eslint-enable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access */
    }

    private listenForHeaderEvents(): void {
        if (this.demoAppMainEl) {
            const manager = window.authManager;

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
