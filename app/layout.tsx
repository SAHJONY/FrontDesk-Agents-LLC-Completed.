import './globals.css';
import React from 'react';

export const metadata = {
  title: 'FrontDesk Agents | Global Revenue Workforce',
  description: 'Autonomous AI sales and receptionist nodes for business operations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#010204] text-slate-50 antialiased">
        <div className="relative overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
