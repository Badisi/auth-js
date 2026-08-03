/* eslint-disable @typescript-eslint/naming-convention */
import { generateLicenseFile } from 'generate-license-file';
import { copyFileSync, cpSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { styleText } from 'node:util';
import { defineConfig, type UserConfig } from 'tsdown';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_PATH = resolve(__dirname, '../../dist/auth-js');

const iifeConfig = (overrides?: UserConfig): UserConfig => ({
    globalName: 'AuthJs',
    entry: ['oidc/index.ts'],
    format: ['iife'],
    outDir: resolve(DIST_PATH, 'oidc'),
    deps: {
        alwaysBundle: ['jwt-decode', 'oidc-client-ts'],
        onlyBundle: false
    },
    inputOptions: {
        resolve: {
            conditionNames: ['development']
        }
    },
    outputOptions: {
        codeSplitting: false,
        entryFileNames: (overrides?.minify) ? '[name].iife.min.js' : '[name].iife.js',
        comments: {
            annotation: false,
            jsdoc: false,
            legal: true
        }
    },
    ...overrides
});

const libConfig = (): UserConfig => ({
    entry: ['core/index.ts', 'oidc/index.ts'],
    format: ['esm', 'cjs'],
    outDir: DIST_PATH,
    clean: true,
    sourcemap: false,
    dts: {
        sourcemap: false
    },
    inputOptions: {
        resolve: {
            conditionNames: ['development']
        }
    },
    outputOptions: {
        comments: {
            legal: true
        }
    },
    onSuccess: async (): Promise<void> => {
        console.log(`${styleText('green', '✓')} Writing package metadata...`);
        const pkgJson = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf8')) as Record<string, unknown>;
        const postinstall = (pkgJson['scripts'] as Record<string, string> | undefined)?.['postinstall'];
        if (postinstall) {
            pkgJson['scripts'] = { postinstall };
        } else {
            delete pkgJson['scripts'];
        }
        delete pkgJson['publishConfig'];
        delete pkgJson['devDependencies'];
        Object.values(pkgJson['exports'] ?? {}).forEach((entry: Record<string, unknown>) => {
            if (typeof entry === 'object') {
                delete entry['development'];
            }
        });
        writeFileSync(resolve(DIST_PATH, 'package.json'), JSON.stringify(pkgJson, null, 4));

        console.log(`${styleText('green', '✓')} Copying assets...`);
        cpSync(resolve(__dirname, 'oidc/assets'), resolve(DIST_PATH, 'oidc/assets'), { recursive: true });
        copyFileSync(resolve(__dirname, 'CHANGELOG.md'), resolve(DIST_PATH, 'CHANGELOG.md'));
        copyFileSync(resolve(__dirname, 'README.md'), resolve(DIST_PATH, 'README.md'));
        copyFileSync(resolve(__dirname, '../../LICENSE'), resolve(DIST_PATH, 'LICENSE'));

        console.log(`${styleText('green', '✓')} Generating third-party licenses...`);
        await generateLicenseFile(
            resolve(__dirname, 'package.json'),
            resolve(DIST_PATH, '3rdpartylicenses.txt')
        );
    }
});

const configs: UserConfig[] = defineConfig([
    libConfig(),
    iifeConfig({
        minify: true
    }),
    iifeConfig({
        minify: false
    })
]);

export default configs;
