// ./app/(protected)/dashboard/page.tsx (FIXED LAYOUT)

import { Sidebar } from '@/components/Layout/Sidebar';
// ... (imports de íconos) ...

export default function Dashboard() {
  return (
    <div className="flex min-h-screen"> 
      {/* 1. Aseguramos que el layout use Flex y tenga altura mínima */}
      <Sidebar />
      
      {/* 2. El 'main' debe tener el margen izquierdo que empuja el contenido fuera de la Sidebar */}
      <main className="ml-64 p-8 w-full"> 
        
        <h1 className="executive-heading mb-10">
          GLOBAL COMMAND CENTER
        </h1>
        
        {/* ... (Contenido de KPIs y Gráficos) ... */}
        
      </main>
    </div>
  );
}
