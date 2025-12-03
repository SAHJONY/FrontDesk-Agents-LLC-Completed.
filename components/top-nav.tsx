// app/components/top-nav.tsx
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "Inicio" },
  { href: "/ai-agents", label: "AI Agents" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/admin", label: "Owner Center" },
  { href: "/setup", label: "Setup" },
  { href: "/demo", label: "Demo" },
  { href: "/pricing", label: "Precios y planes" },
];

export default function TopNav() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-slate-950">
            FD
          </span>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-sky-400">
              FrontDesk Agents
            </p>
            <p className="text-[11px] text-slate-400">
              AI Receptionist Command Center
            </p>
          </div>
        </Link>

        {/* Main nav */}
        <nav className="hidden items-center gap-4 text-sm text-slate-200 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-sky-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
