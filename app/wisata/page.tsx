"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import {
  Loader2,
  MapPin,
  Mountain,
  UtensilsCrossed,
  Landmark,
  Compass,
} from "lucide-react";

interface Wisata {
  id: string;
  nama: string;
  deskripsi: string;
  lokasi: string;
  kategori: "WISATA_ALAM" | "KULINER" | "BUDAYA";
  gambar: string | null;
}

const KATEGORI_MAP: Record<string, { label: string; icon: React.ReactNode }> = {
  Semua: { label: "Semua", icon: null },
  WISATA_ALAM: { label: "Wisata Alam", icon: <Mountain className="h-4 w-4" /> },
  KULINER: { label: "Kuliner", icon: <UtensilsCrossed className="h-4 w-4" /> },
  BUDAYA: { label: "Budaya", icon: <Landmark className="h-4 w-4" /> },
};

export default function WisataIndexPage() {
  const [wisataList, setWisataList] = useState<Wisata[]>([]);
  const [loading, setLoading] = useState(true);
  const [kategori, setKategori] = useState("Semua");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/wisata");
        if (!res.ok) throw new Error("Gagal fetch");
        setWisataList(await res.json());
      } catch {
        setWisataList([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    if (kategori === "Semua") return wisataList;
    return wisataList.filter((w) => w.kategori === kategori);
  }, [wisataList, kategori]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar variant="public" />

      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Wisata & Kuliner
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Destinasi wisata alam, kuliner, dan budaya di Kelurahan Salomallori
            </p>
          </div>

          {/* Filter */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {Object.entries(KATEGORI_MAP).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setKategori(key)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  kategori === key
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card text-muted-foreground hover:bg-border"
                }`}
              >
                {val.icon}
                {val.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card py-24 text-center">
              <Compass className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">
                {wisataList.length === 0
                  ? "Belum ada data wisata."
                  : "Tidak ditemukan wisata di kategori ini."}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((wisata) => (
                <Link
                  key={wisata.id}
                  href={`/wisata/${wisata.id}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="flex h-44 items-center justify-center bg-primary/5">
                    {wisata.gambar ? (
                      <img
                        src={wisata.gambar}
                        alt={wisata.nama}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-primary/40">
                        {wisata.kategori === "WISATA_ALAM" && <Mountain className="h-10 w-10" />}
                        {wisata.kategori === "KULINER" && <UtensilsCrossed className="h-10 w-10" />}
                        {wisata.kategori === "BUDAYA" && <Landmark className="h-10 w-10" />}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <span
                      className={`inline-block rounded-full px-3 py-0.5 text-xs font-medium ${
                        wisata.kategori === "WISATA_ALAM"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : wisata.kategori === "KULINER"
                            ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                    >
                      {KATEGORI_MAP[wisata.kategori]?.label}
                    </span>

                    <h3 className="mt-2 text-lg font-bold group-hover:text-primary transition-colors">
                      {wisata.nama}
                    </h3>

                    <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="line-clamp-1">{wisata.lokasi}</span>
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {wisata.deskripsi}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}