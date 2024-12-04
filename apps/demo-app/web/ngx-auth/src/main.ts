import { bootstrapApplication } from '@angular/platform-browser';
import { initAuth, provideAuth } from '@badisi/ngx-auth';
import type { DemoAppSettings } from 'demo-app-common';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { appSettings } from './app/app.settings';

declare global {
    interface Window {
        authSettings: DemoAppSettings;
    }
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

            appConfig.providers.push(provideAuth(authProvider));
            bootstrapApplication(AppComponent, appConfig)
                .catch((err: unknown) => { console.error(err); });
        })
        .catch((err: unknown) => {
            const message = (err instanceof Error) ? err.message : String(err);
            el.innerHTML = `${message}<br/><button id="loginButton">Login</button>`;
            document.body.querySelector('#loginButton')?.addEventListener(
                'click', () => { location.reload(); }, { once: true }
            );
        });
})();
