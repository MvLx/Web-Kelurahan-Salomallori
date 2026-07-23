"use client";

import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

interface Galeri {
  id: string;
  judul: string;
  gambar: string;
  kategori: string;
}

export function GaleriSection() {
  const [items, setItems] = useState<Galeri[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/galeri");
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

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prev = () =>
    setLightboxIdx((prev) =>
      prev !== null ? (prev - 1 + items.length) % items.length : null,
    );
  const next = () =>
    setLightboxIdx((prev) =>
      prev !== null ? (prev + 1) % items.length : null,
    );

  if (loading) {
    return (
      <section className="w-full py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SkeletonGrid />
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Galeri Foto
          </h2>
          <p className="mt-2 text-muted-foreground">
            Dokumentasi kegiatan Kelurahan Salomallori
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.gambar}
                alt={item.judul}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="truncate text-sm font-medium text-white">
                  {item.judul}
                </p>
                {item.kategori && (
                  <p className="truncate text-xs text-white/70">
                    {item.kategori}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4">
          <button
            onClick={closeLightbox}
            className="absolute right-2 top-2 sm:right-4 sm:top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Tutup"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <button
            onClick={prev}
            className="absolute left-2 sm:left-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Sebelumnya"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={items[lightboxIdx].gambar}
            alt={items[lightboxIdx].judul}
            className="max-h-[80vh] sm:max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
          />

          <button
            onClick={next}
            className="absolute right-2 sm:right-16 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Selanjutnya"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Caption */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-center text-white max-w-[90vw] px-4">
            <p className="text-sm sm:text-lg font-medium">{items[lightboxIdx].judul}</p>
            {items[lightboxIdx].kategori && (
              <p className="text-xs sm:text-sm text-white/70">
                {items[lightboxIdx].kategori}
              </p>
            )}
            <p className="mt-1 text-xs text-white/50">
              {lightboxIdx + 1} / {items.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square animate-pulse rounded-xl bg-muted"
        />
      ))}
    </div>
  );
}