import { updateProjectResourceLimits } from '@/lib/providers/vercel-api';
import { scaleDatabasePool } from '@/lib/providers/supabase-api';

export async function initiateAutoScalar(clusterName: string, intensity: 'NORMAL' | 'CRISIS') {
  console.log(`📡 SCALING PROTOCOL: Initiating ${intensity} mode for ${clusterName}`);

  if (intensity === 'CRISIS') {
    // 1. Upgrade Vercel Edge Function concurrency - Added 2nd argument
    await updateProjectResourceLimits({ maxDuration: 300, memory: 3008 }, 'CRISIS');
    
    // 2. Expand Supabase Connection Pool - Added 2nd argument
    await scaleDatabasePool({ mode: 'transaction', size: 100 }, 'CRISIS');
  } else {
    // Standard operating parameters
    await updateProjectResourceLimits({ maxDuration: 15, memory: 1024 }, 'NORMAL');
    await scaleDatabasePool({ mode: 'session', size: 20 }, 'NORMAL');
  }
}
