// app/admin/page.tsx
import Image from 'next/image';
import { getPageHero, getPremiumImage } from '@/lib/siteImages';

export default function AdminPage() {
  const hero = getPageHero('admin');
  const cmd = getPremiumImage('commandCenterDark');

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="relative">
        <Image src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} priority className="w-full h-56 object-cover" />
        <div className="absolute left-6 top-6 text-white">
          <h1 className="text-2xl font-bold">Owner Dashboard</h1>
          <p className="text-sm">Command center</p>
        </div>
      </div>

      <section className="mx-auto max-w-6xl p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          {/* paneles / widgets */}
          <div className="rounded-lg border p-4 bg-white">
            <h3 className="font-semibold mb-2">Overview</h3>
            {/* ... */}
          </div>
        </div>

        <aside>
          <Image src={cmd.src} alt={cmd.alt} width={cmd.width ?? 800} height={cmd.height ?? 450} className="w-full rounded-lg object-cover" />
        </aside>
      </section>
    </main>
  );
}
