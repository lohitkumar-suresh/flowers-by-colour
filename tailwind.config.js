/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        card: '#121821',
        bg: '#0b0f14',
        accent: '#4cc9f0',
        text: '#e6eef7',
        muted: '#9fb1c3',
        chip: '#1b2431',
        chipActive: '#2e3a4a',
        error: '#ff6b6b'
      }
    }
  },
  plugins: []
}