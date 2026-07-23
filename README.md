<div align="center">

# 🏘️ Website Profil Kelurahan Salomallori

### Sistem Informasi Kelurahan Terpadu — KKN Universitas Hasanuddin

![Next.js](https://img.shields.io/badge/Next.js-16.x-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-latest-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

[Demo](#) • [Dokumentasi](#fitur-utama) • [Instalasi](#-instalasi) • [Kontribusi](#-kontribusi)

</div>

---

## 📋 Daftar Isi

- [Tentang Projek](#-tentang-projek)
- [Fitur Utama](#-fitur-utama)
- [Teknologi](#-teknologi)
- [Instalasi](#-instalasi)
- [Cara Menjalankan](#-cara-menjalankan)
- [Struktur Kode](#-struktur-kode)
- [API Endpoints](#-api-endpoints)
- [Konfigurasi](#%EF%B8%8F-konfigurasi)
- [Kontribusi](#-kontribusi)

---

## 🎯 Tentang Projek

**Website Profil Kelurahan Salomallori** adalah platform digital kelurahan yang dikembangkan sebagai program kerja Kuliah Kerja Nyata (KKN) Universitas Hasanuddin. Website ini bertujuan untuk mempromosikan potensi kelurahan, menyediakan informasi publik, dan menjadi sarana digitalisasi layanan Kelurahan Salomallori, Kecamatan Dua Pitue, Kabupaten Sidenreng Rappang (Sidrap), Sulawesi Selatan.

### ✨ Kenapa Projek Ini?

- 🚀 **Performa Tinggi** — Dibangun dengan Next.js App Router untuk SSR & SSG yang cepat
- 🎨 **UI/UX Modern** — Desain minimalis menggunakan Shadcn UI & Tailwind CSS
- 🌓 **Dark Mode** — Dukungan tema gelap untuk kenyamanan membaca
- 📱 **Responsive** — Tampilan optimal di semua perangkat (mobile, tablet, desktop)
- 🔐 **Autentikasi** — Login email/password dan Google OAuth via Better Auth
- ✍️ **Rich Text Editor** — Editor konten lengkap dengan Tiptap
- 🖼️ **Cloud Storage** — Upload gambar otomatis ke Cloudinary

---

## 🎨 Fitur Utama

### 👥 Untuk Pengunjung
- ✅ **Feed Berita** — Tampilan berita terbaru dengan layout card modern
- ✅ **Kategori Berita** — Filter berdasarkan kategori yang tersedia
- ✅ **Breaking News** — Ticker pengumuman di bagian atas
- ✅ **Halaman Berita** — Tampilan artikel berita lengkap dengan slug
- ✅ **Profil Penulis** — Halaman profil per pengguna
- ✅ **Kontak** — Halaman kontak kelurahan
- ✅ **Profil Kelurahan** — Sejarah, visi & misi, struktur organisasi
- ✅ **UMKM** — Katalog produk UMKM kelurahan
- ✅ **Wisata** — Daftar destinasi wisata
- ✅ **Galeri Foto** — Galeri foto kelurahan
- ✅ **Infografis** — Data statistik kelurahan
- ✅ **Dark/Light Mode** — Toggle tema sesuai preferensi

### 🔧 Untuk Admin & Editor
- ✅ **Dashboard** — Panel manajemen konten terpusat
- ✅ **CRUD Berita** — Tambah, edit, hapus, dan publikasi berita
- ✅ **Rich Text Editor** — Editor Tiptap dengan format teks, gambar, heading, dll
- ✅ **Upload Gambar** — Upload thumbnail ke Cloudinary
- ✅ **Manajemen Kategori** — Atur kategori berita beserta warna
- ✅ **Manajemen Pengguna** — Kelola akun dan peran pengguna (Admin/Editor/User)
- ✅ **Breaking News** — Update teks pengumuman secara langsung
- ✅ **Pesan Masuk** — Kelola pesan dari pengunjung
- ✅ **CRUD UMKM** — Kelola data produk UMKM
- ✅ **CRUD Wisata** — Kelola data destinasi wisata
- ✅ **Kelola Galeri** — Upload dan kelola foto galeri
- ✅ **Edit Profil Kelurahan** — Update data dan perangkat kelurahan
- ✅ **Kelola Infografis** — Atur data statistik infografis

---

## 🛠 Teknologi

### Frontend Framework
- **Next.js 16.x** — React framework dengan App Router, SSR & SSG
- **React 19.x** — UI Library untuk komponen interaktif
- **Tailwind CSS 4.x** — Utility-first CSS framework

### UI & Komponen
- **Shadcn UI** — Komponen UI berbasis Radix UI
- **Radix UI** — Komponen primitif yang aksesibel
- **Lucide React** — Icon library modern
- **next-themes** — Dark/Light mode management
- **Tiptap 3.x** — Rich text editor yang powerful dan extensible

### Backend & Database
- **Prisma 7.x** — ORM modern dengan type-safety penuh
- **PostgreSQL** — Database relasional
- **Better Auth 1.x** — Sistem autentikasi (Email/Password & Google OAuth)
- **Cloudinary** — Cloud storage untuk gambar dan media

### DevTools
- **TypeScript 5.x** — Type safety end-to-end
- **ESLint** — Code linting
- **Docker** — Containerisasi database PostgreSQL
- **Sass** — CSS preprocessor untuk styling tambahan

---

## 📦 Instalasi

### Prerequisites

Pastikan sudah terinstall:
- **Node.js** versi 18.x atau lebih tinggi
- **npm** atau **pnpm** atau **yarn**
- **Docker** (untuk menjalankan PostgreSQL via Docker Compose)
- Akun **Cloudinary** (untuk upload gambar)

### Langkah Instalasi

1️⃣ **Clone Repository**
```bash
git clone https://github.com/MvLx/Web-Kelurahan-Salomallori.git
cd Web-Kelurahan-Salomallori
```

2️⃣ **Install Dependencies**
```bash
npm install
```

3️⃣ **Setup Environment Variables**

Buat file `.env` di root project lalu isi berdasarkan contoh di file `.env.example`

4️⃣ **Jalankan Database dengan Docker**
```bash
docker compose up -d
```

5️⃣ **Jalankan Migrasi & Generate Prisma Client**
```bash
npx prisma migrate dev
```

---

## 🚀 Cara Menjalankan

### Development Mode

```bash
npm run dev
```

Server akan berjalan di: **http://localhost:3000**

- 🏠 Halaman Utama: `http://localhost:3000/`
- ⚙️ Dashboard: `http://localhost:3000/dashboard`
- 🔐 Halaman Login: `http://localhost:3000/auth/signin`

### Production Build

```bash
# Build aplikasi (otomatis menjalankan prisma migrate deploy & generate)
npm run build

# Jalankan production server
npm run start
```

### Available Scripts

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Menjalankan development server dengan hot-reload |
| `npm run build` | Build aplikasi untuk production (+ prisma migrate & generate) |
| `npm run start` | Menjalankan production server |
| `npm run lint` | Menjalankan ESLint untuk pengecekan kode |

---

## 📁 Struktur Kode

```
Web-Kelurahan-Salomallori/
│
├── 📂 app/                             # Next.js App Router
│   ├── layout.tsx                     # Root layout
│   ├── page.tsx                       # Halaman utama (/)
│   ├── globals.css                    # Global styles
│   ├── 📂 api/                        # API Route Handlers
│   │   ├── auth/                      # Better Auth endpoints
│   │   ├── posts/                     # GET semua post & POST buat post baru
│   │   │   └── [id]/                  # GET, PUT, PATCH, DELETE single post
│   │   ├── categories/                # GET semua kategori & POST buat kategori
│   │   │   └── [id]/                  # DELETE single kategori
│   │   ├── users/                     # GET semua user
│   │   │   └── [id]/                  # PATCH, DELETE single user
│   │   ├── breaking-news/             # GET, POST, PATCH, DELETE breaking news
│   │   │   └── [id]/                  # PATCH, DELETE single breaking news
│   │   ├── messages/                  # GET semua pesan & POST pesan baru
│   │   │   └── [id]/                  # GET, PATCH, DELETE single pesan
│   │   ├── upload/                    # POST upload gambar ke Cloudinary
│   │   ├── profile/[id]/              # GET & PATCH profil pengguna
│   │   ├── desa/                      # GET, PUT data kelurahan
│   │   ├── perangkat-desa/            # CRUD perangkat kelurahan
│   │   │   └── [id]/                  # GET, PUT, DELETE single perangkat
│   │   ├── umkm/                      # CRUD UMKM
│   │   │   └── [id]/                  # GET, PUT, DELETE single UMKM
│   │   ├── wisata/                    # CRUD wisata
│   │   │   └── [id]/                  # GET, PUT, DELETE single wisata
│   │   ├── galeri/                    # CRUD galeri
│   │   │   └── [id]/                  # GET, PUT, DELETE single galeri
│   │   └── infografis/                # CRUD infografis
│   │       └── [id]/                  # GET, PUT, DELETE single infografis
│   ├── 📂 auth/                       # Halaman autentikasi
│   │   ├── signin/                    # Halaman login
│   │   └── signup/                    # Halaman registrasi
│   ├── 📂 dashboard/                  # Panel admin/editor
│   │   ├── page.tsx                   # Dashboard utama
│   │   ├── posts/                     # Manajemen berita
│   │   ├── categories/                # Manajemen kategori
│   │   ├── users/                     # Manajemen pengguna
│   │   ├── breaking-news/             # Manajemen pengumuman
│   │   ├── messages/                  # Manajemen pesan
│   │   ├── umkm/                      # Manajemen UMKM
│   │   ├── wisata/                    # Manajemen wisata
│   │   ├── galeri/                    # Manajemen galeri
│   │   ├── profil-desa/               # Edit data & perangkat kelurahan
│   │   └── infografis/                # Manajemen infografis
│   ├── 📂 news/[slug]/                # Halaman artikel berita
│   ├── 📂 akun/[id]/                  # Halaman profil pengguna
│   ├── 📂 profil/                     # Halaman profil kelurahan
│   │   ├── visi-misi/                 # Visi & misi
│   │   ├── struktur-organisasi/       # Bagan struktur
│   │   └── pejabat-kodim/             # Perangkat kelurahan
│   ├── 📂 umkm/                       # Katalog UMKM
│   ├── 📂 wisata/                     # Daftar wisata
│   ├── 📂 galeri/                     # Galeri foto
│   ├── 📂 infografis/                 # Infografis
│   ├── 📂 idm/                        # IDM
│   └── 📂 kontak/                     # Halaman Kontak
│
├── 📂 components/                      # React components
│   ├── 📂 custom/                     # Komponen kustom aplikasi
│   │   ├── navbar.tsx                 # Navigation bar
│   │   ├── footer.tsx                 # Footer
│   │   ├── news-card.tsx              # Card berita
│   │   ├── posts-grid.tsx             # Grid tampilan berita
│   │   ├── breaking-news.tsx          # Breaking news ticker
│   │   ├── category-badge.tsx         # Badge kategori
│   │   ├── image-upload.tsx           # Komponen upload gambar
│   │   ├── theme-provider.tsx         # Dark/light mode provider
│   │   └── theme-toggle.tsx           # Toggle dark/light mode
│   ├── 📂 landing/                    # Komponen landing page
│   │   ├── hero-section.tsx           # Hero section
│   │   ├── stats-section.tsx          # Statistik kelurahan
│   │   └── featured-section.tsx       # UMKM & wisata unggulan
│   ├── 📂 admin/                      # Komponen admin
│   │   ├── AdminSidebar.tsx           # Sidebar dashboard
│   │   └── DashboardShell.tsx         # Shell layout dashboard
│   ├── 📂 galeri/                     # Komponen galeri
│   ├── 📂 infografis/                 # Komponen infografis
│   ├── 📂 tiptap-ui/                  # Komponen UI Tiptap editor
│   ├── 📂 tiptap-extension/           # Ekstensi kustom Tiptap
│   ├── 📂 tiptap-icons/               # Icon kustom untuk Tiptap
│   ├── 📂 tiptap-node/                # Node kustom Tiptap
│   ├── 📂 tiptap-templates/           # Template editor Tiptap
│   ├── 📂 tiptap-ui-primitive/        # Komponen primitif Tiptap UI
│   └── 📂 ui/                         # Komponen Shadcn UI
│
├── 📂 lib/                             # Library & utilitas server
│   ├── auth.ts                        # Konfigurasi Better Auth
│   ├── auth-client.ts                 # Better Auth client
│   ├── dal.ts                         # Data Access Layer
│   ├── permissions.ts                 # Konfigurasi izin akses
│   ├── prisma.ts                      # Prisma client instance
│   ├── tiptap-utils.ts                # Utilitas Tiptap
│   ├── utils.ts                       # Fungsi utilitas umum
│   └── schemas/                       # Zod validation schemas
│       ├── desa.ts                    # Schema validasi data kelurahan
│       ├── perangkat-desa.ts          # Schema validasi perangkat kelurahan
│       ├── umkm.ts                    # Schema validasi UMKM
│       ├── wisata.ts                  # Schema validasi wisata
│       ├── galeri.ts                  # Schema validasi galeri
│       ├── infografis.ts              # Schema validasi infografis
│       └── message.ts                 # Schema validasi pesan
│
├── 📂 prisma/                          # Prisma ORM
│   ├── schema.prisma                  # Schema database
│   └── migrations/                    # Riwayat migrasi database
│
├── 📂 hooks/                           # Custom React hooks
├── 📂 utils/                           # Fungsi utilitas
├── 📂 styles/                          # SCSS styles tambahan
├── 📂 public/                          # Static assets
│
├── 📄 AGENTS.md                       # Panduan AI agent & task tracker
├── 📄 docker-compose.yml              # Konfigurasi Docker (PostgreSQL)
├── 📄 next.config.ts                  # Konfigurasi Next.js
├── 📄 prisma.config.ts                # Konfigurasi Prisma
├── 📄 proxy.ts                        # Konfigurasi proxy
├── 📄 tsconfig.json                   # Konfigurasi TypeScript
└── 📄 package.json                    # Dependencies & scripts
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/posts` | Ambil semua post berita |
| `POST` | `/api/posts` | Buat post baru |
| `GET` | `/api/posts/[id]` | Ambil detail post |
| `PUT` | `/api/posts/[id]` | Update post (full) |
| `PATCH` | `/api/posts/[id]` | Update post sebagian (misal status publish) |
| `DELETE` | `/api/posts/[id]` | Hapus post |
| `GET` | `/api/categories` | Ambil semua kategori |
| `POST` | `/api/categories` | Buat kategori baru |
| `DELETE` | `/api/categories/[id]` | Hapus kategori |
| `GET` | `/api/breaking-news` | Ambil semua pengumuman |
| `POST` | `/api/breaking-news` | Buat pengumuman baru |
| `DELETE` | `/api/breaking-news/[id]` | Hapus single pengumuman |
| `GET` | `/api/users` | Ambil semua pengguna |
| `PATCH` | `/api/users/[id]` | Update pengguna |
| `DELETE` | `/api/users/[id]` | Hapus pengguna |
| `GET` | `/api/messages` | Ambil semua pesan |
| `POST` | `/api/messages` | Kirim pesan baru |
| `GET` | `/api/messages/[id]` | Ambil detail pesan |
| `PATCH` | `/api/messages/[id]` | Update pesan (misal tandai sudah dibaca) |
| `DELETE` | `/api/messages/[id]` | Hapus pesan |
| `GET` | `/api/profile/[id]` | Ambil profil pengguna |
| `PATCH` | `/api/profile/[id]` | Update profil pengguna |
| `POST` | `/api/upload` | Upload gambar ke Cloudinary |
| `GET` | `/api/desa` | Ambil data kelurahan |
| `PUT` | `/api/desa` | Update data kelurahan |
| `GET` | `/api/perangkat-desa` | Ambil semua perangkat kelurahan |
| `POST` | `/api/perangkat-desa` | Tambah perangkat kelurahan |
| `GET` | `/api/perangkat-desa/[id]` | Ambil detail perangkat |
| `PUT` | `/api/perangkat-desa/[id]` | Update perangkat kelurahan |
| `DELETE` | `/api/perangkat-desa/[id]` | Hapus perangkat kelurahan |
| `GET` | `/api/umkm` | Ambil semua UMKM |
| `POST` | `/api/umkm` | Tambah UMKM baru |
| `GET` | `/api/umkm/[id]` | Ambil detail UMKM |
| `PUT` | `/api/umkm/[id]` | Update UMKM |
| `DELETE` | `/api/umkm/[id]` | Hapus UMKM |
| `GET` | `/api/wisata` | Ambil semua wisata |
| `POST` | `/api/wisata` | Tambah wisata baru |
| `GET` | `/api/wisata/[id]` | Ambil detail wisata |
| `PUT` | `/api/wisata/[id]` | Update wisata |
| `DELETE` | `/api/wisata/[id]` | Hapus wisata |
| `GET` | `/api/galeri` | Ambil semua galeri |
| `POST` | `/api/galeri` | Tambah foto galeri |
| `GET` | `/api/galeri/[id]` | Ambil detail galeri |
| `PUT` | `/api/galeri/[id]` | Update galeri |
| `DELETE` | `/api/galeri/[id]` | Hapus galeri |
| `GET` | `/api/infografis` | Ambil semua infografis |
| `POST` | `/api/infografis` | Tambah infografis |
| `GET` | `/api/infografis/[id]` | Ambil detail infografis |
| `PUT` | `/api/infografis/[id]` | Update infografis |
| `DELETE` | `/api/infografis/[id]` | Hapus infografis |
| `ALL` | `/api/auth/*` | Endpoint autentikasi Better Auth |

---

## ⚙️ Konfigurasi

### Next.js Config (`next.config.ts`)

```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'res.cloudinary.com' }, // Cloudinary images
    ],
  },
};
```

### Docker Compose (`docker-compose.yml`)

```yaml
services:
  postgres:
    image: postgres:15-alpine
    container_name: salomallori_db
    restart: always
    environment:
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword
      - POSTGRES_DB=salomallori
    ports:
      - "5432:5432"
```

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Ikuti langkah berikut:

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'feat: tambah fitur X'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Developer

Dibuat dengan ❤️ oleh tim KKN Universitas Hasanuddin untuk Kelurahan Salomallori

**Tim Developer:**
- Rezky Robbyyanto A
- Yousran
- Arelio Palinoan
- Adrian Tri Putra

---

## 📞 Kontak & Support

- 🐛 **Bug Reports**: [Issues](https://github.com/MvLx/Web-Kelurahan-Salomallori/issues)
- 💡 **Feature Requests**: [Discussions](https://github.com/MvLx/Web-Kelurahan-Salomallori/discussions)
- 📧 **Email**: akbarirr23h@student.unhas.ac.id

---

<div align="center">

### ⭐ Jika proyek ini bermanfaat, jangan lupa beri bintang!

**Made with Next.js 🚀 • React ⚛️ • Tailwind 🎨 • Prisma 🔷 • PostgreSQL 🐘**

</div>