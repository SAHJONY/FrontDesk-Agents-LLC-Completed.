// app/pricing/page.tsx
import Image from 'next/image';
import { getPageHero, getPremiumImage } from '@/lib/siteImages';

export default function PricingPage() {
  const hero = getPageHero('pricing');
  const banner = getPremiumImage('marketingBanner');

  return (
    <main className="min-h-screen bg-white">
      <header>
        <Image
          src={hero.src}
          alt={hero.alt}
          width={hero.width || 1200}
          height={hero.height || 300}
          priority
          className="w-full h-64 object-cover rounded-b-xl"
        />
      </header>
      <section className="mx-auto max-w-4xl p-6">
        <h1 className="text-3xl font-bold mb-2">Pricing</h1>
        <p className="text-gray-600 mb-6">Planes diseñados para escalar con tu negocio.</p>
        <Image
          src={banner.src}
          alt={banner.alt}
          width={banner.width || 1200}
          height={banner.height || 300}
          className="w-full rounded-lg"
        />
        {/* tarjetas de precios */}
      </section>
    </main>
  );
}
