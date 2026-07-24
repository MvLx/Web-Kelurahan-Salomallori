import { prisma } from "@/lib/prisma";
import type { Wisata } from "@/lib/generated/prisma/client";
import { WisataClient } from "@/components/wisata/wisata-client";

export const dynamic = "force-dynamic";

export default async function WisataIndexPage() {
  let items: Wisata[] = [];
  let error: string | null = null;

  try {
    items = await prisma.wisata.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    error = err instanceof Error ? err.message : "Gagal memuat data";
  }

  return <WisataClient items={items} error={error} />;
}