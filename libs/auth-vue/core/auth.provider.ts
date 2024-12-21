import { initOidc } from '@badisi/auth-js/oidc';
import type { App, Plugin } from 'vue';
import type { Router } from 'vue-router';

import type { AuthSettings } from '.';
import { useAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

export const initAuth = async (settings: AuthSettings): Promise<Plugin> => {
    /**
     *  Vue do not wait for a plugin to be installed if the installation is async.
     *  So we have to get the authManager prior of the plugin installation phase,
     *  to make sur any code that will use it later on, will actually get it.
     */
    const authManager = await initOidc(settings);
    return {
        install: (app: App, { router }: { router: Router; }): void => {
            // Effectively adding authService to every component instance
            const authService = new AuthService(authManager, router);
            app.provide('$authService', authService);
            app.config.globalProperties.$authService = authService;

            // Add global router guard
            router.beforeEach(async (to) => {
                if (to.meta.authGuard) {
                    return await useAuthGuard(
                        to.fullPath,
                        (typeof to.meta.authGuard === 'object') ? to.meta.authGuard : undefined
                    );
                }
                return true;
            });
        },
    };
};
