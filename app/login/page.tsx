// app/login/page.tsx
import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";
import LoginForm from "./LoginForm";

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
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      )}

      {hero && (
        <>
          <h1 className="text-xl font-semibold text-slate-50">{hero.title}</h1>
          <p className="text-sm text-slate-300">{hero.description}</p>
        </>
      )}

      {/* Real auth */}
      <LoginForm defaultRedirect="admin" />
    </div>
  );
}
