import './app/app.element';

import { initOidc } from '@badisi/auth-js/oidc';
import { DEFAULT_SETTINGS, DemoAppSettings } from 'demo-app-common';
import pkgJson from 'libs/auth-js/package.json';

import { environment } from './environments/environment';

((): void => {
    window.appSettings = new DemoAppSettings(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        `auth-js:${(pkgJson as any).version as string}:demo-app:settings`,
        DEFAULT_SETTINGS(!environment.production)
    );

    const el = document.createElement('div');
    el.innerHTML = 'Loading...';
    document.body.appendChild(el);

    initOidc(window.appSettings.getCurrentSettings().librarySettings)
        .then(manager => {
            window.authManager = manager;
            el.replaceWith(document.createElement('app-root'));
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
