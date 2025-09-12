/** @type {import('tailwindcss').Config} */
export default {
  // THIS IS THE MOST IMPORTANT PART
  content: [
    "./index.html", // Your main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // All JS/TS/JSX/TSX files in the src folder
  ],

  theme: {
    // It's best practice to put all customisations inside 'extend'
    // This adds your styles without removing Tailwind's defaults.
    extend: {
      colors: {
        'driveever-blue': '#0052cc',
        'driveever-green': '#00a36a',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'], // Example of a custom font
      }
    },
  },
  plugins: [],
}
