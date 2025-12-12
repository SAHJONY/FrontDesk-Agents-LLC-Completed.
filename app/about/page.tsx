// app/about/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LightBulbIcon, ShieldCheckIcon, UserGroupIcon } from '@heroicons/react/24/outline';

// Data for Team/Founders (crucial for B2B trust)
const teamMembers = [
  { name: "Dr. Evelyn Reed", title: "Chief Technology Officer (CTO)", bio: "A pioneer in real-time language synthesis and predictive AI modeling.", image: "/images/team/evelyn-reed.jpg" },
  { name: "Marcus Chen", title: "Chief Executive Officer (CEO)", bio: "20+ years of experience scaling B2B enterprise solutions and SaaS platforms.", image: "/images/team/marcus-chen.jpg" },
  { name: "Sofia Rodriguez", title: "Head of Client Solutions", bio: "Expert in complex CRM integration and customized workflow deployment.", image: "/images/team/sofia-rodriguez.jpg" },
];

export default function AboutUsPage() {
  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8">
      
      {/* 1. Cinematic Header Banner */}
      <div className="relative mb-16 h-[300px] bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
          <Image
              // NOTE: Use a professional image of a team collaborating or a corporate headquarters
              src="/images/about-team-bg.jpg" 
              alt="Team collaborating in a modern, high-tech office"
              layout="fill"
              objectFit="cover"
              quality={80}
              className="brightness-[0.35] contrast-[1.1]" 
          />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 text-center">
              <p className="text-primary-300 text-lg uppercase tracking-widest mb-2">
                Our Mission & Expertise
              </p>
              <h1 className="text-5xl font-extrabold text-white tracking-tight sm:text-6xl">
                  Built on Integrity. Driven by AI.
              </h1>
          </div>
      </div>

      {/* 2. Company Vision and Philosophy */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Section 1: Vision */}
          <div className="card-premium bg-white p-6 h-full text-center">
            <LightBulbIcon className="mx-auto h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To fully automate enterprise front-end interactions, moving the human workforce from repetitive tasks to strategic, high-value problem-solving.
            </p>
          </div>

          {/* Section 2: Integrity */}
          <div className="card-premium bg-white p-6 h-full text-center">
            <ShieldCheckIcon className="mx-auto h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Data Integrity</h3>
            <p className="text-gray-600">
              We uphold the highest standards of data security and privacy compliance, treating client data as the mission-critical asset it is.
            </p>
          </div>
          
          {/* Section 3: Culture */}
          <div className="card-premium bg-white p-6 h-full text-center">
            <UserGroupIcon className="mx-auto h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">The Technology</h3>
            <p className="text-gray-600">
              Our platform is built on proprietary LLMs specialized in dynamic real-time communication and complex task fulfillment.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Meet the Leadership Team (Crucial for Trust) */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900">
                Meet the Leadership
            </h2>
            <p className="mt-3 text-xl text-gray-600">
                The experts driving innovation and client success.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member) => (
                <div key={member.name} className="text-center">
                    <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden shadow-2xl mb-4 border-4 border-primary-100">
                        {/* Placeholder for Team Member Photos */}
                        <Image
                            src={member.image} // Ensure these images exist in your public/images/team folder
                            alt={member.name}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-sm font-medium text-primary-600">{member.title}</p>
                    <p className="mt-2 text-gray-600 text-sm">{member.bio}</p>
                </div>
            ))}
        </div>
      </div>
      
      {/* 4. Final CTA */}
      <div className="max-w-4xl mx-auto text-center mt-20">
          <h2 className="text-3xl font-extrabold text-gray-900">
              We're Ready to Be Your Strategic Partner.
          </h2>
          <p className="mt-3 text-xl text-gray-600 mb-6">
              Connect with our leadership team today to map your AI deployment.
          </p>
          <Link href="/contact-sales" className="btn-primary-premium">
              Book a Strategic Consultation
          </Link>
      </div>
    </div>
  );
}
