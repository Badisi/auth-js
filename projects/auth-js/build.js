#!/usr/bin/env node
const { buildSync } = require('esbuild');
const { exec } = require('child_process');
const { resolve: pathResolve } = require('path');
const { writeFileSync } = require('fs');
const { blue, green } = require('chalk');
const { dependencies, peerDependencies } = require(pathResolve(__dirname, 'package.json'));

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

    buildSync({
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
    });

    if (platform === 'neutral') {
        writeFileSync(pathResolve(outdir, 'package.json'), JSON.stringify({ type: 'module' }, null, 4), { encoding: 'utf8' });
    } else if (platform === 'node') {
        writeFileSync(pathResolve(outdir, 'package.json'), JSON.stringify({ type: 'commonjs' }, null, 4), { encoding: 'utf8' });
    }
};

(async () => {
    try {
        console.log(blue('Building Library\n'));

        // Build
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

        // Building types
        console.log('-'.repeat(78));
        console.log('Building types for \'@badisi/auth-js\'');
        console.log('-'.repeat(78));
        await execCmd('tsc --project tsconfig.lib.json', { cwd: __dirname });
        console.log(`${green('✓')} Built types\n`);

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
