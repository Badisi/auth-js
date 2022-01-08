import { Component, OnInit } from '@angular/core';
import { AuthService } from '@badisi/ngx-auth/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    constructor(
        private authService: AuthService
    ) { }

    public ngOnInit(): void {
        /* setTimeout(() => {
            console.log('refresh');
            this.authService.refresh(_error => {
                this.authService.login();
            });
        }, 5000);*/
    }
}
