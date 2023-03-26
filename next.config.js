const API_KEY = process.env.API_KEY;

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    typescript: {
        tsconfigPath: "tsconfig.json",
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ["cdn-lostark.game.onstove.com"],
    },
    pageExtensions: ["page.tsx", "page.ts"],
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `https://developer-lostark.game.onstove.com/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
