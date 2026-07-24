import { prisma } from "@/lib/prisma";
import type { Galeri } from "@/lib/generated/prisma/client";
import { GaleriClient } from "@/components/galeri/galeri-client";

export const dynamic = "force-dynamic";

export default async function GaleriIndexPage() {
  let items: Galeri[] = [];
  let error: string | null = null;

  try {
    items = await prisma.galeri.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    error = err instanceof Error ? err.message : "Gagal memuat data";
  }

  return <GaleriClient items={items} error={error} />;
}