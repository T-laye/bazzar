import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          background: "#FAF3F3",
          hover: "#B04444",
          pressed: "#BA5C5C",
          DEFAULT: "#9C1515",
        },
        secondary: {
          background: "#F3F4F5",
          hover: "#444D61",
          pressed: "#152039",
          DEFAULT: "#5C6375",
        },
        neutral: {
          "primary-bg": "#FFFFFF",
          "base-bg": "#F6E8E8",
          "secondary-bg": "#EBD0D0",
          line: "#E2B9B9",
        },
        black: {
          "base-bg": "#E7E7E8",
          "light-bg": "#CED4DA",
          line: "#3F444D",
          "primary-bg": "#1B1F27",
          "secondary-bg": "#0A0D14",
        },
        success: {
          background: "#F3F9F7",
          pressed: "#19966C",
          hover: "#47AB8A",
          DEFAULT: "#5EB699",
        },
        warning: {
          background: "#FDFBF3",
          pressed: "#DBB10C",
          hover: "#E2C13C",
          DEFAULT: "#E6C955",
        },
        danger: {
          background: "#FFF2F3",
          pressed: "#FF0318",
          hover: "#FF3646",
          DEFAULT: "#FF4F5E",
        },
      },
      fontFamily: {
        manrope: "var(--font-manrope), sans-serif",
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config;
