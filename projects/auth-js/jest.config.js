module.exports = {
    displayName: 'auth-js',
    preset: '../../jest.preset.js',
    testEnvironment: 'jsdom',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json'
        }
    },
    transform: {
        '^.+\\.[tj]sx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../coverage/projects/auth-js'
};
