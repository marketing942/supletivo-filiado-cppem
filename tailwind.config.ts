import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#39FF14",
          50: "#E8FFE0",
          100: "#C7FFB3",
          200: "#A0FF80",
          300: "#72FF4D",
          400: "#4EFF26",
          500: "#39FF14",
          600: "#1FD900",
          700: "#16A300",
          800: "#0F7000",
          900: "#074500",
        },
        ink: {
          950: "#05080A",
          900: "#0A0F11",
          800: "#111A1D",
          700: "#1A2529",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 40px rgba(57, 255, 20, 0.35)",
        "glow-lg": "0 0 80px rgba(57, 255, 20, 0.45)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(57, 255, 20, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(57, 255, 20, 0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
