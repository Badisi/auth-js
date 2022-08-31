import '@capacitor/core';

import { OIDCAuthManager } from '@badisi/auth-js/oidc';

import { DemoAppSettings } from '../settings/demo-app-settings.service';

declare global {
    interface Window {
        appSettings: DemoAppSettings;
        authManager: OIDCAuthManager;
    }
}

export const globalStyle = `
    .flex {
        flex: 1;
    }

    .hidden {
        display: none !important;
    }

    .row {
        display: flex;
        flex-direction: row;
    }

    .column {
        display: flex;
        flex-direction: column;
    }

    .card {
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        background-color: white;
        margin: 12px 6px;
    }

    .card-title {
        padding: 16px;
        font-size: 20px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.87);
        align-items: center;
    }

    .json-key {
        color: rgb(124, 77, 255);
    }

    .json-value {
        color: rgb(67, 122, 237);
    }

    .json-string {
        color: rgb(83, 160, 83);
    }

    .json-date {
        color: rgb(200, 56, 198);
    }

    input {
        color: #5e35b1;
        padding: 10px;
        border: 1px solid #0000001f;
        border-radius: 4px;
        font-size: 14px;
    }

    input:invalid {
        border-color: #f44336;
    }

    input[type="checkbox"] {
        margin-right: 10px;
    }

    select {
        color: #5e35b1;
        padding: 8px 6px;
        border: 1px solid #0000001f;
        border-radius: 4px;
    }

    @media only screen and (max-width: 600px) {
        :host {
            padding: 0 !important;
            padding-bottom: 24px !important;
        }

        :host .card {
            border: 0;
            margin: 0;
            margin-bottom: 6px;
        }
    }
`;

export const prettyPrint = (value: unknown, dateAttrs: string[] = []): string => {
    const jsonLine = /^( *)("[\w-]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
    const replacer = (_match: string, pIndent: string, pKey: string, pVal: string, pEnd: string): string => {
        let r = pIndent || '';
        const key = (pKey) ? pKey.replace(/[": ]/g, '') : undefined;
        if (key) {
            r += `<span class="json-key">${key}</span>: `;
        }
        if (pVal) {
            r += `<span class="${pVal.startsWith('"') ? 'json-string' : 'json-value'}">${pVal}</span>`;
            if (key && dateAttrs.includes(key)) {
                const date = new Date(Number(pVal) * 1000);
                const pValAsDate = `${date.toDateString()}, ${date.toLocaleTimeString()}`;
                if (pValAsDate) {
                    r += ` <span class="json-date">(${pValAsDate})</span>`;
                }
            }
        }
        return r + (pEnd || '');
    };
    return (value) ? JSON.stringify(value, null, 2)
        .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
        .replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(jsonLine, replacer) : '';
};
