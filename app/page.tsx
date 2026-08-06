import { prisma } from "@/lib/prisma";
import BerandaPageClient, { type BerandaData } from "@/components/stitch/beranda-page-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Beranda — Kelurahan Salomallori",
  description:
    "Website resmi Kelurahan Salomallori, Kec. Dua Pitue, Kab. Sidenreng Rappang",
};

export default async function BerandaPage() {
  const [desa, posts, galeri] = await Promise.all([
    prisma.desa.findFirst(),
    prisma.post.findMany({
      where: { published: true },
      include: {
        category: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    prisma.galeri.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  const batasWilayah = [
    { arah: "Utara", wilayah: desa?.batasUtara },
    { arah: "Timur", wilayah: desa?.batasTimur },
    { arah: "Selatan", wilayah: desa?.batasSelatan },
    { arah: "Barat", wilayah: desa?.batasBarat },
  ].filter((b): b is { arah: string; wilayah: string } => Boolean(b.wilayah));

  const data: BerandaData = {
    desa: desa
      ? {
          nama: desa.nama,
          sejarah: desa.sejarah,
          luasWilayah: desa.luasWilayah,
          jumlahPenduduk: desa.jumlahPenduduk,
          jumlahKK: desa.jumlahKK,
          jumlahDusun: desa.jumlahDusun,
        }
      : null,
    batasWilayah,
    posts: posts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      image: p.image,
      dateLabel: new Date(p.createdAt).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      category: p.category?.name ?? null,
    })),
    galeri: galeri.map((g) => ({
      id: g.id,
      judul: g.judul,
      gambar: g.gambar,
      kategori: g.kategori,
    })),
    heroImage: "/images/hero-bg.jpg",
  };

  return <BerandaPageClient data={data} />;
}