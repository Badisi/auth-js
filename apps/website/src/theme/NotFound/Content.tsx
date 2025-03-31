import React, { type ReactNode, useState, useEffect } from 'react';
import type { Props } from '@theme/NotFound/Content';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Heading from '@theme/Heading';
import NotFoundSvg from '@site/static/assets/svg/404.svg';

export default function NotFoundContent({ className }: Props): ReactNode {
    const [
        shouldRedirectTo,
        setShouldRedirectTo
    ] = useState(null);

    useEffect(() => {
        const redirectTo = (url: string, storeUrl = true): void => {
            // If the URL is already the one we want, do nothing
            if (location.href.includes(url)) {
                return;
            }

            // Store the URL the user was trying to access when receiving the 404.
            if (storeUrl) {
                sessionStorage.setItem('gh-pages-url-from-404', location.href);
            }

            // Redirect to the proper demo application
            setShouldRedirectTo(url);
        };

        if (location.href.includes('/demo-app/auth-js')) {
            redirectTo('/auth-js/demo-app/auth-js');
        } else if (location.href.includes('/demo-app/ngx-auth')) {
            redirectTo('/auth-js/demo-app/ngx-auth');
        } else if (location.href.includes('/demo-app/auth-vue')) {
            redirectTo('/auth-js/demo-app/auth-vue');
        } else if (location.href.includes('/demo-app')) {
            // Redirect to default demo application
            redirectTo('/auth-js/demo-app/auth-js', false);
        } else {
            shouldRedirectTo(false);
        }
    }, []);

    if (shouldRedirectTo === null) {
        return null;
    } else if (shouldRedirectTo !== false) {
        return (
            <BrowserOnly>
                {() => {
                    location.href = shouldRedirectTo;
                    return null;
                }}
            </BrowserOnly>
        );
    }
    return (
        <main
            className={clsx('not-found container margin-vert--xl', className)}>
            <div className="row">
                <div className="col col--6 col--offset-3">
                    <NotFoundSvg />
                    <Heading as="h1" className="hero__title">
                        Page not found
                    </Heading>
                    <p>
                        The address might be mistyped or the page may have
                        moved.
                    </p>
                    <p>
                        Please{' '}
                        <Link
                            className="github"
                            to="https://github.com/Badisi/auth-js/issues/new?template=3-doc-issue.yml">
                            let us know
                        </Link>{' '}
                        so we can fix it.
                    </p>
                    <Link className="home" to="/">
                        Take me back home →
                    </Link>
                </div>
            </div>
        </main>
    );
}
