// ./app/legal/layout.tsx

import React from 'react';
import Link from 'next/link';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[var(--color-navy-dark)] text-white selection:bg-[var(--color-primary)] selection:text-navy-dark">
      <div className="max-w-4xl mx-auto px-6 py-16 md:px-12 md:py-24">
        
        {/* Shared Navigation */}
        <nav className="mb-12 flex items-center justify-between border-b border-gray-800 pb-6">
          <Link 
            href="/" 
            className="text-sm text-[var(--color-primary)] hover:opacity-80 transition-opacity"
          >
            ← Back to Home
          </Link>
          
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/legal/privacy" className="hover:text-[var(--color-primary)]">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-[var(--color-primary)]">Terms</Link>
          </div>
        </nav>

        {/* Page Content */}
        <div className="animate-in fade-in duration-700">
          {children}
        </div>

        {/* Shared Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500 mb-2">
            © {new Date().getFullYear()} FrontDesk Agents LLC. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            SARA AI is a registered trademark of FrontDesk Agents LLC.
          </p>
        </footer>
      </div>
    </main>
  );
}
