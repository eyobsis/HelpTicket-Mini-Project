module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      
      colors: {
        orange: {
          400: '#fb923c',
          500: '#f97316',
        },
      }
    }
  },
  plugins: [],
}