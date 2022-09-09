import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'demoapp',
    appName: 'demo-app',
    loggingBehavior: 'debug',
    bundledWebRuntime: false
};

for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === '--serverUrl') {
        config.server = {
            url: process.argv[++i],
            cleartext: true // Needed for Android, to avoid error ERR_CLEARTEXT_NOT_PERMITTED
        }
    }
}

export default config;
