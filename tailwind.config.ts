import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
        "open-sans": ["var(--font-open-sans)"],
        roboto: ["var(--font-roboto)"],
      },
      colors: {
        primary: "#22d3ee",
        secondary: "#34d399",
        tertiary: "#7426ef",
      },
    },
  },
  plugins: [],
};
export default config;
