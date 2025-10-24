/* eslint-disable no-loops/no-loops */
// @ts-check

import chalk from 'chalk';
import { build as esbuild } from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve as pathResolve } from 'node:path';
import {
    createProgram,
    flattenDiagnosticMessageText,
    getPreEmitDiagnostics,
    parseJsonConfigFileContent,
    readConfigFile,
    sys
} from 'typescript';

/**
 *  @typedef {import("esbuild").BuildOptions} EsbuildOptions
 *  @typedef {import("esbuild").Platform} EsbuildPlatform
 *  @typedef {import("esbuild").Format} EsbuildFormat
 */

/**
 *  @typedef {{
 *      name: string;
 *      path: string;
 *  }} EntryPoint
 */

/**
 *  @typedef {{
 *      distPath: string;
 *      absWorkingDir: string;
 *      tsconfigPath: string;
 *      entryPoint: EntryPoint;
 *      minify?: boolean;
 *      bundleExternals?: boolean;
 *      format: EsbuildFormat;
 *      platform: EsbuildPlatform;
 *      esm: boolean;
 *      cjs: boolean;
 *      browser: string;
 *      externals: string[];
 *  }} BuildOptions
 */

/**
 *  @typedef {{
 *      packageName: string;
 *      tsconfigPath: string;
 *      distPath: string;
 *      absWorkingDir: string;
 *      entryPoints: EntryPoint[];
 *      buildOptions: {
 *          esm: boolean;
 *          cjs: boolean;
 *          browser: string;
 *          externals: string[];
 *      };
 *      copyAssets: () => Promise<void>;
 *  }} ScriptOptions
 */

const { blue, green } = chalk;

/** @type {(tsconfigPath: string) => void} */
const emitDeclarationFiles = tsconfigPath => {
    const config = readConfigFile(tsconfigPath, sys.readFile).config;
    config.compilerOptions.rootDir = '.';
    config.compilerOptions.paths = {};
    const parsedCommandLine = parseJsonConfigFileContent(config, sys, dirname(tsconfigPath));
    const program = createProgram({ rootNames: parsedCommandLine.fileNames, options: parsedCommandLine.options });
    const emitResult = program.emit();
    getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics)
        .forEach(diagnostic => {
            if (diagnostic.file && diagnostic.start) {
                const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                const message = flattenDiagnosticMessageText(diagnostic.messageText, '\n');
                console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
            } else {
                console.log(flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
            }
        });
};

/** @type {(options: BuildOptions) => Promise<void>} */
const build = async options => {
    const outdir = pathResolve(
        options.distPath,
        options.format === 'iife' ? 'browser' : options.format,
        options.entryPoint.name
    );

    /** @type {EsbuildOptions} */
    const esbuildOptions = {
        platform: options.platform,
        format: options.format,
        absWorkingDir: options.absWorkingDir,
        outfile: pathResolve(outdir, options.minify ? 'index.min.js' : 'index.js'),
        entryPoints: [options.entryPoint.path],
        tsconfig: options.tsconfigPath,
        bundle: true,
        // sourcemap: true,
        minify: options.minify,
        globalName: options.bundleExternals ? options.browser : undefined,
        external: options.bundleExternals ? undefined : options.externals,
        logOverride: {
            'package.json': 'silent'
        }
    };

    mkdirSync(outdir, { recursive: true });
    if (options.platform === 'neutral') {
        esbuildOptions.mainFields = ['module', 'main'];
        writeFileSync(pathResolve(outdir, 'package.json'), JSON.stringify({ type: 'module' }, null, 4), {
            encoding: 'utf8'
        });
    } else if (options.platform === 'node') {
        writeFileSync(pathResolve(outdir, 'package.json'), JSON.stringify({ type: 'commonjs' }, null, 4), {
            encoding: 'utf8'
        });
    }

    await esbuild(esbuildOptions);
};

/** @type {(options: ScriptOptions) => Promise<void>} */
export default async options => {
    try {
        console.log(blue('Building Library\n'));

        // Build entry points
        for (const entryPoint of options.entryPoints) {
            const entryPointName = entryPoint.name ? `/${entryPoint.name}` : '';

            console.log('-'.repeat(78));
            console.log(`Building entry point '${options.packageName}${entryPointName}'`);
            console.log('-'.repeat(78));

            const buildOptions = {
                entryPoint: entryPoint,
                distPath: options.distPath,
                tsconfigPath: options.tsconfigPath,
                absWorkingDir: options.absWorkingDir,
                ...options.buildOptions
            };

            if (options.buildOptions.esm) {
                console.log(`${green('✓')} Bundling to ESM`);
                await build({
                    ...buildOptions,
                    platform: 'neutral',
                    format: 'esm'
                });
            }
            if (options.buildOptions.cjs) {
                console.log(`${green('✓')} Bundling to CJS`);
                await build({
                    ...buildOptions,
                    platform: 'node',
                    format: 'cjs'
                });
            }
            if (options.buildOptions.browser) {
                console.log(`${green('✓')} Bundling to BROWSER (self contained)`);
                await build({
                    ...buildOptions,
                    platform: 'browser',
                    format: 'iife',
                    bundleExternals: true
                });

                console.log(`${green('✓')} Bundling to BROWSER and minifying (self contained)`);
                await build({
                    ...buildOptions,
                    platform: 'browser',
                    format: 'iife',
                    bundleExternals: true,
                    minify: true
                });
            }

            console.log(`${green('✓')} Built ${options.packageName}${entryPointName}`, '\n');
        }

        // Build library
        console.log('-'.repeat(78));
        console.log(`Building '${options.packageName}'`);
        console.log('-'.repeat(78));

        //  -- types
        console.log(`${green('✓')} Generating types`);
        emitDeclarationFiles(options.tsconfigPath);

        //  -- assets
        console.log(`${green('✓')} Copying assets`);
        await options.copyAssets();

        //  -- package.json
        console.log(`${green('✓')} Writing package metadata`);
        //      -- entry points
        options.entryPoints.forEach(entryPoint => {
            const entryPointName = entryPoint.name ? `/${entryPoint.name}` : '';
            /** @type {Record<string, string>} */
            const content = {
                name: `${options.packageName}${entryPointName}`,
                types: './index.d.ts'
            };
            if (options.buildOptions.browser) {
                content.browser = `../browser${entryPointName}/index.min.js`;
            }
            if (options.buildOptions.esm) {
                content.import = `../esm${entryPointName}/index.js`;
            }
            if (options.buildOptions.cjs) {
                content.require = `../cjs${entryPointName}/index.js`;
            }
            writeFileSync(
                pathResolve(options.distPath, entryPoint.name, 'package.json'),
                JSON.stringify(content, null, 4),
                { encoding: 'utf8' }
            );
        });
        //      -- library
        const distPkgJsonPath = pathResolve(options.distPath, 'package.json');
        const distPkgJson = JSON.parse(readFileSync(distPkgJsonPath, { encoding: 'utf8' }));
        delete distPkgJson.scripts;
        delete distPkgJson.devDependencies;
        writeFileSync(distPkgJsonPath, JSON.stringify(distPkgJson, null, 4), { encoding: 'utf8' });

        //  -- end
        console.log(`${green('✓')} Built ${options.packageName}\n`);

        // Success
        console.log(green('-'.repeat(78)));
        console.log(green('Built Library'));
        console.log(green(`- from: ${options.absWorkingDir}`));
        console.log(green(`- to:   ${options.distPath}`));
        console.log(green('-'.repeat(78)));
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
