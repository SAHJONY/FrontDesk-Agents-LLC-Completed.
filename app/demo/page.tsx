"use client";

import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";

export default function DemoPage() {
  const hero = getPageHero("demo");

  return (
    <main className="min-h-screen w-full px-4 md:px-10 py-10">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          See FrontDesk Command Center <span className="text-sky-400">live</span>.
        </h1>
        <p className="text-slate-300 mt-4">
          In 15 minutes we’ll
