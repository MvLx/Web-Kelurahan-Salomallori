# Agent Guide — Website Profil Kelurahan Salomallori

Panduan teknis untuk AI agent dalam membangun Website Profil Kelurahan Salomallori, KKN Universitas Hasanuddin.


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
| Model/schema baru | `feat(db):` | `feat(db): tambah model Layanan, Permohonan, FormField, PermohonanData, ProgressHistory` |
| Halaman public | `feat(public):` | `feat(public): buat dashboard user untuk tracking pelayanan` |
| Halaman admin | `feat(admin):` | `feat(admin): tambah CRUD layanan & form builder di dashboard` |
| API routes | `feat(api):` | `feat(api): tambah API routes untuk Layanan, FormField, Permohonan, Progress` |
| Modifikasi | `feat:` | `feat: modifikasi model User tambah nik & phoneNumber` |
| Testing | `test:` | `test: testing end-to-end semua CRUD` |
| Deploy | `deploy:` | `deploy: konfigurasi Vercel dan deploy` |

- Contoh perintah:
  ```bash
  git add -A
  git commit -m "feat(api): tambah API routes untuk Layanan (list, create, get, update, delete)"
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
| Migrasi database (Task 4) | Schema Prisma harus selesai (Task 3) |
| Seed data (Task 5) | Migrasi harus selesai (Task 4) |
| Semua API routes (Task 16, 28) | Migrasi harus selesai (Task 4) |
| Halaman public yang panggil DB (semua halaman di Fase 2) | API routes atau Prisma query harus siap |
| Halaman admin CRUD (Task 18-22, 29-31) | API routes harus selesai (Task 16, 28) |
| Testing (Task 23, 32) | Semua halaman public dan admin harus selesai |

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


## 1. Sumber Kode (Base Repository)

Clone dan modifikasi dari: **`RezkyRobby23h/PortalBeritaKodim`**

```
git clone https://github.com/RezkyRobby23h/PortalBeritaKodim.git Web-Kelurahan-Salomallori
cd Web-Kelurahan-Salomallori
rm -rf .git          # Hapus history git PortalBeritaKodim
git init             # Inisialisasi repo git baru untuk Web-Kelurahan-Salomallori
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

## 2. Tech Stack

| Komponen | Teknologi | Versi |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| UI Library | React | 19.x |
| CSS | Tailwind CSS | 4.x |
| Components | shadcn/ui | latest |
| Database | PostgreSQL | latest |
| ORM | Prisma | 7.x |
| Auth | Better-Auth | 1.x |
| Rich Text | TipTap (ProseMirror) | 3.x |
| Image Upload | Cloudinary | 2.x |
| Email | Nodemailer + Gmail SMTP | latest |
| Icons | Lucide React | 0.x |
| Forms | Zod | 4.x |

---

## 3. Environment Setup

### 3.1 File `.env`
```
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET="..."
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Konfigurasi Email (Gmail SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="kelurahansalomallori@gmail.com"
SMTP_PASS="app-password-gmail"
SMTP_FROM="kelurahansalomallori@gmail.com"
```

### 3.2 Database
```bash
npx prisma migrate dev --name add_desa_models   # sesuaikan nama migrasi dengan task yang dikerjakan
npx prisma generate
npx prisma db seed  # jika ada seed
```

---

## 4. Struktur Database — Perubahan dari PortalBeritaKodim

### 4.1 Model yang SUDAH ADA (bisa langsung dipakai)
- `User` — autentikasi + role (USER, ADMIN, EDITOR)
- `Session`, `Account`, `Verification` (Better-Auth)
- `Post` — untuk berita kelurahan (judul, slug, konten, gambar, category, trending, published)
- `Category` — kategori berita
- `BreakingNews` — pengumuman darurat/breaking news
- `Message` — kontak/pesan dari pengunjung

### 4.2 Model yang SUDAH DITAMBAHKAN

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

### 4.3 Model yang HARUS DITAMBAHKAN (Fase 5 — Tracking Pelayanan)

**⚠️ Modifikasi `User`:**
Tambahkan field `nik` dan `phoneNumber` ke model `User`:
```prisma
model User {
  // ... existing fields ...
  nik         String?
  phoneNumber String?
  permohonan  Permohonan[]
  progress    ProgressHistory[]
}
```

**Model Baru:**
```prisma
enum StatusPermohonan {
  MENUNGGU
  DIPROSES
  SELESAI
  DITOLAK
  DITANGGUHKAN
  DIBATALKAN
}

enum JenisAjuan {
  ONLINE
  OFFLINE
}

enum FieldType {
  TEXT
  NUMBER
  TEXTAREA
  DATE
  FILE_UPLOAD
  SELECT
  RADIO
  CHECKBOX
}

model Layanan {
  id           String   @id @default(cuid())
  nama         String
  deskripsi    String?  @db.Text
  icon         String?
  isActive     Boolean  @default(true)
  hanyaOffline Boolean  @default(false)
  templateFile String?                    // Cloudinary URL template (PDF)
  formFields   FormField[]
  permohonan   Permohonan[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@map("layanan")
}

model FormField {
  id          String    @id @default(cuid())
  layananId   String
  layanan     Layanan   @relation(fields: [layananId], references: [id], onDelete: Cascade)
  label       String
  fieldType   FieldType
  required    Boolean   @default(false)
  placeholder String?
  options     Json?                       // Untuk SELECT/RADIO/CHECKBOX: ["Pilihan 1", "Pilihan 2"]
  urutan      Int       @default(0)
  data        PermohonanData[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@map("form_field")
}

model Permohonan {
  id           String           @id @default(cuid())
  nomorTiket   String           @unique   // Format: SL-YYYYMMDD-XXX
  layananId    String?
  layanan      Layanan?         @relation(fields: [layananId], references: [id])
  userId       String
  user         User             @relation(fields: [userId], references: [id])
  jenisAjuan   JenisAjuan
  status       StatusPermohonan @default(MENUNGGU)
  catatan      String?          @db.Text
  data         PermohonanData[]
  progress     ProgressHistory[]
  createdAt    DateTime         @default(now())
  updatedAt    DateTime         @updatedAt

  @@index([userId])
  @@map("permohonan")
}

model PermohonanData {
  id           String      @id @default(cuid())
  permohonanId String
  permohonan   Permohonan  @relation(fields: [permohonanId], references: [id], onDelete: Cascade)
  formFieldId  String
  formField    FormField   @relation(fields: [formFieldId], references: [id])
  value        String      @db.Text    // Teks atau Cloudinary URL (FILE_UPLOAD)

  @@index([permohonanId])
  @@map("permohonan_data")
}

model ProgressHistory {
  id           String           @id @default(cuid())
  permohonanId String
  permohonan   Permohonan       @relation(fields: [permohonanId], references: [id], onDelete: Cascade)
  status       StatusPermohonan
  catatan      String?          @db.Text
  createdById  String
  createdBy    User             @relation(fields: [createdById], references: [id])
  createdAt    DateTime         @default(now())

  @@index([permohonanId])
  @@map("progress_history")
}
```

---

## 5. Panduan Modifikasi — Halaman Existing

### 5.1 Beranda (`app/page.tsx`)
- **Jangan dihapus**, modifikasi konten:
  - Hero section: ganti judul & deskripsi ke Kelurahan Salomallori
  - Tambah section statistik kelurahan (luas wilayah, penduduk, KK, dusun)
  - Featured UMKM & Wisata (query terbaru)
  - Galeri foto grid
  - Breaking news → pengumuman kelurahan

### 5.2 Profil (`app/profil/`)
- Modifikasi menjadi profil Kelurahan Salomallori
- Data diambil dari model `Desa`

### 5.3 Profil Satuan (`app/profil-satuan/`)
- Ubah menjadi halaman Sejarah atau Visi Misi kelurahan
- Atau digabung ke `/profil` dengan section terpisah

### 5.4 Program Satuan (`app/program-satuan/`)
- Ubah menjadi halaman Visi & Misi kelurahan
- Konten dari model `Desa.visi` dan `Desa.misi`

### 5.5 Berita (`app/news/` & `app/dashboard/posts/`)
- Halaman public: sudah OK, sesuaikan query & tampilan
- Halaman admin CRUD: sudah OK, sesuaikan label & field

### 5.6 Aduan (`app/aduan/`) → Kontak
- Ubah menjadi halaman Kontak & Lokasi
- Tambah Google Maps embed
- Link WhatsApp kantor kelurahan

### 5.7 Auth (`app/auth/`)
- Tidak perlu diubah, langsung pakai

### 5.8 Dashboard (`app/dashboard/`)
- Modifikasi overview dengan data kelurahan
- Tambah menu CRUD UMKM, Wisata, Galeri, Infografis
- Tambah menu Layanan & Permohonan (Fase 5)
- Tambah card ringkasan permohonan (total, menunggu, diproses, selesai)

### 5.9 Akun User (`app/akun/`)
- Modifikasi menjadi Dashboard User (Fase 5)
- Tambah halaman: profil (edit NIK, telepon), daftar permohonan, detail tracking, pengajuan baru

---

## 6. Panduan — Halaman Baru yang Harus Dibuat

### 6.1 Public Pages

| Route | File | Keterangan |
|---|---|---|
| `/umkm` | `app/umkm/page.tsx` | Katalog UMKM (grid card, filter kategori, pencarian) |
| `/umkm/[id]` | `app/umkm/[id]/page.tsx` | Detail produk UMKM |
| `/wisata` | `app/wisata/page.tsx` | Daftar destinasi wisata/kuliner/budaya |
| `/wisata/[id]` | `app/wisata/[id]/page.tsx` | Detail wisata |
| `/galeri` | `app/galeri/page.tsx` | Grid galeri responsif + lightbox, filter kategori |
| `/infografis` | `app/infografis/page.tsx` | Visualisasi data statistik kelurahan |
| `/idm` | `app/idm/page.tsx` | Indeks Desa Membangun |

### 6.2 Admin Pages

| Route | File | Keterangan |
|---|---|---|
| `/dashboard/umkm` | `app/dashboard/umkm/page.tsx` | List UMKM + CRUD |
| `/dashboard/umkm/new` | `app/dashboard/umkm/new/page.tsx` | Form tambah UMKM |
| `/dashboard/umkm/[id]/edit` | `app/dashboard/umkm/[id]/edit/page.tsx` | Form edit UMKM |
| `/dashboard/wisata` | `app/dashboard/wisata/page.tsx` | List wisata + CRUD |
| `/dashboard/wisata/new` | `app/dashboard/wisata/new/page.tsx` | Form tambah wisata |
| `/dashboard/wisata/[id]/edit` | `app/dashboard/wisata/[id]/edit/page.tsx` | Form edit wisata |
| `/dashboard/galeri` | `app/dashboard/galeri/page.tsx` | Upload & kelola foto galeri |
| `/dashboard/profil-desa` | `app/dashboard/profil-desa/page.tsx` | Edit data kelurahan & perangkat |
| `/dashboard/infografis` | `app/dashboard/infografis/page.tsx` | Kelola data infografis |

### 6.3 Admin Pages — Tracking Pelayanan (Fase 5)

| Route | File | Keterangan |
|---|---|---|
| `/dashboard/layanan` | `app/dashboard/layanan/page.tsx` | List layanan + CRUD |
| `/dashboard/layanan/new` | `app/dashboard/layanan/new/page.tsx` | Tambah layanan (upload template file) |
| `/dashboard/layanan/[id]/edit` | `app/dashboard/layanan/[id]/edit/page.tsx` | Edit layanan |
| `/dashboard/layanan/[id]/form` | `app/dashboard/layanan/[id]/form/page.tsx` | Form builder — kelola FormField |
| `/dashboard/permohonan` | `app/dashboard/permohonan/page.tsx` | Semua ticket (filter status/layanan/tanggal, search) |
| `/dashboard/permohonan/[id]` | `app/dashboard/permohonan/[id]/page.tsx` | Detail ticket: pilih layanan (offline) + isi form + update status + progress history |

### 6.4 User Dashboard Pages — Tracking Pelayanan (Fase 5)

| Route | File | Keterangan |
|---|---|---|
| `/akun/dashboard` | `app/akun/dashboard/page.tsx` | Dashboard user: profil ringkas + 5 permohonan terbaru + tombol ajukan |
| `/akun/dashboard/profil` | `app/akun/dashboard/profil/page.tsx` | Edit data diri (NIK, telepon) — wajib diisi sebelum pengajuan online |
| `/akun/dashboard/permohonan` | `app/akun/dashboard/permohonan/page.tsx` | Riwayat semua permohonan user |
| `/akun/dashboard/permohonan/[id]` | `app/akun/dashboard/permohonan/[id]/page.tsx` | Detail tracking + timeline progress + tombol batalkan (jika MENUNGGU) |
| `/akun/dashboard/ajukan` | `app/akun/dashboard/ajukan/page.tsx` | Pilih jenis ajuan (offline/online) → pilih layanan → isi form dinamis → submit |

---

## 7. API Routes

### 7.1 Route yang perlu ditambahkan (Fase 1-4)

```
app/api/
├── umkm/
│   ├── route.ts          # GET (list), POST (create)
│   └── [id]/
│       └── route.ts      # GET, PUT, DELETE
├── wisata/
│   ├── route.ts
│   └── [id]/
│       └── route.ts
├── galeri/
│   ├── route.ts
│   └── [id]/
│       └── route.ts
├── desa/
│   └── route.ts          # GET, PUT (single record)
├── perangkat-desa/
│   ├── route.ts
│   └── [id]/
│       └── route.ts
├── infografis/
│   ├── route.ts
│   └── [id]/
│       └── route.ts
└── upload/
    └── route.ts           # Upload gambar ke Cloudinary
```

### 7.2 Route yang perlu ditambahkan (Fase 5 — Tracking Pelayanan)

```
app/api/
├── layanan/
│   ├── route.ts              # GET (list, only isActive), POST
│   └── [id]/
│       ├── route.ts          # GET, PUT, DELETE
│       └── form-fields/
│           ├── route.ts      # GET (list fields), POST (create)
│           └── [fieldId]/
│               └── route.ts  # PUT, DELETE
├── permohonan/
│   ├── route.ts              # GET (list + filter), POST (create)
│   └── [id]/
│       ├── route.ts          # GET, PUT (update status/layanan)
│       └── progress/
│           └── route.ts      # GET (list), POST (create)
├── user/
│   └── profile/
│       └── route.ts          # GET, PUT (nik, phoneNumber)
└── email/
    └── send/
        └── route.ts          # POST (send email via Nodemailer Gmail SMTP)
```

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

### 7.4 API Permohonan — Create (Khusus)

```ts
// POST /api/permohonan
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { layananId, jenisAjuan, formData } = body;
    // formData: [{ formFieldId: "xxx", value: "isi" }, ...]

    // Generate nomor tiket
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const count = await prisma.permohonan.count({
      where: { nomorTiket: { startsWith: `SL-${today}` } },
    });
    const nomorTiket = `SL-${today}-${String(count + 1).padStart(3, "0")}`;

    const permohonan = await prisma.permohonan.create({
      data: {
        nomorTiket,
        layananId: layananId || null,
        userId: body.userId,
        jenisAjuan,
        status: "MENUNGGU",
        data: {
          create: formData.map((fd: { formFieldId: string; value: string }) => ({
            formFieldId: fd.formFieldId,
            value: fd.value,
          })),
        },
      },
      include: { data: true },
    });

    return NextResponse.json(permohonan, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
```

---

## 8. Urutan Pengerjaan (3 Minggu)

**Progress tracker:** Agent wajib mengubah `[ ]` menjadi `[x]` setelah setiap task selesai.

### Fase 1 — Setup & Database (Hari 1–5)
- [x] 1. Clone repo PortalBeritaKodim ke `Web-Kelurahan-Salomallori/` — setelah clone, hapus folder `.git` dan jalankan `git init` agar project siap dipasangi remote repository baru milik KKN
- [x] 2. Install dependencies: `npm install`
- [x] 3. Tambah model `Desa`, `PerangkatDesa`, `UMKM`, `Wisata`, `Galeri`, `Infografis` ke `prisma/schema.prisma`
- [x] 4. Jalankan migrasi: `npx prisma migrate dev --name add_desa_models`
- [x] 5. Buat seed data kelurahan (minimal data Kelurahan Salomallori) — gunakan data dari `PRD_Website_Kelurahan_Salomallori.md` Section 2 (Latar Belakang): luas wilayah, penduduk, KK, dusun, dan batas wilayah (Utara, Timur, Selatan, Barat)
- [x] 6. Verifikasi auth Better-Auth berjalan
- [x] 7. Setup Cloudinary upload route

### Fase 2 — Halaman Public (Hari 6–9)
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

### Fase 3 — Admin & CRUD (Hari 10–12)
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

### Fase 4 — Testing & Deploy (Hari 13–14)
- [x] 23. Testing end-to-end (semua CRUD, auth, tampilan)
- [x] 24. Responsive testing (mobile, tablet, desktop)
- [x] 25. Dark mode testing
- [ ] 26. Deploy ke Vercel
- [ ] 27. Dokumentasi serah terima ke perangkat kelurahan

### Fase 5 — Tracking Pelayanan (Hari 15–19)

#### 5A — Database & Setup
- [ ] 28a. Tambah model `Layanan`, `FormField`, `Permohonan`, `PermohonanData`, `ProgressHistory` + enum `StatusPermohonan`, `JenisAjuan`, `FieldType` ke `prisma/schema.prisma`
- [ ] 28b. Modifikasi model `User`: tambah field `nik String?` dan `phoneNumber String?` + relasi `permohonan Permohonan[]` dan `progress ProgressHistory[]`
- [ ] 28c. Jalankan migrasi: `npx prisma migrate dev --name add_layanan_models`
- [ ] 28d. Buat seed data layanan contoh (KK, Surat Tanah, Surat Keterangan Domisili) dengan form fields masing-masing

#### 5B — API Routes
- [ ] 28e. API routes untuk Layanan (list, create, get, update, delete)
- [ ] 28f. API routes untuk FormField per Layanan (list, create, get, update, delete)
- [ ] 28g. API routes untuk Permohonan (list + filter, create + generate nomor tiket)
- [ ] 28h. API routes untuk ProgressHistory per Permohonan (list, create)
- [ ] 28i. API route untuk user profile (GET, PUT: nik, phoneNumber)
- [ ] 28j. API route untuk kirim email (POST: nodemailer Gmail SMTP)

#### 5C — Dashboard User
- [ ] 29a. Buat halaman dashboard user (`/akun/dashboard`) — profil ringkas + 5 permohonan terbaru + tombol ajukan
- [ ] 29b. Buat halaman edit profil user (`/akun/dashboard/profil`) — edit NIK, telepon
- [ ] 29c. Buat halaman riwayat permohonan user (`/akun/dashboard/permohonan`)
- [ ] 29d. Buat halaman detail tracking permohonan user (`/akun/dashboard/permohonan/[id]`) — timeline progress + tombol batalkan jika MENUNGGU
- [ ] 29e. Buat halaman pengajuan baru (`/akun/dashboard/ajukan`) — pilih offline/online, lalu pilih layanan, isi form dinamis, submit

#### 5D — Admin Panel Pelayanan
- [ ] 30a. Buat halaman CRUD Layanan (`/dashboard/layanan`) — list + new + edit
- [ ] 30b. Buat halaman Form Builder (`/dashboard/layanan/[id]/form`) — kelola FormField
- [ ] 30c. Buat halaman daftar permohonan (`/dashboard/permohonan`) — filter status/layanan/tanggal, search
- [ ] 30d. Buat halaman detail permohonan admin (`/dashboard/permohonan/[id]`)

#### 5E — Integrasi
- [ ] 31a. Update dashboard admin overview — card ringkasan permohonan
- [ ] 31b. Update AdminSidebar — menu Layanan & Permohonan
- [ ] 31c. Kirim email notifikasi SELESAI/DITOLAK (Nodemailer)
- [ ] 31d. In-web notifikasi toast (sonner)

#### 5F — Testing
- [ ] 32a. Testing flow pengajuan online
- [ ] 32b. Testing flow pengajuan offline
- [ ] 32c. Testing CRUD layanan & form builder
- [ ] 32d. Testing email notifikasi
- [ ] 32e. Testing batalkan ticket

---

## 9. Konvensi Coding

### 9.1 Naming Convention
- File/Route: kebab-case. Komponen: PascalCase. Fungsi/Variabel: camelCase.

### 9.2 Struktur Komponen
```
components/
├── ui/           # shadcn/ui
├── cards/        # Card components
├── landing/      # Landing sections
├── galeri/       # Gallery
├── admin/        # Admin components
├── layout/       # Navbar, Footer
└── maps/         # Google Maps
```

### 9.3 Error Handling
API route try-catch 500. Toast (sonner) untuk operasi CRUD. Loading/empty/skeleton state.

### 9.4 TypeScript
Strict mode. Prisma types. Zod validasi input.

### 9.5 Struktur Navbar
Floating navigation island (Graphite Night #282834): Beranda | Profil (dropdown) | Informasi (dropdown) | Potensi (dropdown) | Kontak

### 9.6 Route Mapping
39 halaman total: 15 public + 13 admin + 5 user dashboard + auth + existing

---

## 10. Checklist Testing

### Public Pages
- [ ] Beranda, Profil, Berita, UMKM, Wisata, Galeri, Infografis, IDM, Kontak — dark mode semua

### Admin Pages
- [ ] Login, CRUD konten, upload galeri, profil kelurahan, infografis

### Tracking Pelayanan
- [ ] Layanan, Form Builder, Pengajuan online/offline, Ticket, Timeline, Batalkan, Notifikasi

### Performance & Responsive
- [ ] Lighthouse >= 90, Image optimization, Load < 3detik
- [ ] Desktop 1920px, Laptop 1366px, Tablet 768px, Mobile 375px

---

## 11. Troubleshooting

| Issue | Solusi |
|---|---|
| Prisma outdated | npx prisma generate |
| Auth session error | Cek BETTER_AUTH_SECRET |
| Cloudinary upload gagal | Cek API key & cloud name |
| Dark mode flicker | ThemeProvider di root layout |
| Build error | npx prisma migrate deploy di build script |
| Email tidak terkirim | Cek SMTP config, App Password |
| Nomor tiket duplikat | Retry unique constraint |

---

## 12. Catatan Penting

1. Jangan hapus file existing PortalBeritaKodim
2. TipTap untuk rich text editing
3. Cloudinary untuk upload gambar/file
4. Role: USER (warga), ADMIN (full akses), EDITOR (proses permohonan)
5. Dark mode via next-themes
6. Breakpoints: sm=640, md=768, lg=1024, xl=1280
7. FILE_UPLOAD: Cloudinary URL di PermohonanData.value
8. Template layanan: Cloudinary URL di Layanan.templateFile
9. Email: Nodemailer + Gmail SMTP dengan App Password

---

*Dokumen panduan untuk AI Agent — Program Kerja Pembuatan Website Profil Kelurahan Salomallori, KKN Universitas Hasanuddin.*
