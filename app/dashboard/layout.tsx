// /app/dashboard/layout.tsx
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8" style={{ backgroundImage: "url('/images/dashboard/metrics-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-400">AI Phone OS Dashboard</h1>
        <nav className="mt-2">
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-blue-300">Metrics</a></li>
            <li><a href="#" className="hover:text-blue-300">Analytics</a></li>
            <li><a href="#" className="hover:text-blue-300">Users</a></li>
            <li><a href="#" className="hover:text-blue-300">Settings</a></li>
            <li><a href="#" className="hover:text-blue-300">Logs</a></li>
            <li><a href="#" className="hover:text-blue-300">Billing</a></li>
          </ul>
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer className="mt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} FrontDesk Agents. All rights reserved.
      </footer>
    </div>
  );
}
