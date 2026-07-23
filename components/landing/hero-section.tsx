"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/images/hero-bg.jpg')`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="font-display text-display-small md:text-display-medium text-white leading-tight tracking-tight">
          Selamat Datang di
        </h1>
        <p className="font-display text-display-medium md:text-display-large text-white font-semibold leading-tight tracking-tight mt-2">
          Kelurahan Salomallori
        </p>
        <p className="font-body text-body-large md:text-title-large text-white/80 mt-6 max-w-2xl mx-auto leading-relaxed">
          Kecamatan Pitumpanua, Kabupaten Wajo, Sulawesi Selatan
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/profil"
            className="inline-flex h-12 items-center gap-2 rounded-[4px] bg-white px-8 font-body text-sm font-semibold text-[#171717] transition-all hover:bg-white/90"
          >
            Jelajahi Profil
          </Link>
          <Link
            href="/news"
            className="inline-flex h-12 items-center gap-2 rounded-[4px] border border-white/30 px-8 font-body text-sm font-semibold text-white transition-all hover:bg-white/10"
          >
            Lihat Berita
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-white/60" />
      </div>
    </section>
  );
}