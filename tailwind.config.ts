import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FCFAF6",
        cream: "#F5F0E7",
        sand: "#EAE1D2",
        stone: "#D9CDBA",
        forest: {
          DEFAULT: "#1F4032",
          deep: "#163126",
          soft: "#39624F",
        },
        sage: {
          DEFAULT: "#8FA994",
          soft: "#DCE7DC",
        },
        ink: "#2B2E2A",
        muted: "#6E7066",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      letterSpacing: {
        editorial: "0.22em",
      },
      boxShadow: {
        pedestal: "0 34px 60px -30px rgba(60, 52, 39, 0.45)",
        product: "0 40px 70px -35px rgba(50, 46, 38, 0.45)",
        card: "0 30px 60px -45px rgba(40, 55, 42, 0.45)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
