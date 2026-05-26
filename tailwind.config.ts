import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B1F3A",
        corporate: "#0F4C81",
        skybrand: "#25B7E8",
        ink: "#13233A"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(11, 31, 58, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
