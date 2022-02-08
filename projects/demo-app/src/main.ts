import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initAuth } from '@badisi/ngx-auth';

import { AppModule } from './app/app.module';
import { SettingsComponent } from './app/demo/settings/settings.component';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

initAuth(SettingsComponent.loadSettings())
    .then(authProvider => {
        platformBrowserDynamic([
            authProvider
        ]).bootstrapModule(AppModule).catch(err => console.error(err));
    }).catch(error => console.error(error));
