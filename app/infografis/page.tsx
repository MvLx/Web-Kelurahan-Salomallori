"use client";

import { useEffect, useState } from "react";
import { BarChart3, ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import ChartView from "@/components/infografis/chart-view";

interface InfografisItem {
  id: string;
  judul: string;
  tahun: number;
  dataJson: { label: string; value: number; color?: string }[];
  chartType: string;
  createdAt: string;
  updatedAt: string;
}

export default function InfografisPage() {
  const [items, setItems] = useState<InfografisItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/infografis");
        if (!res.ok) throw new Error("Gagal memuat data");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-linen dark:bg-[#111411]">
        <div className="container max-w-[1200px] py-4xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-ash/50 rounded w-1/3" />
            <div className="h-4 bg-ash/50 rounded w-1/4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="bg-paper dark:bg-[#1a1a1a] border border-sage dark:border-[#414943] rounded-[12px] p-6 h-[400px]" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-linen dark:bg-[#111411] flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-iron mx-auto mb-4" />
          <h1 className="font-display text-headline-medium text-obsidian dark:text-white mb-2">Terjadi Kesalahan</h1>
          <p className="font-body text-body-medium text-iron mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-obsidian text-white h-10 px-6 rounded-xs font-body text-sm font-semibold tracking-wide hover:bg-obsidian/90 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linen dark:bg-[#111411]">
      <div className="container max-w-[1200px] py-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-body text-iron mb-8">
          <Link href="/" className="hover:text-obsidian dark:hover:text-white transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-obsidian dark:text-white font-semibold">Infografis</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8 text-hudson-blue" />
            <h1 className="font-display text-display-small text-obsidian dark:text-white">
              Infografis Kelurahan Salomallori
            </h1>
          </div>
          <p className="font-body text-body-large text-iron max-w-2xl">
            Visualisasi data statistik dan informasi pembangunan Kelurahan Salomallori
          </p>
          <div className="w-full h-[1px] bg-sage dark:bg-[#414943] mt-6" />
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <BarChart3 className="w-16 h-16 text-ash dark:text-[#414943] mb-4" />
            <h2 className="font-display text-headline-small text-iron mb-2">Belum Ada Data Infografis</h2>
            <p className="font-body text-body-medium text-iron max-w-md">
              Data infografis akan ditambahkan oleh admin kelurahan. Silakan kembali lagi nanti.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-paper dark:bg-[#1a1a1a] border border-sage dark:border-[#414943] rounded-[16px] shadow-paper-sm p-6"
              >
                <h2 className="font-display text-headline-small text-obsidian dark:text-white mb-1">
                  {item.judul}
                </h2>
                <div className="w-full h-[1px] bg-sage dark:bg-[#414943] mb-4" />
                <ChartView item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}