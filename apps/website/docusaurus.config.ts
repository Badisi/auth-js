/* eslint-disable @stylistic/quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes } from 'prism-react-renderer';

import tailWindPlugin from './src/plugins/tailwind-plugin';

const lightCodeTheme = themes.nightOwlLight;
const darkCodeTheme = themes.nightOwl;

const config: Config = {
    title: 'Auth-js',
    url: 'https://badisi.github.io',
    tagline: 'Authentication and authorization support for web based applications.',
    baseUrl: '/auth-js/',
    organizationName: 'Badisi',
    projectName: 'auth-js',
    deploymentBranch: 'gh-pages',
    trailingSlash: false,
    onBrokenLinks: 'throw',
    favicon: 'assets/favicon.ico',
    i18n: {
        defaultLocale: 'en-US',
        locales: [
            'en-US'
        ]
    },
    markdown: {
        hooks: {
            onBrokenMarkdownLinks: 'warn'
        }
    },
    future: {
        v4: true, // opt-in for Docusaurus v4 planned changes
        faster: true
    },
    themes: [
        [
            require.resolve('@easyops-cn/docusaurus-search-local'),
            {
                docsRouteBasePath: '/',
                hashed: true,
                language: 'en',
                searchBarShortcut: false
            }
        ]
    ],
    headTags: [
        {
            tagName: 'link',
            attributes: {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Inconsolata:wght@400;700&display=swap'
            }
        }
    ],
    presets: [
        [
            'classic',
            {
                docs: {
                    routeBasePath: '/',
                    breadcrumbs: false,
                    sidebarPath: require.resolve('./sidebars.ts'),
                    editUrl: 'https://github.com/Badisi/auth-js/edit/main/apps/website/'
                },
                theme: {
                    customCss: [
                        require.resolve('./src/css/home.css'),
                        require.resolve('./src/css/search.css'),
                        require.resolve('./src/css/not-found.css'),
                        require.resolve('./src/css/custom.css')
                    ]
                }
            } satisfies Preset.Options
        ]
    ],
    themeConfig: {
        navbar: {
            title: 'Auth-js',
            hideOnScroll: false,
            logo: {
                alt: 'logo',
                src: 'assets/svg/logo.svg'
            },
            items: [{
                type: 'doc',
                label: 'Docs',
                position: 'left',
                docId: 'getting-started/intro'
            }, {
                type: 'doc',
                label: 'Guides',
                position: 'left',
                docId: 'guides/guides'
            }, {
                type: 'doc',
                label: 'API',
                position: 'left',
                docId: 'api/vanilla-js/auth-manager'
            }, {
                href: 'https://badisi.github.io/auth-js/demo-app/auth-js',
                target: '_self',
                label: 'Playground',
                position: 'right'
            }, {
                href: 'https://github.com/Badisi/auth-js',
                target: '_self',
                label: ' ',
                position: 'right',
                className: 'header-github-link',
                'aria-label': 'GitHub repository'
            }]
        },
        footer: {
            style: 'dark',
            links: [{
                title: 'Docs',
                items: [{
                    label: 'Getting started',
                    to: '/getting-started/intro'
                }, {
                    label: 'Configuration',
                    to: '/getting-started/configuration'
                }, {
                    label: 'Usage',
                    to: '/getting-started/usage'
                }]
            }, {
                title: 'Community',
                items: [{
                    label: 'Stack Overflow',
                    href: 'https://stackoverflow.com/questions/tagged/auth-js'
                }]
            }, {
                title: 'More',
                items: [{
                    label: 'GitHub',
                    href: 'https://github.com/Badisi/auth-js'
                }]
            }],
            copyright: 'Copyright © 2018 Badisi'
        },
        prism: {
            theme: lightCodeTheme,
            darkTheme: darkCodeTheme,
            additionalLanguages: [
                'bash',
                'diff',
                'json'
            ]
        }
    } satisfies Preset.ThemeConfig,
    plugins: [
        tailWindPlugin
    ]
};

export default config;
