import { Logger, UserManagerSettingsStore } from 'oidc-client-ts';

import { MobileWindowParams } from '../models/mobile-window-params.model';
import { MobileWindow } from './mobile-window';

export class MobileNavigator {
    private readonly _logger = new Logger('MobileNavigator');

    constructor(
        public settings: UserManagerSettingsStore
    ) {
        // TODO: manage settings
    }

    public prepare(params: MobileWindowParams, redirectUrl: string): MobileWindow {
        // TODO: manage params
        this._logger.create('prepare');
        return new MobileWindow(params, redirectUrl);
    }
}
