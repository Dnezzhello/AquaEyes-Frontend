/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        // Colors extracted from your UI
        "aqua-primary": "#1F7AC4",
        "aqua-secondary": "#F8F9FA",
        "aqua-critical": "#FF3B30",
        "aqua-warning": "#FFCC00",
        "aqua-info": "#1F7AC4",
        "aqua-success": "#4CD964",
        "aqua-text": "#333333",
        "aqua-green": "#71E589", // Green text in your UI
      },
      fontFamily: {
        sans: ["Noto Sans Lao Looped", "sans-serif"],
      },
    },
  },
  plugins: [],
};
