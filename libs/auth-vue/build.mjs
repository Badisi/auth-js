// @ts-check

import cpy from 'cpy';
import { readFileSync } from 'node:fs';
import { dirname, resolve as pathResolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import buildLib from '../../scripts/build-lib.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgJson = JSON.parse(readFileSync(pathResolve(__dirname, 'package.json'), { encoding: 'utf-8' }));
const distPath = pathResolve(__dirname, '../../dist/auth-vue');

await buildLib({
    packageName: pkgJson.name,
    distPath,
    tsconfigPath: pathResolve(__dirname, 'tsconfig.lib.json'),
    absWorkingDir: __dirname,
    entryPoints: [
        { name: 'core', path: pathResolve(__dirname, 'core', 'index.ts') }],
    buildOptions: {
        esm: true,
        cjs: true,
        browser: 'AuthVue',
        externals: Object.keys({
            ...pkgJson.dependencies,
            ...pkgJson.peerDependencies
        })
    },
    copyAssets: async () => {
        await cpy('libs/auth-js/oidc/assets', pathResolve(distPath, 'oidc', 'assets'), { flat: true });
        await cpy('libs/auth-vue/package.json', distPath, { flat: true });
        await cpy('libs/auth-vue/README.md', distPath, { flat: true });
        await cpy('LICENSE', distPath, { flat: true });
    }
});
