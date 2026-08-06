"use client";

import { useTheme } from "next-themes";
import { SejarahResmi } from "./sejarah-resmi";
import { SejarahDark } from "./sejarah-dark";

export interface SejarahData {
  desa: {
    nama: string;
    sejarah: string;
    luasWilayah: number | null;
    jumlahPenduduk: number | null;
    jumlahKK: number | null;
    jumlahDusun: number | null;
    visi: string;
    misi: string;
  } | null;
  batasWilayah: { arah: string; wilayah: string }[];
  heroImage: string;
  fotoSejarah: string | null;
}

interface SejarahPageClientProps {
  data: SejarahData;
}

export default function SejarahPageClient({ data }: SejarahPageClientProps) {
  const { resolvedTheme } = useTheme();

  return resolvedTheme === "dark" ? (
    <SejarahDark data={data} />
  ) : (
    <SejarahResmi data={data} />
  );
}