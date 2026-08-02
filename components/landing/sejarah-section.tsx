"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { History, ArrowRight, ScrollText } from "lucide-react";

type DesaData = {
  nama: string;
  sejarah: string | null;
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
    <section className="bg-linen py-4xl dark:bg-[#111411]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <History className="h-7 w-7 text-hudson-blue dark:text-[#7fc8ff]" />
            <h2 className="font-display text-display-small font-semibold text-obsidian dark:text-white">
              Sejarah Kelurahan
            </h2>
          </div>
          <Link
            href="/profil/sejarah-kelurahan"
            className="inline-flex items-center gap-1.5 font-body text-label-large font-semibold text-hudson-blue transition-colors hover:text-hudson-blue/80 dark:text-[#7fc8ff] dark:hover:text-[#7fc8ff]/80"
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
          <div className="rounded-[12px] border border-sage bg-paper p-6 shadow-paper-sm dark:border-[#414943] dark:bg-[#1a1a1a] md:p-8">
            <p className="whitespace-pre-line font-body text-body-medium leading-relaxed text-iron dark:text-[#c2c8bd]">
              {desa.sejarah}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}