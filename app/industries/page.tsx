// app/industries/page.tsx

import Image from 'next/image';
import Link from 'next/link';
// Importing standard icon components (assuming they are set up, e.g., Lucide or Heroicons)
// For simplicity, we'll use emojis as placeholders for now, but replace them with real icons.

// --- Data Structure for Industry Cards ---
interface IndustryData {
  key: string; // Corresponds to the image path segment
  title: string;
  description: string;
  icon: string;
}

const industries: IndustryData[] = [
  {
    key: 'construction',
    title: 'Construction & Field Services',
    description: 'Automate site coordination, rapid worker dispatch, and initial client qualification calls 24/7.',
    icon: '🏗️',
  },
  {
    key: 'healthcare',
    title: 'Healthcare Providers',
    description: 'Handle high-volume appointment scheduling, refill requests, and sensitive triage routing securely.',
    icon: '🏥',
  },
  {
    key: 'law',
    title: 'Legal & Consulting',
    description: 'Screen new client inquiries, manage consultation bookings, and route urgent legal matters immediately.',
    icon: '⚖️',
  },
  {
    key: 'logistics',
    title: 'Supply Chain & Logistics',
    description: 'Track shipments, manage delivery confirmations, and handle complex dispatch queries without human intervention.',
    icon: '📦',
  },
  {
    key: 'medical', // Assuming 'medical' is slightly different from 'healthcare' or used interchangeably
    title: 'B2B Medical Equipment',
    description: 'Qualify sales leads for specialized equipment and provide initial level technical support for service calls.',
    icon: '🩺',
  },
];

// --- Component for Individual Industry Card ---
const IndustryCard: React.FC<IndustryData> = ({ key, title, description, icon }) => {
  // Construct path based on the key from the manifest
  const imagePath = `/premium/industries/${key}.jpg`; 
  
  return (
    // Use an accessible link structure for the card
    <Link href={`/industries/${key}`} className="block"> 
      <div className="relative overflow-hidden rounded-xl shadow-2xl group transition duration-500 hover:shadow-green-500/50 transform hover:translate-y-[-4px]">
        
        {/* Image as striking background */}
        <Image
          src={imagePath}
          alt={`${title} industry background`}
          width={1600}
          height={900}
          // The image should be cropped but cover the card area
          className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
          sizes="(max-width: 1200px) 100vw, 33vw"
        />
        
        {/* Dark overlay for premium text contrast */}
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/80 transition duration-500 flex flex-col justify-end p-6">
          <div className="text-4xl mb-3">{icon}</div> {/* Placeholder Icon */}
          <h3 className="text-3xl font-bold text-white mb-2 leading-snug">
            {title}
          </h3>
          <p className="text-gray-300 text-base opacity-90">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

// --- Main Page Component (Correctly Exported) ---
// This uses the required function export structure for the Next.js App Router
export default function IndustriesPage() {
  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            AI Agents Tailored for Your Sector
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI Front Desk Agents are trained on industry-specific terminology and compliance standards to deliver expert service from day one.
          </p>
        </header>

        {/* Grid of Industry Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <IndustryCard key={industry.key} {...industry} />
          ))}
        </div>
      </div>
    </div>
  );
}
