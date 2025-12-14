// ./app/layout.tsx

'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { usePathname } from 'next/navigation';
import Layout from './components/Layout';

const inter = Inter({ subsets: ['latin'] });

// List of pages that should NOT have the sidebar/layout
const excludedPaths = [
    '/login', 
    '/signup', 
    '/forgot-password', 
    '/legal/terms', 
    '/legal/privacy',
    '/not-found',
    '' // Add empty string to handle null/undefined pathname defaulting to ''
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  // FIX APPLIED: Safely provide an empty string if pathname is null
  const showSidebar = !excludedPaths.includes(pathname ?? ''); 

  return (
    <html lang="en">
      <body className={inter.className}>
        {showSidebar ? (
          <Layout>{children}</Layout> // Wrap internal pages with the sidebar layout
        ) : (
          children // Render excluded pages directly (full width)
        )}
      </body>
    </html>
  );
}
