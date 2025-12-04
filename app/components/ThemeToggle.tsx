// app/components/ThemeToggle.tsx
"use client";

import { useTheme } from "../providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-200"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
