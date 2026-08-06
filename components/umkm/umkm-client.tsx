"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { NavbarBeranda } from "@/components/custom/navbar-beranda";
import Footer from "@/components/custom/footer";
import { Reveal } from "@/components/stitch/reveal";
import { Search, X, Store, Tag, User, Phone } from "lucide-react";

interface UMKM {
  id: string;
  namaProduk: string;
  deskripsi: string;
  harga: string | null;
  kategori: string;
  kontak: string;
  gambar: string | null;
  pemilik: string;
}

interface UMKMClientProps {
  items: UMKM[];
  error: string | null;
  loading?: boolean;
}

const KATEGORI_LIST = ["Semua", "Pertanian", "Peternakan", "Kerajinan", "Kuliner"];

export function UMKMClient({ items, error, loading = false }: UMKMClientProps) {
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("Semua");

  const filtered = useMemo(() => {
    return items.filter((u) => {
      const matchSearch =
        !search ||
        u.namaProduk.toLowerCase().includes(search.toLowerCase()) ||
        u.pemilik.toLowerCase().includes(search.toLowerCase());
      const matchKategori = kategori === "Semua" || u.kategori === kategori;
      return matchSearch && matchKategori;
    });
  }, [items, search, kategori]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground dark:bg-[#111415] dark:text-[#e1e3e0]">
        <NavbarBeranda />
        <main className="pt-20 pb-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 rounded w-1/3 bg-foreground/10 dark:bg-[#373a3b]/50" />
              <div className="h-4 rounded w-1/4 bg-foreground/10 dark:bg-[#373a3b]/50" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-[280px] rounded-2xl border border-border bg-card p-6 dark:border-[#373a3b] dark:bg-[#373a3b]/50"
                  />
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
      <div className="min-h-screen bg-background text-foreground dark:bg-[#111415] dark:text-[#e1e3e0]">
        <NavbarBeranda />
        <main className="pt-20 pb-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-center py-24">
            <div className="text-center">
              <Store className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h1 className="text-2xl font-bold mb-2 dark:text-white">Terjadi Kesalahan</h1>
              <p className="text-muted-foreground mb-6 dark:text-[#b0b4b5]">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-primary text-primary-foreground h-10 px-6 rounded-lg text-sm font-semibold hover:bg-primary/90"
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
    <div className="min-h-screen bg-background text-foreground dark:bg-[#111415] dark:text-[#e1e3e0]">
      <NavbarBeranda />

      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* ── Header ── */}
          <Reveal>
            <header className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary dark:border-[#32735f]/40 dark:bg-[#32735f]/10 dark:text-[#32735f]">
                <Store className="h-3.5 w-3.5" />
                Produk Unggulan
              </div>
              <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl dark:text-white">
                UMKM Kelurahan
              </h1>
              <p className="mt-3 text-base font-semibold uppercase tracking-widest text-primary dark:text-[#84bd3a]">
                Kelurahan Salomallori
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground dark:text-[#b0b4b5]">
                Produk unggulan dan usaha mikro kecil menengah Kelurahan Salomallori
              </p>
              <div className="mx-auto mt-6 flex items-center gap-3 text-primary dark:text-[#84bd3a]">
                <span className="h-px w-16 bg-primary/30 dark:bg-[#84bd3a]/30" />
                <span className="h-2 w-2 rotate-45 bg-primary dark:bg-[#84bd3a]" />
                <span className="h-px w-16 bg-primary/30 dark:bg-[#84bd3a]/30" />
              </div>
            </header>
          </Reveal>

          {/* Search & Filter */}
          <Reveal delay={100}>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground dark:text-[#b0b4b5]" />
                <input
                  type="text"
                  placeholder="Cari produk atau pemilik..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-10 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary dark:border-[#373a3b] dark:bg-[#191c1d] dark:text-[#e1e3e0] dark:placeholder:text-[#b0b4b5] dark:focus:ring-[#32735f]"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground dark:text-[#b0b4b5] dark:hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {KATEGORI_LIST.map((k) => (
                  <button
                    key={k}
                    onClick={() => setKategori(k)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                      kategori === k
                        ? "bg-primary text-primary-foreground shadow-sm dark:bg-[#32735f] dark:text-white"
                        : "bg-card text-muted-foreground hover:bg-border dark:bg-[#191c1d] dark:text-[#b0b4b5] dark:hover:bg-[#373a3b]"
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Content */}
          {filtered.length === 0 ? (
            <Reveal>
              <div className="rounded-2xl border border-border bg-card py-24 text-center dark:border-[#373a3b] dark:bg-[#191c1d]">
                <Store className="mx-auto mb-4 h-12 w-12 text-muted-foreground/40" />
                <p className="text-lg text-muted-foreground dark:text-[#b0b4b5]">
                  {items.length === 0
                    ? "Belum ada produk UMKM."
                    : "Tidak ditemukan produk yang cocok."}
                </p>
              </div>
            </Reveal>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((umkm, idx) => (
                <Reveal key={umkm.id} delay={idx * 100}>
                  <Link
                    href={`/umkm/${umkm.id}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg dark:border-[#373a3b] dark:bg-[#191c1d] dark:hover:border-[#32735f]/60 dark:hover:shadow-black/30"
                  >
                    {/* Image placeholder */}
                    <div className="mb-4 flex h-40 items-center justify-center overflow-hidden rounded-xl bg-primary/5 dark:bg-[#32735f]/10">
                      {umkm.gambar ? (
                        <img
                          src={umkm.gambar}
                          alt={umkm.namaProduk}
                          className="h-full w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <Store className="h-12 w-12 text-primary/40 dark:text-[#32735f]/40" />
                      )}
                    </div>

                    <h3 className="mb-1 text-lg font-bold group-hover:text-primary transition-colors dark:text-white dark:group-hover:text-[#84bd3a]">
                      {umkm.namaProduk}
                    </h3>

                    {umkm.harga && (
                      <p className="mb-3 text-sm font-semibold text-primary dark:text-[#84bd3a]">
                        {umkm.harga}
                      </p>
                    )}

                    <div className="mt-auto space-y-1.5 pt-2 text-sm text-muted-foreground dark:text-[#b0b4b5]">
                      <div className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{umkm.pemilik}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="h-3.5 w-3.5 shrink-0" />
                        <span>{umkm.kategori}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{umkm.kontak}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}