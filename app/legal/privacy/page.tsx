import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="p-12 max-w-4xl mx-auto relative z-10">
      <h1 className="text-4xl font-black mb-8 italic uppercase tracking-tighter">Privacy Protocol</h1>
      <div className="titan-card prose prose-invert max-w-none text-slate-400 leading-relaxed">
        <h3 className="text-white">Data Sovereignty</h3>
        <p>All voice data and lead information are encrypted at the edge. Front Desk Agents LLC does not store unencrypted PII (Personally Identifiable Information) on shared global nodes.</p>
        
        <h3 className="text-white mt-8">Regional Compliance</h3>
        <p>Our AI fleet autonomously adjusts its data-handling protocols based on the selected Market Multiplier (GDPR for Western, local regulations for Emerging).</p>
      </div>
    </div>
  );
}
