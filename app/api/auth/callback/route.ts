// Inside your Auth Callback after user creation
const { locale, region_tier } = await supabase.from('profiles').select('*').single();

const emailContent = welcomePack[locale] || welcomePack.en;

await sendEmail({
  to: user.email,
  subject: emailContent.subject,
  html: `
    <div dir="${languages.find(l => l.code === locale)?.dir || 'ltr'}">
      <h1>${emailContent.subject}</h1>
      <p>${emailContent.body}</p>
      <a href="https://frontdeskagents.com/dashboard">Access Dashboard</a>
      <p style="font-size: 10px; color: #666;">
        Regional Node: ${region_tier} Support
      </p>
    </div>
  `
});
