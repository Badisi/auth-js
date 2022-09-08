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

        :host .card.apis .card-actions {
            padding-bottom: 16px;
        }

        :host .card.apis .card-actions button {
            margin-left: 14px;
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
                    <input id="api-headers-input" class="flex" placeholder='"name": "value";' />
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

    <slot id="cards"></slot>
`;

export class DemoAppPlaygroundElement extends HTMLElement {
    private listeners: (() => void)[] = [];

    private apiStatusEl: HTMLElement;
    private apiResponseEl: HTMLElement;
    private apiUrlEl: HTMLInputElement;
    private apiHeadersEl: HTMLInputElement;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot?.appendChild(document.importNode(template.content, true));

        this.apiStatusEl = this.shadowRoot?.querySelector('#api-status') as HTMLElement;
        this.apiResponseEl = this.shadowRoot?.querySelector('#api-response') as HTMLElement;
        this.apiUrlEl = this.shadowRoot?.querySelector('#api-url-input') as HTMLInputElement;
        this.apiHeadersEl = this.shadowRoot?.querySelector('#api-headers-input') as HTMLInputElement;
    }

    public connectedCallback(): void {
        // Event listeners
        const apiBtnEl = this.shadowRoot?.querySelector('#api-get-button');
        const apiBtnCb = (): boolean => {
            const customEvent = new CustomEvent('api', {
                bubbles: true,
                composed: true,
                detail: {
                    url: this.apiUrlEl.value,
                    headers: this.apiHeadersEl.value
                }
            });
            return this.dispatchEvent(customEvent);
        };
        apiBtnEl?.addEventListener('click', apiBtnCb);

        const apiUrlCb = (): void => this.saveSettings({ privateApiUrl: this.apiUrlEl.value });
        this.apiUrlEl?.addEventListener('input', apiUrlCb);

        const apiHeadersCb = (): void => this.saveSettings({ privateApiHeaders: this.apiHeadersEl.value });
        this.apiHeadersEl?.addEventListener('input', apiHeadersCb);

        this.listeners.push(
            () => apiBtnEl?.removeEventListener('click', apiBtnCb),
            () => this.apiUrlEl?.removeEventListener('input', apiUrlCb),
            () => this.apiHeadersEl?.removeEventListener('input', apiHeadersCb)
        );

        // Initialize form
        const { otherSettings } = window.appSettings.getCurrentUserSettings();
        this.apiUrlEl.value = otherSettings?.['privateApiUrl'] as string;
        this.apiHeadersEl.value = otherSettings?.['privateApiHeaders'] as string;
    }

    public disconnectedCallback(): void {
        this.listeners.forEach(rm => rm());
    }

    // --- API(s) ---

    public setApiStatus(data: unknown | Error, isError: boolean): void {
        this.apiStatusEl.classList.remove(isError ? 'success' : 'error');
        this.apiStatusEl.classList.add(isError ? 'error' : 'success');
        this.apiResponseEl.innerHTML = prettyPrint(data);
    }

    public saveSettings(value: Record<string, unknown>): void {
        const currentUserSettings = window.appSettings.getCurrentUserSettings();
        currentUserSettings.otherSettings = {
            ...currentUserSettings.otherSettings,
            ...value
        };
        window.appSettings.addOrUpdateUserSettings(currentUserSettings);
    }
}

window.customElements.define('demo-app-playground', DemoAppPlaygroundElement);
