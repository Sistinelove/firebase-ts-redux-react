/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            maxWidth: {
                "container-page": "1440px",
            },
            maxHeight: {
                "container-heigth": "1024px",
            },
            colors: {
                customRed: "#FF6161",
                customGray: "#F8F8F8",
                Violet: "#512689",
            },
            fontFamily: {
                sans: ["Arial", "sans-serif"],
                roboto: ["Roboto", "sans-serif"],
            },
            minWidth: {
                "sm": "375px",
                "lg": "1440px"
            },
            height:{
                "64":"265px"
            }
        
        },
        plugins: [],
    },
};
