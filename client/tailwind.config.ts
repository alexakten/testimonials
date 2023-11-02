import type { Config } from "tailwindcss";
import forms from '@tailwindcss/forms';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
        "purple": "#6054FC",
      },
      textColor: {
        "purple": "#6054FC",
      },
      borderColor: {
        "purple": "#6054FC",
      },
    },
  },
  plugins: [
    forms,
  ],
};
export default config;
