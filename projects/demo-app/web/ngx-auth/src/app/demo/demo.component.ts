import { Component } from '@angular/core';
import { AuthService } from '@badisi/ngx-auth';

import { environment } from '../../environments/environment';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html'
})
export class DemoComponent {
    public isDev = !environment.production;

    constructor(
        public authService: AuthService
    ) { }
}
