import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding data Kelurahan Salomallori...");

  // --- DATA DESA ---
  await prisma.desa.upsert({
    where: { id: "desa-salomallori" },
    update: {},
    create: {
      id: "desa-salomallori",
      nama: "Salomallori",
      sejarah:
        "Kelurahan Salomallori merupakan salah satu kelurahan yang berada di Kecamatan Dua Pitue, Kabupaten Sidenreng Rappang, Sulawesi Selatan. Kelurahan ini memiliki potensi besar di sektor pertanian dan peternakan yang menjadi tulang punggung perekonomian masyarakat.",
      visi:
        "Terwujudnya Kelurahan Salomallori yang maju, mandiri, dan sejahtera melalui peningkatan pelayanan publik, pemberdayaan masyarakat, dan pembangunan infrastruktur yang berkelanjutan.",
      misi:
        "1. Meningkatkan kualitas pelayanan administrasi kelurahan\n2. Memberdayakan UMKM dan potensi lokal\n3. Membangun infrastruktur yang merata\n4. Meningkatkan partisipasi masyarakat dalam pembangunan\n5. Melestarikan nilai-nilai budaya dan kearifan lokal",
      luasWilayah: 2.75,
      jumlahPenduduk: 1599,
      jumlahKK: 561,
      jumlahDusun: 3,
      batasUtara: "Desa Ajubissue (Kec. Pitu Riawa)",
      batasTimur: "Desa Padangloang Alau",
      batasSelatan: "Desa Sumpang Mango (Kec. Pitu Riawa)",
      batasBarat: "Desa Sumpang Mango (Kec. Pitu Riawa)",
    },
  });

  // --- PERANGKAT DESA ---
  const perangkatData = [
    { nama: "H. Muhammad", jabatan: "Lurah", urutan: 1 },
    { nama: "Andi Surya", jabatan: "Sekretaris Lurah", urutan: 2 },
    { nama: "Abdul Rahman", jabatan: "Kasi Pemerintahan", urutan: 3 },
    { nama: "Sitti Nurhaya", jabatan: "Kasi Kesejahteraan", urutan: 4 },
    { nama: "Muhammad Jufri", jabatan: "Kasi Pelayanan", urutan: 5 },
    { nama: "Sukri", jabatan: "Kepala Dusun I", urutan: 6 },
    { nama: "Baharuddin", jabatan: "Kepala Dusun II", urutan: 7 },
    { nama: "Ruslan", jabatan: "Kepala Dusun III", urutan: 8 },
  ];

  for (const p of perangkatData) {
    await prisma.perangkatDesa.create({ data: p });
  }

  // --- UMKM ---
  const umkmData = [
    {
      namaProduk: "Beras Salomallori Premium",
      deskripsi: "Beras kualitas terbaik hasil pertanian lokal Kelurahan Salomallori yang ditanam dengan metode tradisional dan modern.",
      harga: "Rp 50.000/kg",
      kategori: "Pertanian",
      kontak: "081234567890",
      pemilik: "Kelompok Tani Salomallori",
    },
    {
      namaProduk: "Telur Ayam Kampung",
      deskripsi: "Telur ayam kampung segar dari peternakan lokal Kelurahan Salomallori.",
      harga: "Rp 30.000/papan",
      kategori: "Peternakan",
      kontak: "081234567891",
      pemilik: "Peternakan Makmur",
    },
    {
      namaProduk: "Kerajinan Anyaman",
      deskripsi: "Anyaman bambu dan rotan buatan pengrajin lokal Salomallori. Tersedia dalam berbagai bentuk seperti tas, tikar, dan hiasan dinding.",
      harga: "Rp 25.000 - Rp 150.000",
      kategori: "Kerajinan",
      kontak: "081234567892",
      pemilik: "Rumah Kreatif Salomallori",
    },
    {
      namaProduk: "Abon Ikan",
      deskripsi: "Olahan abon ikan laut dan ikan air tawar khas Salomallori dengan cita rasa gurih dan kaya protein.",
      harga: "Rp 35.000/toples",
      kategori: "Kuliner",
      kontak: "081234567893",
      pemilik: "Dapur Salomallori",
    },
  ];

  for (const u of umkmData) {
    await prisma.uMKM.create({ data: u });
  }

  // --- WISATA ---
  const wisataData: Array<{
    nama: string;
    deskripsi: string;
    lokasi: string;
    kategori: "WISATA_ALAM" | "KULINER" | "BUDAYA";
  }> = [
    {
      nama: "Persawahan Salomallori",
      deskripsi: "Hamparan sawah hijau yang membentang luas di Kelurahan Salomallori. Tempat yang sempurna untuk menikmati keindahan alam pedesaan dan matahari terbenam.",
      lokasi: "Dusun I, Kelurahan Salomallori",
      kategori: "WISATA_ALAM",
    },
    {
      nama: "Kuliner Malam Salomallori",
      deskripsi: "Berbagai jajanan khas Salomallori yang bisa dinikmati di malam hari, termasuk aneka gorengan, pisang epe, dan coto.",
      lokasi: "Pusat Kelurahan Salomallori",
      kategori: "KULINER",
    },
    {
      nama: "Tradisi Mappadendang",
      deskripsi: "Upacara adat syukuran panen padi yang dilakukan oleh masyarakat Salomallori. Ditampilkan dengan musik tradisional dan tarian khas Bugis.",
      lokasi: "Lapangan Kelurahan Salomallori",
      kategori: "BUDAYA",
    },
  ];

  for (const w of wisataData) {
    await prisma.wisata.create({ data: w });
  }

  // --- INFOGRAFIS ---
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const infografisData: any[] = [
    {
      judul: "Statistik Penduduk Kelurahan Salomallori",
      tahun: 2026,
      chartType: "STAT_CARDS",
      dataJson: {
        totalPenduduk: 1599,
        jumlahKK: 561,
        luasWilayah: 2.75,
        jumlahDusun: 3,
        lakiLaki: 802,
        perempuan: 797,
      },
    },
    {
      judul: "Komposisi Penduduk per Dusun",
      tahun: 2026,
      chartType: "BAR_CHART",
      dataJson: {
        labels: ["Dusun I", "Dusun II", "Dusun III"],
        datasets: [{ label: "Jumlah Penduduk", data: [550, 530, 519] }],
      },
    },
    {
      judul: "Mata Pencaharian",
      tahun: 2026,
      chartType: "PIE_CHART",
      dataJson: {
        labels: ["Petani", "Peternak", "Pedagang", "PNS", "Lainnya"],
        datasets: [{ label: "Persentase", data: [45, 20, 15, 10, 10] }],
      },
    },
  ];

  for (const inf of infografisData) {
    await prisma.infografis.create({ data: inf });
  }

  console.log("✅ Seed data berhasil!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });