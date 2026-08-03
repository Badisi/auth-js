/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-shadow */

/**
 * ==================================================================================
 * Vitest Runtime Patch for Angular Schematic Execution
 * ==================================================================================
 *
 * WHAT THIS FILE DOES:
 * This script intercepts Node's internal CommonJS module loading system (`Module`)
 * to dynamically reroute and transpile raw TypeScript schematic files entirely in-memory.
 *
 * WHY IT IS NECESSARY:
 * 1. Resolution Interception: Angular's `SchematicTestRunner` invokes a native Node.js
 *    `require()` using extensionless paths read directly from `collection.json`. Because
 *    Vitest executes tests in-memory, these physical `.js` endpoints do not exist on disk,
 *    resulting in a `MODULE_NOT_FOUND` crash. We catch this call and reroute it directly
 *    to the local `.ts` source code file.
 *
 * 2. Real-time CJS Transpilation: The Angular schematic execution engine natively enforces
 *    CommonJS syntax. Because modern library schematics are authored using ES Modules
 *    (`import/export`), Node throws a `SyntaxError: Cannot use import statement outside a module`.
 *    We intercept the loader for the target file and leverage the TypeScript compiler
 *    to transpile it to valid CommonJS on-demand.
 * ==================================================================================
 */
import { readFileSync } from 'node:fs';
// eslint-disable-next-line @typescript-eslint/naming-convention
import Module, { createRequire } from 'node:module';
import { ModuleKind, ScriptTarget, transpileModule } from 'typescript';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

declare global {
    namespace NodeJS {
        interface Module {
            _compile: (code: string, filename: string) => void;
        }
    }
}

declare module 'node:module' {
    namespace Module {
        let _resolveFilename: (request: string, ...args: unknown[]) => string;
        let _extensions: Record<string, (module: NodeJS.Module, filename: string) => void>;
        let _cache: Record<string, NodeJS.Module | undefined>;
    }
}

// Point the extensionless schematic factory path safely to index.ts
const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function(request: string, ...args: unknown[]): string {
    try {
        return originalResolveFilename.apply(this, [request, ...args]);
    } catch (firstError) {
        // If resolution fails, try with .ts extension (SchematicTestRunner uses native
        // require() which doesn't know about TypeScript files)
        try {
            const tsPath = request.endsWith('.ts') ? request : `${request}.ts`;
            return originalResolveFilename.apply(this, [tsPath, ...args]);
        } catch {
            throw firstError;
        }
    }
};

// Intercept the custom .ts file loading and compile it instantly to CommonJS
Module._extensions['.ts'] = (module: NodeJS.Module, filename: string): void => {
    const result = transpileModule(readFileSync(filename, 'utf8'), {
        compilerOptions: {
            module: ModuleKind.CommonJS,
            target: ScriptTarget.ES2022
        }
    });
    module._compile(result.outputText, filename);
};

// Register vitest in Node's native module cache so that Angular's
// SchematicTestRunner (which uses native require()) can load test files
// that import from 'vitest'. vitest's CJS entry point intentionally throws.
const _require = createRequire(__filename);
const vitestPath = _require.resolve('vitest');
Module._cache[vitestPath] = {
    exports: { describe, it, expect, beforeEach, afterEach, vi, test: it },
    loaded: true,
    id: vitestPath,
    filename: vitestPath,
    paths: [],
    children: []
} as unknown as NodeJS.Module;
