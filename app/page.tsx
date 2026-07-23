"use client";

import { Suspense } from "react";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { StatsSection } from "@/components/landing/stats-section";
import { FeaturedSection } from "@/components/landing/featured-section";
import { BreakingNewsSection } from "@/components/landing/breaking-news-section";
import { GaleriSection } from "@/components/landing/galeri-section";
import { ScrollToTopButton } from "@/components/custom/scroll-to-top";

function BerandaContent() {
  return (
    <div className="min-h-screen text-foreground">
      <Navbar variant="public" />
      <div className="h-16" />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Breaking News / Pengumuman */}
        <section className="py-6">
          <BreakingNewsSection />
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Featured UMKM + Wisata */}
        <FeaturedSection />

        {/* Galeri Foto */}
        <GaleriSection />
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

function BerandaPageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-64 bg-foreground/10 rounded" />
        <div className="h-4 w-48 bg-foreground/10 rounded" />
      </div>
    </div>
  );
}

export default function BerandaPage() {
  return (
    <Suspense fallback={<BerandaPageFallback />}>
      <BerandaContent />
    </Suspense>
  );
}
