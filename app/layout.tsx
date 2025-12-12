// app/layout.tsx (Example Structure)

import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google'; // Import the correct font

// Initialize the Inter font (or whatever font you chose in tailwind.config.js)
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FrontDesk Agents LLC - Strategic Enterprise Solutions',
  description: 'Elevating operational efficiency through AI-powered front-desk agents.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}> 
      {/* CRITICAL: Set a global, subtle background color and text color for all pages 
        to ensure the entire body area has a clean, professional feel.
      */}
      <body className="bg-gray-50 text-gray-800 antialiased min-h-screen">
        
        {/* Assume you have a Navbar component */}
        {/* <Navbar /> */} 
        
        {/* Main Content */}
        <div className="pt-16"> 
          {children}
        </div>
        
        {/* Assume you have a Footer component */}
        {/* <Footer /> */} 

      </body>
    </html>
  );
}
