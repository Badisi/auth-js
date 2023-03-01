import type { Options } from '@wdio/types';

const argv = process.argv.slice(2).reverse();
const getArgValue = (argName: string): unknown => {
    const itemIndex = argv.findIndex(arg => arg.includes(`--${argName}`));
    const equalIndex = argv?.[itemIndex]?.indexOf('=');
    if (equalIndex && equalIndex !== -1) {
        return argv[itemIndex].substring(equalIndex + 1);
    } else if (!argv?.[itemIndex - 1].startsWith('--')) {
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
export const config: Options.Testrunner = {
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    injectGlobals: true,
    autoCompileOpts: {
        tsNodeOpts: {
            project: 'tsconfig.json'
        }
    },
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './**/*.e2e.ts'
    ],
    // ============
    // Capabilities
    // ============
    maxInstances: debug ? 1 : 100,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'goog:chromeOptions': {
            args: headless ? ['--headless', '--disable-gpu', '--disable-dev-shm-usage'] : [debug ? '--auto-open-devtools-for-tabs' : '']
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
    services: ['chromedriver'],
    framework: 'jasmine',
    reporters: ['spec'],
    jasmineOpts: {
        defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : 60000
    }
};
