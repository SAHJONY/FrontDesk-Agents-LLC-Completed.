// import axios from 'axios'; // Not used in current logic

const BLAND_API_KEY = process.env.BLAND_API_KEY;

// async function _startEmergencyBlitz(leads: any[]) {
//   for (const lead of leads) {
//     const response = await axios.post('https://api.bland.ai/v1/calls', {
//       phone_number: lead.phone_number,
//       task: "Execute Universal Emergency Dispatch script.",
//       model: "enhanced", // Best for low-latency
//       voice: "sara",
//       voice_settings: {
//         speed: 1.1, // Slightly faster for "Emergency" feel
//         stability: 0.5
//       },
//       request_data: {
//         // These variables populate your script dynamically
//         name: lead.full_name,
//         business_name: lead.business_name,
//         neighborhood: lead.neighborhood || "your area",
//         lead_id: lead.id
//       },
//       webhook: "https://your-project.supabase.co/functions/v1/bland-webhook"
//     }, {
//       headers: { 'Authorization': BLAND_API_KEY }
//     });
    
//     console.log(`📡 Call dispatched to ${lead.full_name}: ${response.data.call_id}`);
//   }
// }
