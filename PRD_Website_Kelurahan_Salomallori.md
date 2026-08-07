# Product Requirement Document (PRD)

## Website Profil Kelurahan Salomallori — KKN Universitas Hasanuddin

> **Dokumen ini disinkronkan dengan kondisi aktual proyek per Agustus 2026.**
> Fase 1–4 selesai, Fase 5 (Tracking Pelayanan) **di-skip**, Fase 6 (Peta Interaktif) masih ide.

---

## 1. Executive Summary

Proyek ini bertujuan untuk membangun **Website Profil Kelurahan Salomallori**, Kecamatan Dua Pitue, Kabupaten Sidenreng Rappang (Sidrap), Sulawesi Selatan. Website ini dikembangkan sebagai bagian dari program Kuliah Kerja Nyata (KKN) Universitas Hasanuddin. Platform ini menjadi pusat informasi digital kelurahan yang menampilkan profil kelurahan, potensi wisata, UMKM lokal, berita kegiatan, galeri dokumentasi, infografis statistik, serta kontak dan lokasi. Dikembangkan menggunakan teknologi modern (Next.js, Tailwind CSS, Prisma, PostgreSQL) agar responsif, cepat, dan mudah dikelola.

> **Catatan:** Modul **Tracking Pelayanan Kelurahan** (Fase 5) **tidak diimplementasikan** berdasarkan keputusan tim. Fokus saat ini adalah website profil & informasi publik.

---

## 2. Latar Belakang

Kelurahan Salomallori memiliki luas wilayah sekitar **2,75 km²** dengan jumlah penduduk **1.599 jiwa** (561 KK). Kelurahan ini terbagi menjadi **3 dusun** dan berbatasan dengan:
- **Utara:** Desa Ajubissue (Kec. Pitu Riawa)
- **Timur:** Desa Padangloang Alau
- **Selatan:** Desa Sumpang Mango (Kec. Pitu Riawa)
- **Barat:** Desa Sumpang Mango (Kec. Pitu Riawa)

**Potensi utama kelurahan:**
- **Sektor Pertanian:** Mayoritas penduduk bekerja sebagai petani padi sawah. Kecamatan Dua Pitue merupakan lumbung pangan utama Sidrap.
- **Sektor Peternakan:** Sentra ayam ras petelur yang menjadi penggerak ekonomi masyarakat.
- **Kerajinan & Kuliner:** Anyaman bambu, abon ikan, dan aneka kuliner khas lokal.

Dengan potensi besar ini, Kelurahan Salomallori membutuhkan media digital untuk mempromosikan potensi kelurahan, memperkenalkan UMKM lokal, serta menyediakan informasi publik yang transparan dan mudah diakses.

---

## 3. Tujuan

1. Menyediakan platform informasi digital terpadu untuk Kelurahan Salomallori
2. Mempromosikan potensi kelurahan (pertanian, peternakan, UMKM, wisata) ke khalayak luas
3. Memudahkan perangkat kelurahan dalam mengelola dan menyebarkan informasi publik
4. Mendokumentasikan kegiatan KKN dan program kerja secara digital
5. Meningkatkan transparansi informasi kelurahan kepada masyarakat

---

## 4. Target Pengguna

| Pengguna | Kebutuhan |
|---|---|
| **Masyarakat Kelurahan** | Mendapatkan informasi kelurahan, berita, UMKM, galeri, infografis |
| **Perangkat Kelurahan** | Mengelola konten website (berita, UMKM, wisata, galeri, profil, infografis, kontak) |
| **Wisatawan / Pengunjung** | Melihat potensi wisata, kuliner, dan budaya kelurahan |
| **Investor / Mitra** | Melihat potensi ekonomi dan UMKM kelurahan |
| **Tim KKN** | Mendokumentasikan program kerja dan kegiatan |

---

## 5. Fitur & Fungsionalitas

### 5.1 Modul Public (Tanpa Login)

| No | Fitur | Deskripsi | Status |
|---|---|---|---|
| 1 | **Landing Page / Beranda** | Hero section, statistik kelurahan, berita terbaru, sejarah, galeri, breaking news | ✅ Selesai |
| 2 | **Profil Kelurahan** | Sejarah, visi misi, data geografis & demografis, pejabat kelurahan, struktur organisasi | ✅ Selesai |
| 3 | **Berita & Kegiatan** | Daftar artikel berita kelurahan dengan filter & pencarian, detail berita | ✅ Selesai |
| 4 | **UMKM & Produk Lokal** | Katalog produk UMKM, detail produk, kontak penjual, filter kategori, pencarian | ✅ Selesai |
| 5 | **Wisata & Potensi** | Destinasi wisata, kuliner khas, budaya & tradisi | ✅ Selesai (tidak di-link navbar) |
| 6 | **Galeri Foto** | Grid galeri responsif dengan lightbox, filter kategori | ✅ Selesai |
| 7 | **Kontak & Lokasi** | Google Maps, kontak WhatsApp, alamat kantor kelurahan | ✅ Selesai |
| 8 | **Infografis** | Visualisasi data statistik kelurahan interaktif (Bar, Line, Pie, Doughnut, Area, Stat Cards) | ✅ Selesai |

### 5.2 Modul Admin (Login Diperlukan)

| No | Fitur | Deskripsi | Status |
|---|---|---|---|
| 1 | **Dashboard Admin** | Overview statistik & ringkasan konten | ✅ Selesai |
| 2 | **Kelola Berita** | CRUD berita (tambah, edit, hapus, publish) | ✅ Selesai |
| 3 | **Kelola UMKM** | CRUD produk UMKM | ✅ Selesai |
| 4 | **Kelola Wisata** | CRUD destinasi wisata | ✅ Selesai |
| 5 | **Kelola Galeri** | Upload & kelola foto galeri | ✅ Selesai |
| 6 | **Kelola Profil Kelurahan** | Edit data profil kelurahan, perangkat desa | ✅ Selesai |
| 7 | **Kelola Kontak** | Edit alamat, telepon, WhatsApp, email, jam kerja, Google Maps embed | ✅ Selesai |
| 8 | **Kelola Infografis** | Update data statistik kelurahan (judul, tahun, dataJson, chartType) | ✅ Selesai |
| 9 | **Kelola Kategori** | CRUD kategori berita | ✅ Selesai |
| 10 | **Kelola Pengguna** | Manajemen admin/editor (Super Admin) | ✅ Selesai |
| 11 | **Kelola Pesan** | Lihat pesan masuk dari pengunjung | ✅ Selesai |

### 5.3 Modul Autentikasi

| No | Fitur | Deskripsi | Status |
|---|---|---|---|
| 1 | **Login** | Autentikasi email/password via Better-Auth | ✅ Selesai |
| 2 | **Register** | Registrasi akun publik | ✅ Selesai |
| 3 | **Role Management** | Role: USER (warga), ADMIN, EDITOR | ✅ Selesai |

---

## 6. Tech Stack

| Komponen | Teknologi | Keterangan |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | SSR, API routes, front-end terpadu |
| **Front-end Library** | React 19 | UI interaktif |
| **CSS Framework** | Tailwind CSS 4 | Utility-first, responsif, dark mode |
| **SCSS** | Sass | Variabel & keyframe animations |
| **UI Components** | shadcn/ui | Komponen aksesibel & kustomizable |
| **Database** | PostgreSQL | Database relasional |
| **ORM** | Prisma 7 | Type-safe database access |
| **Autentikasi** | Better-Auth 1 | Manajemen sesi aman |
| **Rich Text Editor** | TipTap 3 (ProseMirror) | WYSIWYG editor untuk konten berita |
| **Image/File Upload** | Cloudinary 2 | Storage gambar |
| **Form Validation** | Zod 4 | Validasi input |
| **Icons** | Lucide React | Icon library |
| **Charts** | Recharts 3 | Visualisasi infografis |
| **Font** | Geist, Geist Mono, Montserrat | next/font/google |
| **Dark Mode** | next-themes | Tema terang & gelap |
| **Google Maps** | iframe embed (mapsEmbed) | Lokasi kelurahan |
| **Deployment** | Vercel | CI/CD, hosting global |

> **Catatan:** Nodemailer/Gmail SMTP TIDAK digunakan (Fase 5 di-skip).

---

## 7. Struktur Database (Prisma Schema)

### 7.1 Model — Auth & Konten (dari PortalBeritaKodim)

```
User
├── id (String)
├── name (String)
├── email (String, unique)
├── emailVerified (Boolean)
├── image (String, nullable)
├── role (Enum: USER, ADMIN, EDITOR)
├── banned (Boolean, nullable)
├── banReason (String, nullable)
├── banExpires (DateTime, nullable)
├── createdAt (DateTime)
└── updatedAt (DateTime)

Session (Better-Auth)
Account (Better-Auth)
Verification (Better-Auth)

Post (Berita)
├── id (String)
├── title (String)
├── slug (String, unique)
├── summary (Text)
├── fullContent (Text)
├── image (String, nullable)      — Cloudinary URL
├── views (Int)
├── trending (Boolean)
├── isHighlight (Boolean)
├── published (Boolean)
├── categoryId (FK → Category)
├── authors (FK → User, many-to-many)
├── createdAt (DateTime)
└── updatedAt (DateTime)

Category
├── id (String)
├── name (String, unique)
├── slug (String, unique)
└── color (String)

BreakingNews
├── id (String)
├── text (String)
├── labelLink (String, nullable)
├── postId (FK → Post, nullable)
├── isActive (Boolean)
├── createdAt (DateTime)
└── updatedAt (DateTime)

Message
├── id (String)
├── fullName (String)
├── email (String)
├── phoneNumber (String, nullable)
├── content (Text)
├── isRead (Boolean)
└── createdAt (DateTime)
```

### 7.2 Model — Kelurahan Salomallori (Ditambahkan)

```
Desa
├── id (String)
├── nama (String)
├── sejarah (Text)
├── visi (Text)
├── misi (Text)
├── luasWilayah (Float, nullable)
├── jumlahPenduduk (Int, nullable)
├── jumlahKK (Int, nullable)
├── jumlahDusun (Int, nullable)
├── batasUtara (String, nullable)
├── batasTimur (String, nullable)
├── batasSelatan (String, nullable)
├── batasBarat (String, nullable)
├── fotoKepalaDesa (String, nullable)
├── createdAt (DateTime)
└── updatedAt (DateTime)

PerangkatDesa
├── id (String)
├── nama (String)
├── jabatan (String)
├── foto (String, nullable)
├── urutan (Int)
├── createdAt (DateTime)
└── updatedAt (DateTime)

UMKM
├── id (String)
├── namaProduk (String)
├── deskripsi (Text)
├── harga (String, nullable)
├── kategori (String)
├── kontak (String)
├── gambar (String, nullable)
├── pemilik (String)
├── createdAt (DateTime)
└── updatedAt (DateTime)

Wisata
├── id (String)
├── nama (String)
├── deskripsi (Text)
├── lokasi (String)
├── kategori (Enum: WISATA_ALAM, KULINER, BUDAYA)
├── gambar (String, nullable)
├── createdAt (DateTime)
└── updatedAt (DateTime)

Galeri
├── id (String)
├── judul (String)
├── gambar (String)
├── kategori (String)
├── uploadedById (FK → User)
├── createdAt (DateTime)
└── updatedAt (DateTime)

Kontak (single record)
├── id (String)
├── alamat (Text)
├── telepon (String, nullable)
├── whatsapp (String, nullable)
├── email (String, nullable)
├── jamKerja (String, nullable)
├── mapsEmbed (Text, nullable)
├── createdAt (DateTime)
└── updatedAt (DateTime)

Infografis
├── id (String)
├── judul (String)
├── tahun (Int)
├── dataJson (Json)
├── chartType (Enum: BAR_CHART, LINE_CHART, PIE_CHART, DOUGHNUT_CHART, AREA_CHART, STAT_CARDS)
├── createdAt (DateTime)
└── updatedAt (DateTime)
```

**Mapping table:** `Desa → desa`, `PerangkatDesa → perangkat_desa`, `UMKM → umkm`, `Wisata → wisata`, `Galeri → galeri`, `Kontak → kontak`, `Infografis → infografis`.

### 7.3 Model Fase 5 — TIDAK ADA (SKIPPED)

> Model `Layanan`, `FormField`, `Permohonan`, `PermohonanData`, `ProgressHistory`, enum `StatusPermohonan`, `JenisAjuan`, `FieldType`, serta field `nik` & `phoneNumber` di `User` **TIDAK ADA** di schema. Fase 5 (Tracking Pelayanan) di-skip berdasarkan keputusan tim. Jangan membuat kode yang bergantung pada model-model tersebut.

---

## 8. User Flow

### 8.1 Pengunjung (Public)
```
Beranda → Lihat Profil Kelurahan (Sejarah, Pejabat, Visi Misi, Struktur)
        → Lihat Berita → Detail Berita
        → Lihat UMKM → Detail UMKM
        → Lihat Wisata → Detail Wisata
        → Lihat Galeri → Lightbox Foto
        → Lihat Infografis → Visualisasi Data
        → Hubungi / Lokasi (Kontak + Google Maps)
```

### 8.2 Admin / Editor
```
Login → Dashboard Admin
  → Ringkasan Konten (Postingan, UMKM, Wisata, Galeri, Pesan)
  → Kelola Berita (CRUD)
  → Kelola UMKM (CRUD)
  → Kelola Wisata (CRUD)
  → Kelola Galeri (Upload/Hapus)
  → Kelola Profil Kelurahan (Edit Desa & Perangkat)
  → Kelola Kontak (Edit kontak & Maps)
  → Kelola Infografis (CRUD data statistik)
  → Kelola Kategori (CRUD)
  → Kelola Pengguna (Admin only)
  → Lihat Pesan Masuk
```

---

## 9. Non-Functional Requirements

| Aspek | Spesifikasi | Status |
|---|---|---|
| **Responsivitas** | Tampilan optimal di desktop, tablet, dan smartphone | ✅ |
| **Dark Mode** | Mendukung tema terang & gelap (Tailwind dark mode + next-themes) | ✅ |
| **Performa** | Lighthouse score tinggi, image optimization | ✅ |
| **Keamanan** | Autentikasi aman (Better-Auth), hashed password, HTTPS | ✅ |
| **SEO** | SSR untuk halaman public, meta tags, Open Graph, sitemap.xml, robots.txt | ✅ |
| **Aksesibilitas** | Menggunakan komponen shadcn/ui yang aksesibel | ✅ |
| **Maintainability** | Kode terstruktur, modular, dokumentasi jelas | ✅ |

---

## 10. Timeline & Milestone

| Fase | Kegiatan | Durasi | Status |
|---|---|---|---|
| **Fase 1** | Inisialisasi project, setup environment, database, & autentikasi | 5 hari | ✅ Selesai |
| **Fase 2** | Halaman public (Beranda, Profil, Berita, UMKM, Wisata, Galeri, Infografis, Kontak) | 4 hari | ✅ Selesai |
| **Fase 3** | Dashboard admin, CRUD konten, testing & debugging | 3 hari | ✅ Selesai |
| **Fase 4** | Deployment ke Vercel, dokumentasi & serah terima | 2 hari | ✅ Selesai |
| **Fase 5** | Modul Tracking Pelayanan | 5 hari | ❌ **Di-skip** |
| **Fase 6** | Peta Interaktif (Leaflet + GeoJSON) | — | 🔮 **Masih ide** |
| **Total** | | **14 hari (Fase 1–4)** | |

---

## 11. Kriteria Keberhasilan (Success Metrics)

- ✅ Website berhasil di-deploy dan dapat diakses publik via Vercel (`https://www.salomallori.web.id`)
- ✅ Semua halaman public menampilkan konten dengan benar
- ✅ Admin dapat login dan melakukan CRUD data
- ✅ Galeri foto dapat di-upload dan ditampilkan
- ✅ Website responsif di perangkat mobile
- ✅ Dark mode berfungsi dengan baik
- ✅ Waktu loading halaman cepat

---

## 12. Risks & Mitigation

| Risiko | Mitigasi |
|---|---|
| Keterbatasan data kelurahan | Koordinasi dengan perangkat kelurahan untuk pengumpulan data |
| Keterbatasan akses internet | Optimalisasi performa & lazy loading |
| Perubahan kebutuhan | Pendekatan agile dengan iterasi cepat |
| Keamanan data | Implementasi autentikasi & otorisasi ketat |
| Kehilangan dokumentasi | Version control git + dokumentasi terpusat (AGENTS.md, PROJECT_STRUCTURE.md, DESIGN.md) |

---

## 13. Rencana Pengembangan Selanjutnya (Fase 6 — Ide)

**Peta Interaktif Wilayah** (`/peta-wilayah`) — menggunakan Leaflet + react-leaflet:
- Polygon 3 dusun dari GeoJSON (disediakan tim GIS)
- Marker titik penting (kantor kelurahan, masjid, sekolah, puskesmas, dll.)
- Tile light (OpenStreetMap) / dark (CartoDB Dark Matter)
- Legend + toggle layer per dusun

**Prasyarat:**
1. Tim GIS mengekspor `batas-dusun.geojson` & `titik-penting.geojson` dari ArcGIS/QGIS
2. Jika file belum siap, bisa pakai placeholder/dummy GeoJSON untuk testing

---

## 14. Glossary

| Istilah | Definisi |
|---|---|
| **SSR** | Server-Side Rendering — halaman di-render di server |
| **CRUD** | Create, Read, Update, Delete — operasi dasar data |
| **ORM** | Object-Relational Mapping — jembatan database & kode |
| **CI/CD** | Continuous Integration / Continuous Deployment |
| **UUID / CUID** | Identifiers unik |
| **GeoJSON** | Format data geospasial berbasis JSON |
| **IDM** | Indeks Desa Membangun — indeks kemandirian desa |

---

*Dokumen ini disusun oleh Tim KKN Universitas Hasanuddin — Program Kerja Pembuatan Website Profil Kelurahan Salomallori, Kecamatan Dua Pitue, Kabupaten Sidenreng Rappang. Disinkronkan dengan kondisi aktual proyek per Agustus 2026.*