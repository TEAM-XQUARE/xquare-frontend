/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    },
    rewrites() {
        return [
            {
              source: "/dms",
              destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/dms`,
            },
        ];
    }
};
