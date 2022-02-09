import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@badisi/ngx-auth';

import { DEMO_APP_SETTING_STORAGE_KEY, DemoAppSettings, DemoAppView } from './demo';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
    @ViewChild(RouterOutlet)
    public outlet!: RouterOutlet;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public DemoAppView = DemoAppView;

    public isAuthenticated$ = this.authService.isAuthenticated$;
    public data: unknown | Error;

    public settings: DemoAppSettings = {
        currentView: DemoAppView.PLAYGROUND,
        roles: 'view-profile',
        privateApiUrl: '/api/my-api',
        privateApiHeaders: ''
    };

    constructor(
        private authService: AuthService,
        private httpClient: HttpClient,
        private router: Router
    ) {
        this.loadSettings();
    }

    public ngOnInit(): void {
        this.router.events.subscribe(e => {
            if (e instanceof ActivationStart) {
                this.outlet.deactivate();
            }
        });
    }

    // ---- HANDLER(s) ----

    public showView(view: DemoAppView): void {
        if (this.settings.currentView !== view) {
            this.settings.currentView = view;
            this.saveSettings();
        }
    }

    public callPrivateApi(): void {
        let headers = new HttpHeaders();
        this.settings.privateApiHeaders?.split(';').forEach(header => {
            const item = header.split(':');
            headers = headers.append(item[0]?.trim(), item[1]?.trim() || '');
        });

        this.httpClient
            .get<unknown>(this.settings.privateApiUrl, this.settings.privateApiHeaders ? { headers } : {})
            .subscribe({
                next: data => this.data = data,
                error: (error: Error) => this.data = error
            });
    }

    public login(): void {
        void this.authService.login();
    }

    public logout(): void {
        void this.authService.logout('/');
    }

    public test(): void {
        console.log('coucou');
    }

    public renew(): void {
        void this.authService.renew();
    }

    // --- HELPER(s) ---

    public loadSettings(): void {
        const appSettings = sessionStorage.getItem(DEMO_APP_SETTING_STORAGE_KEY);
        if (appSettings) {
            this.settings = JSON.parse(appSettings) as DemoAppSettings;
        }
    }

    public saveSettings(): void {
        sessionStorage.setItem(DEMO_APP_SETTING_STORAGE_KEY, JSON.stringify(this.settings));
    }
}
