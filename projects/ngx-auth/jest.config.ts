/* eslint-disable */
export default {
  displayName: 'ngx-auth',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  coverageDirectory: '../../coverage/projects/ngx-auth',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$'
      },
    ],
  },
  moduleNameMapper: {
    '@angular-devkit/core/src/json/schema/index': '<rootDir>/../../node_modules/@angular-devkit/core/src/json/schema/index.js'
  },
  transformIgnorePatterns: [`node_modules/(?!.*\\.mjs$)`],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/**/*(*.)@(spec|test).[jt]s?(x)',
  ],
  testPathIgnorePatterns: ['<rootDir>/schematics/schematics.spec.ts']
};
