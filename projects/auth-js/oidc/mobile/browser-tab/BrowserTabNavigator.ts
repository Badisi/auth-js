import { UserManagerSettings } from 'oidc-client-ts';

import { BrowserTab } from './BrowserTab';

export class BrowserTabNavigator {
    public prepare(params: UserManagerSettings): Promise<BrowserTab> {
        return Promise.resolve(new BrowserTab(params));
    }
}
