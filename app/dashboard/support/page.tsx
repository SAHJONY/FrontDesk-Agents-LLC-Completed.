'use client';

import React from 'react';
import Image from 'next/image';
import { 
  LifeBuoy, 
  Scale, 
  MessageSquare, 
  FileText, 
  ExternalLink, 
  ArrowRight 
} from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic mb-2">Human_Assistance</h1>
          <p className="text-zinc-500 text-[10px] font-mono tracking-[0.4em] uppercase">
            Global Support & Compliance Nodes
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Support Section */}
          <section className="group">
            <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] overflow-hidden transition-all hover:border-blue-500/50 shadow-2xl">
              <div className="relative h-64 w-full">
                <Image 
                  src="/assets/premium/support-team.png" 
                  alt="FrontDesk Support Team" 
                  fill 
                  className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              </div>
              
              <div className="p-10">
                <div className="flex items-center gap-3 mb-4">
                  <LifeBuoy className="text-blue-500 w-6 h-6" />
                  <h2 className="text-2xl font-black uppercase italic tracking-tight">Technical Support</h2>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  Our global engineering team is on standby to assist with API integrations, agent tuning, and node deployment 24/7/365.
                </p>
                <button className="w-full flex items-center justify-between px-8 py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-blue-500 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.2)]">
                  Open Support Ticket
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          {/* Legal & Compliance Section */}
          <section className="group">
            <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] overflow-hidden transition-all hover:border-emerald-500/50 shadow-2xl">
              <div className="relative h-64 w-full">
                <Image 
                  src="/assets/premium/legal-team.png" 
                  alt="Legal & Compliance Team" 
                  fill 
                  className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              </div>
              
              <div className="p-10">
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="text-emerald-500 w-6 h-6" />
                  <h2 className="text-2xl font-black uppercase italic tracking-tight">Legal & Compliance</h2>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  Review our autonomous workforce guidelines, GDPR compliance protocols, and regional telephony regulations.
                </p>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-zinc-800 transition-all">
                    Privacy Policy
                    <FileText className="w-4 h-4 text-zinc-500" />
                  </button>
                  <button className="w-full flex items-center justify-between px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-zinc-800 transition-all">
                    Terms of Service
                    <ExternalLink className="w-4 h-4 text-zinc-500" />
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Footer Documentation Link */}
        <div className="mt-16 p-8 bg-zinc-950 border border-zinc-900 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-zinc-900 rounded-2xl">
              <FileText className="text-blue-500 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase italic">Developer Documentation</h3>
              <p className="text-zinc-500 text-xs">Deep dive into the FrontDesk API and SDK architecture.</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-blue-500 hover:text-white transition-colors group">
            Browse Docs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
