"use client";

import "./globals.css";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<"en" | "es">("en");

  useEffect(() => {
    const storedMode = localStorage.getItem("theme");
    const storedLang = localStorage.getItem("lang");
    if (storedMode === "dark") setDarkMode(true);
    if (storedLang === "es") setLanguage("es");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    localStorage.setItem("lang", language);
  }, [darkMode, language]);

  return (
    <html lang={language} className={inter.className}>
      <body className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
        <header className="w-full flex justify-between items-center p-4 fixed top-0 left-0 backdrop-blur-md bg-black/20 z-50">
          <h1 className="text-lg font-semibold tracking-wide">FrontDesk.Agents</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              className="px-3 py-1 rounded-lg bg-sky-500 text-white text-sm font-medium hover:bg-sky-600"
            >
              {language === "en" ? "ES" : "EN"}
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 rounded-lg bg-gray-200 text-gray-900 font-medium dark:bg-gray-700 dark:text-white hover:opacity-90"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </header>

        <main className="pt-20">{children}</main>

        <footer className="text-center py-6 text-sm opacity-80">
          © {new Date().getFullYear()} FrontDesk Agents — All rights reserved.
        </footer>
      </body>
    </html>
  );
}
