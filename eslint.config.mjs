import hug from '@hug/eslint-config';

export default [
    ...(await hug.configs.moderate),
    hug.configs.stylistic,
    ...hug.overrides.typescript({
        '@typescript-eslint/no-deprecated': 'warn'
    }),
    {
        ignores: [
            '**/demo-realm.json',
            '**/capacitor.config.ts',
            '**/jest.config.ts'
        ]
    }
];
