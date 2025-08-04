import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9732A4",
        secondary: "#273c98",
        header: "#171717e8",
        secColor: "#F6F8FD",
        dark: "#070706",
        secondrydark: "#323232",
        secondrytext: "#848484",
        platinum: "#E7E7E7",
        secSuccess: "#E6FBF0",
        success: {
          DEFAULT: "#04BD5E",
          500: "#03A853",
          600: "#04D268",
        },
        error: {
          DEFAULT: "#DB2024",
          100: "#FEE9EA",
          300: "#EF233C",
        },
        text: {
          gray: "#3E3E3E",
        },
        gray: {
          DEFAULT: "#a6a6a6",
          100: "#F3F3F3",
          200: "#9E9E9E",
          300: "#8D8D8D",
          400: "#B0B0B0",
          500: "#4F4F4F",
          600: "#a6a6a6",
          700: "#6A6A6A",
          900: "#545454",
        },
        border: "#CACACA",
        placeholder: "#BDC1DF",
        line: "#F5F6FF",
        white: "#ffffff",
        textColor: "#0F2239",
        contentColor: "#546881",
        "text-light": "var(--website_light_font_color)",
        greynormal: "#F7F7F7",
        secprimary: "#F5EBF6",
        secgreynormal: "#FFF5EB",
        footer: "#1E1E1E",
        sub: "#8B9693",
        transparent: "transparent",
        current: "currentColor",
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        zoomInUp: {
          '0%': { opacity: '0', transform: 'scale(0.8) translateY(20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease-out forwards',
        zoomIn: 'zoomIn 0.6s ease-out forwards',
        zoomInUp: 'zoomInUp 0.6s ease-out forwards',
      },
      screens: {
        xs: "475px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1320px",
        "3xl": "1440px",
      },
      fontFamily: {
        Cairo: ["Cairo", "sans-serif"],
        URWDin: ["URWDin", "sans-serif"],
      },
      boxShadow: {
        none: "none",
        "card-shadow": "0px 7px 58px 0px #b1b1b11a",
      },
      transitionProperty: {
        "font-weight": "font-weight",
      },
      container: {
        center: true,
        screens: {
          xs: "100%",
          sm: "100%",
          md: "100%",
          lg: "992px",
          xl: "1200px",
          "2xl": "1320px",
          "3xl": "1440px",
        },
        padding: {
          DEFAULT: "1rem",
          xl: "0",
        },
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ["hover", "focus"],
    },
  },
};

export default config;
