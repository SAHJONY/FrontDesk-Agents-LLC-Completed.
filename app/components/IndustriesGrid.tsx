// components/IndustriesGrid.tsx
"use client";

import Image from "next/image";
import { INDUSTRIES } from "@/data/industries";

export function IndustriesGrid() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Built for the industries that can’t miss a call.
          </h2>
          <p className="mt-3 text-sm text-neutral-500">
            FrontDesk Agents adapts to your workflows across healthcare, legal,
            real estate, home services, logistics and more.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry) => (
            <article
              key={industry.slug}
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={industry.image}
                  alt={industry.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold">{industry.name}</h3>
                <p className="mt-2 text-sm font-medium">
                  {industry.headline}
                </p>
                {industry.subheadline && (
                  <p className="mt-2 text-xs text-neutral-500">
                    {industry.subheadline}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
