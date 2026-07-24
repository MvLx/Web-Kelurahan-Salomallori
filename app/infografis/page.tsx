import { prisma } from "@/lib/prisma";
import InfografisClient from "@/components/infografis/infografis-client";

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface InfografisItem {
  id: string;
  judul: string;
  tahun: number;
  dataJson: DataPoint[];
  chartType: string;
  createdAt: string;
  updatedAt: string;
}

export const dynamic = "force-dynamic";

export default async function InfografisPage() {
  let items: InfografisItem[] = [];
  let error: string | null = null;

  try {
    const raw = await prisma.infografis.findMany({
      orderBy: { createdAt: "desc" },
    });
    items = raw.map((item) => ({
      id: item.id,
      judul: item.judul,
      tahun: item.tahun,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dataJson: ((item.dataJson as unknown) as any[]) || [],
      chartType: item.chartType,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));
  } catch (err) {
    error = err instanceof Error ? err.message : "Gagal memuat data";
  }

  return <InfografisClient items={items} error={error} />;
}