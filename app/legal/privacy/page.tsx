// ./app/legal/privacy/page.tsx

import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | FrontDesk Agents LLC',
};

export default function PrivacyPolicyPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[var(--color-primary)]">
          Privacy Policy
        </h1>
        <p className="text-gray-400">Effective: December 14, 2025</p>
      </header>

      <section className="space-y-6 text-gray-300 leading-relaxed">
        <p>
          FrontDesk Agents LLC ("we," "us," or "our") is committed to protecting the privacy...
        </p>
        {/* ... Rest of your content ... */}
      </section>
    </article>
  );
}
