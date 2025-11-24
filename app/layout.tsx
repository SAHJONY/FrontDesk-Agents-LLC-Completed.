import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'FrontDesk Agents',
  description: 'Enterprise-grade platform deployment for FrontDesk Agents LLC',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
