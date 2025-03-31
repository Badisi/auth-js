import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initAuth, provideAuth } from '@badisi/ngx-auth';
import { DemoAppSettingsService } from 'demo-app-common';

import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';

const USE_STANDALONE = true;

void (async (): Promise<void> => {
    window.appSettings = new DemoAppSettingsService(isDevMode());

    const el = document.createElement('div');
    el.innerHTML = 'Loading...';
    document.body.appendChild(el);

    try {
        const authProvider = await initAuth(window.appSettings.getCurrentSettings().librarySettings);

        el.replaceWith(document.createElement('app-root'));

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (USE_STANDALONE) {
            const { appConfig } = await import('./app/app.config');
            appConfig.providers.push(provideAuth(authProvider));
            bootstrapApplication(AppComponent, appConfig)
                .catch((err: unknown) => { console.error(err); });
        } else {
            platformBrowserDynamic([authProvider])
                .bootstrapModule(AppModule)
                .catch((err: unknown) => { console.error(err); });
        }
    } catch (err: unknown) {
        const message = (err instanceof Error) ? err.message : String(err);
        el.innerHTML = `${message}<br/><button id="loginButton">Login</button>`;
        document.body.querySelector('#loginButton')?.addEventListener(
            'click', () => { location.reload(); }, { once: true }
        );
        console.error(err);
    }
})();
