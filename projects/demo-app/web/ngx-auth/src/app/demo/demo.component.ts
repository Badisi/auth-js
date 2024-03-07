import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Params, Router } from '@angular/router';
import { AuthService } from '@badisi/ngx-auth';
import { DemoAppPlaygroundElement, globalStyle } from 'demo-app-common';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    styles: [globalStyle],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class DemoComponent implements AfterViewInit {
    @ViewChild('demoAppPlayground')
    private demoAppPlaygroundEl!: ElementRef<DemoAppPlaygroundElement>;

    @ViewChild('queryParamsInput')
    private queryParamsInputEl!: ElementRef<HTMLInputElement>;

    public roles?: string;
    public queryParams?: Params;

    constructor(
        public router: Router,
        public authService: AuthService,
        private httpClient: HttpClient
    ) { }

    public ngAfterViewInit(): void {
        setTimeout(() => {
            const settings = window.appSettings.getCurrentUserSettings().otherSettings;
            this.roles = settings?.['roles'] as string;
            this.queryParams = settings?.['queryParams'] as Params;
            if (this.queryParams) {
                let queryParamsString = '';
                Object.entries(this.queryParams).forEach(([key, value], index) => {
                    if (index > 0) {
                        queryParamsString += '&';
                    }
                    queryParamsString += `${key}=${value as string}`;
                });
                this.queryParamsInputEl.nativeElement.value = queryParamsString;
            }
        });
    }

    // --- HANDLER(s) ---

    public callPrivateApi(event: Event): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { url, headers } = (event as CustomEvent).detail as { url: string; headers: string };

        if (url) {
            let httpHeaders = new HttpHeaders();
            headers?.split(';').forEach(header => {
                if (header) {
                    const item = header.split(':');
                    httpHeaders = httpHeaders.append(item[0]?.trim(), item[1]?.trim() || '');
                }
            });

            const demoPlayground = this.demoAppPlaygroundEl?.nativeElement;
            this.httpClient
                .get<unknown>(url, headers ? { headers: httpHeaders } : {})
                .subscribe({
                    next: data => demoPlayground?.setApiStatus(data, false),
                    error: error => demoPlayground?.setApiStatus(error, true)
                });
        }
    }

    public saveSettings(): void {
        const demoPlayground = this.demoAppPlaygroundEl?.nativeElement;
        demoPlayground.saveSettings({ roles: this.roles, queryParams: this.queryParams });
    }

    public onQueryParamsInputChange(value: string): void {
        const params: Params = {};
        value?.split('&').forEach(attr => {
            const vals = attr.split('=');
            if (vals.length === 2) {
                params[vals[0]] = vals[1];
            }
        });
        this.queryParams = params;
        this.saveSettings();
    }
}
