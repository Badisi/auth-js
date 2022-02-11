import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@badisi/ngx-auth';

import { DemoView } from './models/demo-view.enum';
import { DemoService } from './services/demo.service';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss']
})
export class DemoComponent {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public DemoView = DemoView;

    public isAuthenticated$ = this.authService.isAuthenticated$;

    public currentView = DemoService.getCurrentView();

    constructor(
        private authService: AuthService,
        public router: Router
    ) { }

    // ---- HANDLER(s) ----

    public showView(view: DemoView): void {
        if (this.currentView !== view) {
            this.currentView = view;
            DemoService.saveCurrentView(view);
        }
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
