import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // THE MONOPOLY GATE: Only your specific ID can enter.
  if (user?.id !== process.env.ADMIN_OWNER_ID) {
    redirect('/404'); // Competitors just see a "Page Not Found"
  }

  return (
    <main>
      <h1>Sovereign Command Center</h1>
      {/* Dashboard Logic Here */}
    </main>
  );
}
