import { Component } from '@angular/core';
import { AuthService } from '@badisi/ngx-auth';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html'
})
export class DemoComponent {
    constructor(
        public authService: AuthService
    ) { }
}
