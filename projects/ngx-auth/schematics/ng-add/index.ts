import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { RunSchematicTask } from '@angular-devkit/schematics/tasks';

export default (): Rule =>
    (_tree: Tree, context: SchematicContext): void => {
        context.addTask(new RunSchematicTask('install', {}));
    };
