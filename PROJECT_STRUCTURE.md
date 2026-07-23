# Project Structure — Website Profil Kelurahan Salomallori

> Berisi peta struktur proyek, route map, database models, komponen, dan API routes.
> **Agent WAJIB membaca file ini sebelum mengerjakan task apa pun** (lihat AGENTS.md Section 0.1).

---

## 1. Tech Stack

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
| Icons | Lucide React | 0.x |
| Forms | Zod | 4.x |

---

## 2. Struktur Direktori

```
Web-Kelurahan-Salomallori/                  # Root proyek
├── app/                                    # Next.js App Router
│   ├── aduan/                              # → /kontak (akan dimodifikasi)
│   ├── akun/[id]/                          # Halaman profil user
│   ├── api/                                # API Routes
│   │   ├── auth/[...all]/                  # Better-Auth endpoints
│   │   ├── breaking-news/                  # GET, POST, DELETE
│   │   ├── categories/                     # GET (list), POST, [id]
│   │   ├── desa/                           # GET, PUT (single record) ✅
│   │   ├── messages/                       # GET, POST, [id]
│   │   ├── posts/                          # GET, POST, [id]
│   │   ├── profile/[id]/                   # GET, PUT user profile
│   │   ├── umkm/                           # GET (list + limit), POST ✅
│   │   ├── upload/                         # Upload ke Cloudinary
│   │   ├── users/                          # GET, POST, [id]
│   │   └── wisata/                         # GET (list + limit), POST ✅
│   ├── auth/                               # Halaman login/signup
│   ├── dashboard/                          # Admin dashboard
│   │   ├── breaking-news/                  # CRUD breaking news
│   │   ├── categories/                     # CRUD kategori
│   │   ├── layout.tsx                      # Admin layout (sidebar)
│   │   ├── messages/                       # Kelola pesan masuk
│   │   ├── page.tsx                        # Dashboard overview
│   │   ├── posts/                          # CRUD berita
│   │   └── users/                          # Manajemen user
│   ├── news/[slug]/                        # Detail berita
│   ├── profil/                             # Profil kelurahan
│   │   ├── pejabat-kodim/                  # Struktur organisasi
│   │   ├── sejarah-satuan/                 # Sejarah
│   │   └── struktur-organisasi/            # Bagan struktur
│   ├── program-satuan/                     # → /profil/visi-misi (akan dimodif)
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx                          # Root layout
│   └── page.tsx                            # Beranda
│
├── components/                             # Komponen React
│   ├── cards/                              # (belum ada, placeholder target)
│   ├── custom/                             # Komponen custom utama
│   │   ├── breaking-news.tsx
│   │   ├── category-badge.tsx
│   │   ├── color-picker.tsx
│   │   ├── date-range-picker.tsx
│   │   ├── footer.tsx
│   │   ├── image-upload.tsx
│   │   ├── navbar.tsx
│   │   ├── news-card.tsx
│   │   ├── posts-grid.tsx
│   │   ├── scroll-to-top.tsx
│   │   ├── theme-provider.tsx
│   │   ├── theme-toggle.tsx
│   │   └── user-multi-select.tsx
│   ├── landing/                            # Komponen landing page ✅
│   │   ├── hero-section.tsx                # Hero ✅
│   │   ├── stats-section.tsx               # Statistik ✅
│   │   └── featured-section.tsx            # UMKM + Wisata ✅
│   ├── ui/                                 # shadcn/ui components
│   ├── tiptap-*/                           # TipTap editor components
│   └── galeri/                             # (belum ada, akan dibuat)
│
├── hooks/                                  # Custom React hooks
├── lib/                                    # Utility & config
│   ├── auth-client.ts                      # Better-Auth client
│   ├── auth.ts                             # Better-Auth server config
│   ├── dal.ts                              # Data access layer
│   ├── permissions.ts                      # Role-based access
│   ├── prisma.ts                           # Prisma client singleton
│   ├── tiptap-utils.ts
│   └── utils.ts                            # Tailwind helper (cn)
│
├── prisma/                                 # Database
│   ├── schema.prisma                       # Schema lengkap
│   ├── seed.ts                             # Seed data
│   └── migrations/                         # Migrasi Prisma
│
├── public/                                 # Static assets
├── styles/                                 # SCSS (legacy)
├── .env.example
├── AGENTS.md                               # Agent guide & task tracker
├── DESIGN.md                               # Design system reference
├── PROJECT_STRUCTURE.md                    # ← FILE INI
├── next.config.ts
├── package.json
├── tsconfig.json
└── postcss.config.mjs
```

---

## 3. Route Map — Seluruh Halaman

### 3.1 Public Pages

| # | Route | Tipe | Status | File |
|---|---|---|---|---|
| 1 | `/` | Modified (existing) | ✅ Done | `app/page.tsx` |
| 2 | `/profil` | Modified (existing) | ✅ Done | `app/profil/page.tsx` |
| 3 | `/profil/visi-misi` | Modified (ex: program-satuan) | ✅ Done | `app/program-satuan/page.tsx` |
| 4 | `/profil/struktur` | Modified (ex: profil-satuan) | ✅ Done | `app/profil/struktur-organisasi/` |
| 5 | `/profil/perangkat` | Modified (ex: profil-satuan) | ✅ Done | `app/profil/pejabat-kodim/` |
| 6 | `/news` | Modified (existing) | ✅ Done | `app/news/` |
| 7 | `/news/[slug]` | Modified (existing) | ✅ Done | `app/news/[slug]/` |
| 8 | `/umkm` | New | ✅ Done | `app/umkm/page.tsx` |
| 9 | `/umkm/[id]` | New | ✅ Done | `app/umkm/[id]/page.tsx` |
| 10 | `/wisata` | New | ✅ Done | `app/wisata/page.tsx` |
| 11 | `/wisata/[id]` | New | ✅ Done | `app/wisata/[id]/page.tsx` |
| 12 | `/galeri` | New | ✅ Done | `app/galeri/page.tsx` |
| 13 | `/infografis` | New | ✅ Done | `app/infografis/page.tsx` |
| 14 | `/idm` | New | ✅ Done | `app/idm/page.tsx` |
| 15 | `/kontak` | Modified (ex: aduan) | ✅ Done | `app/aduan/page.tsx` |

### 3.2 Auth

| Route | Status | File |
|---|---|---|
| `/auth/login` | Existing | `app/auth/signin/` |
| `/auth/register` | Existing | `app/auth/signup/` |

### 3.3 Admin Pages

| # | Route | Tipe | Status | File |
|---|---|---|---|---|
| 16 | `/dashboard` | Modified (existing) | ✅ Done | `app/dashboard/page.tsx` |
| 17 | `/dashboard/posts` | Existing | ✅ Done | `app/dashboard/posts/` |
| 18 | `/dashboard/breaking-news` | Existing | ✅ Done | `app/dashboard/breaking-news/` |
| 19 | `/dashboard/categories` | Existing | ✅ Done | `app/dashboard/categories/` |
| 20 | `/dashboard/messages` | Existing | ✅ Done | `app/dashboard/messages/` |
| 21 | `/dashboard/users` | Existing | ✅ Done | `app/dashboard/users/` |
| 22 | `/dashboard/umkm` | New | ✅ Done | `app/dashboard/umkm/` |
| 23 | `/dashboard/wisata` | New | ✅ Done | `app/dashboard/wisata/` |
| 24 | `/dashboard/galeri` | New | ✅ Done | `app/dashboard/galeri/` |
| 25 | `/dashboard/profil-desa` | New | ✅ Done | `app/dashboard/profil-desa/` |
| 26 | `/dashboard/infografis` | New | ✅ Done | `app/dashboard/infografis/` |

### 3.4 API Routes

| Route | Method | Status | File |
|---|---|---|---|
| `/api/desa` | GET, PUT | ✅ Done | `app/api/desa/route.ts` |
| `/api/umkm` | GET (list + limit), POST | ✅ Done | `app/api/umkm/route.ts` |
| `/api/umkm/[id]` | GET, PUT, DELETE | ✅ Done | `app/api/umkm/[id]/route.ts` |
| `/api/wisata` | GET (list + limit), POST | ✅ Done | `app/api/wisata/route.ts` |
| `/api/wisata/[id]` | GET, PUT, DELETE | ✅ Done | `app/api/wisata/[id]/route.ts` |
| `/api/galeri` | GET, POST | ✅ Done | `app/api/galeri/route.ts` |
| `/api/galeri/[id]` | GET, PUT, DELETE | ✅ Done | `app/api/galeri/[id]/route.ts` |
| `/api/infografis` | GET, POST | ✅ Done | `app/api/infografis/route.ts` |
| `/api/infografis/[id]` | GET, PUT, DELETE | ✅ Done | `app/api/infografis/[id]/route.ts` |
| `/api/perangkat-desa` | GET, POST | ✅ Done | `app/api/perangkat-desa/route.ts` |
| `/api/perangkat-desa/[id]` | GET, PUT, DELETE | ✅ Done | `app/api/perangkat-desa/[id]/route.ts` |
| `/api/upload` | POST | ✅ Done | `app/api/upload/route.ts` |
| `/api/auth/[...all]` | — | Existing | Better-Auth built-in |
| `/api/posts` | GET, POST | Existing | `app/api/posts/route.ts` |
| `/api/categories` | GET, POST | Existing | `app/api/categories/route.ts` |
| `/api/messages` | GET, POST | Existing | `app/api/messages/route.ts` |
| `/api/users` | GET, POST | Existing | `app/api/users/route.ts` |
| `/api/breaking-news` | GET, POST | Existing | `app/api/breaking-news/route.ts` |
| `/api/profile/[id]` | GET, PUT | Existing | `app/api/profile/[id]/route.ts` |

---

## 4. Database Models

### 4.1 Existing (dari PortalBeritaKodim)

| Model | Table | Keterangan |
|---|---|---|
| `User` | `user` | Auth + role (ADMIN, EDITOR, USER) |
| `Session` | `session` | Better-Auth session |
| `Account` | `account` | Better-Auth account |
| `Verification` | `verification` | Better-Auth verifikasi |
| `Post` | `post` | Berita kelurahan (judul, slug, konten, gambar, category, trending, published) |
| `Category` | `category` | Kategori berita |
| `BreakingNews` | `breaking_news` | Pengumuman darurat/breaking news |
| `Message` | `message` | Kontak/pesan dari pengunjung |

### 4.2 New (ditambahkan untuk Kelurahan Salomallori)

| Model | Table | Field Utama | Status |
|---|---|---|---|
| `Desa` | `desa` | nama, sejarah, visi, misi, luasWilayah, jumlahPenduduk, jumlahKK, jumlahDusun, batas* | ✅ Done |
| `PerangkatDesa` | `perangkat_desa` | nama, jabatan, foto, urutan | ✅ Done |
| `UMKM` | `umkm` | namaProduk, deskripsi, harga, kategori, kontak, gambar, pemilik | ✅ Done |
| `Wisata` | `wisata` | nama, deskripsi, lokasi, kategori (enum), gambar | ✅ Done |
| `Galeri` | `galeri` | judul, gambar, kategori, uploadedBy (relasi ke User) | ✅ Done |
| `Infografis` | `infografis` | judul, tahun, dataJson (Json) | ✅ Done |

---

## 5. Komponen yang Tersedia

### 5.1 Landing Page Components (`components/landing/`)

| Komponen | Status | Fungsi |
|---|---|---|
| `HeroSection` | ✅ Done | Hero section beranda dengan overlay gelap, judul & deskripsi kelurahan |
| `StatsSection` | ✅ Done | Statistik kelurahan (luas, penduduk, KK, dusun) — data dari `/api/desa` |
| `FeaturedSection` | ✅ Done | Grid UMKM + Wisata terbaru — data dari `/api/umkm?limit=6` & `/api/wisata?limit=6` |

### 5.2 Custom Components (`components/custom/`)

| Komponen | Status | Fungsi |
|---|---|---|
| `Navbar` | ✅ Existing | Navigasi utama (public mode) |
| `Footer` | ✅ Existing | Footer halaman public |
| `BreakingNews` | ✅ Existing | Breaking news ticker |
| `NewsCard` | ✅ Existing | Card berita untuk menampilkan daftar artikel |
