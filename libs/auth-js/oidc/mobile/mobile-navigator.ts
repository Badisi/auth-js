
import { AuthLogger } from '@badisi/auth-js';

import type { MobileWindowParams } from '../models/mobile-window-params.model';
import { MobileWindow } from './mobile-window';

/**
 * @internal
 */
export class MobileNavigator {
    #logger = new AuthLogger('MobileNavigator');

    public prepare(redirectUrl: string, params: MobileWindowParams): MobileWindow {
        this.#logger.debug('prepare');
        return new MobileWindow(redirectUrl, params);
    }
}
