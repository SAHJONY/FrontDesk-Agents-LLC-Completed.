// ./app/legal/privacy/page.tsx

import React from 'react';
import { TableOfContents } from '../_components/TableOfContents';

const tocItems = [
  { id: 'collection', title: '1. Information We Collect' },
  { id: 'usage', title: '2. How We Use Information' },
  { id: 'security', title: '3. Data Security' },
  { id: 'retention', title: '4. Ownership & Retention' },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <TableOfContents items={tocItems} />
      
      <article className="prose prose-invert max-w-none">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[var(--color-primary)]">
            Privacy Policy
          </h1>
          <p className="text-gray-400">Effective: December 14, 2025</p>
        </header>

        <div className="space-y-12 text-gray-300 leading-relaxed">
          <section id="collection">
            <h2 className="text-2xl font-bold mb-4 text-white">1. Information We Collect</h2>
            <p>We collect data to provide better services to our users...</p>
          </section>

          <section id="usage">
            <h2 className="text-2xl font-bold mb-4 text-white">2. How We Use Information</h2>
            <p>The information is used primarily to maintain the SARA AI service...</p>
          </section>

          <section id="security">
            <h2 className="text-2xl font-bold mb-4 text-white">3. Data Security</h2>
            <p>We use industry-standard encryption protocols...</p>
          </section>

          <section id="retention">
            <h2 className="text-2xl font-bold mb-4 text-white">4. Data Ownership and Retention</h2>
            <p>Clients maintain 100% ownership of their transcripts and data...</p>
          </section>
        </div>
      </article>
    </>
  );
}
