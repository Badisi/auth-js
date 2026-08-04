/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-namespace */

import auth0Page from './src/pageobjects/ipd/auth0.page';
import type { IdpPage } from './src/pageobjects/ipd/idp-page';
import keycloakPage from './src/pageobjects/ipd/keycloak.page';
import zitadelPage from './src/pageobjects/ipd/zitadel.page';
import { Idp, OidcSuite } from './src/specs/oidc/utils';

declare global {
    namespace WebdriverIO {
        interface Capabilities {
            'custom:config': {
                idpName: Idp;
                suiteName: OidcSuite;
            };
        }
    }
}

const chromeArgs = (headless = false): string[] => {
    const args = ['--disable-http-cache', '--disable-popup-blocking'];
    if (headless) {
        args.push('--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage');
    }
    return args;
};

export interface CapabilityContext {
    idpPage: IdpPage;
    suiteName: OidcSuite;
};

export const getCapabilityContext = (): CapabilityContext => {
    const { idpName, suiteName } = browser.capabilities['custom:config'];
    const idpPage = [auth0Page, zitadelPage, keycloakPage].find(ipdPage => ipdPage.name === idpName);
    if (!idpPage) {
        throw new Error(`Cannot find an IdpPage object with name '${idpName}'.`);
    }
    return { idpPage, suiteName };
};

export const getCapabilities = (headless = false): WebdriverIO.Capabilities[] => {
    const idps: Idp[] = [
        Idp.AUTH0,
        Idp.ZITADEL
    ];

    const suites: OidcSuite[] = [
        OidcSuite.BASIC_POPUP,
        OidcSuite.BASIC_REDIRECT,
        OidcSuite.MISC_POPUP,
        OidcSuite.MISC_REDIRECT,
        OidcSuite.MISC_WELL_KNOWN,
        OidcSuite.MISC
    ];

    return idps.flatMap(idpName =>
        suites.map(suiteName => ({
            'browserName': 'chrome',
            // Pin to a specific Chrome for Testing stable build: the 'stable' tag currently resolves to
            // 151.0.7922.77, which crashes all helper processes on macOS 26.5 (Intel).
            'browserVersion': '151.0.7922.108',
            'acceptInsecureCerts': true,
            'goog:chromeOptions': {
                args: chromeArgs(headless)
            },
            'custom:config': {
                idpName,
                suiteName
            },
            'wdio:specs': [
                './src/specs/oidc/index.e2e.ts'
            ]
        }))
    );
};
