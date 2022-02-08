import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@badisi/ngx-auth';

enum View {
    PLAYGROUND,
    DEBUG,
    SETTINGS
}

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
    @ViewChild(RouterOutlet)
    public outlet!: RouterOutlet;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public View = View;

    public isAuthenticated$ = this.authService.isAuthenticated$;
    public currentView: View = View.PLAYGROUND;

    public roles = 'view-profile';
    public privateApiUrl = '/api/my-api';
    public privateApiHeaders?: string;
    public data: unknown | Error;

    constructor(
        private authService: AuthService,
        private httpClient: HttpClient,
        private router: Router

    ) { }

    public ngOnInit(): void {
        this.router.events.subscribe(e => {
            if (e instanceof ActivationStart) {
                this.outlet.deactivate();
            }
        });
    }

    // ---- HANDLER(s) ----

    public showView(view: View): void {
        if (this.currentView !== view) {
            this.currentView = view;
        }
    }

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

    public renew(): void {
        void this.authService.renew();
    }
}
