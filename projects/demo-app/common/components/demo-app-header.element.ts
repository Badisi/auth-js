import { globalStyle } from '../core';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        ${globalStyle}

        :host header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            align-items: center;
            height: 110px;
            color: white;
            background: rgb(103, 58, 183);
            background: linear-gradient(180deg, rgba(103, 58, 183, 1) 0%, rgba(94, 53, 177, 1) 100%);
        }

        :host header .github-icon {
            position: absolute;
            top: 20px;
            right: 22px;
            width: 26px;
            height: 26px;
            color: white;
        }

        :host header .status.authenticated {
            background-color: #7CB342;
        }

        :host header .status {
            position: absolute;
            top: 25px;
            right: 56px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: #EC407A;
            margin-top: 1px;
            margin-right: 8px;
        }

        :host header .title {
            align-items: center;
            margin: 10px 0;
            font-size: 28px;
            font-weight: 400;
            color: #ede7f6;
        }

        :host header .title select {
            cursor: pointer;
            text-align: center;
            font-size: 28px;
            font-weight: bold;
            color: #ede7f6;
            background: none;
            border: none;
            outline: none;
        }

        :host header button {
            margin-top: 2px;
        }

        :host header button:not(:last-child) {
            margin-right: 10px;
        }
    </style>

    <header class="column">
        <div class="status"></div>

        <a class="github-icon"
            href="https://github.com/Badisi/auth-js"
            target="_blank"
            title="View it on GitHub"
            aria-label="GitHub repository">
            <span>
                <svg viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor"
                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12">
                    </path>
                </svg>
            </span>
        </a>

        <div class="title row">
            &#123; <select id="implementation-select"></select> &#125; Demo app
        </div>

        <div class="row">
            <button id="login-button">LOGIN</button>
            <button id="logout-button">LOGOUT</button>
            <button id="silent-renew-button">SILENT RENEW</button>
        </div>
    </header>
`;

export class DemoAppHeaderElement extends HTMLElement {
    private listeners: (() => void)[] = [];

    private statusEl?: HTMLElement | null;
    private loginButtonEl?: HTMLElement | null;
    private logoutButtonEl?: HTMLElement | null;
    private silentRenewButtonEl?: HTMLElement | null;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot?.appendChild(document.importNode(template.content, true));

        this.statusEl = this.shadowRoot?.querySelector('.status');
        this.loginButtonEl = this.shadowRoot?.querySelector('#login-button');
        this.logoutButtonEl = this.shadowRoot?.querySelector('#logout-button');
        this.silentRenewButtonEl = this.shadowRoot?.querySelector('#silent-renew-button');

        this.refreshStatus(false);
    }

    public set isAuthenticated(value: boolean) {
        this.refreshStatus(value);
    }

    public connectedCallback(): void {
        const selectEl = this.shadowRoot?.querySelector('#implementation-select') as HTMLSelectElement;
        window.authSettings.getImplementations().forEach((item, index) => {
            const optionEl = document.createElement('option');
            optionEl.selected = (index === window.authSettings.getCurrentImplementationIndex());
            optionEl.value = String(item.label);
            optionEl.textContent = item.label;
            selectEl?.appendChild(optionEl);
        });

        const changeCb = (): void => {
            window.authSettings.saveCurrentImplementationIndex(selectEl.selectedIndex);
            window.location.href = window.authSettings.getImplementations()[selectEl.selectedIndex].url;
        };
        selectEl?.addEventListener('change', changeCb);
        this.listeners.push(() => selectEl.removeEventListener('change', changeCb));

        this.addEventListeners();
    }

    public disconnectedCallback(): void {
        this.listeners.forEach(rm => rm());
    }

    // --- HELPER(s) ---

    private addEventListeners(): void {
        const login = (): boolean => this.dispatchEvent(new Event('login', { bubbles: true, composed: true }));
        this.loginButtonEl?.addEventListener('click', login);

        const logout = (): boolean => this.dispatchEvent(new Event('logout', { bubbles: true, composed: true }));
        this.logoutButtonEl?.addEventListener('click', logout);

        const silentRenew = (): boolean => this.dispatchEvent(new Event('silentRenew', { bubbles: true, composed: true }));
        this.silentRenewButtonEl?.addEventListener('click', silentRenew);

        this.listeners.push(
            () => this.loginButtonEl?.removeEventListener('click', login),
            () => this.logoutButtonEl?.removeEventListener('click', logout),
            () => this.silentRenewButtonEl?.removeEventListener('click', silentRenew)
        );
    }

    private refreshStatus(value: boolean): void {
        if (this.statusEl) {
            this.statusEl.title = (value) ? 'Authenticated' : 'Not authenticated';
            this.statusEl.classList[(value) ? 'add' : 'remove']('authenticated');
        }
    }
}

window.customElements.define('demo-app-header', DemoAppHeaderElement);
