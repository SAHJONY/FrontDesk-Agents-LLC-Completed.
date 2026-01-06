import Image from "next/image";

export function HeroImage({
  src = "/assets/ai-agent-interface.jpg",
  alt = "FrontDesk Agents",
}: {
  src?: string;
  alt?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      <div className="absolute inset-0 opacity-25" />
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={900}
        className="h-56 w-full object-cover md:h-72"
        priority
      />
    </div>
  );
}
