/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        sidebar: "300px auto", //for sidebar layout
        "sidebar-collapsed": "64px auto", //for collapsed sidebar layout
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        "enzy-yellow": "var(--enzy-yellow)",
        "enzy-light-yellow": "var(--enzy-light-yellow)",
        "enzy-blue": "var(--enzy-blue)",
        "enzy-light-blue": "var(--enzy-light-blue)",
        "enzy-green": "var(--enzy-green)",
        "enzy-light-green": "var(--enzy-light-green)",
        "enzy-dark-green": "var(--enzy-dark-green)",
        "enzy-success": "var(--enzy-success)",
        light: "var(--light)",
        "dark-base": "var(--dark-base)",
        "dark-box": "var(--dark-box)",
        "dark-foreground": "var(--dark-foreground)",
        "dark-foreground-focus": "var(--dark-foreground-focus)",
        "form-input": "rgb(29 42 57 / var(--tw-bg-opacity))",
        "form-strokedark": "var(--primary)",
      },
      fontSize: {
        "2xs": "0.6rem",
        "3xs": "0.55rem",
        "4xs": "0.5rem",
      },
    },
  },
  plugins: [],
};
