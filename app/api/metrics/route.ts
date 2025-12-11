// app/api/metrics/route.ts
import { createClient } from '@supabase/supabase-js';

// Only create client when actually handling requests, not at build time
export async function GET(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return Response.json(
      { error: 'Supabase configuration missing' },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Your metrics logic here...
}

// Add this to prevent static generation
export const dynamic = 'force-dynamic';
