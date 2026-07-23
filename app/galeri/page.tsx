"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import {
  Loader2,
  Images,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface GaleriItem {
  id: string;
  judul: string;
  gambar: string;
  kategori: string;
}

const GALERI_KATEGORI = [
  "Semua",
  "Kegiatan",
  "Wisata",
  "UMKM",
  "Budaya",
  "Lainnya",
];

export default function GaleriIndexPage() {
  const [items, setItems] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [kategori, setKategori] = useState("Semua");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/galeri");
        if (!res.ok) throw new Error("Gagal fetch");
        setItems(await res.json());
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    if (kategori === "Semua") return items;
    return items.filter((item) => item.kategori === kategori);
  }, [items, kategori]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filtered.length : null
    );
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + filtered.length) % filtered.length
        : null
    );
  }, [filtered.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar variant="public" />

      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Galeri Foto
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Dokumentasi kegiatan dan potensi Kelurahan Salomallori
            </p>
          </div>

          {/* Filter */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {GALERI_KATEGORI.map((k) => (
              <button
                key={k}
                onClick={() => setKategori(k)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  kategori === k
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card text-muted-foreground hover:bg-border"
                }`}
              >
                {k}
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
              <Images className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">
                {items.length === 0
                  ? "Belum ada foto di galeri."
                  : "Tidak ditemukan foto di kategori ini."}
              </p>
            </div>
          ) : (
            <>
              {/* Grid */}
              <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                {filtered.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => openLightbox(index)}
                    className="group mb-4 w-full overflow-hidden rounded-2xl border border-border bg-card text-left transition-all hover:border-primary/30 hover:shadow-lg"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.gambar}
                        alt={item.judul}
                        className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium line-clamp-1">
                        {item.judul}
                      </p>
                      {item.kategori && (
                        <span className="mt-1 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary">
                          {item.kategori}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Lightbox */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative mx-2 sm:mx-4 max-h-[90vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute -top-10 sm:-top-12 right-0 z-10 rounded-full bg-white/10 p-1.5 sm:p-2 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={goPrev}
              className="absolute left-1 sm:left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-1.5 sm:p-2 text-white transition-colors hover:bg-white/20"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-1 sm:right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-1.5 sm:p-2 text-white transition-colors hover:bg-white/20"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Image */}
            <img
              src={filtered[lightboxIndex].gambar}
              alt={filtered[lightboxIndex].judul}
              className="max-h-[80vh] sm:max-h-[85vh] w-auto rounded-2xl object-contain shadow-2xl"
            />

            {/* Caption */}
            <div className="absolute -bottom-10 sm:-bottom-12 left-0 right-0 text-center">
              <p className="text-xs sm:text-sm text-white/80">
                {filtered[lightboxIndex].judul}
                {filtered[lightboxIndex].kategori && (
                  <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs">
                    {filtered[lightboxIndex].kategori}
                  </span>
                )}
              </p>
              <p className="mt-1 text-xs text-white/50">
                {lightboxIndex + 1} / {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}