"use client";

import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Operations Manager, TechFlow",
    content: "FrontDesk Agents has completely transformed how we handle after-hours support. Their AI agents are indistinguishable from human staff and have reduced our response times by 90%.",
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    role: "CEO, Urban Stay Rentals",
    content: "The ROI was immediate. We saved over $4,000 in our first month while actually increasing our guest satisfaction scores. The integration was seamless.",
    avatar: "MC"
  },
  {
    name: "Elena Rodriguez",
    role: "Director of Patient Experience, HealthFirst",
    content: "Security and compliance were our top priorities. FrontDesk Agents delivered a solution that is both HIPAA-compliant and incredibly empathetic to our patients.",
    avatar: "ER"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-cyan-400 text-sm font-black uppercase tracking-[0.3em] mb-4">Social Proof</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase">Trusted by Industry Leaders</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-slate-900/50 border border-white/10 p-8 rounded-3xl relative group hover:border-cyan-500/30 transition-all duration-500">
              <Quote className="absolute top-6 right-8 w-12 h-12 text-white/5 group-hover:text-cyan-500/10 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-cyan-500 text-cyan-500" />
                ))}
              </div>

              <p className="text-slate-300 mb-8 italic leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-black font-black">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-bold">{testimonial.name}</div>
                  <div className="text-cyan-400 text-[10px] font-black uppercase tracking-widest">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
