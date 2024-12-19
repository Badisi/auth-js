import { globalStyle, prettyPrint } from '../core';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        ${globalStyle}

        :host {
            display: flex;
            flex: 1;
            flex-direction: column;
            padding: 20px 28px;
        }

        :host .card.apis input {
            width: 100%; /* fix for android-chrome */
        }

        :host .card.apis .card-actions {
            padding-bottom: 16px;
        }

        :host .card.apis .card-actions button {
            margin-left: 14px;
        }

        :host .card.routes {
            margin-top: 20px;
        }

        :host .card.routes .route {
            display: flex;
            align-items: center;
        }

        :host .card.routes .route.query-params {
            margin: 0 0 10px 10px;
        }

        :host .card.routes .route.query-params .info {
            display: flex;
            flex-direction: row;
        }

        :host .card.routes .route.query-params .info .text {
            font-size: 16px;
            color: black;
            margin-right: 12px;
        }

        :host .card.routes .route.query-params .info input {
            width: 500px;
        }

        :host .card.routes .route button {
            padding: 2px 10px;
            min-width: 104px;
            margin: 8px 12px 8px 8px;
        }

        :host .card.routes .route input {
            margin: 0 2px;
            padding: 4px;
        }

        :host .card.routes .route .info {
            padding-bottom: 2px;
            font-size: 14px;
            line-height: 22px;
            text-align: left;
            color: #0000008a;
        }

        :host .card.routes .box {
            height: 100px;
        }

        @media only screen and (max-width: 600px) {
            :host .card.apis .card-actions {
                flex-direction: column;
                margin-left: 3px;
            }
            :host .card.apis .card-actions button {
                margin-top: 12px;
                margin-left: 0;
                padding: 2px 10px;
                min-width: 104px;
                align-self: flex-start;
            }
            :host .card.apis .input label {
                text-align: left;
            }
            :host .card.apis .input {
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
            }
            :host .card.apis input {
                width: inherit;
                align-self: normal;
            }

            :host .card.routes {
                margin-top: 12px;
            }
            :host .card.routes .route {
                margin-left: 3px !important;
            }
            :host .card.routes .route.query-params .info {
                display: flex;
                flex-direction: column;
                flex: 1;
                gap: 8px;
            }
            :host .card.routes .route.query-params .info input {
                margin: 0;
                width: inherit;
                align-self: normal;
            }
            :host .card.routes .route #roles-input {
                width: 90%;
            }
            :host .card.routes .route button {
                margin-left: 3px;
            }
        }
    </style>

    <div class="card apis">
        <div class="card-title row">
            APIs access
            <div id="api-status" class="card-status"></div>
        </div>
        <div class="card-actions row">
            <div class="column flex">
                <div class="input row">
                    <label for="api-url-input">Url</label>
                    <input id="api-url-input" class="flex" />
                </div>
                <div class="input row">
                    <label for="api-headers-input">Custom headers</label>
                    <input id="api-headers-input" class="flex" placeholder='ex: name1:one, name2=two' />
                </div>
            </div>
            <button id="api-get-button">GET</button>
        </div>
        <div class="box">
            <code>
                <pre id="api-response"></pre>
            </code>
        </div>
    </div>

    <div class="card routes">
        <div class="card-title">
            Guards access
        </div>
        <div class="card-actions column">
            <div class="route query-params">
                <div class="info">
                    <div class="text">Query params</div>
                    <input
                        id="guards-query-params-input"
                        placeholder="ex: param1=one&param2=two" />
                </div>
            </div>
            <div class="route">
                <button id="guards-home-button">HOME</button>
                <div class="info">Home page</div>
            </div>
            <div class="route">
                <button id="guards-public-button">PUBLIC</button>
                <div class="info">Public content (no login required)</div>
            </div>
            <div class="route">
                <button id="guards-private-button">PRIVATE</button>
                <div class="info">Private content (login required)</div>
            </div>
            <div class="route">
                <button id="guards-protected-button">PROTECTED</button>
                <div class="info">
                    Protected content (login required + role(s):<input id="guards-roles-input" />)
                </div>
            </div>
        </div>
        <div class="box">
            <slot id="cards"></slot>
        </div>
    </div>
`;

export class DemoAppPlaygroundElement extends HTMLElement {
    private listeners: (() => void)[] = [];

    private apiStatusEl?: HTMLElement | null;
    private apiResponseEl?: HTMLElement | null;
    private apiUrlEl?: HTMLInputElement | null;
    private apiHeadersEl?: HTMLInputElement | null;
    private apiBtnEl?: HTMLButtonElement | null;

    private guardsHomeBtnEl?: HTMLButtonElement | null;
    private guardsPublicBtnEl?: HTMLButtonElement | null;
    private guardsPrivateBtnEl?: HTMLButtonElement | null;
    private guardsProtectedBtnEl?: HTMLButtonElement | null;
    private guardsQueryParamsEl?: HTMLInputElement | null;
    private guardsRolesEl?: HTMLInputElement | null;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot?.appendChild(document.importNode(template.content, true));

        this.apiStatusEl = this.shadowRoot?.querySelector<HTMLElement>('#api-status');
        this.apiResponseEl = this.shadowRoot?.querySelector<HTMLElement>('#api-response');
        this.apiUrlEl = this.shadowRoot?.querySelector<HTMLInputElement>('#api-url-input');
        this.apiHeadersEl = this.shadowRoot?.querySelector<HTMLInputElement>('#api-headers-input');
        this.apiBtnEl = this.shadowRoot?.querySelector<HTMLButtonElement>('#api-get-button');

        this.guardsHomeBtnEl = this.shadowRoot?.querySelector<HTMLButtonElement>('#guards-home-button');
        this.guardsPublicBtnEl = this.shadowRoot?.querySelector<HTMLButtonElement>('#guards-public-button');
        this.guardsPrivateBtnEl = this.shadowRoot?.querySelector<HTMLButtonElement>('#guards-private-button');
        this.guardsProtectedBtnEl = this.shadowRoot?.querySelector<HTMLButtonElement>('#guards-protected-button');
        this.guardsQueryParamsEl = this.shadowRoot?.querySelector<HTMLInputElement>('#guards-query-params-input');
        this.guardsRolesEl = this.shadowRoot?.querySelector<HTMLInputElement>('#guards-roles-input');
    }

    public connectedCallback(): void {
        // Event listeners
        const apiCb = (event: KeyboardEvent | Event): boolean => {
            if ('key' in event && event.key !== 'Enter') {
                return true;
            } else {
                const headers = this.apiHeadersEl?.value.split(',').reduce((acc, header) => {
                    if (header) {
                        const quoteRegex = /^"?([^"]*)"?$/;
                        const item = header.split(':');
                        const name = quoteRegex.exec(item[0]?.trim())?.[1] ?? '';
                        const value = quoteRegex.exec(item[1]?.trim())?.[1] ?? '';
                        if (name) {
                            acc[name] = value;
                        }
                    }
                    return acc;
                }, {} as Record<string, unknown>);

                const customEvent = new CustomEvent('api', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        url: this.apiUrlEl?.value,
                        headers
                    }
                });
                return this.dispatchEvent(customEvent);
            }
        };
        this.apiBtnEl?.addEventListener('click', apiCb);
        this.apiUrlEl?.addEventListener('keydown', apiCb);
        this.apiHeadersEl?.addEventListener('keydown', apiCb);

        const apiUrlCb = (): void => { this.saveSettings({ apiUrl: this.apiUrlEl?.value }); };
        this.apiUrlEl?.addEventListener('input', apiUrlCb);

        const apiHeadersCb = (): void => { this.saveSettings({ apiHeaders: this.apiHeadersEl?.value }); };
        this.apiHeadersEl?.addEventListener('input', apiHeadersCb);

        const guardsQueryParamsCb = (): void => { this.saveSettings({ queryParams: this.guardsQueryParamsEl?.value }); };
        this.guardsQueryParamsEl?.addEventListener('input', guardsQueryParamsCb);

        const guardsRolesCb = (): void => { this.saveSettings({ roles: this.guardsRolesEl?.value }); };
        this.guardsRolesEl?.addEventListener('input', guardsRolesCb);

        const guardsCb = (eventName: string): boolean => {
            const queryParams: Record<string, unknown> = {};
            this.guardsQueryParamsEl?.value.split('&').forEach(attr => {
                const vals = attr.split('=');
                if (vals.length === 2) {
                    queryParams[vals[0]] = vals[1];
                }
            });
            return this.dispatchEvent(new CustomEvent(eventName, {
                bubbles: true,
                composed: true,
                detail: {
                    queryParams
                }
            }));
        }

        const guardsHomeCb = (): boolean => guardsCb('home');
        this.guardsHomeBtnEl?.addEventListener('click', guardsHomeCb);

        const guardsPublicCb = (): boolean => guardsCb('public');
        this.guardsPublicBtnEl?.addEventListener('click', guardsPublicCb);

        const guardsPrivateCb = (): boolean => guardsCb('private');
        this.guardsPrivateBtnEl?.addEventListener('click', guardsPrivateCb);

        const guardsProtectedCb = (event: KeyboardEvent | Event): boolean => {
            if ('key' in event && event.key !== 'Enter') {
                return true;
            } else {
                return guardsCb('protected');
            }
        };
        this.guardsProtectedBtnEl?.addEventListener('click', guardsProtectedCb);
        this.guardsRolesEl?.addEventListener('keydown', guardsProtectedCb);

        this.listeners.push(
            () => this.apiBtnEl?.removeEventListener('click', apiCb),
            () => this.apiUrlEl?.removeEventListener('keydown', apiCb),
            () => this.apiHeadersEl?.removeEventListener('keydown', apiCb),
            () => this.apiUrlEl?.removeEventListener('input', apiUrlCb),
            () => this.apiHeadersEl?.removeEventListener('input', apiHeadersCb),
            () => this.guardsQueryParamsEl?.removeEventListener('input', guardsQueryParamsCb),
            () => this.guardsRolesEl?.removeEventListener('input', guardsRolesCb),
            () => this.guardsHomeBtnEl?.removeEventListener('click', guardsHomeCb),
            () => this.guardsPrivateBtnEl?.removeEventListener('click', guardsPrivateCb),
            () => this.guardsProtectedBtnEl?.removeEventListener('click', guardsProtectedCb),
            () => this.guardsRolesEl?.removeEventListener('keydown', guardsProtectedCb)
        );

        // Initialize form
        const { otherSettings } = window.appSettings.getCurrentSettings();
        if (this.apiUrlEl) {
            this.apiUrlEl.value = otherSettings?.apiUrl ?? '';
        }
        if (this.apiHeadersEl) {
            this.apiHeadersEl.value = otherSettings?.apiHeaders ?? '';
        }
        if (this.guardsQueryParamsEl) {
            this.guardsQueryParamsEl.value = otherSettings?.queryParams ?? '';
        }
        if (this.guardsRolesEl) {
            this.guardsRolesEl.value = otherSettings?.roles ?? '';
        }
    }

    public disconnectedCallback(): void {
        this.listeners.forEach(rm => { rm(); });
    }

    // --- API(s) ---

    public setApiStatus(data: unknown, isError: boolean): void {
        this.apiStatusEl?.classList.remove(isError ? 'success' : 'error');
        this.apiStatusEl?.classList.add(isError ? 'error' : 'success');
        if (this.apiResponseEl) {
            this.apiResponseEl.innerHTML = prettyPrint(data);
        }
    }

    public saveSettings(value: Record<string, unknown>): void {
        const currentSettings = window.appSettings.getCurrentSettings();
        currentSettings.otherSettings = {
            ...currentSettings.otherSettings,
            ...value
        };
        window.appSettings.addOrUpdateSettings(currentSettings);
    }
}

window.customElements.define('demo-app-playground', DemoAppPlaygroundElement);
