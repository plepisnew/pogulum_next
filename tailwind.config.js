import colors from "tailwindcss/colors";
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {},
      opacity: {
        15: ".15",
      },
    },
  },
  plugins: [
    nextui({
      defaultTheme: "light",
      themes: {
        light: {
          layout: {},
          colors: {
            body: {
              background: colors.indigo[100],
              foreground: colors.indigo[950],
            },
            primary: {
              DEFAULT: colors.indigo[700],
              dark: colors.indigo[800],
              foreground: colors.white,
            },
            cta: {
              light: colors.indigo[600],
              DEFAULT: colors.indigo[700],
              dark: colors.indigo[800],
              foreground: colors.white,
              "foreground-dark": colors.zinc[200],
            },
          },
        },
        dark: {
          layout: {},
          colors: {
            body: {
              background: colors.zinc[900],
              foreground: colors.white,
            },
            primary: {
              DEFAULT: colors.zinc[950],
              dark: colors.black,
              foreground: colors.white,
              boundary: colors.zinc[500],
            },
            cta: {
              light: colors.zinc[100],
              DEFAULT: colors.zinc[200],
              dark: colors.zinc[300],
              foreground: colors.black,
            },
          },
        },
      },
    }),
  ],
};
