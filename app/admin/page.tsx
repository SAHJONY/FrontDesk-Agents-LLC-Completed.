// app/admin/page.tsx
import { getPageHero } from '@/lib/siteImages';

export default function AdminPage() {
  const hero = getPageHero('admin');

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="relative">
        <picture>
          {hero.srcAvif && <source srcSet={hero.srcAvif} type="image/avif" />}
          {hero.srcWebp && <source srcSet={hero.srcWebp} type="image/webp" />}
          <img
            src={hero.src} // alias provided in lib/siteImages.ts
            alt={hero.alt}
            width={hero.width}
            height={hero.height}
            className="w-full h-56 object-cover"
            style={{ maxHeight: '40vh' }}
          />
        </picture>

        <div className="absolute left-6 top-6 text-white">
          <h1 className="text-2xl font-bold">Owner Dashboard</h1>
          <p className="text-sm">Command center</p>
        </div>
      </div>

      <section className="p-6">
        {/* ...dashboard content */}
      </section>
    </main>
  );
}
