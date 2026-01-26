// /app/page.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-cover bg-center" 
          style={{ backgroundImage: "url('/images/ai_receptionist/landing-bg.jpg')" }}>
      
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          FrontDesk Agents AI Phone OS
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          {/* FIX: Link to www to match your vercel.json redirect */}
          <Link
            href="https://www.frontdeskagents.com/dashboard"
            className="flex place-items-center gap-2 p-8 lg:p-0 font-bold text-blue-600 hover:text-blue-500 transition-colors"
          >
            Go to Dashboard -&gt;
          </Link>
        </div>
      </div>

      <div className="relative z-10 flex place-items-center">
        <Image
          className="relative drop-shadow-2xl"
          src="/images/ai_receptionist/hero-en.jpg"
          alt="AI Receptionist Hero"
          width={800} // Increased size so it's actually visible as a Hero
          height={450}
          priority
        />
      </div>

      {/* The rest of your grid remains the same */}
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        {/* ... links ... */}
      </div>
    </main>
  );
}
