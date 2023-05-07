const defaultTheme = require("tailwindcss/defaultTheme");

// tailwind css 타입

/** @type {import('tailwindcss').Config} */
const config = {
    safelist: [
        "text-itemGrade1",
        "text-itemGrade2",
        "text-itemGrade3",
        "text-itemGrade4",
        "text-itemGrade5",
        "text-itemGrade6",
        "text-itemGrade7",
        "to-itemGrade1",
        "to-itemGrade2",
        "to-itemGrade3",
        "to-itemGrade4",
        "to-itemGrade5",
        "to-itemGrade6",
        "to-itemGrade7",
    ],
};
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
