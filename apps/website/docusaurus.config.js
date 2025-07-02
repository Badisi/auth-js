// @ts-check

const lightCodeTheme = require('prism-react-renderer').themes.nightOwlLight;
const darkCodeTheme = require('prism-react-renderer').themes.nightOwl;

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Auth-js',
    url: 'https://badisi.github.io',
    tagline:
        'Authentication and authorization support for web based applications.',
    baseUrl: '/auth-js/',
    organizationName: 'Badisi',
    projectName: 'auth-js',
    deploymentBranch: 'gh-pages',
    trailingSlash: false,
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'assets/favicon.ico',
    i18n: {
        defaultLocale: 'en-US',
        locales: [
            'en-US'
        ]
    },
    future: {
        v4: true, // opt-in for Docusaurus v4 planned changes
        // eslint-disable-next-line camelcase
        experimental_faster: true // turns Docusaurus Faster on globally
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
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: '/',
                    breadcrumbs: false,
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl:
                        'https://github.com/Badisi/auth-js/edit/main/apps/website/'
                },
                theme: {
                    customCss: [
                        require.resolve('./src/css/home.css'),
                        require.resolve('./src/css/search.css'),
                        require.resolve('./src/css/not-found.css'),
                        require.resolve('./src/css/custom.css')
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
                    src: 'assets/svg/logo.svg'
                },
                items: [
                    {
                        type: 'doc',
                        label: 'Docs',
                        position: 'left',
                        docId: 'getting-started/intro'
                    },
                    {
                        type: 'doc',
                        label: 'Guides',
                        position: 'left',
                        docId: 'guides/guides'
                    },
                    {
                        type: 'doc',
                        label: 'API',
                        position: 'left',
                        docId: 'api/vanilla-js/auth-manager'
                    },
                    {
                        href: 'https://badisi.github.io/auth-js/demo-app/auth-js',
                        target: '_self',
                        label: 'Playground',
                        position: 'right'
                    },
                    {
                        href: 'https://github.com/Badisi/auth-js',
                        target: '_self',
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
                                to: '/getting-started/intro'
                            },
                            {
                                label: 'Configuration',
                                to: '/getting-started/configuration'
                            },
                            {
                                label: 'Usage',
                                to: '/getting-started/usage'
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
        }),
    plugins: [
        async () => ({
            name: 'tailwindcss-plugin',
            configurePostCss: postcssOptions => {
                postcssOptions.plugins.push(require('@tailwindcss/postcss'));
                return postcssOptions;
            }
        })
    ]
};

export default config;
