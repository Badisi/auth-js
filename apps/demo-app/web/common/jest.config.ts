export default {
    displayName: 'demo-app-common',
    preset: '../../../../jest.preset.js',
    transform: {
        '^.+\\.[tj]s$': [
            'ts-jest',
            { tsconfig: '<rootDir>/tsconfig.spec.json' }]
    },
    moduleFileExtensions: [
        'ts',
        'js',
        'html'
    ],
    coverageDirectory: '../../../../coverage/apps/demo-app/web/common'
};
