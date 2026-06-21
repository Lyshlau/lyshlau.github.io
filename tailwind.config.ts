import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F6F3EE",
        sage: "#A8B09A",
        olive: "#69715D",
        sand: "#D8C5AF",
        charcoal: "#393934",
        success: "#B8C6A4",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      letterSpacing: {
        editorial: "0.18em",
      },
      boxShadow: {
        soft: "0 8px 40px rgba(57, 57, 52, 0.04)",
        card: "0 2px 20px rgba(57, 57, 52, 0.03)",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
