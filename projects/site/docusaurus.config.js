// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.nightOwlLight;
const darkCodeTheme = require('prism-react-renderer').themes.nightOwl;

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'auth-js',
    url: 'https://badisi.github.io',
    tagline: 'Authentication and authorization support for web based applications.',
    baseUrl: '/auth-js/site/',
    organizationName: 'Badisi',
    projectName: 'auth-js',
    deploymentBranch: 'gh-pages',
    trailingSlash: false,
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    i18n: {
        defaultLocale: 'en-US',
        locales: ['en-US']
    },
    themes: [
        [
            require.resolve('@easyops-cn/docusaurus-search-local'),
            /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
            {
                docsRouteBasePath: '/',
                hashed: true,
                language: 'en',
                searchBarShortcut: false
            }
        ]
    ],
    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: '/',
                    breadcrumbs: false,
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl: 'https://github.com/Badisi/auth-js/edit/main/projects/site/'
                },
                theme: {
                    customCss: [
                        require.resolve('./src/css/custom.css'),
                        require.resolve('./src/css/search.css')
                    ]
                }
            })
        ]
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: 'Auth-js',
                hideOnScroll: false,
                logo: {
                    alt: 'logo',
                    src: 'img/logo.svg'
                },
                items: [{
                    type: 'doc',
                    label: 'Documentation',
                    position: 'left',
                    docId: 'documentation/intro'
                }, {
                    type: 'doc',
                    label: 'APIs',
                    position: 'left',
                    docId: 'apis/vanilla-js/auth-manager'
                }, {
                    href: 'https://github.com/Badisi/auth-js',
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
                        to: '/documentation/intro'
                    }, {
                        label: 'Configuration',
                        to: '/documentation/configuration'
                    }, {
                        label: 'Usage',
                        to: '/documentation/usage'
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
                additionalLanguages: ['bash', 'diff', 'json']
            }
        })
};

module.exports = config;
