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
      colors: {
        bluePrimary: "#0050AC",
        greenPrimary: "#3B5A1A",
        grayPrimary: "#535353",
        pinkPrimary: "#DD1155",
        yellowPrimary: "#814E12",
        redPrimary: "#A41010",
        purplePrimary: "#5E0BCC",
        orangePrimary: "#8D3A0B",
      },
      borderRadius: {
        square: "0px",
        small: "4px",
        normal: "8px",
        big: "16px",
        specific: "full",
      },
    },
  },
  plugins: [],
} satisfies Config;
