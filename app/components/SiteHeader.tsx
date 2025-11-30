"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useLang } from "./LangProvider";

export default function SiteHeader() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLang();

  const nav = [
    { label: lang === "es" ? "Inicio" : "Home", href: "/" },
    { label: lang === "es" ? "Precios" : "Pricing", href: "/pricing" },
    { label: lang === "es" ? "Industrias" : "Industries", href: "/industries" },
    { label: lang === "es" ? "Configurar" : "Setup", href: "/setup" },
  ];

  return (
    <header className="w-full border-b border-slate-800 bg-slate-900/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          FrontDesk Agents
        </Link>

        <nav className="hidden sm:flex gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              className={`text-sm ${
                pathname === item.href ? "text-sky-400 font-semibold" : "text-slate-300"
              }`}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="text-sm border px-2 py-1 rounded-md"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-sm border px-2 py-1 rounded-md"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}
