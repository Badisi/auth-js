import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Params, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@badisi/ngx-auth';
import { DemoAppPlaygroundElement, globalStyle } from 'demo-app-common';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styles: [globalStyle],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [AsyncPipe, FormsModule, RouterOutlet],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class DemoComponent {
    @ViewChild('demoAppPlayground')
    private demoAppPlaygroundEl!: ElementRef<DemoAppPlaygroundElement>;

    protected authService = inject(AuthService);
    private httpClient = inject(HttpClient);
    private router = inject(Router);

    // --- HANDLER(s) ---

    public callPrivateApi(event: Event): void {
        const { url, headers } = (event as CustomEvent).detail as {
            url: string;
            headers?: Record<string, string | number>;
        };

        if (url) {
            const demoPlayground = this.demoAppPlaygroundEl.nativeElement;
            this.httpClient
                .get<unknown>(url, headers ? { headers: new HttpHeaders(headers) } : {})
                .subscribe({
                    next: data => { demoPlayground.setApiStatus(data, false); },
                    error: (error: unknown) => { demoPlayground.setApiStatus(error, true); }
                });
        }
    }

    public async navigate(url: string, event: Event): Promise<void> {
        const { queryParams } = (event as CustomEvent).detail as {
            queryParams?: Params;
        };
        await this.router.navigate([url], { queryParams });
    }
}
