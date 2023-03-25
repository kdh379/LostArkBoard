const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./pages/**/*.{html,js,ts,tsx,scss}",
        "./styles/**/*.{scss}",
        "./components/**/*.{html,js,ts,tsx,scss}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
            },
            backgroundColor: {
                default: "#181818",
            },
        },
    },
    plugins: [],
};
