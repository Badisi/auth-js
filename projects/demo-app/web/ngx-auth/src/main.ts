import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initAuth } from '@badisi/ngx-auth';
import { DemoAppSettings } from 'demo-app-common';

import { AppModule } from './app/app.module';
import { appSettings } from './app/app.settings';
import { environment } from './environments/environment';

declare global {
    interface Window {
        authSettings: DemoAppSettings;
    }
}

if (environment.production) {
    enableProdMode();
}

((): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.appSettings = appSettings;

    const el = document.createElement('div');
    el.innerHTML = 'Loading...';
    document.body.appendChild(el);

    initAuth(appSettings.getCurrentUserSettings().librarySettings)
        .then(authProvider => {
            el.replaceWith(document.createElement('app-root'));

            platformBrowserDynamic([
                authProvider
            ]).bootstrapModule(AppModule).catch(err => console.error(err));
        })
        .catch((err: Error) => {
            const message = (err instanceof Error) ? err.message : err;
            el.innerHTML = `${message}<br/><button id="loginButton">Login</button>`;
            document.body.querySelector('#loginButton')?.addEventListener(
                'click', () => location.reload(), { once: true }
            );
        });
})();
