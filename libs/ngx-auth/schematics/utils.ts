/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, type UnitTestTree } from '@angular-devkit/schematics/testing';
import { type Schema as ApplicationOptions, Style } from '@schematics/angular/application/schema';
import type { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import { join } from 'node:path';
import { lastValueFrom } from 'rxjs';

export const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    newProjectRoot: 'projects',
    strict: true,
    version: '0.0.0'
};

export const libTest: ApplicationOptions = {
    name: 'lib-test',
    skipPackageJson: false
};

export const appTest1: ApplicationOptions = {
    name: 'app-test-1',
    inlineStyle: false,
    inlineTemplate: false,
    routing: true,
    strict: true,
    style: Style.Scss,
    skipTests: false,
    skipPackageJson: false,
    standalone: false
};

export const appTest2: ApplicationOptions = {
    name: 'app-test-2',
    inlineStyle: false,
    inlineTemplate: false,
    routing: true,
    strict: true,
    style: Style.Scss,
    skipTests: false,
    skipPackageJson: false,
    standalone: false
};

export const collectionPath = join(__dirname, './collection.json');

export const runner = new SchematicTestRunner('ngx-auth', collectionPath);

export const runSchematic = async (schematicName: string, options: object, tree: Tree, withPostTasks = false): Promise<UnitTestTree> => {
    const newTree = await runner.runSchematic(schematicName, options, tree);
    // Running post tasks is required so that `runAtEnd` is also executed
    if (withPostTasks) {
        // Do not run node-package task
        // @ts-expect-error _host is private
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        runner.engine._host.registerTaskExecutor({
            name: 'node-package', create: () => Promise.resolve(() => Promise.resolve())
        });
        await lastValueFrom(runner.engine.executePostTasks());
    }
    return newTree;
}

export const getCleanAppTree = async (useWorkspace = false, standalone = false): Promise<UnitTestTree> => {
    appTest1.projectRoot = (useWorkspace) ? join(workspaceOptions.newProjectRoot!, appTest1.name) : '';
    appTest2.projectRoot = (useWorkspace) ? join(workspaceOptions.newProjectRoot!, appTest2.name) : '';

    appTest1.standalone = standalone;
    appTest2.standalone = standalone;

    const workspaceTree = await runner.runExternalSchematic('@schematics/angular', 'workspace', workspaceOptions);
    await runner.runExternalSchematic('@schematics/angular', 'application', appTest1, workspaceTree);
    if (useWorkspace) {
        await runner.runExternalSchematic('@schematics/angular', 'application', appTest2, workspaceTree);
    }
    await runner.runExternalSchematic('@schematics/angular', 'library', libTest, workspaceTree);
    return workspaceTree;
};
