// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/nightOwlLight');
const darkCodeTheme = require('prism-react-renderer/themes/nightOwl');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'auth-js',
    tagline: 'Authentication and authorization support for web based applications.',
    url: 'https://badisi.github.io',
    baseUrl: '/auth-js/',
    organizationName: 'Badisi',
    projectName: 'auth-js',
    deploymentBranch: 'gh-pages',
    trailingSlash: false,
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',

    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: '/',
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl: 'https://github.com/Badisi/auth-js/edit/main/projects/docs/'
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css')
                }
            })
        ]
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: 'Auth-js',
                logo: {
                    alt: 'logo',
                    src: 'img/logo.svg'
                },
                items: [
                    {
                        type: 'doc',
                        label: 'Docs',
                        position: 'left',
                        docId: 'intro/getting-started'
                    },
                    {
                        type: 'doc',
                        label: 'APIs',
                        position: 'left',
                        docId: 'apis/intro'
                    },
                    {
                        href: 'https://github.com/Badisi/auth-js',
                        label: ' ',
                        position: 'right',
                        className: 'header-github-link',
                        'aria-label': 'GitHub repository'
                    }
                ]
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Docs',
                        items: [
                            {
                                label: 'Getting started',
                                to: '/docs/intro/getting-started'
                            },
                            {
                                label: 'APIs',
                                to: '/docs/apis/intro'
                            }
                        ]
                    },
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'Stack Overflow',
                                href: 'https://stackoverflow.com/questions/tagged/auth-js'
                            }
                        ]
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'GitHub',
                                href: 'https://github.com/Badisi/auth-js'
                            }
                        ]
                    }
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Badisi`
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme
            }
        })
};

module.exports = config;
