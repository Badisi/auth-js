import hug from '@hug/eslint-config';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(
    globalIgnores([
        '**/demo-realm.json',
        '**/capacitor.config.ts'
    ], 'auth-js/ignores'),
    hug.configs.createModerate({
        typescript: {
            rules: {
                '@typescript-eslint/no-deprecated': 'warn'
            }
        }
    }),
    hug.configs.stylistic.createRecommended({
        rules: {
            '@stylistic/comma-dangle': ['error', 'never']
        }
    })
);
