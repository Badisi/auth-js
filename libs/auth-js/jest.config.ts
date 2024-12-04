export default {
    displayName: 'auth-js',
    preset: '../../jest.preset.js',
    testEnvironment: 'jsdom',
    transform: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/libs/auth-js',
};
