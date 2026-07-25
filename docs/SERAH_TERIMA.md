# Dokumentasi Serah Terima Website Profil Kelurahan Salomallori

---

**Disusun oleh:** Tim KKN Universitas Hasanuddin  
**Kelurahan:** Salomallori, Kecamatan Dua Pitue, Kabupaten Sidenreng Rappang  
**Tanggal:** Juli 2026

---

## 1. Informasi Umum Website

| Item | Detail |
|---|---|
| **URL Website** | [https://web-kelurahan-salomallori.vercel.app](https://web-kelurahan-salomallori.vercel.app) |
| **Nama Proyek** | Website Profil Kelurahan Salomallori |
| **Tujuan** | Portal informasi digital kelurahan, promosi potensi UMKM & wisata, dokumentasi kegiatan, serta pelayanan administrasi |
| **Framework** | Next.js 16 (App Router) |
| **Hosting** | Vercel (Cloud — region Singapore) |
| **Database** | PostgreSQL (Neon — Cloud) |
| **CMS** | Dashboard admin (no-code, form-based) |

---

## 2. Akses Website

### 2.1 Halaman Publik (Tanpa Login)

Semua halaman dapat diakses tanpa login:

| Halaman | URL | Fungsi |
|---|---|---|
| Beranda | `/` | Hero section, statistik kelurahan, UMKM & wisata unggulan, galeri, pengumuman |
| Profil | `/profil` | Sejarah, data geografis & demografis |
| Visi & Misi | `/profil/visi-misi` | Visi, misi, dan tujuan kelurahan |
| Struktur | `/profil/struktur` | Struktur organisasi pemerintahan |
| Perangkat | `/profil/perangkat` | Daftar perangkat kelurahan |
| Berita | `/news` | Artikel berita & kegiatan kelurahan |
| UMKM | `/umkm` | Katalog produk UMKM lokal |
| Wisata | `/wisata` | Destinasi wisata, kuliner, budaya |
| Galeri | `/galeri` | Galeri foto dengan lightbox |
| Infografis | `/infografis` | Visualisasi data statistik kelurahan |
| IDM | `/idm` | Indeks Desa Membangun |
| Kontak | `/kontak` | Lokasi, Google Maps, kontak WhatsApp |

### 2.2 Halaman Admin (Login Diperlukan)

| Halaman | URL | Fungsi |
|---|---|---|
| Login | `/auth/signin` | Halaman masuk admin/editor/user |
| Dashboard | `/dashboard` | Ringkasan statistik & aktivitas |
| Kelola Berita | `/dashboard/posts` | CRUD berita & kegiatan |
| Kelola UMKM | `/dashboard/umkm` | CRUD produk UMKM |
| Kelola Wisata | `/dashboard/wisata` | CRUD destinasi wisata |
| Kelola Galeri | `/dashboard/galeri` | Upload & kelola foto |
| Profil Desa | `/dashboard/profil-desa` | Edit data kelurahan & perangkat |
| Kelola Infografis | `/dashboard/infografis` | Update data statistik |
| Breaking News | `/dashboard/breaking-news` | Kelola pengumuman |
| Pesan Masuk | `/dashboard/messages` | Lihat pesan dari pengunjung |
| Kategori | `/dashboard/categories` | Kelola kategori berita |
| Pengguna | `/dashboard/users` | Manajemen user (hanya Admin) |

---

## 3. Akun & Role Pengguna

### 3.1 Jenis Role

| Role | Level Akses |
|---|---|
| **ADMIN** | Akses penuh ke semua menu dashboard, termasuk manajemen pengguna |
| **EDITOR** | Akses ke konten (berita, UMKM, wisata, galeri) dan dapat memproses permohonan |
| **USER** (Warga) | Dashboard pribadi (mengajukan permohonan, tracking, edit profil) |

### 3.2 Cara Registrasi

1. Buka halaman `/auth/signin`
2. Klik tautan **"Daftar Akun Baru"**
3. Isi nama, email, dan password
4. Akun akan otomatis terdaftar sebagai **USER**
5. Untuk upgrade role menjadi ADMIN/EDITOR, hubungi admin yang sudah ada

---

## 4. Panduan Mengelola Konten

### 4.1 Dashboard Overview

Setelah login sebagai Admin/Editor, halaman dashboard menampilkan:
- Jumlah total berita yang dipublikasikan
- Jumlah UMKM, wisata, dan galeri
- Jumlah pesan masuk
- Tautan cepat ke menu-menu utama

### 4.2 Mengelola Berita

1. Buka menu **Posts** di sidebar
2. Klik **"Buat Berita Baru"** untuk menulis artikel
3. Gunakan editor **TipTap** untuk:
   - Menformat teks (tebal, miring, heading)
   - Menyisipkan gambar
   - Membuat daftar (bullet/numbering)
4. Pilih **kategori** berita
5. Atur **status publikasi** (published/draft)
6. Klik **"Simpan"** atau **"Publikasikan"**

### 4.3 Mengelola UMKM

1. Buka menu **UMKM** di sidebar
2. Klik **"Tambah UMKM Baru"**
3. Isi data produk:
   - Nama produk
   - Deskripsi
   - Harga (opsional)
   - Kategori
   - Kontak (nomor telepon/WA)
   - Pemilik
   - Gambar produk (upload)
4. Klik **"Simpan"**

### 4.4 Mengelola Wisata

1. Buka menu **Wisata** di sidebar
2. Klik **"Tambah Wisata Baru"**
3. Isi data destinasi:
   - Nama tempat
   - Deskripsi
   - Lokasi
   - Kategori (Wisata Alam, Kuliner, Budaya)
   - Gambar (upload)
4. Klik **"Simpan"**

### 4.5 Mengelola Galeri Foto

1. Buka menu **Galeri** di sidebar
2. Klik **"Upload Foto"**
3. Pilih file gambar dari komputer
4. Isi judul dan kategori foto
5. Klik **"Upload"**
6. Foto akan otomatis tersimpan di **Cloudinary**

### 4.6 Mengelola Profil Kelurahan

1. Buka menu **Profil Desa** di sidebar
2. **Data Kelurahan:**
   - Edit nama kelurahan, sejarah, visi, misi
   - Update data statistik (luas wilayah, jumlah penduduk, KK, dusun)
   - Edit batas wilayah (utara, timur, selatan, barat)
   - Upload foto Kepala Desa
3. **Perangkat Desa:**
   - Tambah/edit/hapus perangkat kelurahan
   - Atur urutan tampilan
   - Upload foto perangkat
4. Klik **"Simpan"** setelah selesai

### 4.7 Mengelola Infografis

1. Buka menu **Infografis** di sidebar
2. Klik **"Tambah Data Baru"**
3. Isi judul dan tahun data
4. Pilih tipe chart:
   - **Bar Chart** — perbandingan data antar kategori
   - **Line Chart** — tren data dari waktu ke waktu
   - **Pie Chart** — proporsi/persentase
   - **Doughnut Chart** — proporsi dengan lubang di tengah
   - **Area Chart** — tren dengan area terisi
   - **Stat Cards** — tampilan angka statistik
5. Masukkan data dalam format JSON
6. Klik **"Simpan"**

### 4.8 Mengelola Breaking News

1. Buka menu **Breaking News** di sidebar
2. Klik **"Tambah Baru"**
3. Tulis teks pengumuman
4. Atur tautan (jika ingin diarahkan ke halaman tertentu)
5. Aktifkan/nonaktifkan status
6. Klik **"Simpan"**

### 4.9 Melihat Pesan Masuk

1. Buka menu **Messages** di sidebar
2. Lihat daftar pesan dari pengunjung website
3. Klik pesan untuk melihat detail
4. Tandai sudah dibaca (read/unread)

---

## 5. Informasi Teknis

### 5.1 Hosting (Vercel)

- Platform: **Vercel** (vercel.com)
- Region server: **Singapore** (sin1) — optimal untuk akses Indonesia
- Domain: `web-kelurahan-salomallori.vercel.app`
- Build otomatis setiap kali ada perubahan di repository GitHub
- Build command: `npx prisma generate && npx prisma migrate deploy && next build`

### 5.2 Database (PostgreSQL)

- Platform: **Neon** (neon.tech)
- Database engine: PostgreSQL
- ORM: **Prisma** — menghubungkan database dengan kode
- Migrasi otomatis saat deploy (via `prisma migrate deploy`)

### 5.3 Upload Gambar (Cloudinary)

- Platform: **Cloudinary** (cloudinary.com)
- Semua gambar (berita, UMKM, wisata, galeri, profil) disimpan di Cloudinary
- Format yang didukung: JPG, PNG, GIF, WebP
- Ukuran maksimal: ~10MB per file

> **Catatan:** Saat ini Cloudinary masih menggunakan placeholder. Untuk mengaktifkan upload gambar, isi `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, dan `CLOUDINARY_API_SECRET` di file `.env` (di Vercel dashboard → Settings → Environment Variables).

### 5.4 Autentikasi (Better-Auth)

- Sistem login menggunakan **Better-Auth**
- Mendukung login via email & password
- Session aman dengan token terenkripsi

### 5.5 Dark Mode

- Website mendukung **tema terang dan gelap**
- Klik ikon bulan/matahari di pojok kanan navbar untuk mengganti tema
- Pilihan tema tersimpan di browser

---

## 6. Perawatan & Troubleshooting

### 6.1 Perawatan Rutin

| Aktivitas | Frekuensi | Cara |
|---|---|---|
| Update berita | Setiap ada kegiatan | Dashboard → Posts |
| Update data UMKM | Ada perubahan | Dashboard → UMKM |
| Update galeri | Setelah acara | Dashboard → Galeri |
| Cek pesan masuk | Seminggu sekali | Dashboard → Messages |
| Update data statistik | Setahun sekali | Dashboard → Infografis |

### 6.2 Masalah Umum & Solusi

| Masalah | Kemungkinan Penyebab | Solusi |
|---|---|---|
| **Tidak bisa login** | Email/password salah | Klik "Lupa Password" atau hubungi admin |
| **Upload gambar gagal** | Cloudinary belum dikonfigurasi | Isi environment variable Cloudinary di Vercel |
| **Halaman tidak muncul** | Belum dipublikasikan | Cek status "published" di halaman kelola konten |
| **Data tidak tersimpan** | Koneksi internet terputus | Cek koneksi, refresh, coba simpan lagi |
| **Tampilan berantakan** | Cache browser | Refresh halaman (Ctrl+F5 atau Cmd+Shift+R) |
| **Error 500 (Server Error)** | Masalah sementara di server | Refresh, jika masih error hubungi tim teknis |

### 6.3 Kontak Pengembang

Jika menemui masalah teknis yang tidak dapat diselesaikan, hubungi:

> **Tim KKN Universitas Hasanuddin**  
> *(Hubungi koordinator KKN untuk informasi kontak teknis terkini)*

---

## 7. Catatan Penting

1. **Jangan hapus file di repository** — hanya kelola konten lewat dashboard
2. **Backup data** — database akan terus aman di Neon Cloud, tidak perlu backup manual
3. **Limit upload** — Cloudinary memiliki kuota gratis, jika penuh akan perlu upgrade akun
4. **Koneksi internet** — diperlukan untuk mengakses dashboard dan upload gambar
5. **Keamanan** — jangan bagikan password admin ke pihak yang tidak berwenang
6. **Role Editor** — dapat digunakan untuk perangkat kelurahan yang bertugas mengelola konten harian

---

## 8. Daftar Halaman Selesai

### ✅ Public Pages (15 halaman)

| No | Halaman | Status |
|---|---|---|
| 1 | Beranda | ✅ |
| 2 | Profil Kelurahan | ✅ |
| 3 | Visi & Misi | ✅ |
| 4 | Struktur Organisasi | ✅ |
| 5 | Perangkat Desa | ✅ |
| 6 | Berita (list) | ✅ |
| 7 | Detail Berita | ✅ |
| 8 | UMKM (list) | ✅ |
| 9 | Detail UMKM | ✅ |
| 10 | Wisata (list) | ✅ |
| 11 | Detail Wisata | ✅ |
| 12 | Galeri + Lightbox | ✅ |
| 13 | Infografis | ✅ |
| 14 | IDM (Indeks Desa Membangun) | ✅ |
| 15 | Kontak & Lokasi | ✅ |

### ✅ Admin Pages (11 halaman)

| No | Halaman | Status |
|---|---|---|
| 1 | Dashboard Overview | ✅ |
| 2 | CRUD Berita | ✅ |
| 3 | CRUD UMKM | ✅ |
| 4 | CRUD Wisata | ✅ |
| 5 | Kelola Galeri | ✅ |
| 6 | Edit Profil Desa | ✅ |
| 7 | Kelola Infografis | ✅ |
| 8 | Kelola Breaking News | ✅ |
| 9 | Kelola Pesan Masuk | ✅ |
| 10 | Kelola Kategori | ✅ |
| 11 | Manajemen User | ✅ |

### ✅ Auth Pages (2 halaman)

| No | Halaman | Status |
|---|---|---|
| 1 | Login | ✅ |
| 2 | Registrasi | ✅ |

---

*Dokumen ini diserahkan kepada Perangkat Kelurahan Salomallori sebagai panduan penggunaan dan perawatan website. Untuk pertanyaan lebih lanjut, silakan menghubungi tim KKN Universitas Hasanuddin.*

---

© 2026 Tim KKN Universitas Hasanuddin — Kelurahan Salomallori, Kecamatan Dua Pitue, Kabupaten Sidenreng Rappang