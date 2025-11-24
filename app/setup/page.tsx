import Image from "next/image";

export default function SetupPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <Image
        src="/images/setup-bg.jpg"
        alt="Setup background"
        fill
        className="object-cover opacity-20"
        priority
      />
      <div className="relative z-10 card max-w-lg w-full text-center">
        <h2 className="text-3xl font-bold mb-2">Set Up Your AI Receptionist</h2>
        <p className="text-gray-400 mb-6">
          Configure an AI-powered receptionist for your online business.
        </p>
        <form className="flex flex-col space-y-4">
          <input className="p-3 rounded bg-[#0b1220] border border-gray-700" placeholder="Business Name" />
          <input className="p-3 rounded bg-[#0b1220] border border-gray-700" placeholder="Website" />
          <input className="p-3 rounded bg-[#0b1220] border border-gray-700" placeholder="Receptionist Name" />
          <input className="p-3 rounded bg-[#0b1220] border border-gray-700" placeholder="Main Purpose" />
          <button className="bg-cyan-400 text-black font-semibold py-3 rounded hover:bg-cyan-300 transition">
            Continue
          </button>
        </form>
      </div>
    </main>
  );
}
