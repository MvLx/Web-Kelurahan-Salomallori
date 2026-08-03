"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Store, ShoppingBag, ArrowRight, ImageOff } from "lucide-react";

// ─── Types ──────────────────────────────────────────
type UMKMItem = {
  id: string;
  namaProduk: string;
  deskripsi: string;
  harga: string | null;
  kategori: string;
  gambar: string | null;
  pemilik: string;
};

// ─── Skeleton ───────────────────────────────────────
function CardSkeleton() {
  return (
    <div className="rounded-[12px] border border-sage bg-paper p-4 shadow-paper-sm dark:border-[#414943] dark:bg-[#1a1a1a]">
      <div className="aspect-[4/3] w-full animate-pulse rounded-[8px] bg-ash dark:bg-[#2e2e2e]" />
      <div className="mt-3 space-y-2">
        <div className="h-5 w-3/4 animate-pulse rounded bg-ash dark:bg-[#2e2e2e]" />
        <div className="h-4 w-full animate-pulse rounded bg-ash dark:bg-[#2e2e2e]" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-ash dark:bg-[#2e2e2e]" />
      </div>
    </div>
  );
}

// ─── Product / Placeholder Image ────────────────────
function ItemImage({ src, alt }: { src: string | null; alt: string }) {
  if (!src) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-[8px] bg-fog dark:bg-[#2e2e2e]">
        <ImageOff className="h-8 w-8 text-iron" />
      </div>
    );
  }
  return (
    <div
      className="aspect-[4/3] w-full rounded-[8px] bg-cover bg-center"
      style={{ backgroundImage: `url('${src}')` }}
      role="img"
      aria-label={alt}
    />
  );
}

// ─── Section: UMKM ──────────────────────────────────
function UMKMGrid({ items }: { items: UMKMItem[] }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-iron">
        <ShoppingBag className="mb-4 h-12 w-12" />
        <p className="font-body text-body-medium">Belum ada data UMKM</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="group rounded-[12px] border border-sage bg-paper p-4 shadow-paper-sm transition-all duration-200 hover:shadow-paper-md dark:border-[#414943] dark:bg-[#1a1a1a]"
        >
          <ItemImage src={item.gambar} alt={item.namaProduk} />
          <div className="mt-3">
            <h3 className="font-display text-headline-small font-semibold text-obsidian dark:text-white line-clamp-1">
              {item.namaProduk}
            </h3>
            <p className="mt-1 font-body text-body-medium text-iron line-clamp-2">
              {item.deskripsi}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-body text-label-large text-hudson-blue dark:text-[#84bd3a]">
                {item.harga || "Hubungi"}
              </span>
              <span className="font-body text-body-small text-steel">{item.pemilik}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main FeaturedSection ──────────────────────────
export function FeaturedSection() {
  const [umkm, setUmkm] = useState<UMKMItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const umkmRes = await fetch("/api/umkm?limit=6");

        if (umkmRes.ok) {
          const umkmData = await umkmRes.json();
          setUmkm(Array.isArray(umkmData) ? umkmData : []);
        }
      } catch (error) {
        console.error("Failed to load featured data:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="bg-linen py-4xl dark:bg-[#111411]">
      <div className="mx-auto max-w-7xl px-6">
        {/* ── UMKM Section ── */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Store className="h-7 w-7 text-hudson-blue dark:text-[#84bd3a]" />
              <h2 className="font-display text-display-small font-semibold text-obsidian dark:text-white">
                UMKM Unggulan
              </h2>
            </div>
            <Link
              href="/umkm"
              className="inline-flex items-center gap-1.5 font-body text-label-large font-semibold text-hudson-blue transition-colors hover:text-hudson-blue/80 dark:text-[#84bd3a] dark:hover:text-[#84bd3a]/80"
            >
              Lihat Semua
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <UMKMGrid items={umkm} />
          )}
        </div>
      </div>
    </section>
  );
}