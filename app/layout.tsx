import type { Metadata } from 'next';
export const dynamic = "force-dynamic";
import { Inter } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '../lib/i18n/provider';
import { AutonomousProvider } from '../lib/autonomous/provider';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import { LanguageProvider } from '../src/contexts/LanguageContext';
import GlobalNavigation from '../components/GlobalNavigation';

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
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <I18nProvider>
                <AutonomousProvider>
                  <div className="flex min-h-screen flex-col">
                    <GlobalNavigation />
                    <div className="flex flex-1 pt-16 lg:pl-64">
                      <main className="flex-1 p-4 lg:p-8">
                        {children}
                      </main>
                    </div>
                  </div>
                </AutonomousProvider>
              </I18nProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
