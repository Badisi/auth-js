/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-argument, no-underscore-dangle */

import chalk from 'chalk';
import { exec } from 'child_process';
import cpy from 'cpy';
import { buildSync } from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve as pathResolve } from 'path';
import { fileURLToPath } from 'url';

const { blue, green } = chalk;
const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgJson = JSON.parse(readFileSync(pathResolve(__dirname, 'package.json')));

const CONFIG = {
    distPath: pathResolve(__dirname, '../../dist/auth-js'),
    tsconfigPath: pathResolve(__dirname, 'tsconfig.lib.json'),
    entryPoints: [
        { name: 'core', path: pathResolve(__dirname, 'core', 'index.ts') },
        { name: 'oidc', path: pathResolve(__dirname, 'oidc', 'index.ts') }
    ],
    buildOptions: {
        esm: true,
        cjs: true,
        browser: 'AuthJs',
        externals: Object.keys({ ...pkgJson.dependencies, ...pkgJson.peerDependencies })
    }
};

const copyAssets = async () => {
    await cpy('projects/auth-js/oidc/assets', pathResolve(CONFIG.distPath, 'oidc', 'assets'), { flat: true });
    await cpy('projects/auth-js/package.json', CONFIG.distPath, { flat: true });
    await cpy('projects/auth-js/README.md', CONFIG.distPath, { flat: true });
    await cpy('LICENSE', CONFIG.distPath, { flat: true });
    await cpy('node_modules/oidc-client-ts/LICENSE', pathResolve(CONFIG.distPath, 'browser', 'oidc'), { rename: '3rdpartylicenses.txt', flat: true });
};

const execCmd = (cmd, opts) => new Promise((resolve, reject) => {
    exec(cmd, opts, (err, stdout, stderr) => {
        if (err) {
            console.error(stdout, stderr);
            return reject(err);
        }
        return resolve(stdout);
    });
});

const build = (entryPoint, platform, format, bundleExternals = false, minify = false) => {
    const outdir = pathResolve(CONFIG.distPath, format, entryPoint.name);
    const options = {
        platform,
        format: (platform === 'browser') ? 'iife' : format,
        absWorkingDir: __dirname,
        outfile: pathResolve(outdir, (minify) ? 'index.min.js' : 'index.js'),
        entryPoints: [entryPoint.path],
        tsconfig: CONFIG.tsconfigPath,
        bundle: true,
        sourcemap: true,
        minify,
        globalName: (bundleExternals) ? CONFIG.buildOptions.browser : undefined,
        external: (bundleExternals) ? undefined : CONFIG.buildOptions.externals
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

void (async () => {
    try {
        console.log(blue('Building Library\n'));

        // Build entry points
        CONFIG.entryPoints.forEach(entryPoint => {
            const entryPointName = (entryPoint.name) ? `/${entryPoint.name}` : '';

            console.log('-'.repeat(78));
            console.log(`Building entry point '${pkgJson.name}${entryPointName}'`);
            console.log('-'.repeat(78));

            if (CONFIG.buildOptions.esm) {
                console.log(`${green('✓')} Bundling to ESM`);
                build(entryPoint, 'neutral', 'esm');
            }
            if (CONFIG.buildOptions.cjs) {
                console.log(`${green('✓')} Bundling to CJS`);
                build(entryPoint, 'node', 'cjs');
            }
            if (CONFIG.buildOptions.browser) {
                console.log(`${green('✓')} Bundling to BROWSER (self contained)`);
                build(entryPoint, 'browser', 'browser', true);

                console.log(`${green('✓')} Bundling to BROWSER and minifying (self contained)`);
                build(entryPoint, 'browser', 'browser', true, true);
            }

            console.log(`${green('✓')} Built ${pkgJson.name}${entryPointName}`, '\n');
        });

        // Build library
        console.log('-'.repeat(78));
        console.log(`Building '${pkgJson.name}'`);
        console.log('-'.repeat(78));

        //  -- types
        console.log(`${green('✓')} Generating types`);
        await execCmd(`tsc --project ${CONFIG.tsconfigPath}`);
        CONFIG.entryPoints.forEach(entryPoint => {
            const entryPointName = (entryPoint.name) ? `/${entryPoint.name}` : '';
            const content = {
                name: `${pkgJson.name}${entryPointName}`,
                types: './index.d.ts'
            };
            if (CONFIG.buildOptions.esm) {
                content.import = `../esm${entryPointName}/index.js`;
            }
            if (CONFIG.buildOptions.cjs) {
                content.require = `../cjs${entryPointName}/index.js`;
            }
            if (CONFIG.buildOptions.browser) {
                content.browser = `../browser${entryPointName}/index.min.js`;
            }
            writeFileSync(
                pathResolve(CONFIG.distPath, entryPoint.name, 'package.json'),
                JSON.stringify(content, null, 4),
                { encoding: 'utf8' }
            );
        });

        //  -- assets
        console.log(`${green('✓')} Copying assets`);
        await copyAssets();

        //  -- package.json
        console.log(`${green('✓')} Writing package metadata`);
        const distPkgJsonPath = pathResolve(CONFIG.distPath, 'package.json');
        const distPkgJson = JSON.parse(readFileSync(distPkgJsonPath, { encoding: 'utf8' }));
        delete distPkgJson.scripts;
        delete distPkgJson.devDependencies;
        writeFileSync(distPkgJsonPath, JSON.stringify(distPkgJson, null, 4), { encoding: 'utf8' });

        //  -- end
        console.log(`${green('✓')} Built ${pkgJson.name}\n`);

        // Success
        console.log(green('-'.repeat(78)));
        console.log(green('Built Library'));
        console.log(green(`- from: ${__dirname}`));
        console.log(green(`- to:   ${CONFIG.distPath}`));
        console.log(green('-'.repeat(78)));

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
