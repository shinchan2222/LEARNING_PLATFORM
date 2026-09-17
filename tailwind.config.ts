import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        seceon: {
          green: '#5A9955',
          'green-dark': '#457649',
          'green-light': '#6cb867',
          'green-glow': '#4ade80',
          navy: '#071323',
          'navy-dark': '#030a13',
          'navy-surface': '#0e1d30',
          'navy-card': '#132133',
          'navy-border': '#1e324d',
          blue: '#037fff',
          'blue-dark': '#026fe0',
        },
        careertiq: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#0B63E5',
          700: '#0952be',
          800: '#073f94',
          900: '#052e6b',
          950: '#031b3f',
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#0B63E5',
          600: '#0B63E5',
          700: '#0952be',
          800: '#073f94',
          900: '#052e6b',
          950: '#031b3f',
        },
      },
    },
  },
  plugins: [],
};
export default config;
