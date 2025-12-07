"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/industries", label: "Industries" },
  { href: "/demo", label: "Live Demo" },
  { href: "/owner/onboarding", label: "Onboarding" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/ai-command-center", label: "AI Command Center" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-4">
      {/* Links desktop */}
      <div className="hidden md:flex items-center gap-4">
        {mainLinks.map((link) => {
          const active =
            pathname === link.href ||
            (link.href !== "/" &&
              pathname?.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={
                active
                  ? "text-sky-400 font-medium"
                  : "text-slate-300 hover:text-white transition"
              }
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Botón menú móvil simple */}
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 bg-slate-900/40 text-slate-100 md:hidden"
        aria-label="Open navigation menu"
      >
        <span aria-hidden="true">☰</span>
      </button>

      {/* Switch de idioma */}
      <LanguageSwitcher />
    </nav>
  );
}

export default MainNav;
