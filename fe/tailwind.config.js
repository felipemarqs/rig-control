/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        16: "repeat(16, minmax(0, 1fr))",
      },
      backgroundImage: {
        "sonda-mar": "url(/src/assets/images/sonda_mar.png)",
        logo: "url(/src/assets/images/logo.png)",
      },
      colors: {
        primary: {
          100: "#d2e5e5",
          200: "#a4caca",
          300: "#77b0b0",
          400: "#499595",
          500: "#1c7b7b",
          600: "#166262",
          700: "#114a4a",
          800: "#0b3131",
          900: "#061919",
        },
        secondary: {
          100: "#e6f3df",
          200: "#cde7bf",
          300: "#b3dca0",
          400: "#9ad080",
          500: "#81c460",
          600: "#679d4d",
          700: "#4d763a",
          800: "#344e26",
          900: "#1a2713",
        },
        redAccent: {
          100: "#fedcdc",
          200: "#feb9b9",
          300: "#fd9696",
          400: "#fd7373",
          500: "#fc5050",
          600: "#ca4040",
          700: "#973030",
          800: "#652020",
          900: "#321010",
        },
        gray: {
          50: "#F8F9FA",
          100: "#F1F3F5",
          200: "#E9ECEF",
          300: "#DEE2E6",
          400: "#CED4DA",
          500: "#ADB5BD",
          600: "#868E96",
          700: "#495057",
          800: "#343A40",
          900: "#212529",
        },
      },
    },
  },
  plugins: [],
};
