// ./components/Layout/Sidebar.tsx (Revisión)

// ... (código anterior)

export const Sidebar = () => (
  // Mantener w-64 fixed h-full
  <nav className="w-64 fixed h-full bg-[#10213A] border-r border-gray-800 p-4 pt-10 z-20"> 
    {/* Agregamos z-20 para asegurar que esté sobre el contenido */}
    {/* ... (código de los ítems de navegación) ... */}
  </nav>
);
