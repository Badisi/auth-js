/* eslint-disable */
export default {
    displayName: 'demo-app-auth-js',
    preset: '../../../../jest.preset.js',
    transform: {
    	'^.+\\.[tj]s$': [
            'ts-jest', {
                tsconfig: '<rootDir>/tsconfig.spec.json'
            }
        ],
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../../../coverage/projects/demo-app/web/auth-js',
};
