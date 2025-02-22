/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        techiPurple: "#4F35F3",
        techiGrey: "#65676D",
        techiBlack: "#1A1919",
        techiBlackShadeOne: "#252C32",
        techiGreyShadeOne: "#6E7C87",
        techiGreyShadeTwo: "#6F6F6F",
        techiRed: "#E60C02",
        techiStrokeGrey: "#D0D5DD",
      },
    },
  },
  plugins: [],
};
