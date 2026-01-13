"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/pricing", label: "Pricing" },
  { href: "/demo", label: "Demo" },
  { href: "/ai-agents", label: "AI Agents" },
  { href: "/settings/profile", label: "Settings" },
  { href: "/support", label: "Support" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-slate-800 md:bg-slate-950">
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="text-sm font-semibold tracking-wide text-white">
          FrontDesk Agents
        </div>
        <div className="text-xs text-slate-400">Command Center</div>
      </div>

      <nav className="flex-1 p-3">
        {NAV.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "block rounded-md px-3 py-2 text-sm",
                active
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 text-xs text-slate-400">
        © {new Date().getFullYear()} FrontDesk Agents
      </div>
    </aside>
  );
}

export default Sidebar;
