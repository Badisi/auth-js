/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const baseHref = process.env.BASE_HREF || '/';

export default defineConfig({
    root: __dirname,
    base: baseHref,
    cacheDir: '../../../../node_modules/.vite/demo-app/auth-vue',
    server: {
        port: 4200,
        host: 'localhost'
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: tag => tag.startsWith('demo-app-')
                }
            }
        }),
        nxViteTsPaths(),
        createHtmlPlugin({
            minify: false,
            inject: {
                data: {
                    baseHref: baseHref
                }
            }
        }),
        viteStaticCopy({
            targets: [
                {
                    src: '../../../../libs/auth-js/oidc/assets/*',
                    dest: 'oidc/callback/'
                }
            ]
        })
    ],
    build: {
        outDir: '../../../../dist/demo-app/auth-vue',
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true
        }
    }
});
