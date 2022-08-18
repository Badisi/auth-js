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
            url: process.argv[++i]
        }
    }
}

export default config;
