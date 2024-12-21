import cpy from 'cpy';
import { readFileSync } from 'fs';
import { dirname, resolve as pathResolve } from 'path';
import { fileURLToPath } from 'url';

import esbuild from '../build.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgJson = JSON.parse(readFileSync(pathResolve(__dirname, 'package.json')));
const distPath = pathResolve(__dirname, '../../dist/auth-js');

await esbuild({
    packageName: pkgJson.name,
    distPath,
    tsconfigPath: pathResolve(__dirname, 'tsconfig.lib.json'),
    absWorkingDir: __dirname,
    entryPoints: [
        { name: 'core', path: pathResolve(__dirname, 'core', 'index.ts') },
        { name: 'oidc', path: pathResolve(__dirname, 'oidc', 'index.ts') }
    ],
    buildOptions: {
        esm: true,
        cjs: true,
        browser: 'AuthJs',
        externals: Object.keys({
            ...pkgJson.dependencies,
            ...pkgJson.peerDependencies
        })
    },
    copyAssets: async () => {
        await cpy('libs/auth-js/oidc/assets', pathResolve(distPath, 'oidc', 'assets'), { flat: true });
        await cpy('libs/auth-js/package.json', distPath, { flat: true });
        await cpy('libs/auth-js/README.md', distPath, { flat: true });
        await cpy('LICENSE', distPath, { flat: true });
        await cpy('node_modules/oidc-client-ts/LICENSE', pathResolve(distPath, 'browser', 'oidc'), {
            rename: '3rdpartylicenses.txt',
            flat: true
        });
    }
});
