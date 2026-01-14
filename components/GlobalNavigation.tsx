"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import { 
  LayoutDashboard, Users, CreditCard, Shield, FileCode, 
  Settings, Home, DollarSign, Info, PlayCircle, 
  Lock, HelpCircle, Menu, X, ChevronDown, Globe,
  BarChart3, PhoneCall, UserPlus, FileText, Settings2
} from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";

const OWNER_EMAIL = process.env.NEXT_PUBLIC_OWNER_EMAIL;

export default function GlobalNavigation() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isOwner = useMemo(() => {
    if (!user) return false;
    return user.email === OWNER_EMAIL || user.role === 'owner';
  }, [user]);

  const navLinks = useMemo(() => {
    const links = [
      { name: 'Home', href: '/', icon: Home, category: 'public' },
      { name: 'Pricing', href: '/pricing', icon: DollarSign, category: 'public' },
      { name: 'Industries', href: '/industries', icon: Globe, category: 'public' },
      { name: 'Demo', href: '/demo', icon: PlayCircle, category: 'public' },
      { name: 'AI Agents', href: '/ai-agents', icon: Users, category: 'public' },
      
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, category: 'app' },
      { name: 'Outbound', href: '/dashboard/outbound', icon: PhoneCall, category: 'app' },
      { name: 'Retention', href: '/dashboard/retention', icon: BarChart3, category: 'app' },
      
      { name: 'Setup', href: '/setup', icon: Settings2, category: 'app' },
      { name: 'Support', href: '/support', icon: HelpCircle, category: 'app' },
    ];

    if (isOwner) {
      links.push(
        { name: 'Owner Console', href: '/owner', icon: Shield, category: 'owner' },
        { name: 'Onboarding', href: '/owner/onboarding', icon: UserPlus, category: 'owner' },
        { name: 'Payments', href: '/owner/payments', icon: CreditCard, category: 'owner' },
        { name: 'Admin', href: '/admin', icon: Lock, category: 'owner' },
        { name: 'Tenants', href: '/admin/tenants', icon: Users, category: 'owner' },
        { name: 'System Billing', href: '/admin/billing', icon: DollarSign, category: 'owner' }
      );
    }

    links.push(
      { name: 'Profile', href: '/settings/profile', icon: Users, category: 'settings' },
      { name: 'Billing', href: '/settings/billing', icon: CreditCard, category: 'settings' },
      { name: 'Numbers', href: '/settings/numbers', icon: PhoneCall, category: 'settings' },
      { name: 'Scripts', href: '/settings/scripts', icon: FileCode, category: 'settings' },
      { name: 'Privacy', href: '/legal/privacy', icon: FileText, category: 'legal' },
      { name: 'Terms', href: '/legal/terms', icon: FileText, category: 'legal' }
    );

    return links;
  }, [isOwner]);

  const groupedLinks = useMemo(() => {
    return {
      public: navLinks.filter(l => l.category === 'public'),
      app: navLinks.filter(l => l.category === 'app'),
      owner: navLinks.filter(l => l.category === 'owner'),
      settings: navLinks.filter(l => l.category === 'settings'),
      legal: navLinks.filter(l => l.category === 'legal'),
    };
  }, [navLinks]);

  return (
    <>
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="flex h-full items-center justify-between px-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500 font-bold text-slate-950">
              FD
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              FrontDesk Agents
            </span>
          </Link>

          {/* Desktop Top Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {groupedLinks.public.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-sky-400 ${
                  pathname === link.href ? "text-sky-400" : "text-slate-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/login"
              className="rounded-full bg-white/5 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Login
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-slate-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Sidebar Navigation (Desktop) */}
      <aside className="fixed left-0 top-16 bottom-0 z-40 hidden w-64 border-r border-white/10 bg-slate-950 lg:block overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-8">
          {/* App Section */}
          <section>
            <h3 className="mb-4 px-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Application
            </h3>
            <div className="space-y-1">
              {groupedLinks.app.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:bg-white/5 ${
                    pathname === link.href ? "bg-sky-500/10 text-sky-400" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <link.icon size={18} />
                  {link.name}
                </Link>
              ))}
            </div>
          </section>

          {/* Owner Section (God Mode) */}
          {isOwner && (
            <section>
              <h3 className="mb-4 px-4 text-xs font-semibold uppercase tracking-widest text-amber-500/80">
                Owner God Mode
              </h3>
              <div className="space-y-1">
                {groupedLinks.owner.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:bg-amber-500/5 ${
                      pathname === link.href ? "bg-amber-500/10 text-amber-400" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <link.icon size={18} />
                    {link.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Settings Section */}
          <section>
            <h3 className="mb-4 px-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Settings
            </h3>
            <div className="space-y-1">
              {groupedLinks.settings.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:bg-white/5 ${
                    pathname === link.href ? "bg-sky-500/10 text-sky-400" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <link.icon size={18} />
                  {link.name}
                </Link>
              ))}
            </div>
          </section>

          {/* Legal Section */}
          <section>
            <h3 className="mb-4 px-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Legal
            </h3>
            <div className="space-y-1">
              {groupedLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:bg-white/5 ${
                    pathname === link.href ? "bg-sky-500/10 text-sky-400" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <link.icon size={18} />
                  {link.name}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-950 overflow-y-auto p-6 pt-20">
          <button
            className="absolute top-4 right-4 p-2 text-slate-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
          
          <div className="space-y-8">
            {Object.entries(groupedLinks).map(([key, links]) => (
              links.length > 0 && (
                <section key={key}>
                  <h3 className={`mb-4 text-xs font-semibold uppercase tracking-widest ${
                    key === 'owner' ? 'text-amber-500' : 'text-slate-500'
                  }`}>
                    {key}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                          pathname === link.href 
                            ? (key === 'owner' ? "bg-amber-500/10 text-amber-400" : "bg-sky-500/10 text-sky-400")
                            : "bg-white/5 text-slate-300"
                        }`}
                      >
                        <link.icon size={18} />
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </section>
              )
            ))}
          </div>
        </div>
      )}
    </>
  );
}
