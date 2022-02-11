import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initAuth } from '@badisi/ngx-auth';

import { AppModule } from './app/app.module';
import { DemoService } from './app/demo/services/demo.service';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

initAuth(DemoService.getLibrarySettings())
    .then(authProvider => {
        platformBrowserDynamic([
            authProvider
        ]).bootstrapModule(AppModule).catch(err => console.error(err));
    }).catch(error => console.error(error));
