"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import { MapPin, Users, Home, TreesIcon as Grass } from "lucide-react";

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
      <div className="min-h-screen bg-background text-foreground">
        <Navbar variant="public" />
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
      <div className="min-h-screen bg-background text-foreground">
        <Navbar variant="public" />
        <main className="pt-20 pb-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-card p-12 text-center shadow-xl">
              <p className="text-lg text-muted-foreground">
                Data desa belum tersedia.
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
      label: "Jumlah Dusun",
      value: `${desa.jumlahDusun ?? "—"} Dusun`,
      icon: Grass,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar variant="public" />

      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-5xl space-y-16 px-4 sm:px-6 lg:px-8">
          {/* Article */}
          <article className="rounded-2xl bg-card p-8 shadow-xl md:p-12">
            <h1 className="mb-2 text-4xl font-black leading-tight tracking-tight md:text-5xl">
              Sejarah Kelurahan
            </h1>
            <p className="mb-8 text-base font-semibold uppercase tracking-widest text-primary">
              Kelurahan {desa.nama}
            </p>

            {/* ── Sejarah ── */}
            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-bold">Sejarah</h2>
              <div className="space-y-6 text-lg leading-relaxed text-foreground/70">
                <p>{desa.sejarah}</p>
              </div>
            </section>

            {/* ── Statistik Cards ── */}
            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-bold">Data Wilayah</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {stat.label}
                        </p>
                        <p className="text-xl font-bold">{stat.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Batas Wilayah ── */}
            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-bold">Batas Wilayah</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { arah: "Utara", wilayah: desa.batasUtara },
                  { arah: "Timur", wilayah: desa.batasTimur },
                  { arah: "Selatan", wilayah: desa.batasSelatan },
                  { arah: "Barat", wilayah: desa.batasBarat },
                ].map((batas) => (
                  <div
                    key={batas.arah}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                      {batas.arah[0]}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Batas {batas.arah}
                      </p>
                      <p className="font-medium">
                        {batas.wilayah || "—"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Closing quote */}
            <div className="border-t border-border pt-8">
              <blockquote className="rounded-r-lg border-l-4 border-primary bg-primary/5 py-2 pl-6">
                <p className="text-lg font-semibold italic text-primary">
                  &ldquo;Terwujudnya Kelurahan {desa.nama} yang maju, mandiri,
                  dan sejahtera.&rdquo;
                </p>
              </blockquote>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function SkeletonArticle() {
  return (
    <div className="animate-pulse rounded-2xl bg-card p-8 shadow-xl md:p-12">
      <div className="mb-4 h-10 w-64 rounded bg-muted" />
      <div className="mb-8 h-5 w-48 rounded bg-muted" />
      <div className="mb-6 space-y-3">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-5/6 rounded bg-muted" />
        <div className="h-4 w-4/6 rounded bg-muted" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}