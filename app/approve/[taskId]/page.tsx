// app/approve/[taskId]/page.tsx
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ taskId: string }>;
}

export default async function ApproveTaskPage({ params }: PageProps) {
  // Await the params in Next.js 15
  const { taskId } = await params;
  
  const supabase = createClient();

  // Fetch the task
  const { data: task, error } = await supabase
    .from('approval_tasks')
    .select('*')
    .eq('id', taskId)
    .single();

  if (error || !task) {
    redirect('/dashboard');
  }

  // Handle approval logic here
  // You can add approve/reject buttons and forms

  return (
    <div className="min-h-screen bg-[#000814] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-8">Task Approval</h1>
        
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
          <p className="text-slate-400 mb-6">{task.description}</p>
          
          <div className="flex gap-4">
            <form method="POST" action={`/api/tasks/${taskId}/approve`}>
              <button 
                type="submit"
                className="px-8 py-4 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all"
              >
                Approve
              </button>
            </form>
            
            <form method="POST" action={`/api/tasks/${taskId}/reject`}>
              <button 
                type="submit"
                className="px-8 py-4 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all"
              >
                Reject
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
