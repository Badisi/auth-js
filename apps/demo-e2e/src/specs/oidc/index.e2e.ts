import { getCapabilityContext } from '../../../wdio.capabilities';
import { basicTestsWithMode } from './basic';
import { miscTests, miscTestsUsingMode, miscTestsUsingWellKnown } from './misc';
import { OidcSuite } from './utils';

const { idpPage, suiteName } = getCapabilityContext();

switch (suiteName) {
    case OidcSuite.BASIC_POPUP:
        basicTestsWithMode(idpPage, 'popup');
        break;
    case OidcSuite.BASIC_REDIRECT:
        basicTestsWithMode(idpPage, 'redirect');
        break;
    case OidcSuite.MISC_POPUP:
        miscTestsUsingMode(idpPage, 'popup');
        break;
    case OidcSuite.MISC_REDIRECT:
        miscTestsUsingMode(idpPage, 'redirect');
        break;
    case OidcSuite.MISC_WELL_KNOWN:
        miscTestsUsingWellKnown(idpPage);
        break;
    case OidcSuite.MISC:
        miscTests(idpPage);
        break;
    default: break;
}
