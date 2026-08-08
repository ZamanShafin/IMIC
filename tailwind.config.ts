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
        imic: {
          navy: "#0F2C59",
          "navy-dark": "#0B2246",
          teal: "#00A896",
          "teal-hover": "#008E7F",
          blue: "#0284C7",
          gold: "#E5A93C",
          light: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",
          muted: "#64748B",
        },
      },
    },
  },
  plugins: [],
};
export default config;
