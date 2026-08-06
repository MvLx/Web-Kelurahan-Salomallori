"use client";

import { useEffect, useState } from "react";
import { NavbarBeranda } from "@/components/custom/navbar-beranda";
import Footer from "@/components/custom/footer";
import { Reveal } from "@/components/stitch/reveal";
import { Users, ChevronRight, UserRound } from "lucide-react";

interface Perangkat {
  id: string;
  nama: string;
  jabatan: string;
  foto: string | null;
  urutan: number;
}

export default function PejabatKelurahanPage() {
  const [items, setItems] = useState<Perangkat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/perangkat-desa");
        if (!res.ok) throw new Error("Gagal fetch");
        const json = await res.json();
        setItems(json ?? []);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-[#111415] dark:text-[#e1e3e0]">
      <NavbarBeranda />

      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-5xl space-y-14 px-4 sm:px-6 lg:px-8">
          {/* ── Header ── */}
          <Reveal>
            <header className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary dark:border-[#32735f]/40 dark:bg-[#32735f]/10 dark:text-[#32735f]">
                <Users className="h-3.5 w-3.5" />
                Profil Kelurahan
              </div>
              <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl dark:text-white">
                Perangkat Kelurahan
              </h1>
              <p className="mt-3 text-base font-semibold uppercase tracking-widest text-primary dark:text-[#84bd3a]">
                Kelurahan Salomallori
              </p>
              <div className="mx-auto mt-6 flex items-center gap-3 text-primary dark:text-[#84bd3a]">
                <span className="h-px w-16 bg-primary/30 dark:bg-[#84bd3a]/30" />
                <span className="h-2 w-2 rotate-45 bg-primary dark:bg-[#84bd3a]" />
                <span className="h-px w-16 bg-primary/30 dark:bg-[#84bd3a]/30" />
              </div>
            </header>
          </Reveal>

          <article className="rounded-2xl bg-card p-8 shadow-xl md:p-12 dark:bg-[#191c1d] dark:shadow-black/20 dark:ring-1 dark:ring-[#373a3b]">
            <Reveal>
              <p className="mb-10 text-lg leading-relaxed text-foreground/70 dark:text-[#b0b4b5]">
                Berikut adalah daftar perangkat yang bertugas di Kantor Kelurahan
                Salomallori, Kecamatan Dua Pitue, Kabupaten Sidenreng Rappang.
              </p>
            </Reveal>

            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 animate-pulse rounded-xl bg-muted dark:bg-[#373a3b]/50"
                  />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-12 text-center dark:border-[#373a3b]">
                <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground dark:text-[#b0b4b5]" />
                <p className="text-lg text-muted-foreground dark:text-[#b0b4b5]">
                  Data perangkat kelurahan belum tersedia.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {items.map((p, idx) => (
                  <Reveal key={p.id} delay={idx * 100}>
                    <div className="group flex items-center gap-5 rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:scale-[1.01] dark:border-[#373a3b] dark:bg-[#191c1d] dark:hover:border-[#32735f]/60 dark:hover:shadow-black/30">
                      {/* Avatar / Foto */}
                      {p.foto ? (
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-primary/10 ring-2 ring-primary/20 dark:ring-[#32735f]/40">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.foto}
                            alt={`Foto ${p.nama}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary dark:bg-[#32735f]/20 dark:text-[#84bd3a]">
                          {p.nama.charAt(0).toUpperCase()}
                        </div>
                      )}

                      {/* Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold dark:text-white">
                          {p.nama}
                        </h3>
                        <p className="text-sm text-muted-foreground dark:text-[#b0b4b5]">
                          {p.jabatan}
                        </p>
                      </div>

                      {/* Urutan */}
                      <div className="hidden shrink-0 items-center gap-2 text-sm text-muted-foreground sm:flex dark:text-[#b0b4b5]">
                        <span className="rounded-full bg-muted px-3 py-1 text-xs dark:bg-[#373a3b] dark:text-[#b0b4b5]">
                          #{idx + 1}
                        </span>
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </article>

          {/* ── Footer Info ── */}
          <Reveal>
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm dark:border-[#373a3b] dark:bg-[#191c1d]/50">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-[#32735f]/20 dark:text-[#84bd3a]">
                <UserRound className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold dark:text-white">
                  Pelayanan Ramah & Profesional
                </p>
                <p className="mt-1 text-sm text-muted-foreground dark:text-[#b0b4b5]">
                  Perangkat kelurahan siap melayani masyarakat setiap hari kerja
                  sesuai jam operasional Kantor Kelurahan Salomallori.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}