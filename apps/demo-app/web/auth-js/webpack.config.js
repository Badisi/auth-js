const { composePlugins, withNx, withWeb } = require('@nx/webpack');
const { resolve } = require('node:path');

// Note: This was added by an Nx migration. Webpack builds are required to have a corresponding Webpack config file.
// See: https://nx.dev/recipes/webpack/webpack-config-setup
module.exports = composePlugins(withNx(), withWeb(), config => {
    const babelLoader = (config.module.rules ?? []).find(rule => rule.loader && rule.loader.includes('babel-loader'));
    if (babelLoader) {
        babelLoader.options.cacheDirectory = resolve(__dirname, '../../../../node_modules/.cache/babel-loader');
    }
    return config;
});
