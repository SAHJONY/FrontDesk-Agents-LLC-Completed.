import { ReactNode } from 'react';

// Next.js 15 requires params to be a Promise
interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps) {
  // Await the params before using them
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-[#020305]" lang={locale}>
      {/* Sovereign Node Content */}
      {children}
    </div>
  );
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'es' },
    { locale: 'tr' }
  ];
}
