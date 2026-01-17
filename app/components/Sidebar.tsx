"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/useUser"; // Adjust this import based on your Auth provider

export function Sidebar() {
  const pathname = usePathname();
  const { user, profile } = useUser(); // Access the profile with the SUPER_ADMIN role

  // Check if current user is the Master Owner
  const isOwner = profile?.role === 'SUPER_ADMIN';

  const NAV = [
    { href: "/dashboard", label: "Dashboard" },
    // Only show "Master Control" to the Owner
    ...(isOwner ? [
      { href: "/admin", label: "Master Control", isAdmin: true },
      { href: "/admin/tenants", label: "Manage Clients", isAdmin: true },
    ] : []),
    { href: "/pricing", label: "Pricing" },
    { href: "/demo", label: "Demo" },
    { href: "/ai-agents", label: "AI Agents" },
    { href: "/settings/profile", label: "Settings" },
    { href: "/support", label: "Support" },
  ];

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-slate-800 md:bg-slate-950">
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold tracking-wide text-white uppercase">
              FrontDesk Agents
            </div>
            <div className="text-xs text-slate-400">Command Center</div>
          </div>
          
          {/* Visual indicator for God Mode */}
          {isOwner && (
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" title="God Mode Active"></span>
          )}
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {NAV.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "block rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-slate-800 text-white font-medium"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white",
                // Special styling for Admin links
                item.isAdmin ? "border-l-2 border-emerald-500 pl-2 ml-1" : ""
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold mb-1">
          System Status
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span className={isOwner ? "text-emerald-400" : ""}>
            {isOwner ? "Master Owner Access" : "Standard License"}
          </span>
        </div>
        <div className="mt-2 text-[10px] text-slate-600 italic">
          v2.2.0 • © {new Date().getFullYear()}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
