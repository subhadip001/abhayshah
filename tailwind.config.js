/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#2567eb",
        secondary: "#3B82F6"
      },
      screens: {
        sm: { max: "739px" },
        md: { max: "767px" },
        lg: { max: "1023px" },
        xl: { max: "1279px" },
      },
    },
  },
  plugins: [],
};
