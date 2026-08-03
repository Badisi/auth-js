import { browser } from '@wdio/globals';
import type { InputOptions } from 'webdriverio';

type SetValueFunction = (value: string | number, options?: InputOptions) => Promise<void>;

browser.overwriteCommand('setValue', async function(this, origCommand: SetValueFunction, value: string | number, options?: InputOptions): Promise<void> {
    try {
        await browser.execute((el: HTMLElement | null, val: string | number) => {
            if (!el) {
                throw new Error('L\'élément cible fourni à safeSetValue est indéterminé ou introuvable.');
            }

            if ('value' in el) {
                const input = el as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
                input.value = String(val);
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
            } else {
                throw new Error(`safeSetValue a été appelé sur un élément qui ne supporte pas de valeur (${JSON.stringify(el)}).`);
            }
        }, this, value);
    } catch {
        await origCommand(value, options);
    }
}, true);
