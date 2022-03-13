module.exports = {
    displayName: 'demo-app-auth-js',
    preset: '../../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    coverageDirectory: '../../../coverage/projects/demo-app-auth-js',
    transform: {
        '^.+\\.[tj]s$': 'babel-jest'
    },
    moduleFileExtensions: ['ts', 'js', 'html']
};
