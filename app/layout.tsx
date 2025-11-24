// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Front Desk Agents Platform',
    es: 'Plataforma Front Desk Agents',
  },
  description: {
    default: 'AI-powered reception management for modern businesses',
    es: 'Gestión de recepción impulsada por IA para empresas modernas',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Detect language preference (basic detection)
  const userLang =
    typeof navigator !== 'undefined' && navigator.language.startsWith('es')
      ? 'es'
      : 'en';

  const title =
    userLang === 'es'
      ? metadata.title.es
      : metadata.title.default;

  const description =
    userLang === 'es'
      ? metadata.description.es
      : metadata.description.default;

  return (
    <html lang={userLang}>
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
