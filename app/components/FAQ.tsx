"use client";

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How does the AI agent handle complex customer queries?",
    answer: "Our AI agents use advanced Large Language Models (LLMs) trained on your specific business data. They can understand context, sentiment, and complex multi-step requests, providing human-like responses while knowing exactly when to escalate to a human team member."
  },
  {
    question: "Is my data secure and compliant?",
    answer: "Absolutely. We employ enterprise-grade encryption and are fully SOC2 and HIPAA compliant. Your data is never used to train public models, and all interactions are logged for your audit requirements."
  },
  {
    question: "How long does the integration process take?",
    answer: "Most businesses are up and running within 24-48 hours. Our 'Zero-Config' setup allows you to simply point our AI to your existing knowledge base or website, and it begins learning immediately."
  },
  {
    question: "Can I customize the AI's personality and voice?",
    answer: "Yes. You have full control over the 'Brand Persona'. Whether you need a formal professional tone or a friendly casual vibe, you can define the exact personality that matches your brand identity."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-cyan-400 text-sm font-black uppercase tracking-[0.3em] mb-4">Knowledge Base</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-white/5 rounded-2xl overflow-hidden bg-black/40 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-bold text-white">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-cyan-400" />
                ) : (
                  <Plus className="w-5 h-5 text-slate-500" />
                )}
              </button>
              
              <div 
                className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 py-6 border-t border-white/5' : 'max-h-0'
                }`}
              >
                <p className="text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
