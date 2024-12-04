import { Logger } from 'oidc-client-ts';

import type { MobileWindowParams } from '../models/mobile-window-params.model';
import { MobileWindow } from './mobile-window';

/**
 * @internal
 */
export class MobileNavigator {
    private readonly _logger = new Logger('MobileNavigator');

    public prepare(redirectUrl: string, params: MobileWindowParams): MobileWindow {
        this._logger.create('prepare');
        return new MobileWindow(redirectUrl, params);
    }
}
