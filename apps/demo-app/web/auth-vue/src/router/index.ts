import { rolesValidator } from 'demo-app-common';
import { createRouter, createWebHistory, type RouteComponent } from 'vue-router';

import demoView from '../views/DemoView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: demoView,
            children: [
                {
                    path: 'forbidden',
                    component: (): Promise<RouteComponent> => import('../views/PageView.vue'),
                    meta: {
                        title: 'ACCESS FORBIDDEN'
                    }
                },
                {
                    path: 'public',
                    component: (): Promise<RouteComponent> => import('../views/PageView.vue'),
                    meta: {
                        title: 'PUBLIC CONTENT'
                    }
                },
                {
                    path: 'private',
                    component: (): Promise<RouteComponent> => import('../views/PageView.vue'),
                    meta: {
                        title: 'PRIVATE CONTENT',
                        authGuard: true,
                        // authGuard: { fallbackUrl: 'forbidden' },
                        // authGuard: { validator: () => false },
                        // authGuard: { validator: hasRole('view-profile') }
                    }
                },
                {
                    path: 'protected',
                    component: (): Promise<RouteComponent> => import('../views/PageView.vue'),
                    meta: {
                        title: 'PROTECTED CONTENT',
                        authGuard: {
                            validator: rolesValidator()
                        }
                    }
                }
            ]
        }
    ]
});

export default router;
