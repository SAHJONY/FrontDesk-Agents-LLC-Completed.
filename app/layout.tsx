// File: app/layout.tsx
import { ReactNode } from 'react';
import './globals.css'; // Ensure your Tailwind/Global styles are imported here

export const metadata = {
  title: 'FrontDesk Agents | Sovereign AI Workforce',
  description: 'Institutional-grade AI receptionists for global service dominance.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#020305] antialiased">
        {children}
      </body>
    </html>
  );
}
