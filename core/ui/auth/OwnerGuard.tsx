"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ⚠️ SUPUESTO: por ahora leemos el email de localStorage,
// luego se conecta a Supabase/Auth real.
const OWNER_EMAILS = ["sahjonyllc@gmail.com"];

export function OwnerGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const email = window.localStorage.getItem("fd-user-email");

    if (email && OWNER_EMAILS.includes(email)) {
      setAllowed(true);
    } else {
      setAllowed(false);
      router.replace("/login");
    }
  }, [router]);

  if (allowed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
        <div className="animate-pulse text-sm text-slate-400">
          Checking owner access…
        </div>
      </div>
    );
  }

  if (!allowed) return null;

  return <>{children}</>;
}
