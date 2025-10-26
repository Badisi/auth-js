/* eslint-disable
    @typescript-eslint/no-unsafe-assignment,
    @typescript-eslint/no-unsafe-member-access,
    @typescript-eslint/no-explicit-any
*/

import type { AuthSettings } from '@badisi/auth-js';
import type { OIDCAuthSettings } from '@badisi/auth-js/oidc';

import { globalStyle } from '../core';
import type { Settings } from '../settings';

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
            padding: 40px 16px 16px 16px;
        }

        :host form {
            position: relative;
        }

        :host form .input, :host .form-content > * {
            margin-bottom: 24px;
        }

        :host form div:has(#automaticInjectToken:not(:checked)) > div:has(#automaticInjectTokeninclude),
        :host form div:has(#automaticInjectToken:not(:checked)) > div:has(#automaticInjectTokenexclude) {
            label {
                color: lightgray;
            }
            input {
                opacity: 50%;
            }
        }

        :host form div.input:has(#automaticInjectTokeninclude),
        :host form div.input:has(#automaticInjectTokenexclude) {
            flex-direction: row;
            align-items: center;
            margin-left: 32px;

            label {
                margin-bottom: 0;
                margin-right: 8px;
            }

            input {
                flex: 1;
            }
        }

        :host form label {
            margin-bottom: 8px;
        }

        :host .form-actions {
            z-index: 10;
            position: fixed;
            bottom: calc(12px + var(--safe-area-inset-bottom));
            left: calc(50% - 120px);
            padding: 14px 0;
            border-radius: 4px;
            background-color: #E0E0E0;
            width: 240px;
            justify-content: center;
        }

        :host .form-actions button {
            padding: 2px 12px;
        }

        :host .form-actions button:not(:last-of-type) {
            margin-right: 12px;
        }

        :host button {
            cursor: pointer;
        }

        :host #setting-select {
            margin-left: 6px;
            color: black;
        }

        :host #add-settings-button {
            background: none;
            border: none;
            cursor: pointer;
            padding: 4px;
            color: darkgray;
        }

        :host #delete-settings-button {
            position: absolute;
            top: 20px;
            right: 20px;
            display: flex;
            align-items: center;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 14px;
            color: #EF5350;
        }

        :host #save-settings-button {
            color: white;
            padding: 4px 24px;
            border: none;
            border-radius: 4px;
            transition: background-color 150ms cubic-bezier(0.35, 0, 0.25, 1);
            background-color: #512da8;
        }

        :host #cancel-settings-button {
            padding: 4px 18px;
            border: none;
            border-radius: 4px;
            transition: background-color 150ms cubic-bezier(0.35, 0, 0.25, 1);
            background-color: white;
        }

        :host #save-settings-button:hover {
            background-color: #4527a0;
        }

        :host(.dirty) .form-actions {
            display: flex !important;
        }

        :host(.dirty) #delete-settings-button {
            display: none;
        }

        @media only screen and (max-width: 600px) {
            :host .setting-select {
                margin: 12px 8px;
            }
        }
    </style>

    <div class="setting-select row">
        <select id="setting-select"></select>
        <div id="add-settings-button" title="Create new settings">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        </div>
    </div>

    <div class="form-actions row hidden">
        <button id="save-settings-button" type="button">SAVE</button>
        <button id="cancel-settings-button" type="button">CANCEL</button>
    </div>

    <form class="column card">
        <div id="delete-settings-button">
            DELETE
        </div>
        <div class="input column">
            <label for="settingsName">Settings name *</label>
            <input id="settingsName" name="settingsName" required="">
        </div>
        <div class="form-content flex"></div>
    </form>
`;

export class DemoAppSettingsElement extends HTMLElement {
    private listeners: (() => void)[] = [];

    private formEl?: HTMLFormElement | null;
    private formContentEl?: HTMLElement | null;
    private selectEl?: HTMLSelectElement | null;
    private settingsNameEl?: HTMLInputElement | null;
    private formIsDirty = false;
    private formIsNew = false;

    public constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot?.appendChild(document.importNode(template.content, true));
    }

    public connectedCallback(): void {
        this.formEl = this.shadowRoot?.querySelector<HTMLFormElement>('form');
        this.formContentEl = this.shadowRoot?.querySelector<HTMLElement>('.form-content');
        this.selectEl = this.shadowRoot?.querySelector<HTMLSelectElement>('#setting-select');
        this.settingsNameEl = this.shadowRoot?.querySelector<HTMLInputElement>('#settingsName');

        // Form events
        const inputCb = (e: Event): void => {
            if (!this.formIsDirty && ((e.target as HTMLElement).id !== 'setting-select')) {
                this.formIsDirty = true;
                this.classList.add('dirty');
            }
        };
        this.formEl?.addEventListener('input', inputCb);
        this.listeners.push(() => {
            this.formEl?.removeEventListener('input', inputCb);
        });

        // Select
        this.refreshSelect();
        const changeCb = (): void => {
            if (this.selectEl) {
                this.loadSettings(this.selectEl.selectedIndex);
            }
        };
        this.selectEl?.addEventListener('change', changeCb);
        this.listeners.push(() => {
            this.selectEl?.removeEventListener('change', changeCb);
        });

        // Add
        const addEl = this.shadowRoot?.querySelector('#add-settings-button');
        const addCb = (): void => {
            this.add();
        };
        addEl?.addEventListener('click', addCb);
        this.listeners.push(() => addEl?.removeEventListener('click', addCb));

        // Delete
        const deleteEl = this.shadowRoot?.querySelector('#delete-settings-button');
        const deleteCb = (): void => {
            this.delete();
        };
        deleteEl?.addEventListener('click', deleteCb);
        this.listeners.push(() => deleteEl?.removeEventListener('click', deleteCb));

        // Save
        const saveEl = this.shadowRoot?.querySelector('#save-settings-button');
        const saveCb = (): void => {
            this.saveAndReload();
        };
        saveEl?.addEventListener('click', saveCb);
        this.listeners.push(() => saveEl?.removeEventListener('click', saveCb));

        // Cancel
        const cancelEl = this.shadowRoot?.querySelector('#cancel-settings-button');
        const cancelCb = (): void => {
            this.cancel();
        };
        cancelEl?.addEventListener('click', cancelCb);
        this.listeners.push(() => cancelEl?.removeEventListener('click', cancelCb));

        // Initialize form
        this.refreshFormContent(window.appSettings.getCurrentSettings());
    }

    public disconnectedCallback(): void {
        this.listeners.forEach(rm => {
            rm();
        });
    }

    // --- HANDLER(s) ---

    public loadSettings(index: number): void {
        window.appSettings.setCurrentSettingsIndex(index);
        location.reload();
    }

    public add(): void {
        const name = 'New settings';

        const optionEl = document.createElement('option');
        optionEl.selected = true;
        optionEl.value = name;
        optionEl.textContent = name;
        this.selectEl?.appendChild(optionEl);

        this.formIsNew = true;
        this.formIsDirty = true;
        this.classList.add('dirty');
        this.refreshFormContent({ name, librarySettings: {} });
    }

    public delete(): void {
        window.appSettings.deleteCurrentSettings();
        window.appSettings.setCurrentSettingsIndex(0);
        location.reload();
    }

    public cancel(): void {
        this.formIsNew = false;
        this.formIsDirty = false;
        this.classList.remove('dirty');
        this.refreshSelect();
        this.refreshFormContent(window.appSettings.getCurrentSettings());
    }

    // --- HELPER(s) ---

    private setPathValue(settings: AuthSettings, path: string, value: boolean | string | Record<string, unknown> | undefined): void {
        const props = path.split('.');
        props.reduce((obj: any, prop, index) => {
            if (index === (props.length - 1)) {
                if (typeof value === 'string' && value.trim() === '') {
                    value = undefined;
                }
                obj[prop] = value;
            } else if (!(prop in obj) || typeof obj[prop] !== 'object' || obj[prop] === null) {
                obj[prop] = {};
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return obj[prop];
        }, settings);
    }

    private getPathValue(settings: AuthSettings | undefined, path: string): unknown {
        return path.split('.').reduce((obj: any, prop) =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            obj && prop in obj ? obj[prop] : undefined,
        settings);
    }

    private refreshSelect(): void {
        // Clear the select
        if (this.selectEl) {
            this.selectEl.innerHTML = '';
        }

        // Redraw it
        const { settings, currentSettingsIndex } = window.appSettings.get();
        settings
            .forEach((item, index) => {
                const optionEl = document.createElement('option');
                optionEl.selected = (index === currentSettingsIndex);
                optionEl.value = item.name;
                optionEl.textContent = item.name;
                this.selectEl?.appendChild(optionEl);
            });
    }

    private refreshFormContent(settings: Settings): void {
        // Clear the page
        if (this.formContentEl) {
            this.formContentEl.innerHTML = '';
        }

        // Draw the form
        if (this.settingsNameEl) {
            const librarySettingsDefinition = window.appSettings.getLibrarySettingsDefinition();
            const { name: settingName, librarySettings } = settings;

            this.settingsNameEl.value = settingName;
            librarySettingsDefinition
                .sort((a, b) => (b._sortIndex || 0) - (a._sortIndex || 0))
                .forEach(item => {
                    const formItemContainerEl = document.createElement('div');
                    this.formContentEl?.prepend(formItemContainerEl);

                    const formItemLabelEl = document.createElement('label');
                    formItemLabelEl.htmlFor = item.name.replace('.', '');
                    formItemLabelEl.textContent = `${item.label}${item.required ? ' *' : ''}`;

                    const formItemEl = document.createElement((item.type === 'list') ? 'select' : 'input');
                    formItemEl.id = item.name.replace('.', '');
                    formItemEl.name = item.name.replace('.', '');
                    formItemEl.required = (item.required === true);

                    switch (item.type) {
                        case 'boolean':
                            (formItemEl as HTMLInputElement).checked = this.getPathValue(librarySettings, item.name) as boolean;
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
                            formItemEl.value = this.getPathValue(librarySettings, item.name) as string;
                            formItemEl.classList.add('flex');
                            formItemContainerEl.classList.add('input', 'column');
                            formItemContainerEl.appendChild(formItemLabelEl);
                            formItemContainerEl.appendChild(formItemEl);
                            break;
                        default: {
                            const value = this.getPathValue(librarySettings, item.name) as string | undefined | null;
                            if (item.type === 'json') {
                                formItemEl.value = (value) ? JSON.stringify(value) : '';
                            } else {
                                formItemEl.value = value ?? '';
                            }
                            if (item.placeholder) {
                                (formItemEl as HTMLInputElement).placeholder = item.placeholder;
                            }
                            formItemContainerEl.classList.add('input', 'column');
                            formItemContainerEl.appendChild(formItemLabelEl);
                            formItemContainerEl.appendChild(formItemEl);
                            break;
                        }
                    }
                });

            // Patch for automaticInjectToken to clear and disable inputs when deselected
            const automaticInjectTokenEl = this.shadowRoot?.querySelector<HTMLInputElement>('#automaticInjectToken');
            if (automaticInjectTokenEl) {
                automaticInjectTokenEl.onclick = (): void => {
                    if (!automaticInjectTokenEl.checked) {
                        const automaticInjectTokenIncludeEl = this.shadowRoot?.querySelector<HTMLInputElement>('#automaticInjectTokeninclude');
                        if (automaticInjectTokenIncludeEl) {
                            automaticInjectTokenIncludeEl.disabled = true;
                            automaticInjectTokenIncludeEl.value = '';
                        }
                        const automaticInjectTokenExcludeEl = this.shadowRoot?.querySelector<HTMLInputElement>('#automaticInjectTokenexclude');
                        if (automaticInjectTokenExcludeEl) {
                            automaticInjectTokenExcludeEl.disabled = true;
                            automaticInjectTokenExcludeEl.value = '';
                        }
                    }
                };
            }
        }
    }

    private saveAndReload(): void {
        if (this.formEl?.reportValidity() && this.settingsNameEl) {
            const librarySettingsDefinition = window.appSettings.getLibrarySettingsDefinition();
            const currentSettings = (!this.formIsNew) ? window.appSettings.getCurrentSettings() : {
                name: '',
                librarySettings: {} as OIDCAuthSettings
            };
            currentSettings.name = this.settingsNameEl.value;
            librarySettingsDefinition
                .sort((a, b) => (a._sortIndex || 0) - (b._sortIndex || 0))
                .forEach(item => {
                    const formItemEl = this.shadowRoot?.querySelector(`#${item.name.replace('.', '')}`);
                    let value: boolean | string | Record<string, unknown> | undefined;
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
                    this.setPathValue(currentSettings.librarySettings, item.name, value);
                });

            // Transform inject token
            const automaticInjectTokenEl = this.shadowRoot?.querySelector<HTMLInputElement>('#automaticInjectToken');
            if (!automaticInjectTokenEl?.checked) {
                currentSettings.librarySettings.automaticInjectToken = false;
            } else {
                let injectToken = currentSettings.librarySettings.automaticInjectToken;
                if (typeof injectToken === 'object') {
                    if ((!injectToken.include || ((injectToken.include as unknown as string).trim() === '')) &&
                        (!injectToken.exclude || ((injectToken.exclude as unknown as string).trim() === ''))) {
                        injectToken = true;
                    } else {
                        if (injectToken.include) {
                            injectToken.include = (injectToken.include as unknown as string).split(',');
                        }
                        if (injectToken.exclude) {
                            injectToken.exclude = (injectToken.exclude as unknown as string).split(',');
                        }
                    }
                    currentSettings.librarySettings.automaticInjectToken = injectToken;
                }
            }

            window.appSettings.addOrUpdateSettings(currentSettings, window.appSettings.get().currentSettingsIndex);
            if (this.formIsNew && this.selectEl) {
                window.appSettings.setCurrentSettingsIndex(this.selectEl.selectedIndex);
            }
            location.reload();
        }
    }
}

window.customElements.define('demo-app-settings', DemoAppSettingsElement);
