import { UserManagerSettings } from 'oidc-client';
import { BrowserTab } from './BrowserTab';

export class BrowserTabNavigator {
    prepare(params: UserManagerSettings): Promise<BrowserTab> {
        return Promise.resolve(new BrowserTab(params));
    }
}
