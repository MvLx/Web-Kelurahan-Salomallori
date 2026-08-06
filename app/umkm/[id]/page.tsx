"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { NavbarBeranda } from "@/components/custom/navbar-beranda";
import Footer from "@/components/custom/footer";
import {
  Loader2,
  Store,
  ArrowLeft,
  Tag,
  User,
  Phone,
  CircleDollarSign,
  FileText,
} from "lucide-react";

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

export default function UMKMDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [umkm, setUmkm] = useState<UMKM | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/umkm/${id}`);
        if (!res.ok) throw new Error("Not found");
        setUmkm(await res.json());
      } catch {
        setUmkm(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-[#111415] dark:text-[#e1e3e0]">
      <NavbarBeranda />

      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/umkm"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary dark:hover:text-[#84bd3a]"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke UMKM
          </Link>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-primary dark:text-[#84bd3a]" />
            </div>
          ) : !umkm ? (
            <div className="rounded-2xl border border-border bg-card py-24 text-center dark:border-[#373a3b] dark:bg-[#191c1d]">
              <Store className="mx-auto mb-4 h-12 w-12 text-muted-foreground dark:text-[#b0b4b5]" />
              <p className="text-lg text-muted-foreground dark:text-[#b0b4b5]">
                Produk tidak ditemukan.
              </p>
              <Link
                href="/umkm"
                className="mt-4 inline-block text-sm font-medium text-primary hover:underline dark:text-[#84bd3a]"
              >
                Lihat semua produk
              </Link>
            </div>
          ) : (
            <article className="rounded-2xl border border-border bg-card p-6 shadow-xl md:p-8 dark:border-[#373a3b] dark:bg-[#191c1d] dark:shadow-black/30">
              {/* Image */}
              <div className="mb-6 flex h-56 items-center justify-center overflow-hidden rounded-xl bg-primary/5 md:h-72 dark:bg-[#32735f]/10">
                {umkm.gambar ? (
                  <img
                    src={umkm.gambar}
                    alt={umkm.namaProduk}
                    className="h-full w-full rounded-xl object-cover"
                  />
                ) : (
                  <Store className="h-16 w-16 text-primary/40 dark:text-[#32735f]/40" />
                )}
              </div>

              {/* Title & price */}
              <h1 className="text-3xl font-black tracking-tight md:text-4xl dark:text-white">
                {umkm.namaProduk}
              </h1>

              {umkm.harga && (
                <div className="mt-3 flex items-center gap-2">
                  <CircleDollarSign className="h-5 w-5 text-primary dark:text-[#84bd3a]" />
                  <span className="text-xl font-semibold text-primary dark:text-[#84bd3a]">
                    {umkm.harga}
                  </span>
                </div>
              )}

              {/* Detail grid */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 dark:border-[#373a3b] dark:bg-[#191c1d]">
                  <User className="h-5 w-5 text-primary dark:text-[#84bd3a]" />
                  <div>
                    <p className="text-xs text-muted-foreground dark:text-[#b0b4b5]">Pemilik</p>
                    <p className="font-medium dark:text-white">{umkm.pemilik}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 dark:border-[#373a3b] dark:bg-[#191c1d]">
                  <Tag className="h-5 w-5 text-primary dark:text-[#84bd3a]" />
                  <div>
                    <p className="text-xs text-muted-foreground dark:text-[#b0b4b5]">Kategori</p>
                    <p className="font-medium dark:text-white">{umkm.kategori}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 sm:col-span-2 dark:border-[#373a3b] dark:bg-[#191c1d]">
                  <Phone className="h-5 w-5 text-primary dark:text-[#84bd3a]" />
                  <div>
                    <p className="text-xs text-muted-foreground dark:text-[#b0b4b5]">Kontak</p>
                    <a
                      href={`https://wa.me/${umkm.kontak.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline dark:text-[#84bd3a]"
                    >
                      {umkm.kontak}
                    </a>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8">
                <div className="mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary dark:text-[#84bd3a]" />
                  <h2 className="text-lg font-bold dark:text-white">Deskripsi</h2>
                </div>
                <div className="rounded-xl border border-border bg-card p-5 dark:border-[#373a3b] dark:bg-[#191c1d]">
                  <p className="leading-relaxed text-foreground/70 dark:text-[#b0b4b5]">
                    {umkm.deskripsi}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 text-center">
                <a
                  href={`https://wa.me/${umkm.kontak.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
                >
                  <Phone className="h-4 w-4" />
                  Hubungi Pemilik
                </a>
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}