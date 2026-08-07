"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BerandaResmi } from "./beranda-resmi";
import { BerandaDark } from "./beranda-dark";

export interface BerandaPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  image: string | null;
  dateLabel: string;
  category: string | null;
}

export interface BerandaGaleri {
  id: string;
  judul: string;
  gambar: string;
  kategori: string;
}

export interface BerandaData {
  desa: {
    nama: string;
    sejarah: string;
    luasWilayah: number | null;
    jumlahPenduduk: number | null;
    jumlahKK: number | null;
    jumlahDusun: number | null;
  } | null;
  batasWilayah: { arah: string; wilayah: string }[];
  posts: BerandaPost[];
  galeri: BerandaGaleri[];
  heroImage: string;
  fotoSejarah: string | null;
}

interface BerandaPageClientProps {
  data: BerandaData;
}

export default function BerandaPageClient({ data }: BerandaPageClientProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Hindari hydration mismatch: saat SSR / sebelum mounted,
  // render kosong dulu agar server & client menghasilkan HTML yang sama.
  if (!mounted) return null;

  return resolvedTheme === "dark" ? (
    <BerandaDark data={data} />
  ) : (
    <BerandaResmi data={data} />
  );
}
