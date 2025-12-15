import { Sidebar } from '@/components/Layout/Sidebar';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      
      {/* 1. Barra Lateral */}
      <Sidebar />
      
      {/* 2. Contenido Principal - Corrección de Layout */}
      {/* lg:ml-64 asegura que el contenido empiece después de la barra lateral en pantallas grandes */}
      <main className="w-full p-8 lg:ml-64">
        {children}
      </main>
      
    </div>
  );
}
