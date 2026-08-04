import { $ } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';

import { Idp } from '../../specs/oidc/utils';
import { IdpPage } from './idp-page';

class Auth0Page extends IdpPage {
    public readonly name = Idp.AUTH0;
    public readonly clientId = 'kRVVEnAWKMpxxpcodl0TqLXfIHgQvmmt';
    public readonly authorityUrl = 'https://dev-fijd1e9x.us.auth0.com';

    public get $submitButton(): ChainablePromiseElement {
        return $('button[type="submit"][name="action"]');
    }
}

export default new Auth0Page();
