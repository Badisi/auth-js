export default {
    displayName: 'demo-app-auth-js',
    preset: '../../../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    transform: {
        '^.+\\.[tj]s$': '@swc/jest'
    },
    moduleFileExtensions: [
        'ts',
        'js',
        'html'
    ],
    coverageDirectory: '../../../../coverage/apps/demo-app/web/auth-js'
};
