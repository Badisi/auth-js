import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@badisi/ngx-auth';

const DEMO_APP_STORAGE_KEY = 'ngx-auth_demo-app_settings';

interface DemoAppSettings {
    showDebugInfo: string;
}

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
    public isAuthenticated$ = this.authService.isAuthenticated$;
    public accessToken$ = this.authService.accessToken$;
    public accessTokenDecoded$ = this.authService.accessTokenDecoded$;
    public userProfile$ = this.authService.userProfile$;
    public userSession$ = this.authService.userSession$;

    public privateApiUrl = '/api/my-api';
    public privateApiHeaders?: string;
    public data: unknown | Error;

    public showDebugInfo?: boolean;

    constructor(
        private authService: AuthService,
        private httpClient: HttpClient
    ) { }

    public ngOnInit(): void {
        this.loadSettings();
    }

    // ---- HANDLER(s) ----

    public callPrivateApi(): void {
        let headers = new HttpHeaders();
        this.privateApiHeaders?.split(';').forEach(header => {
            const item = header.split(':');
            headers = headers.append(item[0]?.trim(), item[1]?.trim() || '');
        });

        this.httpClient
            .get<unknown>(this.privateApiUrl, this.privateApiHeaders ? { headers } : {})
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

    public refresh(): void {
        void this.authService.refresh();
    }

    public saveSettings(): void {
        sessionStorage.setItem(DEMO_APP_STORAGE_KEY, JSON.stringify({
            showDebugInfo: (!this.showDebugInfo).toString()
        }));
    }

    // --- HELPER(s) ---

    private loadSettings(): void {
        const settings = JSON.parse(sessionStorage.getItem(DEMO_APP_STORAGE_KEY) || '{}') as DemoAppSettings;
        this.showDebugInfo = (settings.showDebugInfo === 'true');
    }
}
