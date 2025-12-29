import './globals.css';
import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sovereign Global Financial Hub',
  description: 'Autonomous AI Sales & Receptionist Fleet',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} neural-grid min-h-screen`}>
        {/* The neural-grid class from globals.css applies the mesh background */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
