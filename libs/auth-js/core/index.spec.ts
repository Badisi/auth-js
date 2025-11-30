import { describe, expect } from '@jest/globals';

import { AuthSubscriptions } from './auth-subscriptions';
import { AuthUtils } from './auth-utils';

describe('AuthSubscriptions', () => {
    describe('add and notify', () => {
        it('should add subscribers and notify them', () => {
            const subscriptions = new AuthSubscriptions<number>();
            const results: number[] = [];

            const subscriber1 = (value: number): void => {
                results.push(value + 1);
            };
            const subscriber2 = (value: number): void => {
                results.push(value + 2);
            };

            subscriptions.add(subscriber1);
            subscriptions.add(subscriber2);

            subscriptions.notify(5);

            expect(results).toEqual([6, 7]);
        });

        it('should notify a newly added subscriber with the last notified value', () => {
            const subscriptions = new AuthSubscriptions<number>();
            const results: number[] = [];

            const subscriber = (value: number): void => {
                results.push(value);
            };

            subscriptions.notify(5);
            subscriptions.add(subscriber);

            expect(results).toEqual([5]);
        });
    });

    describe('unsubscribe', () => {
        it('should unsubscribe a specific subscriber', () => {
            const subscriptions = new AuthSubscriptions<number>();
            const results: number[] = [];

            const subscriber1 = (value: number): void => {
                results.push(value + 1);
            };
            const subscriber2 = (value: number): void => {
                results.push(value + 2);
            };

            subscriptions.add(subscriber1);
            subscriptions.add(subscriber2);

            subscriptions.unsubscribe(subscriber1);

            subscriptions.notify(5);

            expect(results).toEqual([7]);
        });

        it('should unsubscribe all subscribers when no argument is provided', () => {
            const subscriptions = new AuthSubscriptions<number>();
            const results: number[] = [];

            const subscriber1 = (value: number): void => {
                results.push(value + 1);
            };
            const subscriber2 = (value: number): void => {
                results.push(value + 2);
            };

            subscriptions.add(subscriber1);
            subscriptions.add(subscriber2);

            subscriptions.unsubscribe();

            subscriptions.notify(5);

            expect(results).toEqual([]);
        });
    });
});

describe('AuthUtils', () => {
    describe('isUrlMatching', () => {
        it.each([
            // non identical
            ['', undefined, false],
            ['demo-app://?oidc-callback=login', 'demo-app2://?oidc-callback=login', false],
            ['demo-app://?oidc-callback=login', 'demo-app://?oidc-callback2=login', false],
            ['demo-app://?oidc-callback=login', 'demo-app://?oidc-callback=login2', false],
            ['http://localhost:4200/?oidc-callback=login', 'http://localhost2:4200/?oidc-callback=login', false],
            ['http://localhost:4200/?oidc-callback=login', 'http://localhost:4200/?oidc-callback2=login', false],
            ['http://localhost:4200/?oidc-callback=login', 'http://localhost:4200/?oidc-callback=login2', false],
            // identical
            ['', '', true],
            ['/?oidc-callback=login', '/?oidc-callback=login', true],
            ['/oidc/callback/silent_redirect.html', '/oidc/callback/silent_redirect.html', true],
            ['demo-app://?oidc-callback=login', 'demo-app://?oidc-callback=login', true],
            ['http://localhost:4200/?oidc-callback=login', 'http://localhost:4200/?oidc-callback=login', true],
            // as the only param
            ['/?oidc-callback=login', 'oidc-callback=login', false],
            ['/?oidc-callback=login', '?oidc-callback=login', true],
            ['demo-app://?oidc-callback=login', 'oidc-callback=login', false],
            ['demo-app://?oidc-callback=login', '?oidc-callback=login', true],
            ['http://localhost:4200/?oidc-callback=login', 'oidc-callback=login', false],
            ['http://localhost:4200/?oidc-callback=login', '?oidc-callback=login', true],
            // as first param
            ['/?oidc-callback=login&test=hello', 'oidc-callback=login', false],
            ['/?oidc-callback=login&test=hello', '?oidc-callback=login', true],
            ['demo-app://?oidc-callback=login&test=hello', 'oidc-callback=login', false],
            ['demo-app://?oidc-callback=login&test=hello', '?oidc-callback=login', true],
            ['demo-app://?oidc-callback=login&test=hello', 'demo-app://?oidc-callback=login', true],
            ['demo-app://?oidc-callback=login&test=hello', 'demo-app2://?oidc-callback=login', false],
            ['http://localhost:4200/?oidc-callback=login&test=hello', 'oidc-callback=login', false],
            ['http://localhost:4200/?oidc-callback=login&test=hello', '?oidc-callback=login', true],
            [
                'http://localhost:4200/?oidc-callback=login&test=hello',
                'http://localhost:4200/?oidc-callback=login',
                true
            ],
            [
                'http://localhost:4200/?oidc-callback=login&test=hello',
                'http://localhost2:4200/?oidc-callback=login',
                false
            ],
            // as last param
            ['/?test=hello&oidc-callback=login', 'oidc-callback=login', false],
            ['/?test=hello&oidc-callback=login', '?oidc-callback=login', true],
            ['demo-app://?test=hello&oidc-callback=login', 'oidc-callback=login', false],
            ['demo-app://?test=hello&oidc-callback=login', '?oidc-callback=login', true],
            ['demo-app://?test=hello&oidc-callback=login', 'demo-app://?oidc-callback=login', true],
            ['demo-app://?test=hello&oidc-callback=login', 'demo-app2://?oidc-callback=login', false],
            ['http://localhost:4200/?test=hello&oidc-callback=login', 'oidc-callback=login', false],
            ['http://localhost:4200/?test=hello&oidc-callback=login', '?oidc-callback=login', true],
            [
                'http://localhost:4200/?test=hello&oidc-callback=login',
                'http://localhost:4200/?oidc-callback=login',
                true
            ],
            [
                'http://localhost:4200/?test=hello&oidc-callback=login',
                'http://localhost2:4200/?oidc-callback=login',
                false
            ],
            // as param in-between
            ['/?test=hello&oidc-callback=login&hello=test', 'oidc-callback=login', false],
            ['/?test=hello&oidc-callback=login&hello=test', '?oidc-callback=login', true],
            ['demo-app://?test=hello&oidc-callback=login&hello=test', 'oidc-callback=login', false],
            ['demo-app://?test=hello&oidc-callback=login&hello=test', '?oidc-callback=login', true],
            ['demo-app://?test=hello&oidc-callback=login&hello=test', 'demo-app://?oidc-callback=login', true],
            ['demo-app://?test=hello&oidc-callback=login&hello=test', 'demo-app2://?oidc-callback=login', false],
            ['http://localhost:4200/?test=hello&oidc-callback=login&hello=test', 'oidc-callback=login', false],
            ['http://localhost:4200/?test=hello&oidc-callback=login&hello=test', '?oidc-callback=login', true],
            [
                'http://localhost:4200/?test=hello&oidc-callback=login&hello=test',
                'http://localhost:4200/?oidc-callback=login',
                true
            ],
            [
                'http://localhost:4200/?test=hello&oidc-callback=login&hello=test',
                'http://localhost2:4200/?oidc-callback=login',
                false
            ],
            // with multi params
            ['/?test=hello&oidc-callback=login&hello=test&oidc-callback=hello', 'oidc-callback=login', false],
            ['/?test=hello&oidc-callback=login&hello=test&oidc-callback=hello', '?oidc-callback=login', true],
            ['demo-app://?test=hello&oidc-callback=login&hello=test&oidc-callback=hello', 'oidc-callback=login', false],
            ['demo-app://?test=hello&oidc-callback=login&hello=test&oidc-callback=hello', '?oidc-callback=login', true],
            [
                'demo-app://?test=hello&oidc-callback=login&hello=test&oidc-callback=hello',
                'demo-app://?oidc-callback=login',
                true
            ],
            [
                'demo-app://?test=hello&oidc-callback=login&hello=test&oidc-callback=hello',
                'demo-app2://?oidc-callback=login',
                false
            ],
            [
                'http://localhost:4200/?test=hello&oidc-callback=login&hello=test&oidc-callback=hello',
                'oidc-callback=login',
                false
            ],
            [
                'http://localhost:4200/?test=hello&oidc-callback=login&hello=test&oidc-callback=hello',
                '?oidc-callback=login',
                true
            ],
            [
                'http://localhost:4200/?test=hello&oidc-callback=login&hello=test&oidc-callback=hello',
                'http://localhost:4200/?oidc-callback=login',
                true
            ],
            [
                'http://localhost:4200/?test=hello&oidc-callback=login&hello=test&oidc-callback=hello',
                'http://localhost2:4200/?oidc-callback=login',
                false
            ],
            // with html page
            ['/oidc/callback/silent_redirect.html', 'silent_redirect.html', true],
            ['http://localhost:4200/oidc/callback/silent_redirect.html', 'silent_redirect.html', true],
            ['http://localhost:4200/oidc/callback/silent_redirect.html', '/silent_redirect.html', true],
            ['http://localhost:4200/oidc/callback/silent_redirect.html?test=hello', '/silent_redirect.html', true],
            [
                'http://localhost:4200/oidc/callback/silent_redirect.html?test=hello',
                '/silent_redirect.html?test=hello',
                true
            ],
            [
                'http://localhost:4200/oidc/callback/silent_redirect.html?test=hello&hello=test',
                '/silent_redirect.html?test=hello',
                true
            ],
            ['http://localhost:4200/oidc/callback/silent_redirect.html', 'http://localhost:4200/test2.html', false],
            [
                'http://localhost:4200/oidc/callback/silent_redirect.html',
                'http://localhost:4200/silent_redirect.html',
                false
            ],
            ['http://localhost:4200/oidc/callback/silent_redirect.html', '/silent_redirect.html?test=hello', false],
            [
                'http://localhost:4200/oidc/callback/silent_redirect.html?test=hello',
                '/silent_redirect.html?test=hello&hello=test',
                false
            ]
        ])(
            '("%s", "%s")',
            (url1: string, url2: string | undefined, expected: boolean) => {
                expect(AuthUtils.isUrlMatching(url1, url2)).toBe(expected);
            }
        );
    });
});
