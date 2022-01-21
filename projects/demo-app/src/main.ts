import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initAuth, Log, Navigation } from '@badisi/ngx-auth';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

initAuth({
    authorityUrl: 'http://localhost:8080/auth/realms/demo',
    clientId: 'demo',
    schemeUri: 'demo-scheme',
    loginRequired: false,
    navigationType: Navigation.POPUP,
    logLevel: Log.DEBUG
}).then(authProvider => {
    platformBrowserDynamic([
        authProvider
    ]).bootstrapModule(AppModule).catch(err => console.error(err));
}).catch(error => console.error(error));
