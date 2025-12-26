import { createServerSupabase } from '@/lib/supabase/server';

export default async function ClientLayout({ children, params }) {
  const supabase = await createServerSupabase();
  const { clientId } = await params;

  // Fetch the autonomous configuration for this specific business
  const { data: config } = await supabase
    .from('client_configurations')
    .select('preferred_language, ui_direction')
    .eq('client_id', clientId)
    .single();

  return (
    // The 'dir' attribute autonomously mirrors the entire CSS flex/grid system
    <html lang={config?.preferred_language || 'en'} dir={config?.ui_direction || 'ltr'}>
      <body className="bg-[#010204] text-slate-200">
        <main className={config?.ui_direction === 'rtl' ? 'font-arabic' : 'font-sans'}>
          {children}
        </main>
      </body>
    </html>
  );
}
