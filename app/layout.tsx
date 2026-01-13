import type { Metadata } from 'next';
export const dynamic = "force-dynamic";
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

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
      <body className={`${inter.className} min-h-screen bg-slate-950 text-slate-100 antialiased`}>
        <Providers>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <Topbar />
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
