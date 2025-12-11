/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['Crimson Pro', 'Georgia', 'Times New Roman', 'serif'],
        body: ['Lora', 'Georgia', 'Times New Roman', 'serif'],
        code: ['Fira Code', 'JetBrains Mono', 'Consolas', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#0066ff',
          hover: '#0052cc',
          light: '#4da6ff',
        },
        surface: {
          light: '#f5f5f5',
          dark: '#161b22',
        },
      },
    },
  },
  plugins: [],
}
