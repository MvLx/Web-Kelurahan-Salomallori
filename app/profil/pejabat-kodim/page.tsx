"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import { Users, ChevronRight } from "lucide-react";

interface Perangkat {
  id: string;
  nama: string;
  jabatan: string;
  foto: string | null;
  urutan: number;
}

export default function PerangkatPage() {
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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar variant="public" />

      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-5xl space-y-16 px-4 sm:px-6 lg:px-8">
          <article className="rounded-2xl bg-card p-8 shadow-xl md:p-12">
            <h1 className="mb-2 text-4xl font-black leading-tight tracking-tight md:text-5xl">
              Perangkat Kelurahan
            </h1>
            <p className="mb-8 text-base font-semibold uppercase tracking-widest text-primary">
              Kelurahan Salomallori
            </p>

            <p className="mb-10 text-lg leading-relaxed text-foreground/70">
              Berikut adalah daftar perangkat yang bertugas di Kantor Kelurahan
              Salomallori, Kecamatan Dua Pitue, Kabupaten Sidenreng Rappang.
            </p>

            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 animate-pulse rounded-xl bg-muted"
                  />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">
                  Data perangkat desa belum tersedia.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {items.map((p, idx) => (
                  <div
                    key={p.id}
                    className="group flex items-center gap-5 rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    {/* Avatar */}
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                      {p.nama.charAt(0).toUpperCase()}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">{p.nama}</h3>
                      <p className="text-sm text-muted-foreground">
                        {p.jabatan}
                      </p>
                    </div>

                    {/* Urutan */}
                    <div className="hidden shrink-0 items-center gap-2 text-sm text-muted-foreground sm:flex">
                      <span className="rounded-full bg-muted px-3 py-1 text-xs">
                        #{idx + 1}
                      </span>
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}