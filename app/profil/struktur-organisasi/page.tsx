"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import { Target, Eye, Loader2 } from "lucide-react";

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
                <p className="text-lg text-muted-foreground">
                  Data desa belum tersedia.
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {/* ── Visi ── */}
                <section>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <Eye className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Visi</h2>
                  </div>
                  <blockquote className="rounded-r-xl border-l-4 border-primary bg-primary/5 py-5 pl-6">
                    <p className="text-lg leading-relaxed text-foreground/80">
                      &ldquo;{desa.visi}&rdquo;
                    </p>
                  </blockquote>
                </section>

                {/* ── Misi ── */}
                <section>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Misi</h2>
                  </div>
                  {misiList.length > 0 ? (
                    <div className="space-y-4">
                      {misiList.map((misi, i) => (
                        <div
                          key={i}
                          className="flex gap-4 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            {i + 1}
                          </span>
                          <p className="pt-1 leading-relaxed text-foreground/70">
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