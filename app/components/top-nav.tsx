// app/components/top-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", labelEn: "Home", labelEs: "Inicio" },
  { href: "/pricing", labelEn: "Pricing", labelEs: "Precios" },
  { href: "/demo", labelEn: "Live Demo", labelEs: "Demo en vivo" },
  { href: "/industries", labelEn: "Industries", labelEs: "Industrias" },
  { href: "/support", labelEn: "Support", labelEs: "Soporte" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 gap-4">
        <Link href="/" className="font-semibold text-sky-400">
          FrontDesk Agents
        </Link>

        <nav className="hidden md:flex gap-6 text-sm">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "transition-colors " +
                  (active
                    ? "text-sky-400"
                    : "text-slate-300 hover:text-white")
                }
              >
                {/* El LanguageSwitcher decide EN/ES visualmente */}
                <span className="inline md:hidden">{link.labelEn}</span>
                <span className="hidden md:inline">{link.labelEn}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
