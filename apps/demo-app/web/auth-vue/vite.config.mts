/* eslint-disable @typescript-eslint/naming-convention */

import vue from '@vitejs/plugin-vue';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type UserConfig } from 'vite';
import simpleHtmlPlugin from 'vite-plugin-simple-html';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_PATH = resolve(__dirname, '../../../../');

const baseHref = process.env['BASE_URL'] ?? '/';

const config: UserConfig = defineConfig({
    root: __dirname,
    cacheDir: resolve(WORKSPACE_PATH, 'node_modules/.vite'),
    resolve: {
        conditions: ['development']
    },
    base: baseHref,
    server: {
        host: '0.0.0.0',
        port: 4200
    },
    build: {
        emptyOutDir: true
    },
    plugins: [
        simpleHtmlPlugin({
            minify: false,
            inject: {
                data: {
                    baseHref
                }
            }
        }),
        viteStaticCopy({
            targets: [
                {
                    src: `${WORKSPACE_PATH}/libs/auth-js/oidc/assets/*`,
                    dest: 'oidc/callback/',
                    rename: { stripBase: true } // flat copy
                }
            ]
        }),
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag: string) => tag.startsWith('demo-app-')
                }
            }
        })
    ]
});

export default config;
