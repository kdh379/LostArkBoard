const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./pages/**/*.{html,js,ts,tsx,scss}",
        "./styles/**/*.{scss}",
        "./components/**/*.{html,js,ts,tsx,scss}",
    ],
    lightMode: "class",
    safeList: [
        "text-itemGrade1",
        "text-itemGrade2",
        "text-itemGrade3",
        "text-itemGrade4",
        "text-itemGrade5",
        "text-itemGrade6",
        "text-itemGrade7",
    ],
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
