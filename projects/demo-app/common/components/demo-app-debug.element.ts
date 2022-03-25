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

        :host .info {
            margin: 16px;
        }

        :host .info .title {
            min-width: 130px;
        }

        :host .info .value {
            overflow-x: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        :host .info code {
            width: 100%;
        }
    </style>

    <div class="card">
        <div class="info column">
            <div class="title">Authenticated</div>
            <code>
                <pre id="isAuthenticated" class="value json-value"></pre>
            </code>
        </div>

        <div class="info column">
            <div class="title">User session</div>
            <code>
                <pre id="userSession" class="value"></pre>
            </code>
        </div>

        <div class="info column">
            <div class="title">Access token</div>
            <code>
                <pre id="accessToken" class="value json-value"></pre>
                <pre id="accessTokenDecoded" class="value"></pre>
            </code>
        </div>

        <div class="info column">
            <div class="title">Id token</div>
            <code>
                <pre id="idToken" class="value json-value"></pre>
                <pre id="idTokenDecoded" class="value"></pre>
            </code>
        </div>

        <div class="info column">
            <div class="title">User profile</div>
            <code>
                <pre id="userProfile" class="value"></pre>
            </code>
        </div>
    </div>
`;

export class DemoAppDebugElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot?.appendChild(document.importNode(template.content, true));

        // Initialize
        this.isAuthenticated = false;
        this.userSession = undefined;
        this.accessToken = undefined;
        this.accessTokenDecoded = undefined;
        this.idToken = undefined;
        this.idTokenDecoded = undefined;
        this.userProfile = undefined;
    }

    public set isAuthenticated(value: boolean | undefined) {
        if (value !== null) {
            this.update('#isAuthenticated', value);
        }
    }

    public set userSession(value: unknown | undefined) {
        this.update('#userSession', prettyPrint(value, ['expires_at']));
    }

    public set accessToken(value: string | undefined) {
        this.update('#accessToken', value);
    }

    public set accessTokenDecoded(value: unknown | undefined) {
        const text = (typeof value !== 'string') ?
            prettyPrint(value, ['exp', 'iat', 'auth_time']) : '(no decoded info as it is not a JWT token)';
        this.update('#accessTokenDecoded', text);
    }

    public set idToken(value: string | undefined) {
        this.update('#idToken', value);
    }

    public set idTokenDecoded(value: unknown | undefined) {
        this.update('#idTokenDecoded', prettyPrint(value, ['exp', 'iat', 'auth_time']));
    }

    public set userProfile(value: unknown | undefined) {
        this.update('#userProfile', prettyPrint(value));
    }

    // --- HELPER(s) ---

    private update(elementName: string, value?: unknown): void {
        const element = this.shadowRoot?.querySelector(elementName);
        if (element) {
            if (value === undefined || value === null || value === '') {
                element.closest('.info')?.classList.add('hidden');
            } else {
                element.closest('.info')?.classList.remove('hidden');
                element.innerHTML = String(value);
            }
        }
    }
}

window.customElements.define('demo-app-debug', DemoAppDebugElement);
