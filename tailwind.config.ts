/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./shared/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  safelist: [
    "fill-GREEN",
    "fill-ORANGE",
    "fill-DARK",
    "fill-DARK_BROWN",
    "fill-LIGHT_BROWN",
    "fill-LIGHT",
  ],
  prefix: "",
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
        DARK: "#3c3b3c",
        LIGHT: "#ffffff",
        BEIGE: "#ddb867",
        SWEET: "#ffe7dd",
        DARK_BROWN: "#5b492f",
        LIGHT_BROWN: "#ac8561",
        ORANGE: "#f3bd1d",
        GREEN: "#568d2b",
        CARAMEL: "#B26F51",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
