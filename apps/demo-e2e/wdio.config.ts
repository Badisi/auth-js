/* eslint-disable @typescript-eslint/naming-convention */

import type { Options } from '@wdio/types';

const argv = process.argv.slice(2).reverse();
const getArgValue = (argName: string): unknown => {
    const itemIndex = argv.findIndex(arg => arg.includes(`--${argName}`));
    const equalIndex = argv[itemIndex]?.indexOf('=');
    if (equalIndex && equalIndex !== -1) {
        return argv[itemIndex].substring(equalIndex + 1);
    } else if (!argv[itemIndex - 1].startsWith('--')) {
        return argv[itemIndex - 1];
    }
    return (itemIndex !== -1) ? 'true' : undefined;
};

const debug = getArgValue('debug') === 'true';
const headless = getArgValue('headless') === 'true';

/**
 * Configuration file documentation
 * https://webdriver.io/docs/configurationfile/
 */
export const config: Options.Testrunner & { capabilities: unknown } = {
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './src/specs/**/*.ts'
    ],
    filesToWatch: [
        './src/**/*.ts'
    ],
    // ============
    // Capabilities
    // ============
    maxInstances: debug ? 1 : 100,
    capabilities: [{
        browserName: 'chrome',
        browserVersion: 'stable',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                ...(headless ? ['--headless', '--disable-gpu', '--disable-dev-shm-usage'] : []),
                ...(debug ? ['--auto-open-devtools-for-tabs'] : [])
            ]
        }
    }],
    // ===================
    // Test Configurations
    // ===================
    logLevel: debug ? 'debug' : 'warn', // trace | debug | info | warn | error | silent
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [],
    framework: 'jasmine',
    reporters: ['spec'],
    jasmineOpts: {
        defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : 60000
    }
};
