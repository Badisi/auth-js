/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any */

import { AuthSettings } from '@badisi/auth-js/core';
import { OIDCAuthSettings } from '@badisi/auth-js/oidc';

import { globalStyle } from '../core';

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

        :host .card {
            padding: 16px;
        }

        :host .form-content > * {
            margin-bottom: 24px;
        }

        :host .form-content label {
            margin-bottom: 8px;
        }

        :host .form-actions {
            padding: 0 8px;
            align-items: center;
        }

        :host .form-actions button {
            padding: 2px 12px;
        }

        :host .form-actions button:not(:last-of-type) {
            margin-right: 12px;
        }

        :host(.dirty) .form-actions #apply-settings-button,
        :host(.dirty) .form-actions #cancel-settings-button {
            display: flex !important;
        }
    </style>

    <form class="column">
        <div class="form-content card flex"></div>

        <div class="form-actions row">
            <div id="reset-settings-dev" class="hidden">
                RESET DEFAULT TO:
                <select id="reset-settings-select">
                    <option value disabled selected>Choose an option</option>
                </select>
            </div>
            <button id="reset-settings-button" type="button">RESET TO DEFAULT</button>
            <span class="flex"></span>
            <button id="apply-settings-button" type="submit" class="hidden">APPLY</button>
            <button id="cancel-settings-button" type="button" class="hidden">CANCEL</button>
        </div>
    </form>
`;

export class DemoAppSettingsElement extends HTMLElement {
    private listeners: (() => void)[] = [];

    private formEl!: HTMLFormElement;
    private resetEl!: HTMLButtonElement;
    private resetDevEl!: HTMLElement;
    private formContentEl!: HTMLElement;
    private formIsDirty = false;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot?.appendChild(document.importNode(template.content, true));

        this.resetEl = this.shadowRoot?.querySelector('#reset-settings-button') as HTMLButtonElement;
        this.resetDevEl = this.shadowRoot?.querySelector('#reset-settings-dev') as HTMLElement;
        this.isDev = false;
    }

    public set isDev(value: boolean) {
        if (value) {
            this.resetDevEl?.classList.remove('hidden');
            this.resetEl?.classList.add('hidden');
        } else {
            this.resetDevEl?.classList.add('hidden');
            this.resetEl?.classList.remove('hidden');
        }
    }

    public connectedCallback(): void {
        this.formEl = this.shadowRoot?.querySelector('form') as HTMLFormElement;
        this.formContentEl = this.shadowRoot?.querySelector('.form-content') as HTMLElement;

        // Form events
        this.formEl.onsubmit = (): boolean => false;
        this.formEl.addEventListener('submit', () => this.saveAndReload(), { once: true });

        const inputCb = (e: Event): void => {
            if (!this.formIsDirty && ((e.target as HTMLElement).id !== 'reset-settings-select')) {
                this.formIsDirty = true;
                this.classList.add('dirty');
            }
        };
        this.formEl.addEventListener('input', inputCb);
        this.listeners.push(() => this.formEl.removeEventListener('input', inputCb));

        // Reset
        this.resetEl?.addEventListener('click', () => this.resetAndReload(), { once: true });

        const resetSelectEl = this.shadowRoot?.querySelector('#reset-settings-select') as HTMLSelectElement;
        window.authSettings?.getSettings().forEach(item => {
            const optionEl = document.createElement('option');
            optionEl.value = String(item.name);
            optionEl.textContent = item.name;
            resetSelectEl?.appendChild(optionEl);
        });
        const changeCb = (): void => this.resetAndReload(resetSelectEl.value);
        resetSelectEl?.addEventListener('change', changeCb);
        this.listeners.push(() => resetSelectEl.removeEventListener('change', changeCb));

        // Cancel
        const cancelEl = this.shadowRoot?.querySelector('#cancel-settings-button');
        const cancelCb = (): void => this.cancel();
        cancelEl?.addEventListener('click', cancelCb);
        this.listeners.push(() => cancelEl?.removeEventListener('click', cancelCb));

        // Initialize form
        this.refreshFormContent();
    }

    public disconnectedCallback(): void {
        this.listeners.forEach(rm => rm());
    }

    // --- HANDLER(s) ---

    private resetAndReload(settingsName?: string): void {
        window.authSettings?.resetCurrentSettings(settingsName);
        location.reload();
    }

    private cancel(): void {
        this.formIsDirty = false;
        this.classList.remove('dirty');
        this.refreshFormContent();
    }

    // --- HELPER(s) ---

    private setPathValue(settings: AuthSettings, path: string, value: unknown): void {
        const props = path.split('.');
        props.reduce((obj, prop, index) => {
            if (index === (props.length - 1)) {
                (obj as any)[prop] = value;
            } else if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
                (obj as any)[prop] = {};
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return (obj as any)[prop];
            }
            return obj;
        }, settings);
    }

    private getPathValue<S>(settings: AuthSettings, path: string): S {
        return path.split('.').reduce((obj, prop) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            (obj) ? (obj as any)[prop] : obj
        , settings) as S;
    }

    private refreshFormContent(): void {
        // Clear the page
        this.formContentEl.innerHTML = '';

        // Draw the form
        window.authSettings.getLibrarySettingsDefinition()
            .sort((a, b) => (b._index || 0) - (a._index || 0))
            .forEach(item => {
                const formItemContainerEl = document.createElement('div');
                this.formContentEl.prepend(formItemContainerEl);

                const formItemLabelEl = document.createElement('label');
                formItemLabelEl.htmlFor = item.name.replace('.', '');
                formItemLabelEl.textContent = `${item.label}${item.required ? ' *' : ''}`;

                const formItemEl = document.createElement((item.type === 'list') ? 'select' : 'input');
                formItemEl.id = item.name.replace('.', '');
                formItemEl.name = item.name.replace('.', '');
                formItemEl.required = (item.required === true);

                const librarySettings = window.authSettings.getCurrentSettings().librarySettings;
                switch (item.type) {
                    case 'boolean':
                        (formItemEl as HTMLInputElement).checked = this.getPathValue(librarySettings, item.name);
                        (formItemEl as HTMLInputElement).type = 'checkbox';
                        formItemContainerEl.appendChild(formItemEl);
                        formItemContainerEl.appendChild(formItemLabelEl);
                        break;
                    case 'list':
                        item.values?.forEach(option => {
                            const optionEl = document.createElement('option');
                            optionEl.value = String(option.value);
                            optionEl.textContent = option.label;
                            formItemEl.appendChild(optionEl);
                        });
                        formItemEl.value = this.getPathValue(librarySettings, item.name);
                        formItemEl.classList.add('flex');
                        formItemContainerEl.classList.add('input', 'column');
                        formItemContainerEl.appendChild(formItemLabelEl);
                        formItemContainerEl.appendChild(formItemEl);
                        break;
                    default: {
                        const value: string = this.getPathValue(librarySettings, item.name);
                        if (item.type === 'json') {
                            formItemEl.value = (value) ? JSON.stringify(value) : '';
                        } else {
                            formItemEl.value = value;
                        }
                        formItemContainerEl.classList.add('input', 'column');
                        formItemContainerEl.appendChild(formItemLabelEl);
                        formItemContainerEl.appendChild(formItemEl);
                        break;
                    }
                }
            });
    }

    private saveAndReload(): void {
        if (this.formEl.reportValidity()) {
            const settings = {};
            window.authSettings.getLibrarySettingsDefinition()
                .forEach(item => {
                    const formItemEl = this.shadowRoot?.querySelector(`#${item.name.replace('.', '')}`);
                    let value;
                    switch (item.type) {
                        case 'boolean':
                            value = (formItemEl as HTMLInputElement).checked;
                            break;
                        case 'list':
                            value = (formItemEl as HTMLSelectElement).value;
                            break;
                        case 'json':
                            try {
                                const val = (formItemEl as HTMLInputElement).value;
                                if (val && (val.trim() !== '')) {
                                    value = JSON.parse(val);
                                }
                            } catch (err) {
                                console.error(err);
                            }
                            break;
                        default:
                            value = (formItemEl as HTMLInputElement).value;
                            break;
                    }
                    this.setPathValue(settings, item.name, value);
                });
            window.authSettings?.saveCurrentLibrarySettings(settings as OIDCAuthSettings);
            location.reload();
        }
    }
}

window.customElements.define('demo-app-settings', DemoAppSettingsElement);
