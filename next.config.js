/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    typescript: {
        tsconfigPath: "tsconfig.json",
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    basePath: "https://github.com/kdh379/LostArkProfile.git",
    pageExtensions: ["page.tsx", "page.ts"],
    webpack: (config) => {
        const rules = config.module.rules
            .find((rule) => typeof rule.oneOf === "object")
            .oneOf.filter((rule) => Array.isArray(rule.use));

        rules.forEach((rule) => {
            rule.use.forEach((moduleLoader) => {
                if (
                    moduleLoader.loader !== undefined &&
                    moduleLoader.loader.includes("css-loader") &&
                    typeof moduleLoader.options.modules === "object"
                ) {
                    moduleLoader.options.modules.getLocalIdent = (
                        _context,
                        _local,
                        localName
                    ) => {
                        return localName;
                    };
                }
            });
        });

        return config;
    },
};

module.exports = nextConfig;
