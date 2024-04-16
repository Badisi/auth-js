import { TextDecoder, TextEncoder } from 'node:util';

// @ts-expect-error https://mswjs.io/docs/migrations/1.x-to-2.x#requestresponsetextencoder-is-not-defined-jest
globalThis.TextDecoder = TextDecoder;
globalThis.TextEncoder = TextEncoder;

// @ts-expect-error https://thymikee.github.io/jest-preset-angular/docs/getting-started/test-environment
globalThis.ngJest = {
    testEnvironmentOptions: {
        errorOnUnknownElements: true,
        errorOnUnknownProperties: true
    }
};
import 'jest-preset-angular/setup-jest';
