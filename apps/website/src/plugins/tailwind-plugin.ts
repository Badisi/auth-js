import type { Plugin, PostCssOptions } from '@docusaurus/types';

export default (): Plugin => ({
    name: 'tailwind-plugin',
    configurePostCss: (postcssOptions: PostCssOptions): PostCssOptions => {
        postcssOptions.plugins = [require.resolve('@tailwindcss/postcss')];
        return postcssOptions;
    }
});
