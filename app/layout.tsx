// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FrontDesk Agents",
  description: "AI Receptionist Command Center",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50">
        {/* NAVBAR */}
        <nav className="w-full border-b border-slate-800 bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-slate-900/40">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            
            {/* LOGO */}
            <Link href="/" className="text-lg font-semibold tracking-wide text-sky-400">
              FrontDesk Agents
            </Link>

            {/* MENU */}
            <div className="flex items-center space-x-6 text-sm font-medium">
              {/* PUBLIC PAGES */}
              <Link href="/demo" className="hover:text-sky-300">Demo</Link>
              <Link href="/industries" className="hover:text-sky-300">Industries</Link>
              <Link href="/pricing" className="hover:text-sky-300">Pricing</Link>

              {/* APP CORE */}
              <Link href="/dashboard" className="hover:text-sky-300">Dashboard</Link>
              <Link href="/dashboard/outbound" className="hover:text-sky-300">Outbound</Link>
              <Link href="/dashboard/retention" className="hover:text-sky-300">Retention</Link>

              {/* SETTINGS */}
              <Link href="/settings/profile" className="hover:text-sky-300">Settings</Link>
              <Link href="/settings/numbers" className="hover:text-sky-300">Numbers</Link>
              <Link href="/settings/scripts" className="hover:text-sky-300">Scripts</Link>
              <Link href="/settings/billing" className="hover:text-sky-300">Billing</Link>

              {/* SUPPORT */}
              <Link href="/support" className="hover:text-sky-300">Support</Link>

              {/* ADMIN (SOLO PARA TI, OWNER) */}
              <Link href="/admin/tenants" className="hover:text-sky-300">Admin</Link>
              <Link href="/admin/billing" className="hover:text-sky-300">Admin Billing</Link>

              {/* AUTH */}
              <Link href="/login" className="hover:text-sky-300">Login</Link>
            </div>

          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main className="min-h-screen w-full">{children}</main>
      </body>
    </html>
  );
}
