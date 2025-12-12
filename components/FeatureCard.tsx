// components/FeatureCard.tsx (or similar file defining your info blocks)
import React from 'react';
import { ChevronRight } from 'lucide-react'; // Example Icon

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkHref: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, linkHref }) => {
  return (
    // Replaced old classes with the new `card-premium` utility 
    // and applied a subtle hover effect to feel interactive and polished.
    <a href={linkHref} className="block group">
      <div className="card-premium h-full transition duration-300 ease-in-out transform group-hover:shadow-xl group-hover:scale-[1.02]">
        
        {/* The Icon/Placeholder block. Ensuring it uses a corporate color accent. */}
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-700">
          {icon}
        </div>

        {/* Title: H2-like styling for clear hierarchy. */}
        <h3 className="mt-4 text-2xl font-bold text-gray-900">
          {title}
        </h3>

        {/* Description: Sub-text in a slightly muted color. */}
        <p className="mt-2 text-base text-gray-600">
          {description}
        </p>

        {/* Optional: Add a subtle 'Learn More' link for interactivity */}
        <div className="mt-4 text-sm font-medium text-primary-600 group-hover:text-primary-800 flex items-center">
            View Details 
            <ChevronRight className="w-4 h-4 ml-1 transition duration-300 transform group-hover:translate-x-1" />
        </div>
      </div>
    </a>
  );
};
