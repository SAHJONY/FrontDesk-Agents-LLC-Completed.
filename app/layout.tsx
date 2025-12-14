// ./app/layout.tsx (Updated)

import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// *** NEW IMPORT ***
import HeroGlow from '@/components/HeroGlow'; 
// ******************

// ... (font definition and metadata)

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* === START NEW GLOW INTEGRATION === */}
        <HeroGlow /> 
        {/* === END NEW GLOW INTEGRATION === */}
        <Navbar />
        <main className="relative z-10 min-h-[calc(100vh-100px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
