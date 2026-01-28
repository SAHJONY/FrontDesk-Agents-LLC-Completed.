// /app/dashboard/layout.tsx
import React from 'react';
import Link from 'next/link';
import { headers } from 'next/headers';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Retrieve the current path from the headers we set in middleware.ts
  const headerList = await headers();
  const currentPath = headerList.get('x-url') || '/dashboard';

  const navItems = [
    { name: 'Metrics', href: '/dashboard' },
    { name: 'Analytics', href: '/dashboard/analytics' },
    { name: 'Users', href: '/dashboard/users' },
    { name: 'Settings', href: '/dashboard/settings' },
    { name: 'Logs', href: '/dashboard/logs' },
    { name: 'Billing', href: '/dashboard/billing' },
  ];

  return (
    <div 
      className="min-h-screen bg-gray-900 text-white p-8 selection:bg-blue-500/30" 
      style={{ 
        backgroundImage: "linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.8)), url('/images/dashboard/metrics-bg.jpg')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <header className="mb-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-blue-400">
              AI Phone OS Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">Global Revenue & Workforce Management</p>
          </div>
          
          <nav>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navItems.map((item) => {
                const isActive = currentPath === item.href;
                return (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className={`text-sm font-medium transition-colors duration-200 ${
                        isActive 
                          ? 'text-blue-400 border-b-2 border-blue-400 pb-1' 
                          : 'text-gray-400 hover:text-blue-300'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto backdrop-blur-sm bg-gray-900/40 rounded-xl p-6 shadow-2xl border border-white/5">
        {children}
      </main>

      <footer className="mt-12 text-center text-sm text-gray-500 border-t border-white/5 pt-8">
        <p>&copy; {new Date().getFullYear()} FrontDesk Agents LLC. &bull; Secure AI Infrastructure</p>
      </footer>
    </div>
  );
}
