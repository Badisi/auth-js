import './styles.scss';

import { initAuth } from '@badisi/auth-vue';
import { DemoAppSettingsService } from 'demo-app-common';
import { createApp } from 'vue';

import app from './App.vue';
import router from './router';

((): void => {
    window.appSettings = new DemoAppSettingsService(!import.meta.env.PROD);

    const el = document.createElement('div');
    el.innerHTML = 'Loading...';
    document.body.appendChild(el);

    initAuth(window.appSettings.getCurrentSettings().librarySettings)
        .then(authPlugin => {
            el.replaceWith(document.createElement('root'));

            const vueApp = createApp(app);
            vueApp.use(authPlugin, { router });
            vueApp.use(router);
            vueApp.mount('root');
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
