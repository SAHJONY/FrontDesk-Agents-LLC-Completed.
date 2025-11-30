// app/components/ackToHome.tsx
"use client";

import Link from "next/link";

export default function AckToHome() {
  return (
    <div className="mb-4">
      <Link href="/">
        ← Back to homepage
      </Link>
    </div>
  );
}
