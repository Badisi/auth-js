import type { UserConfig } from 'vite';
import { defineConfig } from 'vitest/config';

const config: UserConfig = defineConfig({
    root: __dirname,
    test: {
        watch: false,
        globals: true,
        passWithNoTests: true,
        environment: 'node',
        include: ['**/*.spec.ts'],
        reporters: ['default'],
        coverage: {
            provider: 'v8' as const
        }
    }
});

export default config;
