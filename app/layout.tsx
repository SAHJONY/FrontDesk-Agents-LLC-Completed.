import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FrontDesk Agents - Enterprise AI Reception',
  description: 'Fortune 500-level AI automation for your front desk operations. HIPAA compliant, 24/7 availability.',
  keywords: ['AI receptionist', 'HIPAA compliant', 'enterprise automation', 'front desk AI'],
  authors: [{ name: 'FrontDesk Agents LLC' }],
  openGraph: {
    title: 'FrontDesk Agents - Enterprise AI Reception',
    description: 'Fortune 500-level AI automation for your front desk operations',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
