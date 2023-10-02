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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    // background - page background
    // foreground - page text color
    // primary - brand color (appears in nav). must contrast with foreground
    // cta - CTA color (high contrast with background), has background text color
    extend: {
      colors: {
        //* Light mode
        // Primary/brand color
        primary: {
          DEFAULT: colors.indigo[700],
          darker: colors.indigo[800],
          foreground: colors.white,
        },
        // Call to action color (buttons and interactions)
        cta: {
          lighter: colors.indigo[500],
          light: colors.indigo[600],
          DEFAULT: colors.indigo[700],
          dark: colors.indigo[800],
          foreground: colors.white,
        },
        // Page background
        background: colors.indigo[100],
        // Page foreground (text color)
        foreground: colors.indigo[900],
        //* Dark mode
        _primary: {
          DEFAULT: colors.zinc[900],
          darker: colors.zinc[950],
          foreground: colors.white,
        },
        // Call to action color (buttons and interactions)
        _cta: {
          lighter: colors.zinc[100],
          light: colors.zinc[200],
          DEFAULT: colors.zinc[300],
          dark: colors.zinc[400],
          foreground: colors.zinc[900],
        },
        // Page background
        _background: colors.zinc[900],
        // Page foreground (text color)
        _foreground: colors.white,
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      opacity: {
        15: ".15",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), nextui()],
};
