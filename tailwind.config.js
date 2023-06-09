const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./pages/**/*.{html,js,ts,tsx,scss}",
        "./styles/**/*.{scss}",
        "./components/**/*.{html,js,ts,tsx,scss}",
        "./hooks/**/*.{html,js,ts,tsx,scss}",
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
                    DEFAULT: "#2a2f35",
                },
                itemGrade1: {
                    DEFAULT: "#8df901",
                },
                itemGrade2: {
                    DEFAULT: "#00b0fa;",
                },
                itemGrade3: {
                    DEFAULT: "#ba00f9",
                },
                itemGrade4: {
                    DEFAULT: "#f9a100",
                },
                itemGrade5: {
                    DEFAULT: "#fa5d00",
                },
                itemGrade6: {
                    DEFAULT: "#ddc29d",
                },
                itemGrade7: {
                    DEFAULT: "#3cf2e6",
                },
            },
        },
    },
    plugins: [],
};
