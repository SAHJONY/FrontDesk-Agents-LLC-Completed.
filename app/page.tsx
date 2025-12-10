// app/page.tsx
import Image from 'next/image';
import { getPageHero } from '@/lib/siteImages';

export default function HomePage() {
  const hero = getPageHero('home');

  return (
    <main className="min-h-screen bg-white">
      <section className="relative">
        <Image
          src={hero.src}
          alt={hero.alt}
          width={hero.width}
          height={hero.height}
          priority
          className="w-full h-[60vh] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white drop-shadow-lg">
            <h1 className="text-4xl font-extrabold">FrontDesk Agents — AI Communications</h1>
            <p className="mt-3 text-lg max-w-2xl">Enterprise-grade front desk automation for hospitality & service businesses.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl p-8">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        {/* ... contenido */}
      </section>
    </main>
  );
}
