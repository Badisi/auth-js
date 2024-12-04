import { globalStyle } from '../core';
import type { DemoAppHeaderElement } from './demo-app-header.element';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        ${globalStyle}

        :host .tabs {
            position: fixed;
            top: calc(130px + var(--safe-area-inset-top));
            left: 0;
            right: 0;
            z-index: 1;
            align-self: normal;
            padding: 10px 0;
            padding-left: 36px;
            background-color: #7043bf;
            box-shadow: 0 3px 5px -1px #0003, 0 6px 10px #00000024, 0 1px 18px #0000001f;
        }

        :host .tabs a {
            cursor: pointer;
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            transition: background-color 150ms cubic-bezier(0.35, 0, 0.25, 1);
        }

        :host .tabs a.selected {
            background-color: #512da8;
        }

        :host .tabs a:hover {
            background-color: #4527a0;
        }

        :host .tabs a:not(:last-child) {
            margin-right: 10px;
        }

        :host .tabs-content {
            position: fixed;
            top: calc(130px + 55px + var(--safe-area-inset-top));
            left: 0;
            right: 0;
            bottom: calc(0px + var(--safe-area-inset-bottom));
            overflow: auto;
        }

        @media only screen and (max-width: 600px) {
            :host .tabs {
                padding-left: 0;
                justify-content: center;
            }
        }
    </style>

    <demo-app-header></demo-app-header>
    <nav id="tabs" class="tabs row"></nav>
    <div class="tabs-content">
        <slot id="views"></slot>
    </div>
`;

export class DemoAppMainElement extends HTMLElement {
    private listeners: (() => void)[] = [];

    private tabsContentEl?: HTMLElement | null;
    private demoAppHeaderEl?: DemoAppHeaderElement | null;

    private tabs: HTMLElement[] = [];
    private views: HTMLElement[] = [];
    private currentTabIndex = -1;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot?.appendChild(document.importNode(template.content, true));

        this.tabsContentEl = this.shadowRoot?.querySelector<HTMLElement>('.tabs-content');
        this.demoAppHeaderEl = this.shadowRoot?.querySelector<DemoAppHeaderElement>('demo-app-header');
    }

    public set isRenewing(value: boolean) {
        if (this.demoAppHeaderEl) {
            this.demoAppHeaderEl.isRenewing = value;
        }
    }

    public set isAuthenticated(value: boolean) {
        if (this.demoAppHeaderEl) {
            this.demoAppHeaderEl.isAuthenticated = value;
        }
    }

    public connectedCallback(): void {
        this.drawTabs();
        this.showView(window.appSettings.get().currentTabIndex);
    }

    public disconnectedCallback(): void {
        this.listeners.forEach(rm => { rm(); });
    }

    // --- HELPER(s) ---

    private drawTabs(): void {
        const viewsEl = this.shadowRoot?.querySelector<HTMLSlotElement>('#views');
        const tabsEl = this.shadowRoot?.querySelector('#tabs');
        if (viewsEl && tabsEl) {
            this.views = viewsEl.assignedElements() as HTMLElement[];
            this.views.forEach((view, index) => {
                // Hide view by default
                view.style.display = 'none';

                // Create associated tab
                const tab = document.createElement('a');
                tab.id = `${(view.getAttribute('tabLabel') ?? '?').toLowerCase()}-button`;
                tab.textContent = view.getAttribute('tabLabel') ?? '?';
                const cb = (): void => { this.showView(index); };
                tab.addEventListener('click', cb);
                this.listeners.push(() => { tab.removeEventListener('click', cb); });
                tabsEl.appendChild(tab);

                // Add it to collection
                this.tabs.push(tab);
            });
        }
    }

    private showView(index: number): void {
        if (this.currentTabIndex !== index) {
            this.currentTabIndex = index;

            this.tabs.forEach((tab, i) => {
                tab.classList[(i !== index) ? 'remove' : 'add']('selected');
            });
            this.views.forEach((view, i) => {
                view.style.display = (i !== index) ? 'none' : 'flex';
            });
            this.tabsContentEl?.scrollTo(0, 0);

            window.appSettings.setCurrentTabIndex(index);
        }
    }
}

window.customElements.define('demo-app-main', DemoAppMainElement);
