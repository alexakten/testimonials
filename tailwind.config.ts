import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Adjusted path
  ],
  theme: {
    extend: {
      screens: {
        xs: "440px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        purple: "#6054FC",
      },
      textColor: {
        purple: "#6054FC",
      },
      borderColor: {
        purple: "#6054FC",
      },
      fontSize: {
        '5xl': '2.625rem',
      },
    },
  },
  plugins: [forms],
};
export default config;
