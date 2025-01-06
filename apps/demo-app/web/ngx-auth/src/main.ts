import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initAuth, provideAuth } from '@badisi/ngx-auth';
import { DEFAULT_SETTINGS, DemoAppSettings } from 'demo-app-common';
import pkgJson from 'libs/ngx-auth/package.json';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { AppModule } from './app/app.module';

const USE_STANDALONE = true;

((): void => {
    window.appSettings = new DemoAppSettings(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        `ngx-auth:${(pkgJson as any).version as string}:demo-app:settings`,
        DEFAULT_SETTINGS(isDevMode())
    );

    const el = document.createElement('div');
    el.innerHTML = 'Loading...';
    document.body.appendChild(el);

    initAuth(window.appSettings.getCurrentSettings().librarySettings)
        .then(authProvider => {
            el.replaceWith(document.createElement('app-root'));

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (USE_STANDALONE) {
                appConfig.providers.push(provideAuth(authProvider));
                bootstrapApplication(AppComponent, appConfig)
                    .catch((err: unknown) => { console.error(err); });
            } else {
                platformBrowserDynamic([authProvider])
                    .bootstrapModule(AppModule)
                    .catch((err: unknown) => { console.error(err); });
            }
        })
        .catch((err: unknown) => {
            const message = (err instanceof Error) ? err.message : String(err);
            el.innerHTML = `${message}<br/><button id="loginButton">Login</button>`;
            document.body.querySelector('#loginButton')?.addEventListener(
                'click', () => { location.reload(); }, { once: true }
            );
            console.error(err);
        });
})();
