/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.html",
    "./routes/**/*.js",
    "./*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
  require('@tailwindcss/line-clamp'),
],

}
