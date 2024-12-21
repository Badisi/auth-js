/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    root: __dirname,
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
