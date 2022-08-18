import { Logger, UserManagerSettingsStore } from 'oidc-client-ts';

import { MobileWindowOptions } from '../models/mobile-window-options.model';
import { MobileWindow } from './mobile-window';

export class MobileNavigator {
    private readonly _logger = new Logger('MobileNavigator');

    constructor(
        public _settings: UserManagerSettingsStore
    ) {
        // TODO: manage settings
        // TODO: test with popup mode
    }

    public prepare(options: MobileWindowOptions): MobileWindow {
        // TODO: manage options
        this._logger.create('prepare');
        return new MobileWindow(options);
    }
}
