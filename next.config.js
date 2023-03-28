const API_KEY = process.env.NEXT_PUBLIC_LOA_API_KEY;

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
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    {
                        key: "Authorization",
                        value: "",
                    },
                ],
            },
        ];
    },
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
