/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FFF8F0",
        surface: "#FFFFFF",
        primary: "#FF6B6B",
        secondary: "#4ECDC4",
        accent: "#FFE66D",
        purple: "#A78BFA",
        green: "#6BCB77",
        orange: "#FF9F43",
        text: "#2D3436",
        muted: "#B2BEC3",
      },
      fontFamily: {
        fredoka: ['"Fredoka One"', "cursive"],
        nunito: ["Nunito", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 24px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        card: "20px",
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
