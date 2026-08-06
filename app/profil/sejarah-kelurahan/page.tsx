import { prisma } from "@/lib/prisma";
import SejarahPageClient, {
  type SejarahData,
} from "@/components/stitch/sejarah-page-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sejarah — Kelurahan Salomallori",
  description:
    "Sejarah, batas wilayah, dan visi misi Kelurahan Salomallori, Kec. Dua Pitue, Kab. Sidenreng Rappang.",
};

export default async function SejarahKelurahanPage() {
  const desa = await prisma.desa.findFirst();

  const batasWilayah = [
    { arah: "Utara", wilayah: desa?.batasUtara },
    { arah: "Timur", wilayah: desa?.batasTimur },
    { arah: "Selatan", wilayah: desa?.batasSelatan },
    { arah: "Barat", wilayah: desa?.batasBarat },
  ].filter((b): b is { arah: string; wilayah: string } => Boolean(b.wilayah));

  const data: SejarahData = {
    desa: desa
      ? {
          nama: desa.nama,
          sejarah: desa.sejarah,
          visi: desa.visi,
          misi: desa.misi,
          luasWilayah: desa.luasWilayah,
          jumlahPenduduk: desa.jumlahPenduduk,
          jumlahKK: desa.jumlahKK,
          jumlahDusun: desa.jumlahDusun,
        }
      : null,
    batasWilayah,
    heroImage: "/images/bg-salomallori.png",
    fotoSejarah: desa?.fotoKepalaDesa ?? null,
  };

  return <SejarahPageClient data={data} />;
}