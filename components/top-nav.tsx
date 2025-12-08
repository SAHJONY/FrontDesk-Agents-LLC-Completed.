"use client";

import React from "react";

type TopNavProps = {
  language?: string;
  onLanguageChange?: (lang: string) => void;
  theme?: "light" | "dark";
  onThemeToggle?: () => void;
};

export default function TopNav({
  language = "EN",
  onLanguageChange,
  theme = "light",
  onThemeToggle,
}: TopNavProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="px-3 py-2 text-sm rounded-md hover:bg-gray-100"
        onClick={() => onLanguageChange?.(language === "EN" ? "ES" : "EN")}
      >
        🌐 {language}
      </button>
      <button
        className="p-2 rounded-md hover:bg-gray-100"
        onClick={onThemeToggle}
        aria-label="Toggle theme"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}
