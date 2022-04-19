import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as ApplicationOptions, Style } from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import { join } from 'path';

import { InstallOptions } from './install-options';

const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    newProjectRoot: 'projects',
    strict: true,
    version: '0.0.0'
};

const appOptions: ApplicationOptions = {
    name: 'app-test',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    strict: true,
    style: Style.Scss,
    skipTests: false,
    skipPackageJson: false
};

const schematicOptions: InstallOptions = {
    authorityUrl: 'https://dev-fijd1e9x.us.auth0.com',
    clientId: 'kRVVEnAWKMpxxpcodl0TqLXfIHgQvmmt'
};

const collectionPath = join(__dirname, '../collection.json');

const runner = new SchematicTestRunner('ngx-auth', collectionPath);

const getCleanAppTree = async (): Promise<UnitTestTree> => {
    const workspaceTree = await runner
        .runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions)
        .toPromise();
    return await runner
        .runExternalSchematicAsync('@schematics/angular', 'application', appOptions, workspaceTree)
        .toPromise();
};

const occurrences = (str: string, pattern: string): number => (str.match(new RegExp(pattern, 'g')) || []).length;

describe('Test - install schematic', () => {
    let tree: UnitTestTree;
    let nbFiles: number;

    beforeEach(async () => {
        tree = await getCleanAppTree();
        nbFiles = tree.files.length;
    });

    it('should failed without an angular app', async () => {
        const tree$ = runner.runSchematicAsync('install', schematicOptions, Tree.empty()).toPromise();
        await expect(tree$).rejects.toMatchObject({
            message: 'Unable to locate a workspace file, are you missing an `angular.json` or `.angular.json` file ?.'
        });
    });

    it('should run without errors', async () => {
        const tree$ = runner.runSchematicAsync('install', schematicOptions, tree).toPromise();
        await expect(tree$).resolves.not.toThrow();
    });

    it('should not create any new files', async () => {
        tree = await runner.runSchematicAsync('install', schematicOptions, tree).toPromise();
        expect(tree.files.length).toEqual(nbFiles);
    });

    it('should not create duplicates when running twice', async () => {
        tree = await runner.runSchematicAsync('install', schematicOptions, tree).toPromise();
        tree = await runner.runSchematicAsync('install', schematicOptions, tree).toPromise();

        const angularJsonPath = 'angular.json';
        const angularJsonContent = tree.read(angularJsonPath)?.toString('utf-8') || '';
        expect(occurrences(angularJsonContent, 'crypto-js')).toEqual(1);
        expect(occurrences(angularJsonContent, 'node_modules/@badisi/ngx-auth/oidc/assets')).toEqual(2);

        const mainTsPath = '/projects/app-test/src/main.ts';
        const mainTsContent = tree.read(mainTsPath)?.toString('utf-8') || '';
        expect(occurrences(mainTsContent, '@badisi/ngx-auth')).toEqual(1);
        expect(occurrences(mainTsContent, 'initAuth')).toEqual(2);

        const appModuleTsPath = '/projects/app-test/src/app/app.module.ts';
        const appModuleTsContent = tree.read(appModuleTsPath)?.toString('utf-8') || '';
        expect(occurrences(appModuleTsContent, '@badisi/ngx-auth')).toEqual(1);
        expect(occurrences(appModuleTsContent, 'AuthModule')).toEqual(2);
    });
});
