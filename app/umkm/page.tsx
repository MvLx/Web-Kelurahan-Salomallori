import { prisma } from "@/lib/prisma";
import type { UMKM } from "@/lib/generated/prisma/client";
import { UMKMClient } from "@/components/umkm/umkm-client";

export const dynamic = "force-dynamic";

export default async function UMKMIndexPage() {
  let items: UMKM[] = [];
  let error: string | null = null;

  try {
    items = await prisma.uMKM.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    error = err instanceof Error ? err.message : "Gagal memuat data";
  }

  return <UMKMClient items={items} error={error} />;
}