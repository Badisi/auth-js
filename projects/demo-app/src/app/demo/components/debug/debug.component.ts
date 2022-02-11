import { Component } from '@angular/core';
import { AuthService } from '@badisi/ngx-auth';
import { tap } from 'rxjs';

@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.scss']
})
export class DebugComponent {
    public accessTokenIsJwt = false;
    public isAuthenticated$ = this.authService.isAuthenticated$;
    public userProfile$ = this.authService.userProfile$;
    public userSession$ = this.authService.userSession$;
    public idToken$ = this.authService.idToken$;
    public idTokenDecoded$ = this.authService.idTokenDecoded$;
    public accessToken$ = this.authService.accessToken$;
    public accessTokenDecoded$ = this.authService.accessTokenDecoded$.pipe(
        tap(token => (this.accessTokenIsJwt = (typeof token !== 'string')))
    );

    constructor(
        private authService: AuthService
    ) { }
}
