// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        press: ['"Press Start 2P"', 'monospace'],
      },
      colors: {
        ps2blue: '#0033A0',
        ps2black: '#0B0B0B',
        ps2gray: '#C0C0C0',
      },
    },
  },
  darkMode: 'class',
};
