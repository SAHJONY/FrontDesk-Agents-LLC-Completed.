export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#000814] text-slate-300 p-8 md:p-24 font-sans leading-relaxed">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-black italic uppercase mb-8">Privacy Policy</h1>
        <p className="mb-4 text-xs tracking-widest text-slate-500 uppercase">Last Updated: December 2025</p>
        
        <section className="mb-10">
          <h2 className="text-white text-xl font-bold mb-4">1. Information We Collect</h2>
          <p>FrontDesk Agents LLC ("we," "us," or "our") collects voice recordings, transcripts, and telephony metadata (such as phone numbers and call duration) when callers interact with our AI-powered receptionists.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-white text-xl font-bold mb-4">2. AI Processing & Third Parties</h2>
          <p>We utilize third-party providers, including <strong>Bland AI</strong> and <strong>OpenAI</strong>, to facilitate voice synthesis, speech-to-text transcription, and logic processing. By interacting with our agents, callers consent to the transmission of their voice data to these secure sub-processors.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-white text-xl font-bold mb-4">3. Call Recording Disclosure</h2>
          <p>In accordance with state and federal laws, our AI agents are programmed to disclose that calls are recorded at the inception of every interaction. Continued participation in the call constitutes consent.</p>
        </section>

        <footer className="mt-20 pt-8 border-t border-white/10">
          <a href="/" className="text-blue-400 text-sm hover:underline">← Back to Home</a>
        </footer>
      </div>
    </div>
  )
}
