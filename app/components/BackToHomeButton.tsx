// app/components/BackToHome.tsx
"use client";

import Link from "next/link";

export default function AckToHome() {
  return (
    <div>
      <Link href="/" className="underline text-sm">
        ← Back to homepage
      </Link>
    </div>
  );
