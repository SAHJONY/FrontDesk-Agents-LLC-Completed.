// app/components/MainNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/pricing", label: "Precios" },
  { href: "/demo", label: "Demo en vivo" },
  { href: "/industries", label: "Industrias" },
  { href: "/setup", label: "Onboarding" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/admin", label: "Admin" },
];

type NavItemProps = {
  href: string;
  label: string;
  isActive: boolean;
};

function NavItem({ href, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
        isActive
          ? "border-blue-600 text-blue-600"
          : "border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-300"
      }`}
    >
      {label}
    </Link>
  );
}

export default function MainNav() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="text-lg font-bold tracking-tight">
          FrontDesk Agents
        </div>
        <nav className="flex gap-2">
          {navLinks.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={pathname === link.href}
            />
          ))}
        </nav>
      </div>
    </header>
  );
}
