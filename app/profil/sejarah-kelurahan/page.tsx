"use client";

import { useEffect, useState } from "react";
import { NavbarBeranda } from "@/components/custom/navbar-beranda";
import Footer from "@/components/custom/footer";
import { Reveal } from "@/components/stitch/reveal";
import {
  MapPin,
  Users,
  Home,
  Trees,
  BookOpen,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  Quote,
  ImageIcon,
  Compass,
} from "lucide-react";

interface DesaData {
  id: string;
  nama: string;
  sejarah: string;
  luasWilayah: number | null;
  jumlahPenduduk: number | null;
  jumlahKK: number | null;
  jumlahDusun: number | null;
  batasUtara: string | null;
  batasTimur: string | null;
  batasSelatan: string | null;
  batasBarat: string | null;
  fotoKepalaDesa: string | null;
}

export default function SejarahKelurahanPage() {
  const [desa, setDesa] = useState<DesaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/desa");
        if (!res.ok) throw new Error("Gagal fetch");
        const json = await res.json();
        setDesa(json);
      } catch {
        setDesa(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground dark:bg-[#111415] dark:text-[#e1e3e0]">
        <NavbarBeranda />
        <main className="pt-20 pb-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SkeletonArticle />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!desa) {
    return (
      <div className="min-h-screen bg-background text-foreground dark:bg-[#111415] dark:text-[#e1e3e0]">
        <NavbarBeranda />
        <main className="pt-20 pb-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-card p-12 text-center shadow-xl dark:bg-[#191c1d]">
              <p className="text-lg text-muted-foreground dark:text-[#b0b4b5]">
                Data kelurahan belum tersedia.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const stats = [
    {
      label: "Luas Wilayah",
      value: `${desa.luasWilayah ?? "—"} km²`,
      icon: MapPin,
    },
    {
      label: "Jumlah Penduduk",
      value: desa.jumlahPenduduk?.toLocaleString() ?? "—",
      icon: Users,
    },
    {
      label: "Kepala Keluarga",
      value: desa.jumlahKK?.toLocaleString() ?? "—",
      icon: Home,
    },
    {
      label: "Jumlah Lingkungan",
      value: `${desa.jumlahDusun ?? "—"} Lingkungan`,
      icon: Trees,
    },
  ];

  const batas = [
    { arah: "Utara", wilayah: desa.batasUtara, icon: ArrowUp, pos: "Utara" },
    { arah: "Barat", wilayah: desa.batasBarat, icon: ArrowLeft, pos: "Barat" },
    { arah: "Timur", wilayah: desa.batasTimur, icon: ArrowRight, pos: "Timur" },
    { arah: "Selatan", wilayah: desa.batasSelatan, icon: ArrowDown, pos: "Selatan" },
  ];

  const posMap: Record<string, string> = {
    Utara: "lg:col-start-2",
    Barat: "lg:col-start-1 lg:row-start-2",
    Timur: "lg:col-start-3 lg:row-start-2",
    Selatan: "lg:col-start-2 lg:row-start-3",
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-[#111415] dark:text-[#e1e3e0]">
      <NavbarBeranda />

      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-5xl space-y-14 px-4 sm:px-6 lg:px-8">
          {/* ── Header ── */}
          <Reveal>
            <header className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary dark:border-[#32735f]/40 dark:bg-[#32735f]/10 dark:text-[#32735f]">
                <BookOpen className="h-3.5 w-3.5" />
                Mengenal Lebih Dekat
              </div>
              <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl dark:text-white">
                Sejarah Kelurahan
              </h1>
              <p className="mt-3 text-base font-semibold uppercase tracking-widest text-primary dark:text-[#84bd3a]">
                Kelurahan {desa.nama}
              </p>
              <div className="mx-auto mt-6 flex items-center gap-3 text-primary dark:text-[#84bd3a]">
                <span className="h-px w-16 bg-primary/30 dark:bg-[#84bd3a]/30" />
                <span className="h-2 w-2 rotate-45 bg-primary dark:bg-[#84bd3a]" />
                <span className="h-px w-16 bg-primary/30 dark:bg-[#84bd3a]/30" />
              </div>
            </header>
          </Reveal>

          {/* ── Sejarah + Foto ── */}
          <section className="grid items-start gap-8 lg:grid-cols-5">
            <Reveal className="lg:col-span-3">
              <div className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border md:p-10 dark:bg-[#191c1d] dark:shadow-black/20 dark:ring-[#373a3b]">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-[#32735f]/20 dark:text-[#84bd3a]">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight dark:text-white">
                    Kilas Balik Perjalanan
                  </h2>
                </div>
                <div className="space-y-6 text-lg leading-relaxed text-foreground/70 dark:text-[#b0b4b5]">
                  <p className="first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-black first-letter:leading-none first-letter:text-primary dark:first-letter:text-[#84bd3a]">
                    {desa.sejarah}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-2 lg:sticky lg:top-24" delay={150}>
              {desa.fotoKepalaDesa ? (
                <figure className="group overflow-hidden rounded-2xl bg-card shadow-lg ring-1 ring-border dark:bg-[#191c1d] dark:shadow-black/30 dark:ring-[#373a3b]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={desa.fotoKepalaDesa}
                    alt={`Foto sejarah Kelurahan ${desa.nama}`}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <figcaption className="flex items-center gap-3 bg-card/90 px-5 py-4 backdrop-blur-sm dark:bg-[#191c1d]/90">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-[#32735f]/20 dark:text-[#84bd3a]">
                      <ImageIcon className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-medium text-foreground/80 dark:text-[#b0b4b5]">
                      Dokumentasi Kelurahan {desa.nama}
                    </p>
                  </figcaption>
                </figure>
              ) : (
                <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-primary/20 bg-primary/5 text-center dark:border-[#32735f]/20 dark:bg-[#32735f]/5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-[#32735f]/20 dark:text-[#84bd3a]">
                    <ImageIcon className="h-7 w-7" />
                  </div>
                  <p className="px-6 text-sm font-medium text-foreground/60 dark:text-[#b0b4b5]">
                    Foto sejarah kelurahan belum tersedia
                  </p>
                </div>
              )}
            </Reveal>
          </section>

          {/* ── Section Divider ── */}
          <Reveal>
            <div className="flex items-center gap-4 text-primary/40 dark:text-[#32735f]/60">
              <span className="h-px flex-1 bg-border dark:bg-[#373a3b]" />
              <span className="h-2 w-2 rotate-45 bg-primary/40 dark:bg-[#32735f]/60" />
              <span className="h-px flex-1 bg-border dark:bg-[#373a3b]" />
            </div>
          </Reveal>

          {/* ── Statistik ── */}
          <section>
            <Reveal>
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl dark:text-white">
                  Data Wilayah
                </h2>
                <p className="mt-2 text-sm text-muted-foreground dark:text-[#b0b4b5]">
                  Statistik umum Kelurahan {desa.nama}
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <Reveal key={stat.label} delay={i * 100}>
                    <div className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:ring-primary/30 md:p-8 dark:bg-[#191c1d] dark:shadow-black/20 dark:ring-[#373a3b] dark:hover:border-transparent dark:hover:shadow-black/40 dark:hover:ring-[#32735f]/60">
                      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-primary/5 transition-transform duration-300 group-hover:scale-150 dark:bg-[#32735f]/10" />
                      <div className="relative">
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground dark:bg-[#32735f]/20 dark:text-[#84bd3a] dark:group-hover:bg-[#84bd3a] dark:group-hover:text-[#0b2b40]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <p className="text-3xl font-black tracking-tight md:text-4xl dark:text-white">
                          {stat.value}
                        </p>
                        <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground dark:text-[#b0b4b5]">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>

          {/* ── Batas Wilayah (Kompas) ── */}
          <section>
            <Reveal>
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl dark:text-white">
                  Batas Wilayah
                </h2>
                <p className="mt-2 text-sm text-muted-foreground dark:text-[#b0b4b5]">
                  Posisi Kelurahan {desa.nama} berdasarkan arah mata angin
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="mx-auto max-w-2xl rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border md:p-10 dark:bg-[#191c1d] dark:shadow-black/20 dark:ring-[#373a3b]">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
                  {/* Center compass (hidden on mobile, shown lg) */}
                  <div className="hidden lg:col-start-2 lg:row-start-2 lg:flex lg:items-center lg:justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/5 text-primary dark:border-[#32735f]/40 dark:bg-[#32735f]/10 dark:text-[#84bd3a]">
                      <Compass className="h-7 w-7" />
                    </div>
                  </div>

                  {batas.map((b, i) => {
                    const Icon = b.icon;
                    return (
                      <Reveal key={b.arah} delay={i * 150} className={posMap[b.pos] ?? ""}>
                        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card/80 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md dark:border-[#373a3b] dark:bg-[#191c1d]/80 dark:hover:border-[#32735f]/60 dark:hover:shadow-black/30">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-[#32735f]/20 dark:text-[#84bd3a]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground dark:text-[#b0b4b5]">
                              Batas {b.arah}
                            </p>
                            <p className="mt-1 font-semibold text-foreground dark:text-white">
                              {b.wilayah || "—"}
                            </p>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </section>

          {/* ── Quote Penutup ── */}
          <Reveal>
            <blockquote className="relative overflow-hidden rounded-2xl border-l-4 border-primary bg-primary/5 px-8 py-10 md:px-14 dark:border-[#84bd3a] dark:bg-[#84bd3a]/10">
              <Quote className="absolute -right-3 -top-3 h-24 w-24 text-primary/10 dark:text-[#84bd3a]/10" />
              <div className="relative">
                <p className="text-xl font-semibold italic leading-relaxed text-foreground md:text-2xl dark:text-white">
                  &ldquo;Terwujudnya Kelurahan {desa.nama} yang maju, mandiri,
                  dan sejahtera.&rdquo;
                </p>
                <footer className="mt-5 flex items-center gap-3">
                  <span className="h-px w-10 bg-primary/40 dark:bg-[#84bd3a]/40" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary dark:text-[#84bd3a]">
                    Visi Kelurahan {desa.nama}
                  </p>
                </footer>
              </div>
            </blockquote>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function SkeletonArticle() {
  return (
    <div className="animate-pulse space-y-10">
      {/* Header skeleton */}
      <div className="mx-auto max-w-md space-y-4 text-center">
        <div className="mx-auto h-6 w-40 rounded-full bg-muted dark:bg-[#191c1d]" />
        <div className="mx-auto h-10 w-64 rounded bg-muted dark:bg-[#191c1d]" />
        <div className="mx-auto h-4 w-48 rounded bg-muted dark:bg-[#191c1d]" />
      </div>

      {/* Sejarah + foto skeleton */}
      <div className="grid items-start gap-8 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-3">
          <div className="h-44 rounded-2xl bg-muted dark:bg-[#191c1d]" />
        </div>
        <div className="lg:col-span-2">
          <div className="aspect-[4/3] rounded-2xl bg-muted dark:bg-[#191c1d]" />
        </div>
      </div>

      {/* Statistik skeleton */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-40 rounded-2xl bg-muted dark:bg-[#191c1d]" />
        ))}
      </div>
    </div>
  );
}