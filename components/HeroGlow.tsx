// ./components/HeroGlow.tsx

import React from 'react';

/**
 * Creates a subtle, animated radial light glow for cinematic background effect.
 * This component should be positioned absolutely behind the main content.
 */
export default function HeroGlow() {
  return (
    // Container for the glow effect
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
      
      {/* Primary Cyan Glow (Top Left) */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] transform -translate-x-1/2 -translate-y-1/2">
        <div 
          className="w-full h-full rounded-full blur-3xl opacity-30 animate-pulse-slow" 
          style={{ 
            background: 'radial-gradient(circle, var(--color-primary), transparent 70%)',
          }}
        />
      </div>

      {/* Secondary Gold Glow (Bottom Right) */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] transform translate-x-1/2 translate-y-1/2">
        <div 
          className="w-full h-full rounded-full blur-3xl opacity-20 animate-pulse-slow-reverse" 
          style={{ 
            background: 'radial-gradient(circle, var(--color-gold), transparent 70%)',
          }}
        />
      </div>
    </div>
  );
}
