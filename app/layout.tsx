// app/layout.tsx
import React from 'react';
import Link from 'next/link';
import './globals.css'; // Your global Tailwind styles

// Components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnalyticsTracker from '@/components/AnalyticsTracker'; // New Import

// --- SEO and Structured Data Definitions ---
const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FrontDesk Agents LLC",
  "url": "https://www.frontdeskagents.com",
  "logo": "https://www.frontdeskagents.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-216-480-4413",
    "contactType": "Sales"
  }
};

const jsonLdProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "AI Agent Front Desk Solution",
    "description": "Advanced AI agents handling calls, inquiries, and bookings 24/7 for B2B enterprises.",
    "brand": {
      "@type": "Brand",
      "name": "FrontDesk Agents"
    },
    "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": "299.00", // Starting Price
        "availability": "https://schema.org/InStock"
    }
};

export const metadata = {
  title: "FrontDesk Agents | Enterprise AI for 24/7 Customer Service",
  description: "Seamlessly Integrate, Never Miss a Lead. Advanced AI agents handle every call, inquiry, and booking with human-level intelligence, 24/7.",
};

// --- Root Layout Component ---
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data (Organization) */}
        <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }} 
        />
        {/* Structured Data (Product - applies to homepage/product page) */}
         <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }} 
        />
      </head>
      
      {/* Apply cinematic dark background to the whole site body */}
      <body className="bg-gray-100 text-gray-900 min-h-screen antialiased">
        
        {/* The Navbar is fixed and persistent */}
        <Navbar />
        
        {/* Main Content Area: Pushed down by the fixed Navbar */}
        <main className="pt-16"> 
            {children}
        </main>
        
        {/* The Footer is persistent */}
        <Footer />

        {/* ANALYTICS TRACKER ADDED */}
        <AnalyticsTracker />
      </body>
    </html>
  );
}
