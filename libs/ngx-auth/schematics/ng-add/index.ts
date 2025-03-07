import { chain, noop, type Rule, type SchematicContext } from '@angular-devkit/schematics';
import { blue, bold, red } from '@colors/colors/safe';
import {
    addImportToFile, application, type ChainableApplicationContext,
    getSchematicSchemaDefaultOptions, isAngularVersion, logAction, logError,
    modifyJsonFile, replaceInFile, runAtEnd, schematic
} from '@hug/ngx-schematics-utilities';
import { JSONFile } from '@schematics/angular/utility/json-file';

import type { NgAddOptions } from './ng-add-options';

const sanitizeOptions = async (context: SchematicContext, userOptions: NgAddOptions): Promise<Omit<NgAddOptions, 'project'>> => {
    const defaultOptions = await getSchematicSchemaDefaultOptions(context, 'ng-add');

    // `project` is omitted as it is only required by the schematic
    const options: Omit<NgAddOptions, 'project'> = {
        authorityUrl: userOptions.authorityUrl,
        clientId: userOptions.clientId
    };

    // keeps only the user's options that are differents from the defaults
    const optionKeys: (keyof NgAddOptions)[] = ['mobileScheme', 'loginRequired', 'retrieveUserSession', 'loadUserInfo'];
    optionKeys.forEach(name => {
        if (userOptions[name] && (userOptions[name] !== defaultOptions[name])) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
            (options as any)[name] = userOptions[name];
        }
    });

    return options;
};

export const MODULE_CONTENT =
    '  platformBrowserDynamic([authProvider])\n' +
    '    .bootstrapModule(AppModule)\n' +
    '    .catch((error: unknown) => console.error(error));\n';

export const STANDALONE_CONTENT =
    '  appConfig.providers.push(provideAuth(authProvider));\n' +
    '  bootstrapApplication(AppComponent, appConfig)\n' +
    '    .catch((error: unknown) => console.error(error));\n';

export const INIT_CONTENT = (content: string, options = ''): string =>
    `/**\n` +
    ` * Auth configuration\n` +
    ` * @see https://badisi.github.io/auth-js/getting-started/configuration\n` +
    ` */\n` +
    `initAuth(${options}).then(authProvider => {\n${content
    }}).catch((error: unknown) => console.error(error));\n`;

export default (options: NgAddOptions): Rule =>
    schematic('@badisi/ngx-auth', [

        isAngularVersion('< 16', () => {
            console.log(red(`This schematic only works with ${bold('Angular projects >= 16')}.`));
            console.log(red('You will have to install the library manually:'));
            console.log(blue(bold('https://badisi.github.io/auth-js/getting-started/angular\n')));
            process.exit(-1);
        }),

        application(options.project)
            // Add 'crypto-js' as an allowed common-js dependency
            .rule(({ tree, project }: ChainableApplicationContext) => {
                const commonJsDepsPath = ['projects', project.name, 'architect', 'build', 'options', 'allowedCommonJsDependencies'];
                const commonJsDeps = new JSONFile(tree, 'angular.json').get(commonJsDepsPath) as string[] | undefined ?? [];
                if (!commonJsDeps.includes('crypto-js')) {
                    return modifyJsonFile('angular.json', commonJsDepsPath, [...commonJsDeps, 'crypto-js']);
                }
                return noop();
            })

            // Add assets to angular project
            .addAngularJsonAsset({
                'glob': '**/*',
                'input': 'node_modules/@badisi/ngx-auth/oidc/assets',
                'output': 'oidc/callback'
            })

            // Provide and Initialize the library
            .rule(async ({ tree, project, schematicContext }: ChainableApplicationContext) => {
                const mainTsContent = tree.read(project.mainFilePath)?.toString('utf-8') ?? '';
                const rules = [];

                // Provide the library
                rules.push(addImportToFile(project.mainFilePath, 'initAuth', '@badisi/ngx-auth'));
                if (project.isStandalone) {
                    rules.push(addImportToFile(project.mainFilePath, 'provideAuth', '@badisi/ngx-auth'));
                }

                // Initialize the library
                if (!mainTsContent.includes('initAuth(')) {
                    let content;
                    if (project.isStandalone) {
                        content = INIT_CONTENT(STANDALONE_CONTENT);
                    } else {
                        content = INIT_CONTENT(MODULE_CONTENT);
                    }

                    const patternToReplace = (project.isStandalone) ?
                        /bootstrapApplication\(.*\).*\.catch\(\(err\) => console\.error\(err\)\);/sm :
                        /platformBrowserDynamic\(.*\).*\.bootstrapModule\(.*AppModule.*\).*\.catch\(err => console\.error\(err\)\);/sm;
                    if (!mainTsContent.match(patternToReplace)) {
                        const conflictContent =
                            '\n' +
                            '<<<<<<< HEAD\n' +
                            '=======\n' +
                            '\n' +
                            '// This code was auto-generated by \'@badisi/ngx-auth\' schematic.\n' +
                            '// Unfortunately the schematic was not able to merged it with your current code.\n' +
                            '// Please resolve it manually.\n' +
                            '\n' +
                            `${content}\n` +
                            '\n' +
                            '>>>>>>>\n';

                        rules.push(
                            replaceInFile(project.mainFilePath, /$/g, conflictContent),
                            runAtEnd(logError(`There were some conflicts during the installation, please have a look at ${bold('main.ts')} file and resolve them.\n`))
                        );
                    } else {
                        rules.push(replaceInFile(project.mainFilePath, patternToReplace, content));
                    }
                }

                // Update the configuration
                const config = await sanitizeOptions(schematicContext, options);
                const configContent = JSON.stringify(config, null, 2).replace(/"([^"]+)":/g, '$1:').replace(/"/g, '\'');
                rules.push(
                    replaceInFile(project.mainFilePath, /initAuth\((.*?)\)/sm, `initAuth(${configContent})`),
                    runAtEnd(logAction(`Have a look at ${bold('main.ts')} file and update the ${bold('auth configuration')} according to your needs.`))
                );

                return chain(rules);
            })

            .toRule()
    ], options);
