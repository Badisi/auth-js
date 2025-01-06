import chalk from 'chalk';
import { build as esbuild } from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve as pathResolve } from 'path';
import {
    createProgram,
    flattenDiagnosticMessageText,
    getPreEmitDiagnostics,
    parseJsonConfigFileContent,
    readConfigFile,
    sys
} from 'typescript';

const { blue, green } = chalk;

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
            if (diagnostic.file) {
                const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                const message = flattenDiagnosticMessageText(diagnostic.messageText, '\n');
                console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
            } else {
                console.log(flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
            }
        });
};

const build = async options => {
    const outdir = pathResolve(options.distPath, options.format, options.entryPoint.name);

    const esbuildOptions = {
        platform: options.platform,
        format: options.platform === 'browser' ? 'iife' : options.format,
        absWorkingDir: options.absWorkingDir,
        outfile: pathResolve(outdir, options.minify ? 'index.min.js' : 'index.js'),
        entryPoints: [
            options.entryPoint.path
        ],
        tsconfig: options.tsconfigPath,
        bundle: true,
        // sourcemap: true,
        minify: options.minify,
        globalName: options.bundleExternals ? options.buildOptions.browser : undefined,
        external: options.bundleExternals ? undefined : options.buildOptions.externals,
        logOverride: {
            'package.json': 'silent'
        }
    };

    mkdirSync(outdir, { recursive: true });
    if (options.platform === 'neutral') {
        options.mainFields = [
            'module',
            'main'
        ];
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

export default async config => {
    try {
        console.log(blue('Building Library\n'));

        // Build entry points
        // eslint-disable-next-line no-loops/no-loops
        for (const entryPoint of config.entryPoints) {
            const entryPointName = entryPoint.name ? `/${entryPoint.name}` : '';

            console.log('-'.repeat(78));
            console.log(`Building entry point '${config.packageName}${entryPointName}'`);
            console.log('-'.repeat(78));

            const buildOptions = {
                entryPoint: entryPoint,
                distPath: config.distPath,
                tsconfigPath: config.tsconfigPath,
                buildOptions: config.buildOptions
            };

            if (config.buildOptions.esm) {
                console.log(`${green('✓')} Bundling to ESM`);
                await build({
                    ...buildOptions,
                    platform: 'neutral',
                    format: 'esm'
                });
            }
            if (config.buildOptions.cjs) {
                console.log(`${green('✓')} Bundling to CJS`);
                await build({
                    ...buildOptions,
                    platform: 'node',
                    format: 'cjs'
                });
            }
            if (config.buildOptions.browser) {
                console.log(`${green('✓')} Bundling to BROWSER (self contained)`);
                await build({
                    ...buildOptions,
                    platform: 'browser',
                    format: 'browser',
                    bundleExternals: true
                });

                console.log(`${green('✓')} Bundling to BROWSER and minifying (self contained)`);
                await build({
                    ...buildOptions,
                    platform: 'browser',
                    format: 'browser',
                    bundleExternals: true,
                    minify: true
                });
            }

            console.log(`${green('✓')} Built ${config.packageName}${entryPointName}`, '\n');
        }

        // Build library
        console.log('-'.repeat(78));
        console.log(`Building '${config.packageName}'`);
        console.log('-'.repeat(78));

        //  -- types
        console.log(`${green('✓')} Generating types`);
        emitDeclarationFiles(config.tsconfigPath);

        //  -- assets
        console.log(`${green('✓')} Copying assets`);
        await config.copyAssets();

        //  -- package.json
        console.log(`${green('✓')} Writing package metadata`);
        //      -- entry points
        config.entryPoints.forEach(entryPoint => {
            const entryPointName = entryPoint.name ? `/${entryPoint.name}` : '';
            const content = {
                name: `${config.packageName}${entryPointName}`,
                types: './index.d.ts'
            };
            if (config.buildOptions.browser) {
                content.browser = `../browser${entryPointName}/index.min.js`;
            }
            if (config.buildOptions.esm) {
                content.import = `../esm${entryPointName}/index.js`;
            }
            if (config.buildOptions.cjs) {
                content.require = `../cjs${entryPointName}/index.js`;
            }
            writeFileSync(
                pathResolve(config.distPath, entryPoint.name, 'package.json'),
                JSON.stringify(content, null, 4),
                { encoding: 'utf8' }
            );
        });
        //      -- library
        const distPkgJsonPath = pathResolve(config.distPath, 'package.json');
        const distPkgJson = JSON.parse(readFileSync(distPkgJsonPath, { encoding: 'utf8' }));
        delete distPkgJson.scripts;
        delete distPkgJson.devDependencies;
        writeFileSync(distPkgJsonPath, JSON.stringify(distPkgJson, null, 4), {
            encoding: 'utf8'
        });

        //  -- end
        console.log(`${green('✓')} Built ${config.packageName}\n`);

        // Success
        console.log(green('-'.repeat(78)));
        console.log(green('Built Library'));
        console.log(green(`- from: ${config.absWorkingDir}`));
        console.log(green(`- to:   ${config.distPath}`));
        console.log(green('-'.repeat(78)));
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
