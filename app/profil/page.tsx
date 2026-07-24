import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { History, UserCheck, Target, ChevronRight } from "lucide-react";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil — Kelurahan Salomallori",
  description: "Profil Kelurahan Salomallori, Kec. Mattiro Bulu, Kab. Pinrang",
};

export default async function ProfilPage() {
  const desa = await prisma.desa.findFirst();

  return (
    <div className="min-h-screen">
      <Navbar variant="public" />
      <div className="h-16" />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-2 font-display text-display-medium font-bold text-obsidian dark:text-white">
          Profil Kelurahan Salomallori
        </h1>
        <p className="mb-8 font-body text-body-medium text-iron">
          Informasi umum tentang Kelurahan Salomallori
        </p>

        {desa && (
          <section className="mb-12 rounded-[12px] border border-sage bg-paper p-6 shadow-paper-sm dark:border-[#414943] dark:bg-[#1a1a1a]">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              {desa.fotoKepalaDesa && (
                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={desa.fotoKepalaDesa}
                    alt="Kepala Desa"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h2 className="font-display text-headline-large font-semibold text-obsidian dark:text-white">
                  {desa.nama}
                </h2>
                <p className="mt-1 font-body text-body-medium text-iron">
                  {desa.sejarah?.slice(0, 300)}
                  {desa.sejarah && desa.sejarah.length > 300 ? "..." : ""}
                </p>
              </div>
            </div>

            {desa.luasWilayah && (
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-[8px] bg-linen p-4 text-center dark:bg-[#111411]">
                  <p className="font-display text-headline-medium font-bold text-hudson-blue dark:text-[#7fc8ff]">
                    {desa.luasWilayah} km²
                  </p>
                  <p className="font-body text-body-small text-iron">Luas Wilayah</p>
                </div>
                {desa.jumlahPenduduk && (
                  <div className="rounded-[8px] bg-linen p-4 text-center dark:bg-[#111411]">
                    <p className="font-display text-headline-medium font-bold text-hudson-blue dark:text-[#7fc8ff]">
                      {desa.jumlahPenduduk.toLocaleString("id-ID")}
                    </p>
                    <p className="font-body text-body-small text-iron">Penduduk</p>
                  </div>
                )}
                {desa.jumlahKK && (
                  <div className="rounded-[8px] bg-linen p-4 text-center dark:bg-[#111411]">
                    <p className="font-display text-headline-medium font-bold text-hudson-blue dark:text-[#7fc8ff]">
                      {desa.jumlahKK.toLocaleString("id-ID")}
                    </p>
                    <p className="font-body text-body-small text-iron">Kepala Keluarga</p>
                  </div>
                )}
                {desa.jumlahDusun && (
                  <div className="rounded-[8px] bg-linen p-4 text-center dark:bg-[#111411]">
                    <p className="font-display text-headline-medium font-bold text-hudson-blue dark:text-[#7fc8ff]">
                      {desa.jumlahDusun}
                    </p>
                    <p className="font-body text-body-small text-iron">Dusun</p>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* Sub Pages Links */}
        <section className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/profil/sejarah-kelurahan"
            className="flex items-center gap-4 rounded-[12px] border border-sage bg-paper p-5 shadow-paper-sm transition-all hover:shadow-paper-md dark:border-[#414943] dark:bg-[#1a1a1a]"
          >
            <History className="h-8 w-8 text-hudson-blue dark:text-[#7fc8ff]" />
            <div className="flex-1">
              <h3 className="font-display text-headline-small font-semibold text-obsidian dark:text-white">
                Sejarah
              </h3>
              <p className="font-body text-body-small text-iron">Sejarah Kelurahan Salomallori</p>
            </div>
            <ChevronRight className="h-5 w-5 text-iron" />
          </Link>

          <Link
            href="/profil/pejabat-kelurahan"
            className="flex items-center gap-4 rounded-[12px] border border-sage bg-paper p-5 shadow-paper-sm transition-all hover:shadow-paper-md dark:border-[#414943] dark:bg-[#1a1a1a]"
          >
            <UserCheck className="h-8 w-8 text-hudson-blue dark:text-[#7fc8ff]" />
            <div className="flex-1">
              <h3 className="font-display text-headline-small font-semibold text-obsidian dark:text-white">
                Pejabat Kelurahan
              </h3>
              <p className="font-body text-body-small text-iron">Daftar perangkat kelurahan</p>
            </div>
            <ChevronRight className="h-5 w-5 text-iron" />
          </Link>

          <Link
            href="/profil/visi-misi"
            className="flex items-center gap-4 rounded-[12px] border border-sage bg-paper p-5 shadow-paper-sm transition-all hover:shadow-paper-md dark:border-[#414943] dark:bg-[#1a1a1a]"
          >
            <Target className="h-8 w-8 text-hudson-blue dark:text-[#7fc8ff]" />
            <div className="flex-1">
              <h3 className="font-display text-headline-small font-semibold text-obsidian dark:text-white">
                Visi & Misi
              </h3>
              <p className="font-body text-body-small text-iron">Visi dan misi kelurahan</p>
            </div>
            <ChevronRight className="h-5 w-5 text-iron" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}