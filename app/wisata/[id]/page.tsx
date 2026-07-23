"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import {
  Loader2,
  Compass,
  ArrowLeft,
  MapPin,
  Mountain,
  UtensilsCrossed,
  Landmark,
  FileText,
} from "lucide-react";

interface Wisata {
  id: string;
  nama: string;
  deskripsi: string;
  lokasi: string;
  kategori: "WISATA_ALAM" | "KULINER" | "BUDAYA";
  gambar: string | null;
}

const KATEGORI_LABEL: Record<string, string> = {
  WISATA_ALAM: "Wisata Alam",
  KULINER: "Kuliner",
  BUDAYA: "Budaya",
};

const KATEGORI_ICON: Record<string, React.ReactNode> = {
  WISATA_ALAM: <Mountain className="h-5 w-5" />,
  KULINER: <UtensilsCrossed className="h-5 w-5" />,
  BUDAYA: <Landmark className="h-5 w-5" />,
};

const KATEGORI_COLOR: Record<string, string> = {
  WISATA_ALAM:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  KULINER:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  BUDAYA:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

export default function WisataDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [wisata, setWisata] = useState<Wisata | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/wisata/${id}`);
        if (!res.ok) throw new Error("Not found");
        setWisata(await res.json());
      } catch {
        setWisata(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar variant="public" />

      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/wisata"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Wisata
          </Link>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !wisata ? (
            <div className="rounded-2xl border border-border bg-card py-24 text-center">
              <Compass className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">
                Wisata tidak ditemukan.
              </p>
              <Link
                href="/wisata"
                className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
              >
                Lihat semua wisata
              </Link>
            </div>
          ) : (
            <article className="rounded-2xl border border-border bg-card p-6 shadow-xl md:p-8">
              {/* Image */}
              <div className="mb-6 flex h-56 items-center justify-center rounded-xl bg-primary/5 md:h-72">
                {wisata.gambar ? (
                  <img
                    src={wisata.gambar}
                    alt={wisata.nama}
                    className="h-full w-full rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-primary/40">
                    {KATEGORI_ICON[wisata.kategori] || (
                      <Compass className="h-16 w-16" />
                    )}
                    <span className="text-sm">{KATEGORI_LABEL[wisata.kategori]}</span>
                  </div>
                )}
              </div>

              {/* Title & badge */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black tracking-tight md:text-4xl">
                    {wisata.nama}
                  </h1>
                  <span
                    className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${KATEGORI_COLOR[wisata.kategori]}`}
                  >
                    {KATEGORI_ICON[wisata.kategori]}
                    {KATEGORI_LABEL[wisata.kategori]}
                  </span>
                </div>
              </div>

              {/* Location card */}
              <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Lokasi</p>
                  <p className="font-medium">{wisata.lokasi}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8">
                <div className="mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold">Deskripsi</h2>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="leading-relaxed text-foreground/70">
                    {wisata.deskripsi}
                  </p>
                </div>
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}