import Image from 'next/image';
import Link from 'next/link';
// Assuming you import the manifest data (named 'imageManifest' here)

const HomePageHero = () => {
  // Use the JPEG path for simplicity in the src prop
  const heroImageSrc = '/premium/hero-cinematic.jpg';
  
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* 1. Background Image using next/image with fill */}
      <div className="absolute inset-0">
        <Image
          src={heroImageSrc}
          alt="Hero cinematic — FrontDesk Agents"
          fill
          priority
          sizes="(max-width: 1600px) 100vw, 1600px"
          style={{ objectFit: 'cover' }}
          className="z-0 transition duration-1000 ease-in-out"
        />
        {/* 2. Gradient/Dark Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/50 to-transparent z-10"></div>
      </div>

      {/* 3. High-Impact Content */}
      <div className="relative z-20 text-center max-w-5xl px-6 py-12 text-white">
        <span className="text-sm font-semibold uppercase tracking-widest text-green-400 mb-3 block">
          The Future of Front Desk
        </span>
        <h1 className="text-7xl font-extrabold tracking-tight mb-6">
          Seamlessly <span className="text-green-400">Integrate</span>, Never Miss a Lead.
        </h1>
        <p className="text-2xl mb-10 font-light max-w-3xl mx-auto opacity-90">
          Our advanced AI agents handle every call, inquiry, and booking with human-level intelligence, 24/7.
        </p>
        
        {/* 4. Premium CTA Buttons */}
        <div className="flex justify-center space-x-4">
          <Link href="/demo">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-lg transition duration-300 shadow-2xl shadow-green-500/50 text-xl transform hover:scale-105">
              Book a Demo
            </button>
          </Link>
          <Link href="/pricing">
            <button className="bg-transparent border-2 border-white/50 hover:border-white hover:bg-white/10 text-white font-semibold py-4 px-10 rounded-lg transition duration-300 text-xl transform hover:scale-105">
              View Plans
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
