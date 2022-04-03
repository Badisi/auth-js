#!/usr/bin/env node

import chalk from 'chalk';
import { exec } from 'child_process';
import cpy from 'cpy';
import { buildSync } from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve as pathResolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const { blue, green } = chalk;
const { dependencies, peerDependencies } = JSON.parse(readFileSync('package.json'));

const EXTERNALS = Object.keys({ ...dependencies, ...peerDependencies });
const DIST_PATH = pathResolve(__dirname, '../../dist/auth-js');

const execCmd = (cmd, opts) => new Promise((resolve, reject) => {
    exec(cmd, opts, (err, stdout, stderr) => {
        if (err) {
            console.error(stdout, stderr);
            return reject(err);
        }
        return resolve(stdout);
    });
});

const build = async (entryPointName, platform, distName, bundleExternals = false, minify = false) => {
    const outdir = pathResolve(DIST_PATH, distName, entryPointName);
    const options = {
        platform,
        absWorkingDir: __dirname,
        outfile: pathResolve(outdir, (minify) ? 'index.min.js' : 'index.js'),
        entryPoints: [pathResolve(__dirname, entryPointName, 'index.ts')],
        tsconfig: './tsconfig.lib.json',
        bundle: true,
        sourcemap: true,
        minify,
        globalName: (bundleExternals) ? 'AuthJS' : undefined,
        external: (bundleExternals) ? undefined : EXTERNALS
    };

    mkdirSync(outdir, { recursive: true });
    if (platform === 'neutral') {
        options.mainFields = ['module', 'main'];
        writeFileSync(pathResolve(outdir, 'package.json'), JSON.stringify({ type: 'module' }, null, 4), { encoding: 'utf8' });
    } else if (platform === 'node') {
        writeFileSync(pathResolve(outdir, 'package.json'), JSON.stringify({ type: 'commonjs' }, null, 4), { encoding: 'utf8' });
    }

    buildSync(options);
};

(async () => {
    try {
        console.log(blue('Building Library\n'));

        // Build entry points
        for (const entryPointName of ['core', 'oidc']) { // eslint-disable-line no-loops/no-loops
            console.log('-'.repeat(78));
            console.log(`Building entry point '@badisi/auth-js/${entryPointName}'`);
            console.log('-'.repeat(78));

            console.log(`${green('✓')} Bundling to ESM`);
            await build(entryPointName, 'neutral', 'esm');

            console.log(`${green('✓')} Bundling to UMD`);
            await build(entryPointName, 'node', 'umd');

            console.log(`${green('✓')} Bundling to BROWSER (self contained)`);
            await build(entryPointName, 'browser', 'browser', true);

            console.log(`${green('✓')} Bundling to BROWSER and minifying (self contained)`);
            await build(entryPointName, 'browser', 'browser', true, true);

            console.log(`${green('✓')} Built @badisi/auth-js/${entryPointName}`, '\n');
        }

        // Build library
        console.log('-'.repeat(78));
        console.log('Building \'@badisi/auth-js\'');
        console.log('-'.repeat(78));
        //  types
        await execCmd('tsc --project tsconfig.lib.json', { cwd: __dirname });
        console.log(`${green('✓')} Generating types`);
        //  assets
        await cpy('projects/auth-js/oidc/assets', pathResolve(DIST_PATH, 'oidc', 'assets'), { flat: true });
        await cpy('projects/auth-js/package.json', DIST_PATH, { flat: true });
        await cpy('projects/auth-js/README.md', DIST_PATH, { flat: true });
        await cpy('LICENSE', DIST_PATH, { flat: true });
        console.log(`${green('✓')} Copying assets`);
        //  package.json
        const pkgJsonPath = pathResolve(DIST_PATH, 'package.json');
        const pkgJson = JSON.parse(readFileSync(pkgJsonPath, { encoding: 'utf8' }));
        delete pkgJson.scripts;
        delete pkgJson.devDependencies;
        writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 4), { encoding: 'utf8' });
        console.log(`${green('✓')} Writing package metadata`);
        //  end
        console.log(`${green('✓')} Built @badisi/auth-js\n`);

        // Success
        console.log(green('-'.repeat(78)));
        console.log(green('Built Library'));
        console.log(green(`- from: ${pathResolve(__dirname)}`));
        console.log(green(`- to:   ${pathResolve(DIST_PATH)}`));
        console.log(green('-'.repeat(78)));

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
