"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[70vh] items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/images/Hero_Salomallori.png')`,
      }}
    >
      {/* Overlays */}
      <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />

      {/* Content */}
      <div className="relative z-10 mx-auto mt-12 flex max-w-3xl flex-col items-center px-6 text-center">
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/profil/sejarah-kelurahan"
            className="inline-flex h-12 items-center gap-2 rounded-[4px] bg-white px-8 font-body text-sm font-semibold text-[#171717] shadow-paper-sm transition-all hover:bg-gray-100"
          >
            Jelajahi Profil
          </Link>
          <Link
            href="/news"
            className="inline-flex h-12 items-center gap-2 rounded-[4px] border border-white px-8 font-body text-sm font-semibold text-white transition-all hover:bg-white/10"
          >
            Lihat Berita
          </Link>
        </div>
      </div>

      {/* Wave Shape — Elliptical Curve via border-radius */}
      <div
        className="absolute bottom-[-70px] left-[-10%] z-[2] h-[180px] w-[120%] rounded-t-[50%] bg-[hsl(var(--background))]"
        aria-hidden="true"
      />

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/70">
        <ChevronDown className="h-8 w-8" />
      </div>
    </section>
  );
}