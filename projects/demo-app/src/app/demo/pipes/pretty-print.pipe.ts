import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

const DATE_FORMAT = 'EEE, MMM dd y, hh:mm:ss a, zzzz';

@Pipe({
    name: 'prettyPrint'
})
export class PrettyPrintPipe implements PipeTransform {
    constructor(
        private datePipe: DatePipe
    ) { }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public transform(value: any, dateAttrs: string[] = []): string {
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
                    const pValAsDate = this.datePipe.transform(Number(pVal) * 1000, DATE_FORMAT)?.toString();
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
    }
}
