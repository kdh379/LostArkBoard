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
    pageExtensions: ["page.tsx", "page.ts"],
    async redirects() {
        return [
            {
                source: "/old-blog/:path*",
                destination: "/new-blog/:path*",
                permanent: false,
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: "/api/movies",
                destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
            },
        ];
    },
};

module.exports = nextConfig;
