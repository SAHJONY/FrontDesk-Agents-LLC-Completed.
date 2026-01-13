"use client";

import React from 'react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Operations Director',
    role: 'Hospitality Industry',
    company: 'Mid-size Hotel Chain, USA',
    image: '/images/testimonial-ceo.jpg',
    content: 'Our booking qualification improved significantly. The AI agents handle initial inquiries professionally, allowing our team to focus on high-value guests.',
    rating: 5,
  },
  {
    name: 'Managing Partner',
    role: 'Professional Services',
    company: 'Law Firm, Northeast USA',
    image: '/images/testimonial-lawyer.jpg',
    content: 'The AI handles initial client screening efficiently. It has reduced our admin workload while maintaining the professional standard our clients expect.',
    rating: 5,
  },
  {
    name: 'Practice Manager',
    role: 'Healthcare',
    company: 'Medical Practice, California',
    image: '/images/testimonial-doctor.jpg',
    content: 'Appointment scheduling is now automated and reliable. The system reduced no-shows by sending timely reminders to patients.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 bg-gradient-to-b from-black to-zinc-900">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] sm:bg-[size:50px_50px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - mobile optimized */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 px-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto px-4">
            See what our customers have to say about their experience with FrontDesk Agents.
          </p>
        </div>
        
        {/* Testimonials Grid - mobile-first responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              {/* Quote Icon - adjusted for mobile */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-cyan-500/20">
                <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              {/* Rating - touch-friendly size */}
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Content - responsive text */}
              <p className="text-sm sm:text-base text-zinc-300 mb-5 sm:mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Author - mobile optimized */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-white text-sm sm:text-base truncate">
                    {testimonial.name}
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-400 truncate">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-cyan-400 truncate">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom Stats - mobile optimized */}
        <div className="mt-10 sm:mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
          {[
            { value: '4.9/5', label: 'Average Rating' },
            { value: '1000+', label: 'Happy Customers' },
            { value: '99.9%', label: 'Customer Satisfaction' },
            { value: '24/7', label: 'Support Available' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-zinc-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
