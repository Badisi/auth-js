import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initAuth } from '@badisi/ngx-auth';
import { DemoAppSettings } from 'demo-app-common';

import { AppModule } from './app/app.module';
import { authSettings } from './app/app.settings';
import { environment } from './environments/environment';

declare global {
    interface Window {
        authSettings: DemoAppSettings;
    }
}

if (environment.production) {
    enableProdMode();
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.authSettings = authSettings;

initAuth(authSettings.getCurrentSettings().librarySettings)
    .then(authProvider => {
        platformBrowserDynamic([
            authProvider
        ]).bootstrapModule(AppModule).catch(err => console.error(err));
    }).catch(error => console.error(error));
