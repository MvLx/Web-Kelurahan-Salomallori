import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Camera, CalendarDays } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const foto = await prisma.galeri.findUnique({ where: { id } });

  if (!foto) {
    return { title: "Foto Tidak Ditemukan — Kelurahan Salomallori" };
  }

  return {
    title: `${foto.judul} — Galeri Kelurahan Salomallori`,
    description: foto.kategori
      ? `Foto galeri ${foto.judul} (${foto.kategori}) dari Kelurahan Salomallori.`
      : `Foto galeri ${foto.judul} dari Kelurahan Salomallori.`,
  };
}

export default async function GaleriDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const foto = await prisma.galeri.findUnique({ where: { id } });

  if (!foto) {
    notFound();
  }

  const tanggal = new Date(foto.createdAt).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#f9faf7] text-[#171717] antialiased dark:bg-[#111411] dark:text-[#e1e3e0]">
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <Link
          href="/galeri"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#32735f] transition-colors hover:text-[#84bd3a] dark:text-[#84bd3a] dark:hover:text-[#32735f]"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Galeri
        </Link>

        <div className="overflow-hidden rounded-xl border border-[#dee2de] bg-white shadow-sm dark:border-[#414943] dark:bg-[#1a1a1a]">
          <div className="relative aspect-[4/3] w-full bg-[#dee2de]/50 sm:aspect-[16/9] lg:aspect-[21/9]">
            <img
              src={foto.gambar}
              alt={foto.judul}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-8">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#32735f]/10 px-3 py-1 text-xs font-semibold text-[#32735f] dark:bg-[#84bd3a]/10 dark:text-[#84bd3a]">
                <Camera className="h-3.5 w-3.5" />
                {foto.kategori}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#666666] dark:text-[#b0b4b5]">
                <CalendarDays className="h-3.5 w-3.5" />
                {tanggal}
              </span>
            </div>
            <h1 className="mb-2 font-serif text-2xl font-semibold text-[#171717] dark:text-white sm:text-3xl">
              {foto.judul}
            </h1>
          </div>
        </div>
      </main>
    </div>
  );
}