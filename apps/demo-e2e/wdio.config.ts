import { getCapabilities } from './wdio.capabilities';

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
export const config: WebdriverIO.Config = {
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    // ==================
    // Specify Test Files
    // ==================
    filesToWatch: [
        './src/**/*.ts'
    ],
    // ============
    // Capabilities
    // ============
    maxInstances: debug ? 1 : 3,
    capabilities: getCapabilities(headless),
    // ===================
    // Test Configurations
    // ===================
    logLevel: debug ? 'debug' : 'warn', // trace | debug | info | warn | error | silent
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: [['spec', {
        realtimeReporting: true,
        showPreface: false
    }]],
    mochaOpts: {
        timeout: debug ? (24 * 60 * 60 * 1000) : 120000
    },
    // ===================
    // Hook Configurations
    // ===================
    before: async () => {
        // The demo app content area is a fixed-position, scrollable region, so a tall window keeps
        // the playground buttons (guards/api) within the viewport and avoids click-interception issues.
        await browser.setWindowSize(1920, 1400);

        // Chrome can occasionally clear sessionStorage after being redirected back from an IdP login.
        // To keep the intended settings during a login round-trip, we enforce them at the beginning
        // of every page load, before the app reads them.
        await browser.addInitScript(() => {
            try {
                const desired = localStorage.getItem('auth-js:e2e:settings');
                if (desired) {
                    sessionStorage.setItem('auth-js:playground:settings', desired);
                    localStorage.removeItem('auth-js:e2e:settings');
                }
            } catch { /**/ }
        });

        await Promise.all([
            import('./src/commands/wait-for-navigation'),
            import('./src/commands/spy-network'),
            import('./src/commands/set-value')
        ]);
    }
};
