// ./components/ui/switch.tsx
'use client';

// Simulación de un componente Switch
export const Switch = ({ checked, onCheckedChange, ...props }) => {
  return (
    <button 
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${checked ? 'bg-cyan-600' : 'bg-gray-400'}`}
      {...props}
    >
      <span className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  );
};
