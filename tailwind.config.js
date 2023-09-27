import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Primary/CTA color
        "primary": colors.indigo[700],
        // Slightly darker shade for gradient/transition
        "primary-darker": colors.indigo[800],
        // Foreground (text color) on primary background
        "secondary": colors.white,
        // Page background
        "background": colors.indigo[100],
        // Page foreground (text color)
        "foreground": colors.indigo[900],
        // Same for dark mode
        "_primary": colors.zinc[900],
        "_primary-darker": colors.zinc[950],
        "_secondary": colors.white,
        "_background": colors.zinc[700],
        "_foreground": colors.white
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
    },
  },
  plugins: [require("tailwindcss-animate")],
}