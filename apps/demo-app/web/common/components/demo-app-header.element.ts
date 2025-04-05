import { globalStyle } from '../core';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        ${globalStyle}

        :host header {
            z-index: 1;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding: calc(8px + var(--safe-area-inset-top)) 16px 30px 16px;
            align-items: center;
            justify-content: space-between;
            height: 142px;
            color: white;
            background: rgb(103, 58, 183);
            background: linear-gradient(180deg, rgba(103, 58, 183, 1) 0%, rgba(94, 53, 177, 1) 100%);
        }

        :host header .row {
            align-items: center;
        }

        :host header .row.top {
            width: 100%;
            gap: 14px;
        }

        :host header .row.select {
            font-size: 1.4em;
            color: #ede7f6;
            padding-bottom: 4px;
        }

        :host header h1 {
            font-size: 18px;
            font-weight: 200;
            letter-spacing: 1px;
            color: #ede7f6;
            margin: 0;
            text-transform: uppercase;
        }

        :host header a.doc {
            padding: 4px 16px;
            font-size: 16px;
            color: white;
            text-decoration: none;
        }

        :host header a.github-icon {
            right: 34px;
            width: 26px;
            height: 26px;
            color: white;
            text-decoration: none;
        }

        @keyframes statusLoadingAnimation {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        :host header .status.loading {
            background: none !important;
        }

        :host header .status.loading:after {
            display: block;
            content: " ";
            width: 11px;
            height: 11px;
            border-radius: 50%;
            border: 2px solid #fff;
            border-color: #fff transparent #fff transparent;
            animation: statusLoadingAnimation 1.2s linear infinite;
        }

        :host header .status.not-authenticated {
            background-color: #EC407A;
        }

        :host header .status.authenticated {
            background-color: #7CB342;
        }

        :host header .status {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            margin-top: 1px;
            margin-right: 8px;
        }

        :host header .title {
            display: flex;
            align-items: center;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            color: white;
            text-decoration: none;
        }

        :host header .title .icon {
            font-size: 22px;
            margin-right: 0.5rem;
        }

        :host header select {
            cursor: pointer;
            font-size: 1.1em;
            font-weight: bold;
            color: #ede7f6;
            background: rgba(0, 0, 0, 0.01);  /** fix for Safari Mobile so that select's icon is visible */
            border: none;
            outline: none;
            padding: 0;
            margin: 0;
        }

        :host header button {
            margin-top: 2px;
        }

        :host header button:not(:last-child) {
            margin-right: 10px;
        }

        :host header .content {
            align-items: center;
            gap: 10px;
        }

        @media only screen and (max-width: 1000px) {
            :host header {
                padding-bottom: 24px;
                height: 148px;
            }

            :host header .row.select {
                font-size: 1.1em;
            }

            :host header a.doc {
                padding-right: 6px;
            }

            :host header .content {
                gap: 2px;
            }
        }
    </style>

    <header class="column">
        <div class="row top" style="height: 44px;">
            <a class="title"
                href="https://badisi.github.io/auth-js/"
                target="_self">
                <span class="icon">🛡️</span>Auth-js
            </a>

            <div class="status loading"></div>

            <span style="flex: 1"></span>

            <a class="doc"
                href="https://badisi.github.io/auth-js/getting-started/playground"
                target="_self">
                <span>
                    Documentation
                    <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path>
                    </svg>
                </span>
            </a>

            <a class="github-icon"
                href="https://github.com/Badisi/auth-js"
                target="_self"
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
        </div>

        <div class="column content">
            <h1>Playground</h1>

            <div class="row select">
                <span>&#123;&nbsp;<select id="implementation-select"></select>&nbsp;&#125;</span>
                &nbsp;&nbsp;
                <span>&#123;&nbsp;<select id="setting-select"></select>&nbsp;&#125;</span>
            </div>

            <div class="row">
                <button id="login-button">LOGIN</button>
                <button id="logout-button">LOGOUT</button>
                <button id="silent-renew-button">SILENT RENEW</button>
            </div>
        </div>
    </header>
`;

export class DemoAppHeaderElement extends HTMLElement {
    private listeners: (() => void)[] = [];

    private implSelectEl?: HTMLSelectElement | null;
    private settingsSelectEl?: HTMLSelectElement | null;
    private statusEl?: HTMLElement | null;
    private loginButtonEl?: HTMLElement | null;
    private logoutButtonEl?: HTMLElement | null;
    private silentRenewButtonEl?: HTMLElement | null;

    public constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot?.appendChild(document.importNode(template.content, true));

        this.implSelectEl = this.shadowRoot?.querySelector<HTMLSelectElement>('#implementation-select');
        this.settingsSelectEl = this.shadowRoot?.querySelector<HTMLSelectElement>('#setting-select');
        this.statusEl = this.shadowRoot?.querySelector<HTMLElement>('.status');
        this.loginButtonEl = this.shadowRoot?.querySelector<HTMLElement>('#login-button');
        this.logoutButtonEl = this.shadowRoot?.querySelector<HTMLElement>('#logout-button');
        this.silentRenewButtonEl = this.shadowRoot?.querySelector<HTMLElement>('#silent-renew-button');
    }

    public set isRenewing(value: boolean) {
        if (this.statusEl) {
            this.statusEl.classList[(value) ? 'add' : 'remove']('loading');
        }
    }

    public set isAuthenticated(value: boolean | null | undefined) {
        if (this.statusEl && value !== null && value !== undefined) {
            this.statusEl.classList.remove('loading');
            this.statusEl.title = (value) ? 'Authenticated' : 'Not authenticated';
            this.statusEl.classList[(value) ? 'add' : 'remove']('authenticated');
            this.statusEl.classList[(value) ? 'remove' : 'add']('not-authenticated');
        }
    }

    public connectedCallback(): void {
        if (window.location.href.includes(':4200')) {
            const optionEl = document.createElement('option');
            optionEl.textContent = 'localhost';
            this.implSelectEl?.appendChild(optionEl);
        } else {
            window.appSettings.getLibraryImplementations().forEach(item => {
                const optionEl = document.createElement('option');
                optionEl.value = String(item.label);
                optionEl.textContent = item.label;
                this.implSelectEl?.appendChild(optionEl);
            });

            const implChangeCb = (): void => {
                const index = this.implSelectEl?.selectedIndex;
                if (index !== undefined) {
                    window.location.href = window.appSettings.getLibraryImplementations()[index].demoUrl;
                }
            };
            this.implSelectEl?.addEventListener('change', implChangeCb);
            this.listeners.push(() => { this.implSelectEl?.removeEventListener('change', implChangeCb); });
        }

        window.appSettings.getSettings().forEach(item => {
            const optionEl = document.createElement('option');
            optionEl.value = String(item.name);
            optionEl.textContent = item.name;
            this.settingsSelectEl?.appendChild(optionEl);
        });

        this.refreshImplementation();
        this.refreshSettings();
        this.addEventListeners();

        // --

        const resizeSelect = (selectEl: HTMLSelectElement): void => {
            const selectedText = selectEl.options[selectEl.selectedIndex].text || '';

            const tmpSpan = document.createElement('span');
            tmpSpan.textContent = selectedText;

            const style = window.getComputedStyle(selectEl);

            // Apply font styles for accurate measurement
            tmpSpan.style.font = style.font;
            tmpSpan.style.fontSize = style.fontSize;
            tmpSpan.style.fontFamily = style.fontFamily;
            tmpSpan.style.fontWeight = style.fontWeight;
            tmpSpan.style.letterSpacing = style.letterSpacing;
            tmpSpan.style.whiteSpace = 'nowrap';

            // Invisible but rendered
            tmpSpan.style.position = 'absolute';
            tmpSpan.style.visibility = 'hidden';
            tmpSpan.style.top = '-9999px';
            document.body.appendChild(tmpSpan);

            const textWidth = tmpSpan.offsetWidth;
            tmpSpan.remove();

            // 🔍 Add only what’s needed for dropdown arrow
            const arrowBuffer = ((): number => {
                const isSafariMobile =
                    /iP(hone|ad|od)/.test(navigator.userAgent) &&
                    !!(/WebKit/.exec(navigator.userAgent)) &&
                    !(/CriOS|FxiOS/.exec(navigator.userAgent));
                if (isSafariMobile) return 40;
                if (navigator.userAgent.includes('Chrome')) return 25;
                return 35;
            })();

            const totalWidth = Math.ceil(textWidth + arrowBuffer);
            selectEl.style.width = `${totalWidth}px`;
        };
        window.requestAnimationFrame(() => {
            if (this.implSelectEl) {
                resizeSelect(this.implSelectEl);
            }
            if (this.settingsSelectEl) {
                resizeSelect(this.settingsSelectEl);
            }
        });
    }

    public disconnectedCallback(): void {
        this.listeners.forEach(rm => { rm(); });
    }

    // --- HELPER(s) ---

    private addEventListeners(): void {
        const settingsCb = (): void => {
            if (this.settingsSelectEl) {
                window.appSettings.setCurrentSettingsIndex(this.settingsSelectEl.selectedIndex);
                location.reload();
            }
        };
        this.settingsSelectEl?.addEventListener('change', settingsCb);

        const loginCb = (): boolean => this.dispatchEvent(new Event('login', { bubbles: true, composed: true }));
        this.loginButtonEl?.addEventListener('click', loginCb);

        const logoutCb = (): boolean => this.dispatchEvent(new Event('logout', { bubbles: true, composed: true }));
        this.logoutButtonEl?.addEventListener('click', logoutCb);

        const silentRenewCb = (): boolean => this.dispatchEvent(new Event('silentRenew', { bubbles: true, composed: true }));
        this.silentRenewButtonEl?.addEventListener('click', silentRenewCb);

        this.listeners.push(
            () => { this.settingsSelectEl?.removeEventListener('change', settingsCb); },
            () => { this.loginButtonEl?.removeEventListener('click', loginCb); },
            () => { this.logoutButtonEl?.removeEventListener('click', logoutCb); },
            () => { this.silentRenewButtonEl?.removeEventListener('click', silentRenewCb); }
        );
    }

    private refreshImplementation(): void {
        const impls = window.appSettings.getLibraryImplementations();
        if (!window.location.href.includes(':4200')) {
            const implIndex = impls.findIndex(item => window.location.href.includes(item.demoUrl));
            if (this.implSelectEl) {
                this.implSelectEl.selectedIndex = (implIndex !== -1) ? implIndex : 0;
            }
        } else if (this.implSelectEl) {
            this.implSelectEl.selectedIndex = 0;
        }
    }

    private refreshSettings(): void {
        if (this.settingsSelectEl) {
            this.settingsSelectEl.selectedIndex = window.appSettings.get().currentSettingsIndex;
        }
    }
}

window.customElements.define('demo-app-header', DemoAppHeaderElement);
