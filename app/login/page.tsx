// app/login/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";

export default function LoginPage() {
  const hero = getPageHero("login");
  return (
    <div className="mx-auto max-w-md space-y-6 rounded-xl border border-slate-800 bg-slate-950/60 p-6">
      {hero && (
        <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl border border-slate-800">
          <Image
            src={hero.src}
            alt={hero.alt}
            width={1600}
            height={900}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}
      {hero && (
        <>
          <h1 className="text-xl font-semibold text-slate-50">
            {hero.title}
          </h1>
          <p className="text-sm text-slate-300">
            {hero.description}
          </p>
        </>
      )}

      <div className="space-y-3">
        <Link
          href="/admin"
          className="block rounded-md bg-sky-400 px-4 py-2 text-center text-sm font-semibold text-slate-950 hover:bg-sky-300"
        >
          Owner / Admin access
        </Link>
        <Link
          href="/dashboard"
          className="block rounded-md border border-slate-700 px-4 py-2 text-center text-sm font-semibold text-slate-100 hover:border-sky-400 hover:text-sky-300"
        >
          Client / Team dashboard
        </Link>
      </div>

      <p className="text-[11px] text-slate-500">
        For production, connect this screen to Supabase auth or your existing
        login provider. For now, it simply routes you to the correct console.
      </p>
    </div>
  );
}
