import { MobileSidebar } from '@/components/Layout/MobileSidebar'; // Importar el nuevo componente

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      
      {/* 1. Barra Lateral (Ahora es el componente inteligente) */}
      <MobileSidebar />
      
      {/* 2. Contenido Principal - Corrección de Layout */}
      {/* La corrección lg:ml-64 debe permanecer para el escritorio. */}
      {/* En móvil, el margen no se aplica, y el contenido principal ocupa el 100% de ancho. */}
      <main className="w-full p-8 lg:ml-64 pt-20 lg:pt-8"> 
        {children}
      </main>
      
    </div>
  );
}
