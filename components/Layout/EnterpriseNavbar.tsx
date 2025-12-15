import Link from 'next/link';

// Definimos la nueva estructura de navegación global
const marketingNavItems = [
    { href: '/platform', label: 'Platform' },
    { href: '/industries', label: 'Industries' },
    { href: '/compliance-security', label: 'Compliance & Security' }, // Nuevo
    { href: '/analytics', label: 'Analytics' },
    { href: '/pricing', label: 'Pricing (Enterprise)' },
    { href: '/resources', label: 'Resources' },
];

export const EnterpriseNavbar = () => {
  // Nota: El selector de idioma es un placeholder aquí.
  const LanguageSelector = () => (
    <select className="bg-transparent text-white border-none text-sm focus:ring-0">
      <option value="es">ES</option>
      <option value="en">EN</option>
    </select>
  );

  return (
    <nav className="fixed w-full z-50 bg-[#0a1929]/95 backdrop-blur-sm border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <Link href="/" className="flex-shrink-0 text-xl font-extrabold text-cyan-400 tracking-wider">
            FrontDesk Agents
          </Link>

          {/* Enlaces de Escritorio */}
          <div className="hidden md:flex md:items-center space-x-6">
            {marketingNavItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className="text-gray-300 hover:text-cyan-400 transition duration-150 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTAs y Selector de Idioma */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            {/* CTA Primario (Enterprise) */}
            <Link 
              href="/request-demo" 
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 text-sm"
            >
              Request Demo
            </Link>

            {/* CTA Secundario (Login para clientes) */}
            <Link 
              href="/app/login" 
              className="hidden lg:inline-block text-gray-300 hover:text-white border border-gray-700 py-2 px-4 rounded-lg transition duration-200 text-sm"
            >
              Client Login
            </Link>
          </div>

          {/* Menú Móvil (Placeholder, asumimos un componente separado para el Toggle) */}
          <div className="flex md:hidden">
            {/* Aquí iría el botón de hamburguesa para el menú público */}
          </div>
        </div>
      </div>
    </nav>
  );
};
