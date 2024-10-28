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
      },
    },
    screens: {
      xxs: "320px",
      xs: "490px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "1-5xl": "1350px",
      "2xl": "1536px",
      "3xl": "1700px",
      "4xl": "1900px",
      "5xl": "2100px",
    },
  },
  plugins: [],
};
export default config;
