/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    basePath: '/dormitory-admin',
    experimental: {
        outputStandalone: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};