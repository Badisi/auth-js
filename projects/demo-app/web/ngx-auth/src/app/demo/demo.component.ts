import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@badisi/ngx-auth';
import { DemoAppPlaygroundElement, globalStyle } from 'demo-app-common';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    styles: [globalStyle],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class DemoComponent {
    @ViewChild('demoAppPlayground')
    private demoAppPlaygroundEl!: ElementRef;

    public roles = window.appSettings.getCurrentUserSettings().otherSettings?.['roles'];

    constructor(
        public router: Router,
        public authService: AuthService,
        private httpClient: HttpClient
    ) { }

    // --- HANDLER(s) ---

    public callPrivateApi(event: Event): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { url, headers } = (event as CustomEvent).detail as { url: string; headers: string };

        if (url) {
            const demoPlayground = this.demoAppPlaygroundEl?.nativeElement as DemoAppPlaygroundElement;

            let httpHeaders = new HttpHeaders();
            headers?.split(';').forEach(header => {
                if (header) {
                    const item = header.split(':');
                    httpHeaders = httpHeaders.append(item[0]?.trim(), item[1]?.trim() || '');
                }
            });

            this.httpClient
                .get<unknown>(url, headers ? { headers: httpHeaders } : {})
                .subscribe({
                    next: data => demoPlayground?.setApiStatus(data, false),
                    error: error => demoPlayground?.setApiStatus(error, true)
                });
        }
    }

    public saveSettings(): void {
        const demoPlayground = this.demoAppPlaygroundEl?.nativeElement as DemoAppPlaygroundElement;
        demoPlayground.saveSettings({ roles: this.roles });
    }
}
