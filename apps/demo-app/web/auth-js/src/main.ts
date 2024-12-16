import './app/app.element';

import { initOidc } from '@badisi/auth-js/oidc';

import { appSettings } from './app/app.settings';

((): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.appSettings = appSettings;

    const el = document.createElement('div');
    el.innerHTML = 'Loading...';
    document.body.appendChild(el);

    initOidc(appSettings.getCurrentUserSettings().librarySettings)
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
