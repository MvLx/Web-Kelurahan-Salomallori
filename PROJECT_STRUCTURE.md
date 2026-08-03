# Project Structure — Website Profil Kelurahan Salomallori

> Berisi peta struktur proyek, route map, database models, komponen, dan API routes.
> **Dokumen ini disinkronkan dengan kondisi aktual proyek** — setiap perubahan struktur/halaman WAJIB diperbarui di sini.
> **Agent WAJIB membaca file ini sebelum mengerjakan task apa pun** (lihat AGENTS.md Section 0.1).

---

## 1. Tech Stack

| Komponen | Teknologi | Versi |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| UI Library | React | 19.x |
| CSS | Tailwind CSS | 4.x |
| SCSS | Sass (variabel & keyframe styles) | latest |
| Components | shadcn/ui | latest |
| Database | PostgreSQL | latest |
| ORM | Prisma | 7.x |
| Auth | Better-Auth | 1.x |
| Rich Text | TipTap (ProseMirror) | 3.x |
| Image Upload | Cloudinary | 2.x |
| Icons | Lucide React | 0.x |
| Forms | Zod | 4.x |
| Charts | Recharts (via Infografis) | 3.x |
| Google Maps | iframe embed (mapsEmbed) | — |

---

## 2. Struktur Direktori

```
Web-Kelurahan-Salomallori/                  # Root proyek
├── app/                                    # Next.js App Router
│   ├── page.tsx                            # Beranda (/)
│   ├── layout.tsx                          # Root layout
│   ├── globals.css                         # Global styles (Tailwind)
│   ├── error.tsx                           # Error boundary global
│   ├── global-error.tsx                    # Global error boundary
│   │
│   ├── aduan/                              # → /kontak (halaman Kontak & Lokasi)
│   │   └── page.tsx
│   ├── akun/
│   │   ├── error.tsx
│   │   └── [id]/                           # Halaman profil user
│   ├── auth/
│   │   ├── layout.tsx
│   │   ├── signin/                         # Login
│   │   └── signup/                         # Register
│   │
│   ├── dashboard/                          # Admin dashboard
│   │   ├── layout.tsx                      # Admin layout (sidebar/navbar)
│   │   ├── page.tsx                        # Dashboard overview
│   │   ├── breaking-news/                  # CRUD breaking news (+ create/)
│   │   ├── categories/                     # CRUD kategori (+ create/)
│   │   ├── galeri/                         # Kelola galeri foto
│   │   ├── infografis/                     # Kelola infografis
│   │   ├── kontak/                         # Kelola kontak & maps
│   │   ├── messages/                       # Kelola pesan masuk
│   │   ├── posts/                          # CRUD berita (create/, [id]/)
│   │   ├── profil-desa/                    # Edit profil kelurahan & perangkat
│   │   ├── umkm/                           # CRUD UMKM (new/, [id]/)
│   │   ├── users/                          # Manajemen user (+ layout)
│   │   └── wisata/                         # CRUD Wisata (new/, [id]/)
│   │
│   ├── galeri/                             # → /galeri (grid + lightbox)
│   │   └── page.tsx
│   ├── infografis/                         # → /infografis
│   │   └── page.tsx
│   ├── news/                               # → /news & /news/[slug]
│   │   ├── page.tsx
│   │   └── [slug]/
│   ├── profil/                             # → /profil & sub-halaman
│   │   ├── page.tsx
│   │   ├── pejabat-kelurahan/              # Struktur perangkat kelurahan
│   │   ├── pejabat-kodim/                  # ⚠️ Sisa PortalBeritaKodim (tidak dipakai navbar)
│   │   ├── sejarah-kelurahan/              # Sejarah kelurahan
│   │   ├── sejarah-satuan/                 # ⚠️ Sisa PortalBeritaKodim (tidak dipakai navbar)
│   │   ├── struktur-organisasi/            # Bagan struktur organisasi
│   │   └── visi-misi/                      # Visi & misi kelurahan
│   │
│   ├── umkm/                               # → /umkm & /umkm/[id]
│   │   ├── page.tsx
│   │   └── [id]/
│   ├── wisata/                             # → /wisata & /wisata/[id]
│   │   ├── page.tsx
│   │   └── [id]/
│   │
│   └── api/                                # API Routes
│       ├── auth/[...all]/                  # Better-Auth endpoints
│       ├── breaking-news/                  # GET, POST + [id]/
│       ├── categories/                     # GET, POST + [id]/
│       ├── desa/                           # GET, PUT (single record)
│       ├── galeri/                         # GET, POST + [id]/
│       ├── infografis/                     # GET, POST + [id]/
│       ├── kontak/                         # GET, PUT (single record)
│       ├── messages/                       # GET, POST + [id]/
│       ├── perangkat-desa/                 # GET, POST + [id]/
│       ├── posts/                          # GET, POST + [id]/
│       ├── profile/[id]/                   # GET, PUT user profile
│       ├── umkm/                           # GET, POST + [id]/
│       ├── upload/                         # Upload gambar ke Cloudinary
│       ├── users/                          # GET, POST + [id]/
│       └── wisata/                         # GET, POST + [id]/
│
├── components/                             # Komponen React
│   ├── custom/                             # Komponen custom utama
│   │   ├── breaking-news.tsx
│   │   ├── category-badge.tsx
│   │   ├── color-picker.tsx
│   │   ├── date-range-picker.tsx
│   │   ├── footer.tsx
│   │   ├── image-upload.tsx
│   │   ├── navbar.tsx                      # Navbar public + dashboard (fixed top, bg graphite-night)
│   │   ├── news-card.tsx
│   │   ├── posts-grid.tsx
│   │   ├── scroll-to-top.tsx
│   │   ├── theme-provider.tsx
│   │   ├── theme-toggle.tsx
│   │   └── user-multi-select.tsx
│   ├── landing/                            # Komponen beranda
│   │   ├── hero-section.tsx                # Hero
│   │   ├── stats-section.tsx               # Statistik kelurahan
│   │   ├── breaking-news-section.tsx       # Marquee pengumuman
│   │   ├── news-section.tsx                # Berita terbaru
│   │   ├── sejarah-section.tsx             # Sejarah kelurahan
│   │   ├── featured-section.tsx            # UMKM + Wisata unggulan
│   │   └── galeri-section.tsx              # Galeri foto grid
│   ├── galeri/                             # Komponen galeri
│   │   └── galeri-client.tsx               # Grid + filter + lightbox (client)
│   ├── infografis/                         # Komponen infografis
│   │   ├── infografis-client.tsx           # Client wrapper
│   │   └── chart-view.tsx                  # Render chart (Bar/Line/Pie/Doughnut/Area/StatCards)
│   ├── umkm/                               # Komponen UMKM
│   │   └── umkm-client.tsx                 # Grid + filter kategori + pencarian
│   ├── wisata/                             # Komponen wisata
│   │   └── wisata-client.tsx               # Grid + filter kategori
│   ├── tiptap-extension/                   # Ekstensi TipTap (node-background)
│   ├── tiptap-icons/                       # Icon set editor TipTap
│   ├── tiptap-node/                        # Node kustom TipTap (heading, image, list, dll)
│   ├── tiptap-templates/                   # Template editor (simple/)
│   ├── tiptap-ui/                          # UI toolbar editor (heading, link, mark, dll)
│   ├── tiptap-ui-primitive/                # Primitive UI editor (button, card, toolbar, dll)
│   └── ui/                                 # shadcn/ui components (button, card, dialog, dll)
│
├── hooks/                                  # Custom React hooks (tiptap, breakpoint, dll)
├── lib/                                    # Utility & config
│   ├── api-rate-limit.ts
│   ├── auth-client.ts                      # Better-Auth client
│   ├── auth.ts                             # Better-Auth server config
│   ├── dal.ts                              # Data access layer
│   ├── permissions.ts                      # Role-based access
│   ├── prisma.ts                           # Prisma client singleton
│   ├── rate-limit.ts
│   ├── tiptap-utils.ts
│   ├── utils.ts                            # Tailwind helper (cn)
│   ├── generated/prisma/                   # Generated Prisma client
│   └── schemas/                            # Zod schemas (desa, kontak, message, dll)
│
├── prisma/                                 # Database
│   ├── schema.prisma                       # Schema lengkap
│   ├── seed.ts                             # Seed data
│   ├── config.ts
│   └── migrations/                         # Migrasi Prisma
│
├── public/                                 # Static assets (logo, favicon, placeholder)
│   └── images/                             # Placeholder images
├── styles/                                 # SCSS (variabel & keyframe animations)
├── utils/                                  # Utility murni (string helpers)
├── docs/                                   # Dokumentasi (SERAH_TERIMA.md)
│
├── .env.example
├── AGENTS.md                               # Agent guide & task tracker
├── DESIGN.md                               # Design system reference
├── PROJECT_STRUCTURE.md                    # ← FILE INI
├── llms.txt
├── next.config.ts
├── package.json
├── tsconfig.json
├── postcss.config.mjs
├── vercel.json
├── proxy.ts
└── components.json                         # shadcn/ui config
```

---

## 3. Route Map — Seluruh Halaman

### 3.1 Public Pages

| # | Route | Tipe | Status | File | Catatan |
|---|---|---|---|---|---|
| 1 | `/` | Beranda | ✅ Aktif | `app/page.tsx` | Hero + stats + berita + sejarah + galeri + breaking news |
| 2 | `/profil` | Profil | ✅ Aktif | `app/profil/page.tsx` | Profil kelurahan (data Desa) |
| 3 | `/profil/sejarah-kelurahan` | Sejarah | ✅ Aktif | `app/profil/sejarah-kelurahan/` | Submenu Profil |
| 4 | `/profil/pejabat-kelurahan` | Pejabat | ✅ Aktif | `app/profil/pejabat-kelurahan/` | Submenu Profil |
| 5 | `/profil/visi-misi` | Visi Misi | ✅ Aktif | `app/profil/visi-misi/` | Visi & misi kelurahan |
| 6 | `/profil/struktur-organisasi` | Struktur | ✅ Aktif | `app/profil/struktur-organisasi/` | Bagan struktur |
| 7 | `/profil/pejabat-kodim` | Sisa lama | ⚠️ Tidak dipakai | `app/profil/pejabat-kodim/` | Sisa PortalBeritaKodim |
| 8 | `/profil/sejarah-satuan` | Sisa lama | ⚠️ Tidak dipakai | `app/profil/sejarah-satuan/` | Sisa PortalBeritaKodim |
| 9 | `/news` | Berita | ✅ Aktif | `app/news/page.tsx` | Daftar berita |
| 10 | `/news/[slug]` | Detail Berita | ✅ Aktif | `app/news/[slug]/` | Detail artikel |
| 11 | `/umkm` | UMKM | ✅ Aktif | `app/umkm/page.tsx` | Grid + filter + pencarian |
| 12 | `/umkm/[id]` | Detail UMKM | ✅ Aktif | `app/umkm/[id]/` | Detail produk |
| 13 | `/wisata` | Wisata | ✅ Aktif (tidak di-link navbar) | `app/wisata/page.tsx` | Grid + filter kategori — halaman ada & bisa diakses langsung, tapi tidak tampil di navbar/footer |
| 14 | `/wisata/[id]` | Detail Wisata | ✅ Aktif (tidak di-link navbar) | `app/wisata/[id]/` | Detail destinasi — halaman ada & bisa diakses langsung |
| 15 | `/galeri` | Galeri | ✅ Aktif | `app/galeri/page.tsx` | Grid + lightbox + filter |
| 16 | `/infografis` | Infografis | ✅ Aktif | `app/infografis/page.tsx` | Visualisasi data statistik |
| 17 | `/kontak` | Kontak | ✅ Aktif | `app/aduan/page.tsx` | Kontak + Google Maps + WhatsApp |

### 3.2 Auth

| Route | Status | File |
|---|---|---|
| `/auth/signin` | ✅ Aktif | `app/auth/signin/` |
| `/auth/signup` | ✅ Aktif | `app/auth/signup/` |

### 3.3 User Pages

| Route | Status | File |
|---|---|---|
| `/akun/[id]` | ✅ Aktif | `app/akun/[id]/page.tsx` |

### 3.4 Admin Pages (Dashboard)

| # | Route | Tipe | Status | File |
|---|---|---|---|---|
| 18 | `/dashboard` | Overview | ✅ Aktif | `app/dashboard/page.tsx` |
| 19 | `/dashboard/posts` | CRUD Berita | ✅ Aktif | `app/dashboard/posts/` |
| 20 | `/dashboard/posts/create` | Form Berita | ✅ Aktif | `app/dashboard/posts/create/` |
| 21 | `/dashboard/posts/[id]` | Edit Berita | ✅ Aktif | `app/dashboard/posts/[id]/` |
| 22 | `/dashboard/breaking-news` | CRUD Breaking News | ✅ Aktif | `app/dashboard/breaking-news/` |
| 23 | `/dashboard/breaking-news/create` | Form Breaking News | ✅ Aktif | `app/dashboard/breaking-news/create/` |
| 24 | `/dashboard/categories` | CRUD Kategori | ✅ Aktif | `app/dashboard/categories/` |
| 25 | `/dashboard/categories/create` | Form Kategori | ✅ Aktif | `app/dashboard/categories/create/` |
| 26 | `/dashboard/messages` | Pesan Masuk | ✅ Aktif | `app/dashboard/messages/` |
| 27 | `/dashboard/users` | Manajemen User | ✅ Aktif | `app/dashboard/users/` |
| 28 | `/dashboard/umkm` | CRUD UMKM | ✅ Aktif | `app/dashboard/umkm/` |
| 29 | `/dashboard/umkm/new` | Form UMKM | ✅ Aktif | `app/dashboard/umkm/new/` |
| 30 | `/dashboard/umkm/[id]` | Edit UMKM | ✅ Aktif | `app/dashboard/umkm/[id]/` |
| 31 | `/dashboard/wisata` | CRUD Wisata | ✅ Aktif | `app/dashboard/wisata/` |
| 32 | `/dashboard/wisata/new` | Form Wisata | ✅ Aktif | `app/dashboard/wisata/new/` |
| 33 | `/dashboard/wisata/[id]` | Edit Wisata | ✅ Aktif | `app/dashboard/wisata/[id]/` |
| 34 | `/dashboard/galeri` | Kelola Galeri | ✅ Aktif | `app/dashboard/galeri/` |
| 35 | `/dashboard/profil-desa` | Edit Profil Desa | ✅ Aktif | `app/dashboard/profil-desa/` |
| 36 | `/dashboard/infografis` | Kelola Infografis | ✅ Aktif | `app/dashboard/infografis/` |
| 37 | `/dashboard/kontak` | Kelola Kontak | ✅ Aktif | `app/dashboard/kontak/` |

### 3.5 API Routes

| Route | Method | Status | File |
|---|---|---|---|
| `/api/desa` | GET, PUT | ✅ Aktif | `app/api/desa/route.ts` |
| `/api/kontak` | GET, PUT | ✅ Aktif | `app/api/kontak/route.ts` |
| `/api/perangkat-desa` | GET, POST | ✅ Aktif | `app/api/perangkat-desa/route.ts` |
| `/api/perangkat-desa/[id]` | GET, PUT, DELETE | ✅ Aktif | `app/api/perangkat-desa/[id]/route.ts` |
| `/api/umkm` | GET (list + limit), POST | ✅ Aktif | `app/api/umkm/route.ts` |
| `/api/umkm/[id]` | GET, PUT, DELETE | ✅ Aktif | `app/api/umkm/[id]/route.ts` |
| `/api/wisata` | GET (list + limit), POST | ✅ Aktif | `app/api/wisata/route.ts` |
| `/api/wisata/[id]` | GET, PUT, DELETE | ✅ Aktif | `app/api/wisata/[id]/route.ts` |
| `/api/galeri` | GET, POST | ✅ Aktif | `app/api/galeri/route.ts` |
| `/api/galeri/[id]` | GET, PUT, DELETE | ✅ Aktif | `app/api/galeri/[id]/route.ts` |
| `/api/infografis` | GET, POST | ✅ Aktif | `app/api/infografis/route.ts` |
| `/api/infografis/[id]` | GET, PUT, DELETE | ✅ Aktif | `app/api/infografis/[id]/route.ts` |
| `/api/upload` | POST | ✅ Aktif | `app/api/upload/route.ts` |
| `/api/auth/[...all]` | — | ✅ Aktif | Better-Auth built-in |
| `/api/posts` | GET, POST | ✅ Aktif | `app/api/posts/route.ts` |
| `/api/posts/[id]` | GET, PUT, DELETE | ✅ Aktif | `app/api/posts/[id]/route.ts` |
| `/api/categories` | GET, POST | ✅ Aktif | `app/api/categories/route.ts` |
| `/api/categories/[id]` | GET, PUT, DELETE | ✅ Aktif | `app/api/categories/[id]/route.ts` |
| `/api/messages` | GET, POST | ✅ Aktif | `app/api/messages/route.ts` |
| `/api/messages/[id]` | GET, PUT, DELETE | ✅ Aktif | `app/api/messages/[id]/route.ts` |
| `/api/users` | GET, POST | ✅ Aktif | `app/api/users/route.ts` |
| `/api/users/[id]` | GET, PUT, DELETE | ✅ Aktif | `app/api/users/[id]/route.ts` |
| `/api/breaking-news` | GET, POST | ✅ Aktif | `app/api/breaking-news/route.ts` |
| `/api/breaking-news/[id]` | GET, PUT, DELETE | ✅ Aktif | `app/api/breaking-news/[id]/route.ts` |
| `/api/profile/[id]` | GET, PUT | ✅ Aktif | `app/api/profile/[id]/route.ts` |

---

## 4. Database Models

### 4.1 Auth & Content (dari PortalBeritaKodim)

| Model | Table | Keterangan |
|---|---|---|
| `User` | `user` | Auth + role (ADMIN, EDITOR, USER) + relasi Galeri & Post |
| `Session` | `session` | Better-Auth session |
| `Account` | `account` | Better-Auth account |
| `Verification` | `verification` | Better-Auth verifikasi |
| `Role` (enum) | — | USER, ADMIN, EDITOR |
| `Post` | `post` | Berita kelurahan (judul, slug, konten, gambar, category, trending, isHighlight, published) |
| `Category` | `category` | Kategori berita |
| `BreakingNews` | `breaking_news` | Pengumuman berjalan (marquee) |
| `Message` | `message` | Kontak/pesan dari pengunjung |

### 4.2 Kelurahan Salomallori (ditambahkan)

| Model | Table | Field Utama | Status |
|---|---|---|---|
| `Desa` | `desa` | nama, sejarah, visi, misi, luasWilayah, jumlahPenduduk, jumlahKK, jumlahDusun, batasUtara, batasTimur, batasSelatan, batasBarat, fotoKepalaDesa | ✅ Aktif |
| `PerangkatDesa` | `perangkat_desa` | nama, jabatan, foto, urutan | ✅ Aktif |
| `UMKM` | `umkm` | namaProduk, deskripsi, harga, kategori, kontak, gambar, pemilik | ✅ Aktif |
| `Wisata` | `wisata` | nama, deskripsi, lokasi, kategori (enum), gambar | ✅ Aktif |
| `WisataKategori` (enum) | — | WISATA_ALAM, KULINER, BUDAYA | ✅ Aktif |
| `Galeri` | `galeri` | judul, gambar, kategori, uploadedBy (relasi ke User) | ✅ Aktif |
| `Infografis` | `infografis` | judul, tahun, dataJson (Json), chartType (enum) | ✅ Aktif |
| `ChartType` (enum) | — | BAR_CHART, LINE_CHART, PIE_CHART, DOUGHNUT_CHART, AREA_CHART, STAT_CARDS | ✅ Aktif |
| `Kontak` | `kontak` | alamat, telepon, whatsapp, email, jamKerja, mapsEmbed | ✅ Aktif |

---

## 5. Komponen yang Tersedia

### 5.1 Landing Page Components (`components/landing/`)

| Komponen | Status | Fungsi |
|---|---|---|
| `HeroSection` | ✅ Aktif | Hero section beranda dengan overlay gelap |
| `StatsSection` | ✅ Aktif | Statistik kelurahan (luas, penduduk, KK, dusun) — data dari `/api/desa` |
| `BreakingNewsSection` | ✅ Aktif | Marquee pengumuman kelurahan |
| `NewsSection` | ✅ Aktif | Grid berita terbaru di beranda |
| `SejarahSection` | ✅ Aktif | Section sejarah kelurahan di beranda — data dari `/api/desa` |
| `FeaturedSection` | ⚠️ Tidak dipakai | Grid UMKM + Wisata unggulan (tidak lagi di-import di beranda; halaman `/umkm` & `/wisata` tetap aktif) |
| `GaleriSection` | ✅ Aktif | Galeri foto grid di beranda |

### 5.2 Custom Components (`components/custom/`)

| Komponen | Status | Fungsi |
|---|---|---|
| `Navbar` | ✅ Aktif | Navigasi utama (public + dashboard variant, fixed top + backdrop blur) |
| `Footer` | ✅ Aktif | Footer halaman public |
| `BreakingNews` | ✅ Aktif | Breaking news ticker |
| `NewsCard` | ✅ Aktif | Card berita untuk daftar artikel |
| `PostsGrid` | ✅ Aktif | Grid daftar post |
| `CategoryBadge` | ✅ Aktif | Badge kategori |
| `ImageUpload` | ✅ Aktif | Upload gambar ke Cloudinary |
| `ThemeProvider` / `ThemeToggle` | ✅ Aktif | Dark mode via next-themes |
| `ScrollToTop` | ✅ Aktif | Tombol scroll ke atas |
| `ColorPicker` | ✅ Aktif | Picker warna (editor) |
| `DateRangePicker` | ✅ Aktif | Picker rentang tanggal |
| `UserMultiSelect` | ✅ Aktif | Multi-select user (author post) |

### 5.3 Domain Components

| Direktori | Komponen | Fungsi |
|---|---|---|
| `components/galeri/` | `GaleriClient` | Grid galeri + filter kategori + lightbox |
| `components/infografis/` | `InfografisClient` | Client wrapper infografis |
| `components/infografis/` | `ChartView` | Render chart (Bar/Line/Pie/Doughnut/Area/StatCards) |
| `components/umkm/` | `UmkmClient` | Grid UMKM + filter + pencarian |
| `components/wisata/` | `WisataClient` | Grid wisata + filter kategori |
| `components/custom/` | `Footer` | Footer |
| `components/custom/` | `ImageUpload` | Upload komponen |

### 5.4 TipTap Editor Components

| Direktori | Isi |
|---|---|
| `components/tiptap-extension/` | Ekstensi kustom (node-background) |
| `components/tiptap-icons/` | Icon set editor (bold, italic, heading, link, dll) |
| `components/tiptap-node/` | Node kustom (blockquote, code-block, heading, image, list, paragraph, dll) |
| `components/tiptap-templates/` | Template editor (simple) |
| `components/tiptap-ui/` | Toolbar UI (heading dropdown, link popover, mark button, dll) |
| `components/tiptap-ui-primitive/` | Primitive UI (button, card, dropdown, input, toolbar, dll) |

### 5.5 UI Components (`components/ui/` — shadcn/ui)

`avatar`, `badge`, `button`, `calendar`, `card`, `dialog`, `dropdown-menu`, `field`, `input`, `label`, `navigation-menu`, `popover`, `select`, `separator`, `skeleton`, `sonner`, `table`, `tabs`, `toggle`

---

## 6. Konvensi

- **Naming:** File/route kebab-case, komponen PascalCase, fungsi/variabel camelCase.
- **Navbar:** Fixed top bar (background `#0b2b40` Graphite Night, backdrop blur) — struktur menu: Beranda | Profil ▼ | UMKM | Publikasi ▼ | Kontak.
- **Color palette:** Brand colors `#0b2b40` (Graphite Night), `#84bd3a` (Primary Green), `#32735f` (Teal Dark), `#febe0d` (Gold) — lihat `DESIGN.md` Section 2.
- **Dark mode:** via `components/custom/theme-provider.tsx` (next-themes).
- **Upload:** Cloudinary via `app/api/upload/route.ts`.
- **Error handling:** API route try-catch 500, toast (sonner) untuk CRUD, loading/empty/skeleton state.
- **TypeScript:** Strict mode, Prisma types, Zod validasi input (`lib/schemas/`).

---

## 7. Catatan Penting

1. Jangan hapus file existing yang masih berfungsi — beberapa folder sisa PortalBeritaKodim (`pejabat-kodim`, `sejarah-satuan`) sengaja dibiarkan untuk keamanan.
2. TipTap untuk rich text editing.
3. Cloudinary untuk upload gambar/file.
4. Role: USER (warga), ADMIN (full akses), EDITOR (kelola konten).
5. Breakpoints: sm=640, md=768, lg=1024, xl=1280.
6. Dashboard navbar menyembunyikan menu `/dashboard/users` untuk non-ADMIN.
7. Kontak & Google Maps dikelola via model `Kontak` (single record) + `app/dashboard/kontak`.

---

*Dokumen struktur proyek — disinkronkan dengan kondisi aktual kode per Maret 2026.*