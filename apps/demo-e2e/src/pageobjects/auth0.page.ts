import { $ } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';

import { IdpPage } from './idp-page';

class Auth0Page extends IdpPage {
    public readonly name = 'Auth0';
    public readonly clientId = 'kRVVEnAWKMpxxpcodl0TqLXfIHgQvmmt';

    public get $submitButton(): ChainablePromiseElement {
        return $('button[type="submit"][name="action"]');
    }
}

export default new Auth0Page();
