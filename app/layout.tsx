import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header'; // <-- IMPORT THE NEW HEADER

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FrontDesk Agents LLC',
  description: 'AI-Powered Front Desk Agents for Seamless Operations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header /> {/* <-- ADD THE HEADER HERE */}
        {children}
        {/* You may want to add a Footer component here too! */}
      </body>
    </html>
  );
}
