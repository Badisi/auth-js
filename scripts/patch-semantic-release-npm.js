/**
 *  TODO: this whole patch can be removed when https://github.com/semantic-release/npm/pull/531 is fixed
 */

const { readFileSync, writeFileSync, existsSync } = require('fs-extra');
const { green, red, gray } = require('@colors/colors/safe');
const { dirname, join } = require('path');

const filePath = join(dirname(require.resolve('@semantic-release/npm')), '/lib/publish.js');
if (existsSync(filePath)) {
    let data = readFileSync(filePath, { encoding: 'utf8' });

    if (!data.match(/cwd: basePath/gm)) {
        data = data.replace("'publish', basePath,", "'publish',");
        data = data.replace("cwd, env,", "cwd: basePath, env,");
        writeFileSync(filePath, data, { encoding: 'utf8' });
        console.log(green('success'), '@semantic-release/npm patched.');
    } else {
        console.log(green('success'), '@semantic-release/npm already patched.');
    }
} else {
    console.error(red('error'), 'cannot patch @semantic-release/npm.');
    console.error(gray(`"${filePath}" not found`));
}
