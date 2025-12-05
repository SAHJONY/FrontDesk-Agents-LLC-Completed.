"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/components/LanguageProvider";

type NavLink = {
  href: string;
  label: string;
};

const navLinksBase: NavLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/pricing", label: "Precios" },
  { href: "/demo", label: "Demo en vivo" },
  { href: "/industries", label: "Industrias" },
  { href: "/setup", label: "Onboarding" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/admin", label: "Admin" },
];

function NavItem({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

export default function MainNav() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();

  const navLinks = navLinksBase.map((link) => {
    if (language === "en") {
      if (link.href === "/") return { ...link, label: "Home" };
      if (link.href === "/pricing") return { ...link, label: "Pricing" };
      if (link.href === "/demo") return { ...link, label: "Live demo" };
      if (link.href === "/industries") return { ...link, label: "Industries" };
      if (link.href === "/setup") return { ...link, label: "Onboarding" };
      if (link.href === "/dashboard") return { ...link, label: "Dashboard" };
      if (link.href === "/admin") return { ...link, label: "Admin" };
    }
    return link;
  });

  return (
    <nav className="w-full bg-gray-900 border-b border-gray-800">
      <div className="mx-auto max-w-6xl px-4 flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-semibold text-white">
            FrontDesk Agents
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavItem
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={pathname === link.href}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className={`px-2 py-1 text-xs rounded border ${
              language === "en"
                ? "bg-blue-600 text-white border-blue-500"
                : "bg-gray-800 text-gray-300 border-gray-700"
            }`}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
          <button
            className={`px-2 py-1 text-xs rounded border ${
              language === "es"
                ? "bg-blue-600 text-white border-blue-500"
                : "bg-gray-800 text-gray-300 border-gray-700"
            }`}
            onClick={() => setLanguage("es")}
          >
            ES
          </button>
        </div>
      </div>
    </nav>
  );
}
