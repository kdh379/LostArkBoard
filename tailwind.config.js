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
                    DEFAULT: "#0d0d0d",
                },
                surface: {
                    DEFAULT: "#1e1e1e",
                },
                active: {
                    DEFAULT: "#2e2e2e",
                },
            },
        },
    },
    plugins: [],
};
