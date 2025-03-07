/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: [
        'class',
        '[data-theme="dark"]'
    ],
    corePlugins: {
        preflight: false
    },
    blocklist: ['container'],
    theme: {
        extend: {}
    },
    plugins: []
};
