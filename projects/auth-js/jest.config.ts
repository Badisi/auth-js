/* eslint-disable */
export default {
    displayName: 'auth-js',
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/projects/auth-js',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.[tj]s$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json'
            }
        ],
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
};
