import React, { type ReactNode } from 'react';
import type { Props } from '@theme/NotFound/Content';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import NotFoundSvg from '@site/static/assets/svg/404.svg';

export default function NotFoundContent({ className }: Props): ReactNode {
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
