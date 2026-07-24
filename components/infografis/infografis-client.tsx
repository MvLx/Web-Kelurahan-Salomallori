"use client";

import { useState } from "react";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import { BarChart3, Loader2 } from "lucide-react";
import ChartView from "./chart-view";

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface InfografisItem {
  id: string;
  judul: string;
  tahun: number;
  dataJson: DataPoint[];
  chartType: string;
  createdAt: string;
  updatedAt: string;
}

interface InfografisClientProps {
  items: InfografisItem[];
  error: string | null;
}

export default function InfografisClient({ items, error }: InfografisClientProps) {
  const [loading] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar variant="public" />
        <main className="pt-20 pb-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-foreground/10 rounded w-1/3" />
              <div className="h-4 bg-foreground/10 rounded w-1/4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-card border border-border rounded-2xl p-6 h-[400px]" />
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
      <div className="min-h-screen bg-background text-foreground">
        <Navbar variant="public" />
        <main className="pt-20 pb-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-center py-24">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">Terjadi Kesalahan</h1>
              <p className="text-muted-foreground mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-primary text-primary-foreground h-10 px-6 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar variant="public" />

      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-black tracking-tight md:text-4xl text-foreground">
                Infografis Kelurahan Salomallori
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Visualisasi data statistik dan informasi pembangunan Kelurahan Salomallori
            </p>
            <div className="w-full h-px bg-border mt-6" />
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-border bg-card">
              <BarChart3 className="w-16 h-16 text-muted-foreground/40 mb-4" />
              <h2 className="text-xl font-bold text-muted-foreground mb-2">Belum Ada Data Infografis</h2>
              <p className="text-muted-foreground max-w-md">
                Data infografis akan ditambahkan oleh admin kelurahan. Silakan kembali lagi nanti.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
                >
                  <h2 className="text-lg font-bold text-foreground mb-1">
                    {item.judul}
                  </h2>
                  <div className="w-full h-px bg-border mb-4" />
                  <ChartView item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}