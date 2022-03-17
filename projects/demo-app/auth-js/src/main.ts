import './app/app.element.ts';

import { initOidc } from '@badisi/auth-js/oidc';

import { authSettings } from './app/app.settings';

void (async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.authSettings = authSettings;
    window.authManager = await initOidc(authSettings.getCurrentSettings().librarySettings);

    const template = document.createElement('template');
    if (!window.authManager.getSettings().loginRequired || await window.authManager.isAuthenticated()) {
        template.innerHTML = '<app-root></app-root>';
        document.body.appendChild(document.importNode(template.content, true));
    } else {
        template.innerHTML = 'Not authorized<br/><button id="loginNotAuthorized">Login</button>';
        document.body.appendChild(document.importNode(template.content, true));
        document.body.querySelector('#loginNotAuthorized')?.addEventListener('click', () => {
            void window.authManager.login();
        }, { once: true });
    }
})();
