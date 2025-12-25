import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  // FIX: Await the creation of the client first
  const supabase = await createClient();
  
  // Now you can access auth
  const { data: { user } } = await supabase.auth.getUser();

  // 1. THE MONOPOLY GATE
  if (user?.id !== process.env.ADMIN_OWNER_ID) {
    redirect('/');
  }

  return (
    <div>
      {/* Your Dashboard Content */}
    </div>
  );
}
