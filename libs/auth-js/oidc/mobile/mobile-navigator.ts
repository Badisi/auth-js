import { AuthLogger } from '@badisi/auth-js';

import type { MobileWindowParams } from '../models/mobile-window-params.model';
import { MobileWindow } from './mobile-window';

const logger = new AuthLogger('MobileNavigator');

/**
 * @internal
 */
export class MobileNavigator {
    public prepare(redirectUrl: string, params: MobileWindowParams): MobileWindow {
        logger.debug('prepare');
        return new MobileWindow(redirectUrl, params);
    }
}
