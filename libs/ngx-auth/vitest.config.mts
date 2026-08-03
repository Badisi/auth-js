import { resolve } from 'node:path';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vitest/config';

const config: UserConfig = defineConfig({
    root: __dirname,
    cacheDir: resolve(__dirname, '../../node_modules/.vite'),
    test: {
        watch: false,
        reporters: ['verbose'],
        coverage: {
            provider: 'v8' as const
        },
        projects: [
            defineConfig({
                test: {
                    name: 'lib',
                    globals: true,
                    passWithNoTests: true,
                    environment: 'jsdom',
                    include: ['**/*.spec.ts'],
                    exclude: ['schematics/**']
                }
            }),
            defineConfig({
                test: {
                    name: 'schematics',
                    globals: true,
                    passWithNoTests: true,
                    isolate: false,
                    environment: 'node',
                    include: ['schematics/**/*.spec.ts'],
                    setupFiles: ['vitest.setup.ts']
                }
            })
        ]
    }
});

export default config;
