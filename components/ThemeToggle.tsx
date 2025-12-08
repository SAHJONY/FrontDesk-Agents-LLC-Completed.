"use client";

import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="rounded-md p-1 hover:bg-gray-100"
      aria-pressed={dark}
      aria-label="Toggle theme"
    >
      {dark ? (
        <span className="text-sm">🌙</span>
      ) : (
        <span className="text-sm">☀️</span>
      )}
    </button>
  );
};

export default ThemeToggle;
