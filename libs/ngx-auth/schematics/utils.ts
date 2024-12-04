/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { SchematicTestRunner, type UnitTestTree } from '@angular-devkit/schematics/testing';
import { type Schema as ApplicationOptions, Style } from '@schematics/angular/application/schema';
import type { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import { join } from 'path';

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
