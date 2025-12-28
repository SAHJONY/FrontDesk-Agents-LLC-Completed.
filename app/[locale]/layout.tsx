import { ReactNode } from 'react';

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <div className="min-h-screen bg-[#020305]">
      {/* This ensures every sub-page like /en/pricing inherits the root styles */}
      {children}
    </div>
  );
}

// Optional: Generate static params for common locales to speed up build
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'tr' }];
}
