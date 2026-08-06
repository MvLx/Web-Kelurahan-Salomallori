"use client";

import { useTheme } from "next-themes";
import { BerandaResmi } from "@/components/stitch/beranda-resmi";
import { BerandaDark } from "@/components/stitch/beranda-dark";

export default function BerandaPage() {
  const { resolvedTheme } = useTheme();

  return resolvedTheme === "dark" ? <BerandaDark /> : <BerandaResmi />;
}