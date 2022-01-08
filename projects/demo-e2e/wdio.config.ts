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

// ======================
//  Runner Configuration
// ======================
//
// https://webdriver.io/docs/configurationfile/
//
export const config: WebdriverIO.Config = {
    specs: [
        './specs/**/*.e2e.ts'
    ],
    maxInstances: debug ? 1 : 100,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: headless ? ['--headless', '--disable-gpu'] : [/*'--auto-open-devtools-for-tabs'*/]
        },
        acceptInsecureCerts: true
    }],
    logLevel: debug ? 'debug' : 'warn',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    execArgv: debug ? ['--inspect'] : [],
    services: ['chromedriver', 'intercept'],
    reporters: ['spec'],
    framework: 'jasmine',
    jasmineOpts: {
        defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : 60000,
        stopSpecOnExpectationFailure: true,
        stopOnSpecFailure: true,
        random: false
    }
};
