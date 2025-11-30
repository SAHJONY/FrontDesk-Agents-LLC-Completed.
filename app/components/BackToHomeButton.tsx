// app/components/ackToHome.tsx
"use client";

import Link from "next/link";

export default function AckToHome() {
  return (
    <div className="mb-4">
      <Link
        href="/"
        className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-800"
      >
        <span>←</span>
        <span>Back to homepage</span>
      </Link>
    </div>
  );
}
