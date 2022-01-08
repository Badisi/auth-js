import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService, UserProfile, UserSession } from '@badisi/ngx-auth/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit, OnDestroy {
    private authenticatedSub$: Subscription;

    public userProfile: UserProfile;
    public userSession: UserSession;
    public accessToken: string;
    public isAuthenticated: boolean;

    public privateApiUrl = '/api/my-api';
    public data: any;

    constructor(
        private authService: AuthService,
        private httpClient: HttpClient
    ) { }

    ngOnInit(): void {
        // Observe authentication
        this.authenticatedSub$ = this.authService
            .isAuthenticated()
            .subscribe((value: boolean) => {
                this.isAuthenticated = value;
                this.refreshInfo();
            });
    }

    ngOnDestroy(): void {
        this.authenticatedSub$.unsubscribe();
    }

    // ---- HANDLER(s) ----

    callPrivateAPI(): void {
        this.httpClient
            .get<any>(this.privateApiUrl)
            .subscribe(
                (data) => this.data = data,
                (error) => this.data = error
            );
    }

    login(): void {
        this.authService.login();
    }

    logout(): void {
        this.authService.logout('/');
    }

    refresh(): void {
        this.authService.refresh().then(() => this.refreshInfo());
    }

    // ---- HELPER(s) ----

    private refreshInfo(): void {
        this.accessToken = this.authService.getAccessToken();
        this.userProfile = this.authService.getUserProfile();
        this.userSession = this.authService.getUserSession();
    }
}
