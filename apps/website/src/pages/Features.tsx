import React from 'react';
import GlobeSvg from '@site/static/globe.svg';
import ShieldCheckSvg from '@site/static/shield-check.svg';
import CodeSvg from '@site/static/code.svg';
import SmartphoneSvg from '@site/static/smartphone.svg';
import PuzzleSvg from '@site/static/puzzle.svg';
import ThumbsUpSvg from '@site/static/thumbs-up.svg';

const FeatureItem = ({ icon: Icon, title, content }) => {
    return (
        <div className="item">
            <div className="header">
                <h3 className="title">{title}</h3>
                <Icon className="icon" />
            </div>
            <p
                className="description"
                dangerouslySetInnerHTML={{ __html: content }}></p>
        </div>
    );
};

const Features = () => {
    const features = [
        {
            title: 'Unified Code Base',
            icon: GlobeSvg,
            content:
                'A single library that works seamlessly on both desktop and mobile web applications.'
        },
        {
            title: 'Security Standards',
            icon: ShieldCheckSvg,
            content:
                'Implements the latest <a href="https://openid.net" target=”_blank”>OpenID Connect</a> standards to ensure secure and reliable authentication.'
        },
        {
            title: 'Best Practices by Default',
            icon: ThumbsUpSvg,
            content:
                'Enforces security best practices so developers can focus on building, not security concerns.'
        },
        {
            title: 'Effortless Integration',
            icon: CodeSvg,
            content:
                'Just a few lines of code to enable authentication, with built-in interceptors, guards, and utilities.'
        },
        {
            title: 'Mobile Support',
            icon: SmartphoneSvg,
            content:
                'Fully compatible with Android and iOS via <a href="https://cordova.apache.org" target=”_blank”>Cordova</a> and <a href="https://capacitorjs.com" target=”_blank”>Capacitor</a> adapters.'
        },
        {
            title: 'Flexible Framework Support',
            icon: PuzzleSvg,
            content:
                'Works with <a href="https://angular.dev" target=”_blank”>Angular</a>, <a href="https://vuejs.org" target=”_blank”>Vue</a>, or any JavaScript environment, with or without a framework.'
        }
    ];

    return (
        <section className="features py-16 sm:py-[8rem]">
            <h2 className="title">
                The only unified framework that works on both desktop and hybrid
                mobile
            </h2>

            <div className="items grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-0 sm:px-12 gap-6 sm:gap-12">
                {features.map((feature, index) => (
                    <FeatureItem
                        key={`feature-item-${index}`}
                        icon={feature.icon}
                        title={feature.title}
                        content={feature.content}
                    />
                ))}
            </div>
        </section>
    );
};

export default Features;
