import { Component } from '@angular/core';
import { AuthService } from '@badisi/ngx-auth';

@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.scss']
})
export class DebugComponent {
    public isAuthenticated$ = this.authService.isAuthenticated$;
    public idToken$ = this.authService.idToken$;
    public idTokenDecoded$ = this.authService.idTokenDecoded$;
    public accessToken$ = this.authService.accessToken$;
    public accessTokenDecoded$ = this.authService.accessTokenDecoded$;
    public userProfile$ = this.authService.userProfile$;
    public userSession$ = this.authService.userSession$;

    constructor(
        private authService: AuthService
    ) { }
}
