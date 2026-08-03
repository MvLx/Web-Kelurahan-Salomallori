"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  History,
  ArrowRight,
  ScrollText,
  MapPin,
  Landmark,
  Compass,
} from "lucide-react";

type DesaData = {
  nama: string;
  sejarah: string | null;
  batasUtara: string | null;
  batasTimur: string | null;
  batasSelatan: string | null;
  batasBarat: string | null;
  fotoKepalaDesa: string | null;
};

function SkeletonCard() {
  return (
    <div className="rounded-[12px] border border-sage bg-paper p-6 shadow-paper-sm dark:border-[#414943] dark:bg-[#1a1a1a]">
      <div className="h-7 w-48 animate-pulse rounded bg-ash dark:bg-[#2e2e2e]" />
      <div className="mt-4 space-y-3">
        <div className="h-4 w-full animate-pulse rounded bg-ash dark:bg-[#2e2e2e]" />
        <div className="h-4 w-full animate-pulse rounded bg-ash dark:bg-[#2e2e2e]" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-ash dark:bg-[#2e2e2e]" />
      </div>
    </div>
  );
}

function BorderItem({
  arah,
  value,
}: {
  arah: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-sage/60 pb-2.5 last:border-0 last:pb-0 dark:border-[#414943]/60">
      <div className="flex items-center gap-2">
        <Compass className="h-4 w-4 text-hudson-blue dark:text-[#84bd3a]" />
        <span className="font-body text-label-medium font-semibold text-obsidian dark:text-[#e1e3e0]">
          {arah}
        </span>
      </div>
      <span className="text-right font-body text-body-small text-iron dark:text-[#c2c8bd]">
        {value}
      </span>
    </div>
  );
}

export function SejarahSection() {
  const [desa, setDesa] = useState<DesaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/desa");
        if (res.ok) {
          const data = await res.json();
          setDesa(data);
        }
      } catch (error) {
        console.error("Failed to load desa data:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="border-y border-sage bg-paper py-20 dark:border-[#414943] dark:bg-[#1a1a1a]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <History className="h-7 w-7 text-hudson-blue dark:text-[#84bd3a]" />
            <h2 className="font-display text-[36px] font-semibold text-obsidian dark:text-white">
              Jejak Sejarah Salomallori
            </h2>
          </div>
          <Link
            href="/profil/sejarah-kelurahan"
            className="hidden items-center gap-1.5 font-body text-label-large font-semibold text-hudson-blue transition-colors hover:text-hudson-blue/80 dark:text-[#84bd3a] dark:hover:text-[#84bd3a]/80 md:inline-flex"
          >
            Selengkapnya
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <SkeletonCard />
        ) : !desa?.sejarah ? (
          <div className="flex flex-col items-center justify-center rounded-[12px] border border-sage bg-paper py-12 text-iron shadow-paper-sm dark:border-[#414943] dark:bg-[#1a1a1a]">
            <ScrollText className="mb-4 h-12 w-12" />
            <p className="font-body text-body-medium">Data sejarah belum tersedia</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Kiri — Sejarah */}
            <div className="overflow-hidden rounded-[12px] border border-sage bg-paper shadow-paper-sm dark:border-[#414943] dark:bg-[#1a1a1a] lg:col-span-3">
              {desa.fotoKepalaDesa ? (
                <div className="relative h-56 w-full overflow-hidden md:h-72">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={desa.fotoKepalaDesa}
                    alt={`Kantor Kelurahan ${desa.nama}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-48 w-full items-center justify-center bg-fog dark:bg-[#2e2e2e] md:h-56">
                  <div className="flex flex-col items-center gap-3 text-iron dark:text-[#c2c8bd]">
                    <Landmark className="h-14 w-14" />
                    <span className="font-body text-label-large font-semibold">
                      Kelurahan {desa.nama}
                    </span>
                  </div>
                </div>
              )}
              <div className="p-6 md:p-8">
                <p className="whitespace-pre-line font-body text-body-medium leading-relaxed text-iron dark:text-[#c2c8bd]">
                  {desa.sejarah}
                </p>
                <div className="mt-6 border-t border-sage pt-6 dark:border-[#414943]">
                  <Link
                    href="/profil/sejarah-kelurahan"
                    className="inline-flex items-center gap-1.5 rounded-xs bg-obsidian px-5 py-2.5 font-body text-label-large font-semibold text-white transition-colors hover:bg-obsidian/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                  >
                    Baca Sejarah Lengkap
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Kanan — Sidebar */}
            <div className="lg:col-span-2">
              {/* Batas Wilayah */}
              <div className="rounded-[12px] border border-sage bg-paper p-5 shadow-paper-sm dark:border-[#414943] dark:bg-[#1a1a1a]">
                <div className="mb-4 flex items-center gap-2.5">
                  <MapPin className="h-5 w-5 text-hudson-blue dark:text-[#84bd3a]" />
                  <h3 className="font-display text-headline-small font-semibold text-obsidian dark:text-white">
                    Batas Wilayah
                  </h3>
                </div>
                <div className="space-y-3">
                  {desa.batasUtara && <BorderItem arah="Utara" value={desa.batasUtara} />}
                  {desa.batasTimur && <BorderItem arah="Timur" value={desa.batasTimur} />}
                  {desa.batasSelatan && <BorderItem arah="Selatan" value={desa.batasSelatan} />}
                  {desa.batasBarat && <BorderItem arah="Barat" value={desa.batasBarat} />}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}