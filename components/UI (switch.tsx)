// components/ui/switch.tsx
import React from 'react';
// Asumimos que usa una prop 'checked' y 'onCheckedChange'

export const Switch = React.forwardRef(({ checked, onCheckedChange, ...props }, ref) => (
  <button 
    ref={ref} 
    role="switch" 
    aria-checked={checked} 
    onClick={() => onCheckedChange && onCheckedChange(!checked)}
    {...props}
  >
    {/* Placeholder para la apariencia del switch */}
    {checked ? 'ON' : 'OFF'} 
  </button>
));

Switch.displayName = 'Switch';
