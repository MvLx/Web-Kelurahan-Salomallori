"use client";

import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

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
        setItems(
          Array.isArray(json)
            ? json
            : Array.isArray(json?.data)
              ? json.data
              : [],
        );
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
      <section className="w-full py-20">
        <div className="mx-auto max-w-[1400px] px-6">
          <SkeletonGrid />
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section className="w-full py-20">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="font-display text-[36px] font-semibold text-obsidian dark:text-white">
            Potret Kelurahan
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-iron dark:text-[#a0a0a0]">
            Menjelajahi kekayaan alam dan kreativitas warga yang menjadi pilar
            kebanggaan Kelurahan Salomallori.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative aspect-square overflow-hidden rounded-lg bg-sage/50 dark:bg-[#2e2e2e]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.gambar}
                alt={item.judul}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b2b40]/90 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.kategori && (
                  <span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#febe0d]">
                    {item.kategori}
                  </span>
                )}
                <h4 className="font-display text-sm font-semibold leading-tight text-white">
                  {item.judul}
                </h4>
              </div>
            </button>
          ))}

          {/* Placeholder item jika kurang dari 5 */}
          {items.length < 5 &&
            Array.from({ length: 5 - items.length }).map((_, i) => (
              <div
                key={`placeholder-${i}`}
                className={`relative aspect-square animate-pulse overflow-hidden rounded-lg bg-sage/50 dark:bg-[#2e2e2e] ${
                  i >= 2 ? "hidden lg:block" : ""
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center text-iron/30">
                  <Camera className="h-10 w-10" />
                </div>
              </div>
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
            <p className="text-sm sm:text-lg font-display font-semibold">
              {items[lightboxIdx].judul}
            </p>
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
          className="aspect-square animate-pulse rounded-lg bg-sage dark:bg-[#2e2e2e]"
        />
      ))}
    </div>
  );
}