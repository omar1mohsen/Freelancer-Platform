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
          primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        green: {
          500: '#22c55e',
          600: '#16a34a',
        },

        text: "#848484",
        platinum: "#E7E7E7",
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
