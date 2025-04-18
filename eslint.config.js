import hug from '@hug/eslint-config';

export default [
    ...(await hug.configs.moderate),
    {
        ignores: [
            '**/demo-realm.json',
            '**/capacitor.config.ts',
            '**/jest.config.ts'
        ]
    }
];
