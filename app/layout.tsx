// app/layout.tsx
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'FrontDesk Agents',
  description: 'AI Receptionist that books your appointments automatically.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
