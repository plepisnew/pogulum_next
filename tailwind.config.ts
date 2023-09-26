import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        twitch: {
          DEFAULT: "rgb(67, 56, 202)",
          dark: "rgb(55, 48, 163)",
          light: "rgb(79, 70, 229)",
          50: colors.indigo[50],
          100: colors.indigo[100],
          200: colors.indigo[200],
          300: colors.indigo[300],
          400: colors.indigo[400],
          500: colors.indigo[500],
          600: colors.indigo[600],
          700: colors.indigo[700],
          800: colors.indigo[800],
          900: colors.indigo[900],
          950: colors.indigo[950],
        },
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: colors.indigo[100],
            foreground: colors.indigo[950],
            primary: {
              600: colors.indigo[600],
              700: colors.indigo[700],
              800: colors.indigo[800],
              900: colors.indigo[900],
              foreground: colors.indigo[100],
            },
          },
        },
        dark: {},
      },
    }),
  ],
};
export default config;
