/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "peach" : "#A91D3A",
        "light-red" : "#C73659",
        "black" : "#151515",
        "custom-white" : "#EEEEEE"
      }
    },
  },
  plugins: [],
}

