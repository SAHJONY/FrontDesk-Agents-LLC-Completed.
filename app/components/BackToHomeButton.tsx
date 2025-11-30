// app/components/ackToHome.tsx
"use client";

import Link from "next/link";

export default function AckToHome() {
  return (
    <div className="mb-4">
      <Link
        href="/"
        className="inline-flex items-center gap-1 rounded-md border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-700/60"
      >
        ← Back to homepage
      </Link>
    </div>
  );
}
