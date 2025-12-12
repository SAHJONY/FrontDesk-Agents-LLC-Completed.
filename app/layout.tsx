// app/layout.tsx

import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google'; 
// Ensure your Navbar component is imported here
import { Navbar } from '../components/Navbar'; 

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
      {/* 🌟 CRITICAL: Set the clean, light background and base text color for the entire body */}
      <body className="bg-gray-50 text-gray-800 antialiased min-h-screen">
        
        {/* The consistent dark Navbar component */}
        <Navbar /> 
        
        {/* Main Content: Adds top padding (pt-16) equal to the Navbar's height (h-16) to prevent content being hidden */}
        <div className="pt-16"> 
          {children}
        </div>
        
        {/* Add Footer here */}
        {/* <Footer /> */} 

      </body>
    </html>
  );
}
