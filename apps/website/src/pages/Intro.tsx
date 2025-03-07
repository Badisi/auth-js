import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ShieldSvg from '@site/static/shield.svg';

const Intro = () => {
    return (
        <section className="intro">
            <header className="header">
                <ShieldSvg className="icon h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32" />

                <div style={{ position: 'relative' }}>
                    <h1 className="title text-5xl md:text-6xl xl:text-8xl">
                        <span className="blue">Authentication</span>
                        <br />
                        for the <span className="pink">Web</span>.
                    </h1>
                    <div className="spot blue"></div>
                    <div className="spot pink"></div>
                </div>

                <p className="subtitle text-lg sm:text-2xl">
                    <b>Secure</b> your web applications in seconds by
                    <br className="block sm:hidden" /> leveraging the latest{' '}
                    <b>security standards</b> <br className="block sm:hidden" />
                    and <b>best practices</b>.
                </p>

                <div className="buttons flex-col sm:flex-row gap-5 sm:gap-6">
                    <Link
                        className="button getstarted text-lg sm:text-xl"
                        to={useBaseUrl('getting-started')}>
                        Get Started&nbsp;&nbsp;<span className="arrow">→</span>
                    </Link>
                    <Link
                        className="button playground text-lg sm:text-xl"
                        to={useBaseUrl('playground')}>
                        Playground
                    </Link>
                </div>
            </header>
        </section>
    );
};

export default Intro;
