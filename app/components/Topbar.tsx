"use client";

import { useTheme } from "next-themes";
import { LanguageSwitcher } from "./LanguageSwitcher";

export default function Topbar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-3">
      <div className="text-sm text-slate-200">
        <span className="font-semibold text-white">FrontDesk Agents</span>{" "}
        <span className="text-slate-400">— Workspace</span>
      </div>

      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex items-center justify-center rounded-md border border-slate-600 px-3 py-1 text-xs font-semibold"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
}
