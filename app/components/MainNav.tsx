"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./LangProvider";

type NavLink = {
  href: string;
  label: {
    en: string;
    es: string;
  };
};

const navLinksBase: NavLink[] = [
  {
    href: "/dashboard",
    label: {
      en: "Dashboard",
      es: "Panel",
    },
  },
  {
    href: "/settings/numbers",
    label: {
      en: "Phone Numbers",
      es: "Números",
    },
  },
  {
    href: "/demo",
    label: {
      en: "Live Demo",
      es: "Demo en Vivo",
    },
  },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(href + "/");
}

export default function MainNav() {
  const pathname = usePathname();
  const { lang } = useLanguage(); // <- AHORA usa lang desde el contexto

  const navLinks = navLinksBase.map((link) => {
    const label = lang === "es" ? link.label.es : link.label.en;
    return {
      ...link,
      text: label,
    };
  });

  return (
    <nav className="flex items-center gap-4">
      {navLinks.map((link) => {
        const active = isActive(pathname ?? "", link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={[
              "text-sm font-medium transition-colors",
              active
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-primary",
            ].join(" ")}
          >
            {link.text}
          </Link>
        );
      })}
    </nav>
  );
}
