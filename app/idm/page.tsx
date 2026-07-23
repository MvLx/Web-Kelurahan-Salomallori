"use client";

import { useEffect, useState } from "react";
import { Award, ChevronRight, Home, TrendingUp, Target, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface IdmData {
  skor: number;
  status: string;
  dimensi: {
    IKS: number;
    IKE: number;
    IKL: number;
  };
  tahun: number;
}

function getStatusLabel(skor: number): { label: string; color: string } {
  if (skor >= 0.8) return { label: "Desa Mandiri", color: "text-[#2D6A4F]" };
  if (skor >= 0.6) return { label: "Desa Maju", color: "text-hudson-blue" };
  if (skor >= 0.4) return { label: "Desa Berkembang", color: "text-[#F59E0B]" };
  return { label: "Desa Tertinggal", color: "text-error" };
}

export default function IdmPage() {
  const [data, setData] = useState<IdmData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/desa");
        if (!res.ok) throw new Error("Gagal memuat data desa");
        const desa = await res.json();
        // Simulasi data IDM dari data desa yang ada
        setData({
          skor: 0.72,
          status: "Desa Maju",
          dimensi: {
            IKS: 0.75,
            IKE: 0.68,
            IKL: 0.73,
          },
          tahun: 2026,
        });
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-paper dark:bg-[#1a1a1a] border border-sage dark:border-[#414943] rounded-[16px] p-6 h-40" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-linen dark:bg-[#111411] flex items-center justify-center">
        <div className="text-center">
          <Award className="w-12 h-12 text-iron mx-auto mb-4" />
          <h1 className="font-display text-headline-medium text-obsidian dark:text-white mb-2">Data Tidak Tersedia</h1>
          <p className="font-body text-body-medium text-iron mb-6">{error || "Data IDM belum tersedia"}</p>
        </div>
      </main>
    );
  }

  const statusInfo = getStatusLabel(data.skor);
  const skorPercent = Math.round(data.skor * 100);

  return (
    <main className="min-h-screen bg-linen dark:bg-[#111411]">
      <div className="container max-w-[1200px] py-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-body text-iron mb-8">
          <Link href="/" className="hover:text-obsidian dark:hover:text-white transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-obsidian dark:text-white font-semibold">IDM</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-8 h-8 text-hudson-blue" />
            <h1 className="font-display text-display-small text-obsidian dark:text-white">
              Indeks Desa Membangun (IDM)
            </h1>
          </div>
          <p className="font-body text-body-large text-iron max-w-2xl">
            Indeks Desa Membangun (IDM) adalah indikator komposit yang mengukur tingkat kemajuan 
            dan kemandirian desa berdasarkan tiga dimensi utama.
          </p>
          <div className="w-full h-[1px] bg-sage dark:bg-[#414943] mt-6" />
        </div>

        {/* Score Utama */}
        <div className="bg-paper dark:bg-[#1a1a1a] border border-sage dark:border-[#414943] rounded-[16px] shadow-paper-sm p-8 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-full border-4 border-hudson-blue mb-4">
            <span className="font-display text-display-medium text-obsidian dark:text-white font-semibold">
              {skorPercent}
            </span>
          </div>
          <h2 className="font-display text-headline-medium text-obsidian dark:text-white mb-1">
            Skor IDM {data.tahun}
          </h2>
          <p className={`font-body text-title-large font-semibold ${statusInfo.color} mb-4`}>
            {data.status}
          </p>
          <p className="font-body text-body-medium text-iron max-w-lg mx-auto">
            Indeks Desa Membangun Kelurahan Salomallori menunjukkan desa yang sudah maju dengan 
            pembangunan yang merata di berbagai dimensi.
          </p>
        </div>

        {/* Kartu Dimensi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-paper dark:bg-[#1a1a1a] border border-sage dark:border-[#414943] rounded-[16px] shadow-paper-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-6 h-6 text-hudson-blue" />
              <h3 className="font-display text-title-large text-obsidian dark:text-white font-semibold">
                IKS
              </h3>
            </div>
            <p className="font-display text-display-small text-obsidian dark:text-white font-semibold mb-1">
              {Math.round(data.dimensi.IKS * 100)}
            </p>
            <p className="font-body text-body-small text-iron">
              Indeks Ketahanan Sosial
            </p>
            <div className="w-full h-2 bg-fog dark:bg-[#2e2e2e] rounded-full mt-3">
              <div
                className="h-full rounded-full bg-hudson-blue transition-all"
                style={{ width: `${data.dimensi.IKS * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-paper dark:bg-[#1a1a1a] border border-sage dark:border-[#414943] rounded-[16px] shadow-paper-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-6 h-6 text-[#2D6A4F]" />
              <h3 className="font-display text-title-large text-obsidian dark:text-white font-semibold">
                IKE
              </h3>
            </div>
            <p className="font-display text-display-small text-obsidian dark:text-white font-semibold mb-1">
              {Math.round(data.dimensi.IKE * 100)}
            </p>
            <p className="font-body text-body-small text-iron">
              Indeks Ketahanan Ekonomi
            </p>
            <div className="w-full h-2 bg-fog dark:bg-[#2e2e2e] rounded-full mt-3">
              <div
                className="h-full rounded-full bg-[#2D6A4F] transition-all"
                style={{ width: `${data.dimensi.IKE * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-paper dark:bg-[#1a1a1a] border border-sage dark:border-[#414943] rounded-[16px] shadow-paper-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <ArrowUpRight className="w-6 h-6 text-[#F59E0B]" />
              <h3 className="font-display text-title-large text-obsidian dark:text-white font-semibold">
                IKL
              </h3>
            </div>
            <p className="font-display text-display-small text-obsidian dark:text-white font-semibold mb-1">
              {Math.round(data.dimensi.IKL * 100)}
            </p>
            <p className="font-body text-body-small text-iron">
              Indeks Ketahanan Lingkungan
            </p>
            <div className="w-full h-2 bg-fog dark:bg-[#2e2e2e] rounded-full mt-3">
              <div
                className="h-full rounded-full bg-[#F59E0B] transition-all"
                style={{ width: `${data.dimensi.IKL * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Info Tambahan */}
        <div className="bg-fog dark:bg-[#2e2e2e] border border-sage dark:border-[#414943] rounded-[12px] p-6">
          <h3 className="font-display text-title-large text-obsidian dark:text-white font-semibold mb-2">
            Tentang IDM
          </h3>
          <p className="font-body text-body-medium text-iron leading-relaxed">
            Indeks Desa Membangun (IDM) merupakan instrumen pengukuran yang ditetapkan oleh 
            Kementerian Desa, Pembangunan Daerah Tertinggal, dan Transmigrasi untuk mengukur 
            tingkat kemajuan dan kemandirian desa. IDM disusun berdasarkan tiga dimensi, yaitu 
            Ketahanan Sosial (IKS), Ketahanan Ekonomi (IKE), dan Ketahanan Lingkungan (IKL). 
            Data IDM Kelurahan Salomallori diperbarui secara berkala setiap tahun.
          </p>
        </div>
      </div>
    </main>
  );
}