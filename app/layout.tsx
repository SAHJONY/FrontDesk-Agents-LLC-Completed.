/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Root Layout: System Foundation & Global Context
 */

import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { LegalComplianceBadge } from '@/components/legal/LegalComplianceBadge';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-montserrat',
  style: ['italic'],
});

export const metadata: Metadata = {
  title: 'FrontDesk Agents // Global Revenue Workforce',
  description: 'Elite AI-powered litigation, arbitration, and revenue operations serving global markets locally.',
  keywords: ['Legal AI', 'Revenue Workforce', 'Sovereign Global Financial Hub', 'Agentic Legal'],
  authors: [{ name: 'FrontDesk Agents LLC' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className={`${inter.className} bg-black text-white antialiased selection:bg-blue-500/30`}>
        <AuthProvider>
          {/* Main Execution View */}
          <main className="relative min-h-screen">
            {children}
          </main>
          
          {/* System Status Overlay (Global) */}
          <div className="fixed bottom-6 right-6 z-50 pointer-events-none hidden md:block opacity-40 hover:opacity-100 transition-opacity">
            <div className="bg-zinc-950 border border-zinc-900 p-3 rounded-2xl flex items-center gap-4">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-zinc-500">
                 Node: PDX1-WEST // Hub Active
               </p>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
