/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        institutional: {
          DEFAULT: '#0B2341',
          dark: '#071629',
          light: '#143865',
        },
        action: {
          DEFAULT: '#0072BB',
          hover: '#005a96',
          light: '#e1f0fa',
        },
        govbg: '#F8F9FA',
        status: {
          success: '#2E7D32',
          danger: '#C62828',
          warning: '#EF6C00',
        }
      },
      fontFamily: {
        sans: ['"Encode Sans"', 'Roboto', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
