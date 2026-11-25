/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Colors resolve to the CSS tokens in src/index.css so light/dark switch in one place.
      colors: {
        bg: "var(--bg)",
        fg: "var(--text)",
        muted: "var(--text-muted)",
        line: "var(--border)",
        surface: "var(--surface)",
        "surface-solid": "var(--surface-solid)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
      },
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "Apple SD Gothic Neo",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      maxWidth: {
        page: "880px",
      },
    },
  },
  plugins: [],
};
