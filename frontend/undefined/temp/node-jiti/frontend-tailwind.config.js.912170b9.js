"use strict";Object.defineProperty(exports, "__esModule", {value: true});/** @type {import('tailwindcss').Config} */
exports. default = {
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
  plugins: [
    require("@tailwindcss/typography")
  ],
}

 /* v7-b86e1abd595ec087 */