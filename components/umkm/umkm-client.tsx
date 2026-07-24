"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import { Search, X, Store, Tag, User, Phone, Loader2 } from "lucide-react";

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
}

const KATEGORI_LIST = ["Semua", "Pertanian", "Peternakan", "Kerajinan", "Kuliner"];

export function UMKMClient({ items, error }: UMKMClientProps) {
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

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar variant="public" />
        <main className="pt-20 pb-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-center py-24">
            <div className="text-center">
              <Store className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h1 className="text-2xl font-bold mb-2">Terjadi Kesalahan</h1>
              <p className="text-muted-foreground mb-6">{error}</p>
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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar variant="public" />

      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              UMKM Kelurahan
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Produk unggulan dan usaha mikro kecil menengah Kelurahan Salomallori
            </p>
          </div>

          {/* Search & Filter */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari produk atau pemilik..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-10 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-card text-muted-foreground hover:bg-border"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card py-24 text-center">
              <Store className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">
                {items.length === 0
                  ? "Belum ada produk UMKM."
                  : "Tidak ditemukan produk yang cocok."}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((umkm) => (
                <Link
                  key={umkm.id}
                  href={`/umkm/${umkm.id}`}
                  className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
                >
                  {/* Image placeholder */}
                  <div className="mb-4 flex h-40 items-center justify-center rounded-xl bg-primary/5">
                    {umkm.gambar ? (
                      <img
                        src={umkm.gambar}
                        alt={umkm.namaProduk}
                        className="h-full w-full rounded-xl object-cover"
                      />
                    ) : (
                      <Store className="h-12 w-12 text-primary/40" />
                    )}
                  </div>

                  <h3 className="mb-1 text-lg font-bold group-hover:text-primary transition-colors">
                    {umkm.namaProduk}
                  </h3>

                  {umkm.harga && (
                    <p className="mb-3 text-sm font-semibold text-primary">
                      {umkm.harga}
                    </p>
                  )}

                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 shrink-0" />
                      <span>{umkm.pemilik}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5 shrink-0" />
                      <span>{umkm.kategori}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      <span>{umkm.kontak}</span>
                    </div>
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