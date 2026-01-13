// import { createClient } from '@supabase/supabase-js'; // Not used in this script
// import axios from 'axios'; // Not used in this script
// import { DateTime } from 'luxon'; // Use luxon for timezone math

// const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!); // Not used in this script

// async function _releaseTheHounds() {
//   const { data: leads } = await supabase.from('leads').select('*, business_nodes(*)').eq('status', 'ready');

//   for (const lead of leads) {
//     // 1. Calculate Local Time for the Lead
//     // Assumes business_nodes has a 'timezone' column (e.g., 'America/Chicago' or 'Europe/London')
//     const localTime = DateTime.now().setZone(lead.business_nodes.timezone);

//     // 2. Only call between 8:00 AM and 10:00 AM local time
//     if (localTime.hour >= 8 && localTime.hour < 10) {
//       console.log(`🚀 High-Urgency Window Open for ${lead.full_name} in ${lead.business_nodes.timezone}`);
      
//       await axios.post('https://api.bland.ai/v1/calls', {
//         phone_number: lead.phone_number,
//         task: lead.bland_task,
//         voice: "sara",
//         webhook: `${process.env.APP_URL}/api/webhooks/bland`
//       }, {
//         headers: { 'Authorization': process.env.BLAND_API_KEY }
//       });
      
//       await supabase.from('leads').update({ status: 'calling' }).eq('id', lead.id);
//     } else {
//       console.log(`⏳ Waiting for sunrise in ${lead.business_nodes.timezone}. Currently ${localTime.toFormat('HH:mm')}`);
//     }
//   }
// }
