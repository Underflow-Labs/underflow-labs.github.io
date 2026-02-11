import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "var(--bg-primary)",
        "bg-elevated": "var(--bg-elevated)",
        "bg-surface": "var(--bg-surface)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "accent-primary": "var(--accent-primary)",
        "accent-alt": "var(--accent-alt)",
        "accent-warn": "var(--accent-warn)",
        "accent-green": "var(--accent-green)",
        "border-base": "var(--border)",
        "border-hover": "var(--border-hover)"
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"]
      },
      boxShadow: {
        signal: "0 0 30px rgba(232, 255, 89, 0.14)"
      }
    },
  },
  plugins: [],
};

export default config;
