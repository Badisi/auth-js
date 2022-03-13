import { Component } from '@angular/core';
import { AuthService } from '@badisi/ngx-auth';

import { environment } from '../../environments/environment';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html'
})
export class DemoComponent {
    public isAuthenticated$ = this.authService.isAuthenticated$;
    public userProfile$ = this.authService.userProfile$;
    public userSession$ = this.authService.userSession$;
    public idToken$ = this.authService.idToken$;
    public idTokenDecoded$ = this.authService.idTokenDecoded$;
    public accessToken$ = this.authService.accessToken$;
    public accessTokenDecoded$ = this.authService.accessTokenDecoded$;
    public isDev = !environment.production;

    constructor(
        private authService: AuthService
    ) { }

    public login(): void {
        void this.authService.login();
    }

    public logout(): void {
        void this.authService.logout('/');
    }

    public silentRenew(): void {
        void this.authService.renew();
    }
}
