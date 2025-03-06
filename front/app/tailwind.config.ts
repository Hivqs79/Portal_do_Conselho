import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {},
      borderRadius: {
        square: "0px",
        small: "4px",
        normal: "8px",
        big: "16px",
        specific: "full",
      },
      screens: {
        extraSmall: "375px",
        small: "450px",
        big: "1079px"
      },
    },
  },
  plugins: [],
} satisfies Config;
