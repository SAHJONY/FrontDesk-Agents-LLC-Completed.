// ./app/layout.tsx

'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { usePathname } from 'next/navigation'; // <-- IMPORTANT: Added import
import Layout from './components/Layout';      // <-- IMPORTANT: Added import

const inter = Inter({ subsets: ['latin'] });

// List of pages that should NOT have the sidebar/layout
const excludedPaths = [
    '/login', 
    '/signup', 
    '/forgot-password', 
    '/legal/terms', // Legal pages often need a minimalist layout
    '/legal/privacy',
    '/not-found'
    // Add any other public or error pages here
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showSidebar = !excludedPaths.includes(pathname);

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
