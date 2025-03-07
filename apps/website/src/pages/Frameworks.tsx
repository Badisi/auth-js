import React from 'react';
import JavascriptSvg from '@site/static/javascript.svg';
import VueJsSvg from '@site/static/vue-js.svg';
import AngularSvg from '@site/static/angular.svg';
import HexagonsSvg from '@site/static/hexagons.svg';

const Frameworks = () => {
    return (
        <section className="frameworks flex-col lg:flex-row py-16 sm:py-[8rem]">
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
                            style={{ backgroundColor: '#dcfce7' }}>
                            <VueJsSvg className="icon" />
                        </div>
                        <div
                            className="item"
                            style={{ backgroundColor: '#fee2e2' }}>
                            <AngularSvg className="icon" />
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
                    offers seamless integration with Vanilla JS, Vue.js, and
                    Angular, allowing you to leverage your existing skills and
                    build exceptional web experiences.
                </p>

                <p className="subtitle">Get started:</p>
                <div className="items flex-col sm:flex-row">
                    <button className="item">
                        <JavascriptSvg className="icon" />
                        <span className="label">vanilla/js</span>
                    </button>
                    <button className="item">
                        <VueJsSvg className="icon" />
                        <span className="label">vue.js</span>
                    </button>
                    <button className="item">
                        <AngularSvg className="icon" />
                        <span className="label">angular</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Frameworks;
