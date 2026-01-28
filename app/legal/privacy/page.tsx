import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="p-12 max-w-4xl mx-auto relative z-10">
      <header className="mb-12">
        <h1 className="text-4xl font-black mb-2 italic uppercase tracking-tighter text-white">
          Privacy Protocol
        </h1>
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-500 font-bold">
          Front Desk Agents LLC // Security Clearance: Alpha
        </p>
      </header>

      <div className="titan-card prose prose-invert max-w-none text-slate-400 leading-relaxed border-t border-slate-800 pt-8">
        
        <section className="mb-10">
          <h3 className="text-white flex items-center gap-2 uppercase tracking-widest text-sm">
            <span className="h-2 w-2 bg-cyan-500"></span> Data Sovereignty
          </h3>
          <p>
            All voice data and lead information are encrypted at the edge using AES-256 protocols. 
            Front Desk Agents LLC does not store unencrypted PII (Personally Identifiable Information) 
            on shared global nodes. Your data remains siloed within your specific instance.
          </p>
        </section>

        <section className="mb-10">
          <h3 className="text-white flex items-center gap-2 uppercase tracking-widest text-sm">
            <span className="h-2 w-2 bg-cyan-500"></span> Regional Compliance
          </h3>
          <p>
            Our AI fleet autonomously adjusts its data-handling protocols based on the selected 
            Market Multiplier. This includes full alignment with **GDPR** (Western Europe), 
            **CCPA** (North America), and localized regulations for Emerging Markets.
          </p>
        </section>

        <section className="mb-10">
          <h3 className="text-white flex items-center gap-2 uppercase tracking-widest text-sm">
            <span className="h-2 w-2 bg-cyan-500"></span> Neural Retention Policy
          </h3>
          <p>
            Interaction logs are scrubbed of identifying metadata every 72 hours. Training models 
            utilize synthetic derivatives rather than raw user inputs to ensure absolute 
            anonymity across the neural network.
          </p>
        </section>

      </div>
      
      <footer className="mt-16 pt-8 border-t border-slate-900 text-[10px] text-slate-600 uppercase tracking-widest">
        End of Transmission // Revision 2026.01
      </footer>
    </div>
  );
}
