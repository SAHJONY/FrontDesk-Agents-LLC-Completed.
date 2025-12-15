// Usamos el nuevo componente que maneja la lógica responsive
import { MobileSidebar } from '@/components/Layout/MobileSidebar'; 

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Aplicamos el fondo oscuro a todo el layout para el look premium
    <div className="flex min-h-screen bg-gradient-to-b from-[#0a1929] via-[#0f1e2e] to-[#000814]">
      
      {/* 1. Barra Lateral Inteligente (Controla su propia visibilidad) */}
      <MobileSidebar />
      
      {/* 2. Contenido Principal - Corrección de Layout y padding para móvil/escritorio */}
      {/* lg:ml-64 asegura el espacio en escritorio. pt-20 asegura que el contenido en móvil 
         no quede bajo el botón de hamburguesa. */}
      <main className="w-full p-8 lg:ml-64 pt-20 lg:pt-8">
        {children}
      </main>
      
    </div>
  );
}
