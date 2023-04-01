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
                    DEFAULT: "#090909",
                },
                surface: {
                    DEFAULT: "#121212",
                },
            },
        },
    },
    plugins: [],
};
