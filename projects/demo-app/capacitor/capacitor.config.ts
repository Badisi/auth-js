import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'demoapp.authjs',
    appName: 'demo-app-auth-js',
    webDir: 'src',
    hideLogs: true,
    bundledWebRuntime: false,
    server: {
        url: 'http://localhost:4200'
    }
};

export default config;
