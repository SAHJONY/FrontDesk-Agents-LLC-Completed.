// ./components/LoadingSpinner.tsx

import React from 'react';
import { CogIcon } from '@heroicons/react/24/outline';

interface LoadingSpinnerProps {
  isLoading: boolean;
  message?: string;
}

/**
 * Full-screen cinematic loading spinner for the SARA.AI platform.
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  isLoading, 
  message = 'Processing secure request...' 
}) => {
  if (!isLoading) {
    return null;
  }

  return (
    // Full-screen overlay to block user interaction
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/70 transition-opacity duration-300">
      
      {/* Cinematic Glass Card Container */}
      <div className="glass-card p-10 md:p-12 text-center max-w-sm">
        
        {/* Animated Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* The main spinning icon */}
            <CogIcon 
              className="w-12 h-12 text-[var(--color-primary)] animate-spin-slow" 
              aria-hidden="true" 
            />
            {/* Inner shimmer/effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-white/50 opacity-75 animate-ping-once" />
            </div>
          </div>
        </div>
        
        {/* Loading Text */}
        <h3 className="text-xl font-semibold text-white mb-2 gradient-text">
          SARA AI Loading
        </h3>
        
        {/* Dynamic Message */}
        <p className="text-gray-400 text-sm">{message}</p>
        
        {/* Simple Progress Bar Placeholder */}
        <div className="mt-6 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-[var(--color-primary)] w-1/2 animate-shimmer" />
        </div>
        
      </div>
    </div>
  );
};

export default LoadingSpinner;

// Note: You may need to update globals.css for custom animations
// if 'animate-spin-slow' and 'animate-ping-once' are not default Tailwind utilities.
// Here is the recommended CSS update to globals.css:

/* --- Add to ./app/globals.css (if missing) --- */
/*
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes ping-once {
  0% {
    transform: scale(0.1);
    opacity: 1;
  }
  70% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}
.animate-ping-once {
  animation: ping-once 1s ease-out;
}
*/
