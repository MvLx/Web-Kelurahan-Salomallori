"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import { Target, Eye, Loader2, Compass } from "lucide-react";

interface DesaData {
  id: string;
  nama: string;
  visi: string;
  misi: string;
}

export default function VisiMisiPage() {
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

  const misiList = desa?.misi
    ? desa.misi
        .split("\n")
        .map((m) => m.trim())
        .filter((m) => m.length > 0 && /^\d+\./.test(m))
        .map((m) => m.replace(/^\d+\.\s*/, ""))
    : [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar variant="public" />

      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-5xl space-y-16 px-4 sm:px-6 lg:px-8">
          <article className="rounded-2xl bg-card p-8 shadow-xl md:p-12">
            <h1 className="mb-2 text-4xl font-black leading-tight tracking-tight md:text-5xl">
              Visi & Misi
            </h1>
            <p className="mb-8 text-base font-semibold uppercase tracking-widest text-primary">
              Kelurahan {desa?.nama ?? "Salomallori"}
            </p>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : !desa ? (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <Compass className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">
                  Data desa belum tersedia.
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {/* ── VISI ── */}
                <section>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                      <Eye className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Visi</h2>
                  </div>
                  <blockquote className="rounded-r-xl border-l-4 border-primary bg-primary/5 py-6 pl-6">
                    <p className="text-xl leading-relaxed text-foreground/80">
                      &ldquo;{desa.visi}&rdquo;
                    </p>
                  </blockquote>
                </section>

                {/* ── MISI ── */}
                <section>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Misi</h2>
                  </div>

                  {misiList.length > 0 ? (
                    <div className="space-y-4">
                      {misiList.map((misi, i) => (
                        <div
                          key={i}
                          className="flex gap-5 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary">
                            {i + 1}
                          </span>
                          <p className="pt-1.5 text-lg leading-relaxed text-foreground/70">
                            {misi}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-border bg-card p-6 text-center text-muted-foreground">
                      {desa.misi || "Belum ada data misi."}
                    </div>
                  )}
                </section>

                {/* ── TUJUAN PEMBANGUNAN ── */}
                <section>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                      <Compass className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Tujuan Pembangunan</h2>
                  </div>
                  <p className="text-lg leading-relaxed text-foreground/70">
                    Kelurahan {desa.nama} berkomitmen untuk mewujudkan
                    pembangunan yang berkelanjutan, merata, dan partisipatif
                    dengan mengedepankan nilai-nilai gotong royong dan kearifan
                    lokal. Seluruh program pembangunan diarahkan untuk
                    meningkatkan kesejahteraan masyarakat, memperkuat ekonomi
                    lokal berbasis UMKM dan sektor unggulan, serta
                    meningkatkan kualitas pelayanan publik yang transparan
                    dan akuntabel.
                  </p>
                </section>

                {/* Closing */}
                <div className="border-t border-border pt-8">
                  <blockquote className="rounded-r-lg border-l-4 border-primary bg-primary/5 py-2 pl-6">
                    <p className="text-lg font-semibold italic text-primary">
                      &ldquo;Terwujudnya Kelurahan {desa.nama} yang maju,
                      mandiri, dan sejahtera.&rdquo;
                    </p>
                  </blockquote>
                </div>
              </div>
            )}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}