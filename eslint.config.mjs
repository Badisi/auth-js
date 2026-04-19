import hug from '@hug/eslint-config';

export default [
    ...(await hug.configs.moderate),
    hug.configs.stylistic,
    hug.overrides.stylistic({
        '@stylistic/comma-dangle': 'off'
    }),
    hug.overrides.rxjs.angular({
        'rxjs-x/finnish': 'off'
    }),
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
