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
            DEFAULT:'rgb(var(--TW-primary-color)/1)',
            light: 'rgb(var(--TW-primary-color)/0.2)',
            second: 'rgb(var(--TW-sec-primary-color)/1)',
        },
        border: 'rgb(var(--TW-border-color))',
        body: 'rgb(var(--TW-body-color),1)',
         success: {
          DEFAULT: "#10b981",
          light: "#d1fae5",
        },
        danger: {
          DEFAULT: "#ef4444",
          light: "#fee2e2",
        },
        warning: {
          DEFAULT: "#f59e0b",
          light: "#fef3c7",
        },
        info: {
          DEFAULT: "#3b82f6",
          light: "#dbeafe",
        },
        green: {
          500: '#22c55e',
          600: '#16a34a',
        },

        text: "#000",
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
       "sm": "var(--TW-shadow-sm)",
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
