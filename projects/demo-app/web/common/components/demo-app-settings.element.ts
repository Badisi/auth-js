/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any */

import { AuthSettings } from '@badisi/auth-js/core';

import { globalStyle } from '../core';
import { UserSettings } from '../settings/demo-app-settings.service';

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

        :host #settings-select {
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
            :host .settings-select {
                margin: 12px 8px;
            }
        }
    </style>

    <div class="settings-select row">
        <select id="settings-select"></select>
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

    private formEl!: HTMLFormElement;
    private formContentEl!: HTMLElement;
    private selectEl!: HTMLSelectElement;
    private settingsNameEl!: HTMLInputElement;
    private formIsDirty = false;
    private formIsNew = false;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot?.appendChild(document.importNode(template.content, true));
    }

    public connectedCallback(): void {
        this.formEl = this.shadowRoot!.querySelector<HTMLFormElement>('form')!;
        this.formContentEl = this.shadowRoot!.querySelector<HTMLElement>('.form-content')!;
        this.selectEl = this.shadowRoot!.querySelector<HTMLSelectElement>('#settings-select')!;
        this.settingsNameEl = this.shadowRoot!.querySelector<HTMLInputElement>('#settingsName')!;

        // Form events
        const inputCb = (e: Event): void => {
            if (!this.formIsDirty && ((e.target as HTMLElement).id !== 'settings-select')) {
                this.formIsDirty = true;
                this.classList.add('dirty');
            }
        };
        this.formEl.addEventListener('input', inputCb);
        this.listeners.push(() => this.formEl.removeEventListener('input', inputCb));

        // Select
        this.refreshSelect();
        const changeCb = (): void => this.loadSettings(this.selectEl.value);
        this.selectEl?.addEventListener('change', changeCb);
        this.listeners.push(() => this.selectEl.removeEventListener('change', changeCb));

        // Add
        const addEl = this.shadowRoot?.querySelector('#add-settings-button');
        const addCb = (): void => this.add();
        addEl?.addEventListener('click', addCb);
        this.listeners.push(() => addEl?.removeEventListener('click', addCb));

        // Delete
        const deleteEl = this.shadowRoot?.querySelector('#delete-settings-button');
        const deleteCb = (): void => this.delete();
        deleteEl?.addEventListener('click', deleteCb);
        this.listeners.push(() => deleteEl?.removeEventListener('click', deleteCb));

        // Save
        const saveEl = this.shadowRoot?.querySelector('#save-settings-button');
        const saveCb = (): void => this.saveAndReload();
        saveEl?.addEventListener('click', saveCb);
        this.listeners.push(() => saveEl?.removeEventListener('click', saveCb));

        // Cancel
        const cancelEl = this.shadowRoot?.querySelector('#cancel-settings-button');
        const cancelCb = (): void => this.cancel();
        cancelEl?.addEventListener('click', cancelCb);
        this.listeners.push(() => cancelEl?.removeEventListener('click', cancelCb));

        // Initialize form
        this.refreshFormContent(window.appSettings.getCurrentUserSettings());
    }

    public disconnectedCallback(): void {
        this.listeners.forEach(rm => rm());
    }

    // --- HANDLER(s) ---

    public loadSettings(name: string): void {
        window.appSettings.setCurrentUserSettings(name);
        location.reload();
    }

    public add(): void {
        const name = 'New settings';

        const optionEl = document.createElement('option');
        optionEl.selected = true;
        optionEl.value = name;
        optionEl.textContent = name;
        this.selectEl.appendChild(optionEl);

        this.formIsNew = true;
        this.formIsDirty = true;
        this.classList.add('dirty');
        this.refreshFormContent({ name, librarySettings: {} });
    }

    public delete(): void {
        window.appSettings.deleteCurrentUserSettings();
        location.reload();
    }

    public cancel(): void {
        this.formIsNew = false;
        this.formIsDirty = false;
        this.classList.remove('dirty');
        this.refreshSelect();
        this.refreshFormContent(window.appSettings.getCurrentUserSettings());
    }

    // --- HELPER(s) ---

    private setPathValue(settings: AuthSettings, path: string, value: unknown): void {
        const props = path.split('.');
        props.reduce((obj, prop, index) => {
            if (index === (props.length - 1)) {
                (obj as any)[prop] = value;
            } else if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
                (obj as any)[prop] = {};
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return (obj as any)[prop];
        }, settings);
    }

    private getPathValue<S>(settings: AuthSettings, path: string): S {
        return path.split('.').reduce((obj, prop) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            (obj) ? (obj as any)[prop] : obj
        , settings) as S;
    }

    private refreshSelect(): void {
        // Clear the select
        this.selectEl.innerHTML = '';

        // Redraw it
        const { userSettings, currentUserSettingsId } = window.appSettings.get();
        userSettings
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach(item => {
                const optionEl = document.createElement('option');
                optionEl.selected = (item.name === currentUserSettingsId);
                optionEl.value = String(item.name);
                optionEl.textContent = item.name;
                this.selectEl.appendChild(optionEl);
            });
    }

    private refreshFormContent(userSettings: UserSettings<AuthSettings>): void {
        // Clear the page
        this.formContentEl.innerHTML = '';

        // Draw the form
        const { librarySettingsDefinition } = window.appSettings.get();
        const { name: settingName, librarySettings } = userSettings;

        this.settingsNameEl.value = settingName;
        librarySettingsDefinition
            .sort((a, b) => (b._sortIndex || 0) - (a._sortIndex || 0))
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
                            formItemEl.value = value ?? '';
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
            const { librarySettingsDefinition } = window.appSettings.get();
            const currentUserSettings = (!this.formIsNew) ? window.appSettings.getCurrentUserSettings() : {
                name: '',
                librarySettings: {}
            };
            currentUserSettings.name = this.settingsNameEl.value;
            librarySettingsDefinition
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
                    this.setPathValue(currentUserSettings.librarySettings, item.name, value);
                });

            window.appSettings.addOrUpdateUserSettings(currentUserSettings);
            if (this.formIsNew) {
                window.appSettings.setCurrentUserSettings(currentUserSettings.name);
            }
            location.reload();
        }
    }
}

window.customElements.define('demo-app-settings', DemoAppSettingsElement);
