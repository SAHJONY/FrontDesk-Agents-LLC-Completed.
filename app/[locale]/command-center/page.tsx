import CommandCenterView from '@/components/dashboard/CommandCenterView';

/**
 * SOVEREIGN PAGE ENTRY
 * This follows the strict Next.js 15 Page signature.
 * It fetches data on the server and passes it to the Client View.
 */

// Define standard Next.js Page props
interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
  // 1. Resolve params (Next.js 15 requires awaiting params)
  const { locale } = await params;

  // 2. Fetch Initial Infrastructure Stats
  // In production, this can be a Supabase call.
  const initialStats = {
    callVolume: [
      { time: "00:00", calls: 35 },
      { time: "06:00", calls: 42 },
      { time: "12:00", calls: 88 },
      { time: "18:00", calls: 65 },
    ],
    industry: 'Executive Services',
    language: 'English',
    mrr: 0
  };

  // 3. Render the Client View
  return <CommandCenterView stats={initialStats} locale={locale} />;
}
