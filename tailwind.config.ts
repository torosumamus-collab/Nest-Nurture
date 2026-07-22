import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Nest & Nurture brand palette -------------------------------
        cream: "#FFF9F5",
        "warm-white": "#FFFDFB",
        sage: {
          DEFAULT: "#A8C3A0",
          50: "#F2F6F0",
          100: "#E3ECE0",
          200: "#C9DBC3",
          300: "#A8C3A0",
          400: "#8CAE82",
          500: "#6F9464",
          600: "#587A4F",
          700: "#465F3F",
        },
        rose: {
          DEFAULT: "#D9A5A5",
          50: "#FBF3F2",
          100: "#F5E3E2",
          200: "#EACACA",
          300: "#D9A5A5",
          400: "#C68484",
          500: "#B06565",
          600: "#914E4E",
        },
        beige: {
          DEFAULT: "#F2E9E4",
          100: "#F8F3EF",
          200: "#F2E9E4",
          300: "#E6D6CC",
          400: "#D8C0B0",
        },
        brown: {
          DEFAULT: "#6B584C",
          50: "#F5F1EE",
          100: "#E3D9D2",
          300: "#A48E7F",
          500: "#6B584C",
          700: "#4A3D34",
          900: "#2E251F",
        },
        ink: "#3A322C",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 5vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 4vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.75rem, 2.6vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.375rem, 1.8vw, 1.75rem)", { lineHeight: "1.2" }],
      },
      maxWidth: {
        content: "42rem",
        site: "88rem",
      },
      boxShadow: {
        soft: "0 2px 24px -4px rgba(107, 88, 76, 0.10)",
        card: "0 1px 2px rgba(107, 88, 76, 0.06), 0 8px 24px -8px rgba(107, 88, 76, 0.12)",
        lift: "0 20px 40px -16px rgba(107, 88, 76, 0.22)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
