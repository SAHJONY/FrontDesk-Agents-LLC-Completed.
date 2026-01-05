"use client";

import React from 'react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, Luxury Hotels Group',
    company: 'Luxury Hotels',
    image: '/images/testimonial-ceo.jpg',
    content: 'FrontDesk Agents transformed our booking process. We saw a 300% increase in qualified leads within the first month. The AI agents handle everything seamlessly.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Managing Partner',
    company: 'Chen & Associates Law',
    image: '/images/testimonial-lawyer.jpg',
    content: 'As a law firm, we needed something reliable and professional. The AI agents handle initial consultations perfectly, saving us countless hours.',
    rating: 5,
  },
  {
    name: 'Dr. Emily Rodriguez',
    role: 'Medical Director',
    company: 'HealthFirst Clinics',
    image: '/images/testimonial-doctor.jpg',
    content: 'Patient scheduling has never been easier. The system integrates perfectly with our EHR and handles appointment reminders automatically.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-black to-zinc-900">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            See what our customers have to say about their experience with FrontDesk Agents.
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative p-8 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-cyan-500/20">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Content */}
              <p className="text-zinc-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-500">
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div>
                  <div className="font-bold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-cyan-400">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
          {[
            { value: '4.9/5', label: 'Average Rating' },
            { value: '1000+', label: 'Happy Customers' },
            { value: '99.9%', label: 'Customer Satisfaction' },
            { value: '24/7', label: 'Support Available' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-cyan-400 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-zinc-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
