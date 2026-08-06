"use client";

import { NavbarBeranda } from "@/components/custom/navbar-beranda";
import Footer from "@/components/custom/footer";
import { Reveal } from "@/components/stitch/reveal";
import { BarChart3 } from "lucide-react";
import ChartView from "./chart-view";

interface InfografisItem {
  id: string;
  judul: string;
  tahun: number;
  dataJson: unknown;
  chartType: string;
  createdAt: string;
  updatedAt: string;
}

interface InfografisClientProps {
  items: InfografisItem[];
  error: string | null;
  loading?: boolean;
}

export default function InfografisClient({ items, error, loading = false }: InfografisClientProps) {
  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground dark:bg-[#111415] dark:text-[#e1e3e0]">
        <NavbarBeranda />
        <main className="pt-20 pb-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 rounded w-1/3 bg-foreground/10 dark:bg-[#373a3b]/50" />
              <div className="h-4 rounded w-1/4 bg-foreground/10 dark:bg-[#373a3b]/50" />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-[400px] rounded-2xl border border-border bg-card p-6 dark:border-[#373a3b] dark:bg-[#373a3b]/50"
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground dark:bg-[#111415] dark:text-[#e1e3e0]">
        <NavbarBeranda />
        <main className="pt-20 pb-16">
          <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <BarChart3 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h1 className="mb-2 text-2xl font-bold text-foreground dark:text-white">Terjadi Kesalahan</h1>
              <p className="mb-6 text-muted-foreground">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="h-10 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-[#111415] dark:text-[#e1e3e0]">
      <NavbarBeranda />

      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* ── Header ── */}
          <Reveal>
            <header className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary dark:border-[#32735f]/40 dark:bg-[#32735f]/10 dark:text-[#32735f]">
                <BarChart3 className="h-3.5 w-3.5" />
                Data & Statistik
              </div>
              <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl dark:text-white">
                Infografis Kelurahan
              </h1>
              <p className="mt-3 text-base font-semibold uppercase tracking-widest text-primary dark:text-[#84bd3a]">
                Kelurahan Salomallori
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground dark:text-[#b0b4b5]">
                Visualisasi data statistik dan informasi pembangunan Kelurahan Salomallori
              </p>
              <div className="mx-auto mt-6 flex items-center gap-3 text-primary dark:text-[#84bd3a]">
                <span className="h-px w-16 bg-primary/30 dark:bg-[#84bd3a]/30" />
                <span className="h-2 w-2 rotate-45 bg-primary dark:bg-[#84bd3a]" />
                <span className="h-px w-16 bg-primary/30 dark:bg-[#84bd3a]/30" />
              </div>
            </header>
          </Reveal>

          {items.length === 0 ? (
            <Reveal>
              <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20 text-center dark:border-[#373a3b] dark:bg-[#191c1d]">
                <BarChart3 className="mb-4 h-16 w-16 text-muted-foreground/40" />
                <h2 className="mb-2 text-xl font-bold text-muted-foreground dark:text-[#b0b4b5]">Belum Ada Data Infografis</h2>
                <p className="max-w-md text-muted-foreground dark:text-[#b0b4b5]">
                  Data infografis akan ditambahkan oleh admin kelurahan. Silakan kembali lagi nanti.
                </p>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {items.map((item, idx) => (
                <Reveal key={item.id} delay={idx * 100}>
                  <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg dark:border-[#373a3b] dark:bg-[#191c1d] dark:hover:border-[#32735f]/60 dark:hover:shadow-black/30">
                    <h2 className="mb-1 text-lg font-bold text-foreground dark:text-white">
                      {item.judul}
                    </h2>
                    <div className="mb-4 h-px w-full bg-border dark:bg-[#373a3b]" />
                    <ChartView item={item} />
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
