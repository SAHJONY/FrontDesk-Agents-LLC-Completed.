// After inserting lead into Supabase
const { data: lead } = await supabase.from('leads').insert({ ...analysis }).select().single();

if (analysis.quality === 'hot') {
  // Trigger Sovereign Alert
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}` },
    body: JSON.stringify({
      from: 'System <sovereign@frontdeskagents.com>',
      to: 'sahjonyllc@outlook.com',
      subject: `🔥 HOT LEAD CAPTURED: ${analysis.client_name}`,
      html: `<strong>Yield Alert:</strong> A high-quality node interaction has been synthesized.<br/>
             <strong>Intent:</strong> ${analysis.intent}<br/>
             <strong>Summary:</strong> ${analysis.summary}`
    })
  });
}
