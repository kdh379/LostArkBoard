const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./pages/**/*.{html,js,ts,tsx,scss}",
        "./styles/**/*.{scss}",
        "./components/**/*.{html,js,ts,tsx,scss}",
    ],
    lightMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                background: {
                    DEFAULT: "#14181d",
                },
                surface: {
                    DEFAULT: "#1e2328",
                },
                active: {
                    DEFAULT: "#2e3338",
                },
            },
        },
    },
    plugins: [],
};
