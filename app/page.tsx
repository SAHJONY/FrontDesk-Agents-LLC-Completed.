// app/page.tsx
import { getPageHero } from '@/lib/siteImages';

export default function HomePage() {
  const hero = getPageHero('home');

  return (
    <main className="min-h-screen bg-white">
      <section className="relative">
        <picture>
          {hero.srcAvif && <source srcSet={hero.srcAvif} type="image/avif" />}
          {hero.srcWebp && <source srcSet={hero.srcWebp} type="image/webp" />}
          <img
            src={hero.srcJpg}
            alt={hero.alt}
            width={hero.width}
            height={hero.height}
            className="w-full h-[60vh] object-cover block"
            style={{ maxHeight: '80vh' }}
          />
        </picture>

        {/* Premium overlay for high-end look */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40"
          style={{ mixBlendMode: 'multiply' }}
        />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              FrontDesk Agents — AI Communications
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white/90">
              Enterprise-grade front desk automation. Turn every call into revenue with human-like AI.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <a className="px-6 py-3 bg-cyan-500 text-black font-semibold rounded-lg shadow-lg" href="/demo">
                See demo
              </a>
              <a className="px-6 py-3 border border-white/30 text-white rounded-lg" href="/pricing">
                Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl p-8">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        {/* ... */}
      </section>
    </main>
  );
}
