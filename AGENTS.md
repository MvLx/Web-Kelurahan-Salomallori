# Agent Guide — Website Profil Kelurahan Salomallori

Panduan teknis untuk AI agent dalam membangun Website Profil Kelurahan Salomallori, KKN Universitas Hasanuddin.

> **Dokumen ini disinkronkan dengan kondisi aktual proyek per Agustus 2026.**
> Fase 1–4 selesai, Fase 5 (Tracking Pelayanan) **di-skip**, Fase 6 (Peta Interaktif) masih ide.

## 0. Aturan Kerja Agent

### 0.1 Eksekusi Per Run
- SETIAP SATU RUN HANYA mengerjakan **satu task** dari daftar di Section 8
- Jangan melanjutkan ke task berikutnya dalam run yang sama
- Setelah task selesai, **ubah tanda `[ ]` menjadi `[x]`** di daftar Section 8 untuk menandai progress
- Setelah selesai, laporkan hasil dan tunggu perintah untuk run berikutnya
- **Sebelum mulai mengerjakan task apa pun, baca `PROJECT_STRUCTURE.md`** untuk mengetahui struktur proyek terkini, **lalu baca `DESIGN.md`** untuk referensi warna, font, spacing, shadow, dan komponen styling — gunakan sebagai panduan visual di setiap halaman yang dibuat/dimodifikasi

### 0.2 Commit Per Task
- SETELAH setiap task selesai dan sudah diverifikasi, WAJIB melakukan git commit
- Format commit message:

| Task Tipe | Prefix | Contoh |
|---|---|---|
| Setup/migrasi | `chore:` | `chore: clone repo PortalBeritaKodim dan install dependencies` |
| Model/schema baru | `feat(db):` | `feat(db): tambah model Desa, PerangkatDesa, UMKM, Wisata, Galeri, Infografis` |
| Halaman public | `feat(public):` | `feat(public): buat halaman UMKM + detail produk` |
| Halaman admin | `feat(admin):` | `feat(admin): tambah CRUD UMKM di dashboard` |
| API routes | `feat(api):` | `feat(api): tambah API routes untuk UMKM (list, create, get, update, delete)` |
| Modifikasi | `feat:` | `feat: modifikasi beranda dengan hero section + statistik kelurahan` |
| Testing | `test:` | `test: testing end-to-end semua CRUD` |
| Deploy | `deploy:` | `deploy: konfigurasi Vercel dan deploy` |
| Dokumentasi | `docs:` | `docs: selaraskan DESIGN.md dengan kondisi aktual kode` |

- Contoh perintah:
  ```bash
  git add -A
  git commit -m "feat(api): tambah API routes untuk UMKM (list, create, get, update, delete)"
  ```

### 0.3 Verifikasi Per Task
Sebelum commit, pastikan:

1. **TypeScript** — tidak ada error:
   ```bash
   npx tsc --noEmit
   ```
   *(Jika ada error, perbaiki dulu sebelum commit)*

2. **Lint** — tidak ada error (jika tersedia):
   ```bash
   npm run lint
   ```

3. **Build** — tidak broken (jika memungkinkan untuk task yang dikerjakan):
   ```bash
   npm run build
   ```
   *(Untuk task kecil/parsial yang belum bisa di-build, skip langkah ini)*

### 0.4 Dependency Rules (Urutan Wajib)
Task berikut memiliki dependensi dan TIDAK BOLEH dikerjakan sebelum dependensinya selesai:

| Task | Dependensi |
|---|---|
| Migrasi database | Schema Prisma harus selesai |
| Seed data | Migrasi harus selesai |
| Semua API routes | Migrasi harus selesai |
| Halaman public yang panggil DB | API routes atau Prisma query harus siap |
| Halaman admin CRUD | API routes harus selesai |
| Testing | Semua halaman public dan admin harus selesai |

### 0.5 Akhir Run — Wajib Lapor
Setelah commit, laporkan:
1. Task apa yang dikerjakan
2. Perubahan apa saja yang dibuat (file yang ditambah/dimodifikasi)
3. Status verifikasi (TS error/lint/build)
4. Tandai task yang sudah selesai dengan `[x]` di daftar Section 8
5. Task berikutnya yang akan dikerjakan

### 0.6 Konfirmasi Keberhasilan Per Task
Setiap task WAJIB dikonfirmasi keberhasilannya sebelum dianggap selesai.

**Kriteria task SUKSES:**
- Semua perintah dieksekusi dengan exit code = 0 (tidak ada error)
- Verifikasi TypeScript/lint/build di Section 0.3 lolos
- Git commit berhasil (jalankan `git log -1 --oneline` untuk konfirmasi)
- File yang diharapkan sudah ada di filesystem
- Tanda `[ ]` sudah diubah menjadi `[x]` di Section 8

**Kriteria task GAGAL:**
- Ada error yang tidak bisa diperbaiki dalam run ini
- Exit code command ≠ 0
- Verifikasi gagal dan tidak ada solusi langsung

**Jika task SUKSES:**
```laporan
✅ Task X selesai — [nama task]
- Commit: [hash commit]
- Verifikasi: TS ✅ | Lint ✅ | Build ✅
- File diubah: [daftar file]
- Task selanjutnya: [task Y]
```

**Jika task GAGAL:**
```laporan
❌ Task X gagal — [nama task]
- Error: [detail error]
- Langkah yang sudah dicoba: [deskripsi]
```
Jangan commit jika task gagal. Laporkan error dan tunggu arahan.

---

## 1. Sumber Kode (Base Repository)

Clone dan modifikasi dari: **`RezkyRobby23h/PortalBeritaKodim`**

```
git clone https://github.com/RezkyRobby23h/PortalBeritaKodim.git Web-Kelurahan-Salomallori
cd Web-Kelurahan-Salomallori
rm -rf .git          # Hapus history git PortalBeritaKodim
git init             # Inisialisasi repo git baru untuk Web-Kelurahan-Salomallori
```

**Remote repository saat ini:**
```
origin: https://github.com/MvLx/Web-Kelurahan-Salomallori.git
```

**Directory layout target:**
```
KKN/
├── Persiapan/           # Dokumentasi & persiapan (tidak diedit agent)
│   └── docs/
│       ├── PRD_Website_Kelurahan_Salomallori.md
│       ├── agent.md
│       └── design.md
└── Web-Kelurahan-Salomallori/     # Project Next.js (clone dari PortalBeritaKodim)
```

---

## 2. Tech Stack (Aktual)

| Komponen | Teknologi | Versi |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| UI Library | React | 19.x |
| CSS | Tailwind CSS | 4.x |
| SCSS | Sass (variabel & keyframe animations) | latest |
| Components | shadcn/ui | latest |
| Database | PostgreSQL | latest |
| ORM | Prisma | 7.x |
| Auth | Better-Auth | 1.x |
| Rich Text | TipTap (ProseMirror) | 3.x |
| Image Upload | Cloudinary | 2.x |
| Icons | Lucide React | 0.x |
| Forms | Zod | 4.x |
| Charts | Recharts (via Infografis) | 3.x |
| Font | Geist, Geist Mono, Montserrat (next/font/google) | — |
| Dark Mode | next-themes | latest |
| Google Maps | iframe embed (mapsEmbed) | — |

> **Catatan:** Nodemailer/Gmail SMTP TIDAK digunakan (Fase 5 Tracking Pelayanan di-skip).

---

## 3. Environment Setup

### 3.1 File `.env`
```
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET="..."
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

### 3.2 Database
```bash
npx prisma migrate dev --name nama_migrasi   # sesuaikan dengan task yang dikerjakan
npx prisma generate
npx prisma db seed  # jika ada seed
```

---

## 4. Struktur Database — Perubahan dari PortalBeritaKodim

### 4.1 Model yang SUDAH ADA (dari PortalBeritaKodim)
- `User` — autentikasi + role (USER, ADMIN, EDITOR)
- `Session`, `Account`, `Verification` (Better-Auth)
- `Post` — untuk berita kelurahan (judul, slug, konten, gambar, category, trending, isHighlight, published)
- `Category` — kategori berita
- `BreakingNews` — pengumuman berjalan (marquee)
- `Message` — kontak/pesan dari pengunjung

### 4.2 Model yang SUDAH DITAMBAHKAN (Aktif)

```prisma
model Desa {
  id              String   @id @default(cuid())
  nama            String
  sejarah         String   @db.Text
  visi            String   @db.Text
  misi            String   @db.Text
  luasWilayah     Float?
  jumlahPenduduk  Int?
  jumlahKK        Int?
  jumlahDusun     Int?
  batasUtara      String?
  batasTimur      String?
  batasSelatan    String?
  batasBarat      String?
  fotoKepalaDesa  String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@map("desa")
}

model PerangkatDesa {
  id        String   @id @default(cuid())
  nama      String
  jabatan   String
  foto      String?
  urutan    Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("perangkat_desa")
}

model UMKM {
  id         String   @id @default(cuid())
  namaProduk String
  deskripsi  String   @db.Text
  harga      String?
  kategori   String
  kontak     String
  gambar     String?
  pemilik    String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("umkm")
}

model Wisata {
  id         String         @id @default(cuid())
  nama       String
  deskripsi  String         @db.Text
  lokasi     String
  kategori   WisataKategori
  gambar     String?
  createdAt  DateTime       @default(now())
  updatedAt  DateTime       @updatedAt

  @@map("wisata")
}

enum WisataKategori {
  WISATA_ALAM
  KULINER
  BUDAYA
}

model Galeri {
  id           String   @id @default(cuid())
  judul        String
  gambar       String
  kategori     String
  uploadedById String
  uploadedBy   User     @relation(fields: [uploadedById], references: [id])
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@map("galeri")
}

model Kontak {
  id        String   @id @default(cuid())
  alamat    String   @db.Text
  telepon   String?
  whatsapp  String?
  email     String?
  jamKerja  String?
  mapsEmbed String?  @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("kontak")
}

model Infografis {
  id        String    @id @default(cuid())
  judul     String
  tahun     Int
  dataJson  Json
  chartType ChartType @default(BAR_CHART)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@map("infografis")
}

enum ChartType {
  BAR_CHART
  LINE_CHART
  PIE_CHART
  DOUGHNUT_CHART
  AREA_CHART
  STAT_CARDS
}
```

### 4.3 Model Fase 5 — Tracking Pelayanan (SKIPPED)

> **Fase 5 di-skip berdasarkan keputusan tim.** Model `Layanan`, `FormField`, `Permohonan`, `PermohonanData`, `ProgressHistory`, serta field `nik` & `phoneNumber` di `User` **TIDAK ADA** di schema dan **TIDAK AKAN ditambahkan** dalam kondisi saat ini. Jangan membuat kode yang bergantung pada model-model tersebut.

---

## 5. Panduan Modifikasi — Halaman Existing

### 5.1 Beranda (`app/page.tsx`)
- **SUDAH SELESAI** — dibangun dari `components/stitch/beranda-page-client.tsx`
- Memilih `BerandaResmi` (light) atau `BerandaDark` (dark) berdasarkan `resolvedTheme`
- Section: Hero (bg gambar + overlay), Statistik kelurahan, Berita terbaru, Sejarah, Galeri, Breaking news

### 5.2 Profil (`app/profil/`)
- **SUDAH SELESAI** — profil Kelurahan Salomallori, data dari model `Desa`
- Sub-halaman aktif:
  - `/profil/sejarah-kelurahan` — Sejarah kelurahan
  - `/profil/pejabat-kelurahan` — Pejabat kelurahan
  - `/profil/visi-misi` — Visi & misi kelurahan
  - `/profil/struktur-organisasi` — Bagan struktur organisasi
- Folder sisa PortalBeritaKodim yang TIDAK dipakai navbar:
  - `app/profil/pejabat-kodim/` — ⚠️ sisa lama
  - `app/profil/sejarah-satuan/` — ⚠️ sisa lama
  - **Jangan dihapus** (aturan keamanan)

### 5.3 Berita (`app/news/` & `app/dashboard/posts/`)
- Halaman public: ✅ sudah OK
- Halaman admin CRUD: ✅ sudah OK

### 5.4 Aduan (`app/aduan/`) → Kontak
- **SUDAH SELESAI** — halaman Kontak & Lokasi
- Data dikelola via model `Kontak` (single record) + `app/dashboard/kontak`
- Terdiri: Google Maps embed, kontak WhatsApp, alamat kantor kelurahan

### 5.5 Auth (`app/auth/`)
- Tidak perlu diubah, langsung pakai

### 5.6 Dashboard (`app/dashboard/`)
- **SUDAH SELESAI** — sidebar 10 menu (lihat `components/custom/admin-sidebar.tsx`)
- Menu: Dashboard, Postingan, UMKM, Galeri, Profil Kelurahan, Kontak, Infografis, Kategori, Pengguna (admin only), Pesan
- Breaking News TIDAK ada di sidebar (tidak terpakai)

### 5.7 Akun User (`app/akun/`)
- Satu halaman profil user: `/akun/[id]`
- **TIDAK ADA** dashboard user tracking pelayanan (Fase 5 di-skip)

---

## 6. Halaman yang Ada (Route Aktif)

### 6.1 Public Pages

| Route | File | Keterangan | Status |
|---|---|---|---|
| `/` | `app/page.tsx` | Beranda (Hero + stats + berita + sejarah + galeri) | ✅ Aktif |
| `/profil` | `app/profil/page.tsx` | Profil kelurahan | ✅ Aktif |
| `/profil/sejarah-kelurahan` | `app/profil/sejarah-kelurahan/` | Sejarah kelurahan | ✅ Aktif |
| `/profil/pejabat-kelurahan` | `app/profil/pejabat-kelurahan/` | Pejabat kelurahan | ✅ Aktif |
| `/profil/visi-misi` | `app/profil/visi-misi/` | Visi & misi | ✅ Aktif |
| `/profil/struktur-organisasi` | `app/profil/struktur-organisasi/` | Bagan struktur | ✅ Aktif |
| `/news` | `app/news/page.tsx` | Daftar berita | ✅ Aktif |
| `/news/[slug]` | `app/news/[slug]/` | Detail berita | ✅ Aktif |
| `/umkm` | `app/umkm/page.tsx` | Katalog UMKM | ✅ Aktif |
| `/umkm/[id]` | `app/umkm/[id]/` | Detail UMKM | ✅ Aktif |
| `/wisata` | `app/wisata/page.tsx` | Daftar wisata | ✅ Aktif (tidak di-link navbar) |
| `/wisata/[id]` | `app/wisata/[id]/` | Detail wisata | ✅ Aktif (tidak di-link navbar) |
| `/galeri` | `app/galeri/page.tsx` | Galeri + lightbox | ✅ Aktif |
| `/infografis` | `app/infografis/page.tsx` | Visualisasi data | ✅ Aktif |
| `/kontak` | `app/aduan/page.tsx` | Kontak + Maps | ✅ Aktif |

### 6.2 Admin Pages

| Route | File | Keterangan | Status |
|---|---|---|---|
| `/dashboard` | `app/dashboard/page.tsx` | Overview | ✅ Aktif |
| `/dashboard/posts` | `app/dashboard/posts/` | CRUD berita | ✅ Aktif |
| `/dashboard/posts/create` | `app/dashboard/posts/create/` | Form berita | ✅ Aktif |
| `/dashboard/posts/[id]` | `app/dashboard/posts/[id]/` | Edit berita | ✅ Aktif |
| `/dashboard/breaking-news` | `app/dashboard/breaking-news/` | CRUD breaking news | ✅ Aktif (API, bukan di sidebar) |
| `/dashboard/categories` | `app/dashboard/categories/` | CRUD kategori | ✅ Aktif |
| `/dashboard/messages` | `app/dashboard/messages/` | Pesan masuk | ✅ Aktif |
| `/dashboard/users` | `app/dashboard/users/` | Manajemen user | ✅ Aktif (admin only) |
| `/dashboard/umkm` | `app/dashboard/umkm/` | CRUD UMKM | ✅ Aktif |
| `/dashboard/umkm/new` | `app/dashboard/umkm/new/` | Form UMKM | ✅ Aktif |
| `/dashboard/umkm/[id]/edit` | `app/dashboard/umkm/[id]/edit/` | Edit UMKM | ✅ Aktif |
| `/dashboard/wisata` | `app/dashboard/wisata/` | CRUD wisata | ✅ Aktif |
| `/dashboard/wisata/new` | `app/dashboard/wisata/new/` | Form wisata | ✅ Aktif |
| `/dashboard/wisata/[id]/edit` | `app/dashboard/wisata/[id]/edit/` | Edit wisata | ✅ Aktif |
| `/dashboard/galeri` | `app/dashboard/galeri/` | Kelola galeri | ✅ Aktif |
| `/dashboard/profil-desa` | `app/dashboard/profil-desa/` | Edit profil desa | ✅ Aktif |
| `/dashboard/infografis` | `app/dashboard/infografis/` | Kelola infografis | ✅ Aktif |
| `/dashboard/kontak` | `app/dashboard/kontak/` | Kelola kontak | ✅ Aktif |

### 6.3 Halaman Fase 5 — TIDAK ADA

> Dashboard user tracking (`/akun/dashboard/*`), dashboard layanan (`/dashboard/layanan/*`), dashboard permohonan (`/dashboard/permohonan/*`) **TIDAK ADA** — Fase 5 di-skip.

---

## 7. API Routes (Aktif)

### 7.1 Route yang ADA

```
app/api/
├── auth/[...all]/                  # Better-Auth endpoints
├── breaking-news/                  # GET, POST + [id]/
├── categories/                     # GET, POST + [id]/
├── desa/                           # GET, PUT (single record)
├── kontak/                         # GET, PUT (single record)
├── galeri/                         # GET, POST + [id]/
├── infografis/                     # GET, POST + [id]/
├── messages/                       # GET, POST + [id]/
├── perangkat-desa/                 # GET, POST + [id]/
├── posts/                          # GET, POST + [id]/
├── profile/[id]/                   # GET, PUT user profile
├── umkm/                           # GET (list + limit), POST + [id]/
├── upload/                         # Upload gambar ke Cloudinary
├── users/                          # GET, POST + [id]/
└── wisata/                         # GET (list + limit), POST + [id]/
```

### 7.2 Route Fase 5 — TIDAK ADA

> API `layanan/`, `permohonan/`, `user/profile/`, `email/send/` **TIDAK ADA** — Fase 5 di-skip.

### 7.3 Pattern API Route (contoh)

```ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.uMKM.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await prisma.uMKM.create({ data: body });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
```

---

## 8. Urutan Pengerjaan (Progress Tracker)

**Progress tracker:** Agent wajib mengubah `[ ]` menjadi `[x]` setelah setiap task selesai.

### Fase 1 — Setup & Database (Hari 1–5) ✅ SELESAI
- [x] 1. Clone repo PortalBeritaKodim ke `Web-Kelurahan-Salomallori/` — setelah clone, hapus folder `.git` dan jalankan `git init` agar project siap dipasangi remote repository baru milik KKN
- [x] 2. Install dependencies: `npm install`
- [x] 3. Tambah model `Desa`, `PerangkatDesa`, `UMKM`, `Wisata`, `Galeri`, `Infografis` ke `prisma/schema.prisma`
- [x] 4. Jalankan migrasi: `npx prisma migrate dev --name add_desa_models`
- [x] 5. Buat seed data kelurahan (minimal data Kelurahan Salomallori) — gunakan data dari `PRD_Website_Kelurahan_Salomallori.md` Section 2 (Latar Belakang): luas wilayah, penduduk, KK, dusun, dan batas wilayah (Utara, Timur, Selatan, Barat)
- [x] 6. Verifikasi auth Better-Auth berjalan
- [x] 7. Setup Cloudinary upload route

### Fase 2 — Halaman Public (Hari 6–9) ✅ SELESAI
- [x] 8a. Beranda: Hero section + statistik kelurahan
- [x] 8b. Beranda: Featured UMKM + Wisata terbaru
- [x] 8c. Beranda: Galeri foto grid + pengumuman kelurahan (breaking news)
- [x] 9. Modifikasi halaman profil dengan data Desa
- [x] 10. Modifikasi halaman visi-misi dari program-satuan
- [x] 11. Buat halaman UMKM + detail
- [x] 12. Buat halaman Wisata + detail
- [x] 13. Buat halaman Galeri + lightbox
- [x] 14. Buat halaman Infografis + IDM (placeholder siap)
- [x] 15. Modifikasi halaman kontak + Google Maps

### Fase 3 — Admin & CRUD (Hari 10–12) ✅ SELESAI
- [x] 16a. API routes untuk UMKM (list, create, get, update, delete)
- [x] 16b. API routes untuk Wisata
- [x] 16c. API routes untuk Galeri
- [x] 16d. API routes untuk Desa + PerangkatDesa
- [x] 16e. API routes untuk Infografis
- [x] 17. Dashboard admin: tambah menu baru
- [x] 18. Halaman CRUD UMKM (list, create, edit)
- [x] 19. Halaman CRUD Wisata
- [x] 20. Halaman kelola Galeri
- [x] 21. Halaman edit profil kelurahan & perangkat
- [x] 22. Halaman kelola Infografis
- [x] 22b. Model `Kontak` + halaman kelola kontak (`/dashboard/kontak`) + API `/api/kontak`
- [x] 22c. Halaman Kontak public (`/kontak` via `app/aduan/`) + Google Maps

### Fase 4 — Testing & Deploy (Hari 13–14) ✅ SELESAI
- [x] 23. Testing end-to-end (semua CRUD, auth, tampilan)
- [x] 24. Responsive testing (mobile, tablet, desktop)
- [x] 25. Dark mode testing
- [x] 26. Deploy ke Vercel
- [x] 27. Dokumentasi serah terima ke perangkat kelurahan

### Fase 5 — Tracking Pelayanan (SKIPPED) ❌ TIDAK DIKERJAKAN

> **Fase ini di-skip berdasarkan keputusan tim.** Fitur Tracking Pelayanan tidak diimplementasikan. Projek tetap aman dan tidak ada dependensi kode terhadap Fase 5.

Semua sub-task Fase 5 (28a–32e) TIDAK dikerjakan dan dianggap batal.

### Fase 6 — Peta Interaktif (Coming Soon — Masih Ide)

> **Status: IDE** — Fase ini adalah rencana fitur tambahan, belum dikerjakan. Dikerjakan setelah file GeoJSON batas dusun dan titik penting sudah disediakan oleh tim GIS.

#### 6A — Data & Setup
- [ ] 33. Install `leaflet` + `react-leaflet` + `@types/leaflet`
- [ ] 34. Siapkan file `public/data/batas-dusun.geojson` (polygon 3 dusun, properti: `nama`, `warna`, `deskripsi`) — **disediakan tim GIS dari ArcGIS/QGIS**
- [ ] 35. Siapkan file `public/data/titik-penting.geojson` (marker: kantor kelurahan, masjid, sekolah, puskesmas, dll.) — **disediakan tim GIS dari ArcGIS/QGIS**

#### 6B — Komponen Peta
- [ ] 36. Buat `components/peta/peta-client.tsx` — komponen utama Leaflet dengan:
  - Tile layer: OpenStreetMap (light) / CartoDB Dark Matter (dark mode)
  - Polygon 3 dusun dari GeoJSON, warna berbeda per dusun
  - Popup: klik polygon → tampilkan nama + luas + jumlah penduduk
  - Legend panel (pojok kanan bawah): nama dusun + kotak warna
  - Toggle layer: checkbox per dusun di legend
  - Marker titik penting dengan icon kustom per kategori
  - Zoom control + fit-to-bounds otomatis saat load
- [ ] 37. Buat `app/peta-wilayah/page.tsx` — halaman peta interaktif full-height

#### 6C — Integrasi Navbar
- [ ] 38. Modifikasi `components/custom/navbar-beranda.tsx`:
  - Ubah item `Infografis` (di dropdown Profil) menjadi **dropdown "Informasi Umum"**
  - Dropdown berisi: **Infografis** (`/infografis`) + **Peta Wilayah** (`/peta-wilayah`)
  - Gunakan icon `Map` dari lucide-react

#### 6D — Testing
- [ ] 39. Testing peta interaktif (zoom, popup, legend, toggle layer)
- [ ] 40. Testing responsive (mobile, tablet, desktop)
- [ ] 41. Testing dark mode (tile gelap vs terang)

**Tech Stack untuk Fase 6:**

| Komponen | Teknologi |
|---|---|
| Map Engine | Leaflet 1.x |
| React Binding | react-leaflet 5.x |
| Tile Provider | OpenStreetMap (gratis, tanpa API key) |
| Dark Mode Tile | CartoDB Dark Matter |
| Data Format | GeoJSON (file statis di `public/data/`) |
| Tidak perlu database / API routes / API key |

**Rute Baru:**

| Route | File | Keterangan |
|---|---|---|
| `/peta-wilayah` | `app/peta-wilayah/page.tsx` | Peta interaktif full-height |

**Perubahan Navbar:**

| Sebelum | Sesudah |
|---|---|
| Infografis (di dropdown Profil) | **Informasi Umum ▼** → Infografis + Peta Wilayah |

**Prasyarat Sebelum Dikerjakan:**
1. Tim GIS harus mengekspor dari ArcGIS/QGIS ke file GeoJSON:
   - `batas-dusun.geojson` — polygon 3 dusun
   - `titik-penting.geojson` — marker titik penting
2. Jika file belum siap, agent bisa buat **placeholder / dummy data** GeoJSON untuk testing, kemudian ditimpa dengan data asli

---

## 9. Konvensi Coding

### 9.1 Naming Convention
- File/Route: kebab-case. Komponen: PascalCase. Fungsi/Variabel: camelCase.

### 9.2 Struktur Komponen

```
components/
├── ui/                    # shadcn/ui (button, card, dialog, dll)
├── custom/                # Navbar, Footer, ThemeToggle, ImageUpload, dll
├── landing/               # Hero, Stats, News, Galeri, Sejarah sections
├── stitch/                # Beranda (beranda-page-client, beranda-resmi, beranda-dark, reveal)
├── galeri/                # GaleriClient (grid + filter + lightbox)
├── infografis/            # InfografisClient, ChartView
├── umkm/                  # UmkmClient (grid + filter + pencarian)
├── wisata/                # WisataClient (grid + filter kategori)
├── tiptap-extension/      # Ekstensi kustom TipTap
├── tiptap-icons/          # Icon set editor
├── tiptap-node/           # Node kustom TipTap
├── tiptap-templates/      # Template editor
├── tiptap-ui/             # Toolbar editor
└── tiptap-ui-primitive/   # Primitive UI editor
```

### 9.3 Error Handling
API route try-catch 500. Toast (sonner) untuk operasi CRUD. Loading/empty/skeleton state.

### 9.4 TypeScript
Strict mode. Prisma types. Zod validasi input.

### 9.5 Struktur Navbar

**Dua varian navbar:**

1. **Navbar Beranda** (`components/custom/navbar-beranda.tsx`) — floating pill:
   ```
   Floating navigation pill (fixed top-6, rounded-full, bg-#0b2b40/30 → /90 saat scroll)
   Logo Kab. logo_kab.png + "Kelurahan Salomallori" + sub-label "Kec. Dua Pitue, Kab. Sidenreng Rappang"
   Beranda | Profil ▼ (Sejarah Kelurahan, Pejabat Kelurahan, Infografis) | UMKM | Publikasi ▼ (Berita, Galeri Foto) | Kontak
   + ThemeToggle + Avatar user (dropdown: Dashboard, Profil, Keluar / Masuk, Daftar)
   ```
   - Link hover: `hover:text-[#84bd3a]` (light) / `hover:text-[#32735f]` (dark)
   - Dropdown panel: `bg-[#0b2b40]/95` saat scroll, `bg-[#0b2b40]/30` saat atas

2. **Navbar Dashboard / Halaman Dalam** (`components/custom/navbar.tsx`) — fixed top bar:
   ```
   Fixed top bar, full width, bg-#0b2b40 (Graphite Night)
   ```

3. **Admin Sidebar** (`components/custom/admin-sidebar.tsx`) — sidebar vertikal:
   ```
   Desktop: fixed sidebar w-64 di kiri (Paper/Dark Graphite)
   Mobile: drawer off-canvas dengan hamburger toggle
   10 menu: Dashboard, Postingan, UMKM, Galeri, Profil Kelurahan, Kontak, Infografis, Kategori, Pengguna (admin only), Pesan
   Bagian bawah: avatar user + email + ThemeToggle + tombol Keluar
   ```

### 9.6 Route Mapping
Total halaman aktif: 17 public + 18 admin + 2 auth + 1 user = **38 halaman**

---

## 10. Checklist Testing

### Public Pages
- [x] Beranda, Profil (Sejarah, Pejabat, Visi Misi, Struktur), Berita, UMKM, Wisata, Galeri, Infografis, Kontak — dark mode semua

### Admin Pages
- [x] Login, CRUD konten (posts, UMKM, wisata, galeri, kategori), profil kelurahan, infografis, kontak, pesan

### Performance & Responsive
- [x] Lighthouse test, Image optimization, Load cepat
- [x] Desktop 1920px, Laptop 1366px, Tablet 768px, Mobile 375px

---

## 11. Troubleshooting

| Issue | Solusi |
|---|---|
| Prisma outdated | npx prisma generate |
| Auth session error | Cek BETTER_AUTH_SECRET |
| Cloudinary upload gagal | Cek API key & cloud name |
| Dark mode flicker | ThemeProvider di root layout |
| Build error | npx prisma migrate deploy di build script |

---

*Dokumen panduan untuk AI Agent — Program Kerja Pembuatan Website Profil Kelurahan Salomallori, KKN Universitas Hasanuddin.*
