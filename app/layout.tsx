import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '../lib/i18n/provider';
import { AutonomousProvider } from '../lib/autonomous/provider';
import { AuthProvider } from './contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FrontDesk Agents',
  description: 'AI Receptionist & Revenue Workforce Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen bg-slate-950 text-slate-100 antialiased`}>
        <AuthProvider>
          <I18nProvider>
            <AutonomousProvider>
              {children}
            </AutonomousProvider>
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
