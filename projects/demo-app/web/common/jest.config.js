module.exports = {
    displayName: 'demo-app-common',
    preset: '../../../../jest.preset.js',
    coverageDirectory: '../../../../coverage/projects/demo-app/web/common',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json'
        }
    },
    transform: {
        '^.+\\.[tj]s$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'js', 'html']
};
