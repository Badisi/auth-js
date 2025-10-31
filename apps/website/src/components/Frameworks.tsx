import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import JavascriptSvg from '@site/static/assets/svg/javascript.svg';
import AngularSvg from '@site/static/assets/svg/angular.svg';
import VueJsSvg from '@site/static/assets/svg/vue-js.svg';
import QuasarSvg from '@site/static/assets/svg/quasar.svg';
import HexagonsSvg from '@site/static/assets/svg/hexagons.svg';

const Frameworks = () => {
    return (
        <section className="frameworks flex-col lg:flex-row py-16 sm:py-32">
            <div className="left w-full lg:w-1/2">
                <div className="container">
                    <div className="row">
                        <div
                            className="item"
                            style={{ backgroundColor: '#fef9c3' }}>
                            <JavascriptSvg className="icon" />
                        </div>
                    </div>
                    <div className="row">
                        <div
                            className="item"
                            style={{ backgroundColor: '#fee2e2' }}>
                            <AngularSvg className="icon" />
                        </div>
                        <div
                            className="item"
                            style={{ backgroundColor: '#dcfce7' }}>
                            <VueJsSvg className="icon" />
                        </div>
                    </div>
                    <HexagonsSvg className="background" />
                </div>
            </div>

            <div className="right lg:w-1/2 mr-0 lg:mr-6">
                <h3 className="title text-4xl sm:text-5xl">
                    Use your favorite JavaScript tech.
                </h3>
                <p className="description text-lg sm:text-[1.25rem]">
                    Develop with the JavaScript framework you love. Our platform
                    offers seamless integration with Vanilla JS, Angular, Vue.js,
                    and Quasar. Allowing you to leverage your existing skills and
                    build exceptional web experiences.
                </p>

                <p className="subtitle">Get started:</p>
                <div className="items flex-col sm:flex-row">
                    <button type="button" className="item">
                        <JavascriptSvg className="icon" />
                        <Link
                            className="label"
                            to={useBaseUrl('getting-started/vanilla-js')}>
                            vanilla/js
                        </Link>
                    </button>
                    <button type="button" className="item">
                        <AngularSvg className="icon" />
                        <Link
                            className="label"
                            to={useBaseUrl('getting-started/angular')}>
                            angular
                        </Link>
                    </button>
                    <button type="button" className="item">
                        <VueJsSvg className="icon" />
                        <Link
                            className="label"
                            to={useBaseUrl('getting-started/vue-js')}>
                            vue.js
                        </Link>
                    </button>
                    <button type="button" className="item">
                        <QuasarSvg className="icon" />
                        <Link
                            className="label"
                            to={useBaseUrl('getting-started/quasar')}>
                            quasar
                        </Link>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Frameworks;
