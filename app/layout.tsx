// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FrontDesk Agents",
  description: "AI Receptionist Command Center",
};

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/demo", label: "Demo" },
  { href: "/industries", label: "Industries" },
  { href: "/pricing", label: "Pricing" },
];

const appLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/outbound", label: "Outbound" },
  { href: "/dashboard/retention", label: "Retention" },
  { href: "/setup", label: "Onboarding" },
];

const settingsLinks = [
  { href: "/settings/profile", label: "Profile" },
  { href: "/settings/numbers", label: "Numbers" },
  { href: "/settings/scripts", label: "Scripts" },
  { href: "/settings/billing", label: "Billing" },
];

const adminLinks = [
  { href: "/admin", label: "Admin" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50">
        {/* TOP NAVBAR */}
        <nav className="w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
            {/* LOGO / BRAND */}
            <Link
              href="/"
              className="text-base font-semibold tracking-wide text-sky-400"
            >
              FrontDesk Agents
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden items-center gap-6 text-sm font-medium text-slate-200 lg:flex">
              {/* Public */}
              {mainLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-sky-300 transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              {/* App Core */}
              {appLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-sky-300 transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              {/* Settings */}
              {settingsLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-sky-300 transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              {/* Admin (Owner) */}
              {adminLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-sky-300 transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              {/* Auth */}
              <Link
                href="/login"
                className="rounded-md border border-sky-500/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-300 hover:bg-sky-500/10"
              >
                Login
              </Link>
            </div>

            {/* MOBILE MENU (sin hooks, usando <details>) */}
            <details className="lg:hidden">
              <summary className="flex cursor-pointer items-center rounded-md border border-slate-700 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200">
                Menu
                <span className="ml-1.5 text-slate-500">☰</span>
              </summary>
              <div className="mt-2 space-y-2 rounded-md border border-slate-800 bg-slate-900/95 p-3 text-sm">
                <div className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Public
                </div>
                {mainLinks.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded px-2 py-1 hover:bg-slate-800"
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}

                <div className="pt-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  App
                </div>
                {appLinks.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded px-2 py-1 hover:bg-slate-800"
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}

                <div className="pt-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Settings
                </div>
                {settingsLinks.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded px-2 py-1 hover:bg-slate-800"
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}

                <div className="pt-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Admin
                </div>
                {adminLinks.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded px-2 py-1 hover:bg-slate-800"
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}

                <div className="pt-2">
                  <Link
                    href="/login"
                    className="block rounded border border-sky-500/60 px-2 py-1 text-center text-xs font-semibold uppercase tracking-wide text-sky-300 hover:bg-sky-500/10"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </details>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main className="min-h-screen w-full">{children}</main>
      </body>
    </html>
  );
}
