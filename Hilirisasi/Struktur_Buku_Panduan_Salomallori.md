# STRUKTUR BUKU PANDUAN (OUTLINE DOKUMEN)

## COVER / HALAMAN UTAMA
* **Judul:** PANDUAN OPERASIONAL DAN MANAJEMEN SITUS WEB PROFIL KELURAHAN SALOMALLORI
* **Subjudul:** Petunjuk Teknis Integrasi Informasi Kelurahan, Etalase Produk UMKM, Dokumentasi Kegiatan, dan Pemeliharaan Data Statistik Visual
* **Target Pengguna:** Masyarakat Umum (Warga Kelurahan & Pengunjung) & Pengelola Sistem (Perangkat Kelurahan, Administrator, & Editor)
* **Alamat Domain Resmi:** `https://www.salomallori.web.id`
* **Disusun Oleh:** A.Muh Muflih Hanifatussurur (H071231062 - Sistem Informasi) - Tim Kuliah Kerja Nyata (KKN) Universitas Hasanuddin Kelurahan Salomallori
* **Tahun:** 2026

## BAGIAN AWAL
* **KATA PENGANTAR** (Halaman i)
* **DAFTAR ISI** (Halaman ii)
* **DAFTAR GAMBAR** (Halaman iv)
* **DAFTAR TABEL** (Halaman v)

## BAB 1: PENDAHULUAN
### 1.1 Latar Belakang
* Demografi & Luas Wilayah Kelurahan Salomallori (Kecamatan Dua Pitue, Kab. Sidenreng Rappang) dengan luas 7,63 km² dan jumlah penduduk 3234 jiwa.
* Kelurahan ini terdiri dari 1077 KK yang tersebar dalam 3 Lingkungan.
* Batas wilayah kelurahan meliputi: Desa Ajubissue (Kec. Pitu Riawa) di sebelah Utara, Kelurahan Tanrutedong di sebelah Timur, Desa Kampale di sebelah Selatan, dan Desa Padangloang Alau di sebelah Barat.
* Potensi utama kelurahan meliputi Sektor Pertanian padi sawah, Peternakan ayam ras petelur, serta kerajinan dan kuliner lokal.
* Pentingnya media digital untuk mempromosikan potensi kelurahan, memperkenalkan UMKM lokal, dan menyediakan informasi publik yang transparan.

### 1.2 Tujuan Pedoman
* Menyediakan panduan teknis penggunaan fitur publik bagi warga kelurahan & pengunjung untuk menjelajahi informasi digital terpadu.
* Menyediakan panduan operasional bagi perangkat kelurahan dalam mengelola dan menyebarkan informasi publik.
* Menjamin keberlanjutan tata kelola platform digital kelurahan pasca-kegiatan KKN.

### 1.3 Sasaran Pengguna
* Masyarakat Umum / Warga Kelurahan / Investor.
* Perangkat Kelurahan (Administrator & Editor).
* Tim KKN Universitas Hasanuddin.

## BAB 2: DASAR TEORI & ARSITEKTUR SISTEM
### 2.1 Pengertian & Gambaran Umum Platform
* Sistem dibangun menggunakan Arsitektur Web Modern berbasis Next.js 16 (App Router), React 19, Tailwind CSS 4, dan PostgreSQL dengan Prisma ORM.
* Desain visual menerapkan gaya *Editorial-First*, *Minimalism*, dan *Glassmorphism* dengan navigasi mengapung (*floating architecture*).

### 2.2 Komponen Utama Website Profil Kelurahan
* Profil Kelurahan, mencakup Sejarah Kelurahan, Pejabat Kelurahan, dan Infografis statistik demografi.
* Kabar Desa (Berita terkini seputar kelurahan).
* Katalog Potensi (UMKM Lokal).
* Galeri Foto digital atau Potret Desa.
* Kontak Kelurahan & Jam Operasional.

### 2.3 Pembagian Hak Akses Pengguna (Role-Based Access Control / RBAC)
* Matriks pembagian hak akses menggunakan autentikasi *Better-Auth* untuk level: USER (Warga), EDITOR (Perangkat Kelurahan), dan ADMIN (Super Admin).

## BAB 3: PERSYARATAN & KEBUTUHAN SISTEM
### 3.1 Kebutuhan Perangkat Pengguna Umum (Warga Kelurahan & Pengunjung)
* Perangkat pintar (Smartphone, Tablet, atau Laptop) dengan browser modern dan koneksi internet, didukung oleh tampilan sistem yang responsif.

### 3.2 Kebutuhan Perangkat Pengelola (Administrator & Editor Kelurahan)
* PC atau Laptop Admin, Web Browser Modern, serta Akun Login terotentikasi.

### 3.3 Alur Akses Platform
* Alur Akses Publik melalui menu navigasi utama yang meliputi: Beranda, Profil (Sejarah Kelurahan, Pejabat Kelurahan, Infografis), UMKM, Publikasi (Berita, Galeri Foto), dan Kontak.
* Alur Dashboard Warga (akses ke `/akun/[id]`).
* Alur Dashboard Administrator & Editor (mengelola konten via `/dashboard` dan sub-menunya).

## BAB 4: LANGKAH-LANGKAH PENGGUNAAN DAN PENGELOLAAN
### 4.1 Panduan Pengguna Umum (Masyarakat & Pengunjung)
* **4.1.1 Membuka Halaman Utama & Navigasi *Floating Pill***
  * Mengakses domain resmi kelurahan dan menavigasi situs menggunakan menu utama yang berisi tautan ke Beranda, Profil, UMKM, Publikasi, dan Kontak.
  * Melihat ringkasan data kelurahan (Luas, Jiwa, KK, Lingkungan) langsung di beranda.
* **4.1.2 Menjelajahi Menu Profil (Sejarah, Pejabat, & Infografis)**
  * Membuka *dropdown* Profil untuk membaca Sejarah Kelurahan (lengkap dengan data Batas Wilayah), melihat daftar Pejabat Kelurahan, serta mengeksplorasi visualisasi data statistik pada halaman Infografis.
* **4.1.3 Mengakses Menu Publikasi (Kabar Desa & Potret Desa)**
  * Membuka *dropdown* Publikasi untuk membaca artikel terbaru pada bagian Berita (Kabar Desa) atau melihat dokumentasi foto pada bagian Galeri Foto (Potret Desa).
* **4.1.4 Menjelajahi Katalog Potensi UMKM**
  * Mengakses menu UMKM untuk mencari produk lokal, melihat detail harga dan deskripsi, serta menghubungi penjual via kontak yang tertera.

### 4.2 Panduan Administrator & Editor (Perangkat Kelurahan)
* **4.2.1 Login ke Dashboard Administrator**
  * Mengakses halaman `/auth/signin` untuk masuk ke *Dashboard Overview*.
* **4.2.2 Mengelola Informasi Profil Kelurahan & Perangkat**
  * Memperbarui data identitas kelurahan (seperti luasan 7,63 km², 3234 penduduk, 3 lingkungan), sejarah, batas wilayah, serta mengatur urutan dan foto Pejabat/Perangkat Kelurahan.
* **4.2.3 Mengelola Publikasi Berita & Galeri Foto**
  * Menambah atau mengedit berita Kabar Desa menggunakan TipTap *Rich Text Editor*, serta mengunggah foto kegiatan ke Potret Desa (Galeri) menggunakan *Cloudinary*.
* **4.2.4 Mengelola Katalog UMKM**
  * Menambahkan entri produk UMKM warga beserta gambar dan detail kontak.
* **4.2.5 Mengelola Infografis & Data Statistik**
  * Memperbarui data statistik kelurahan yang akan tampil di bawah menu Profil dengan memperbarui *dataJson* dan memilih tipe *chart*.
* **4.2.6 Mengelola Kontak & Pesan Masuk (Khusus Admin)**
  * Memperbarui informasi di *footer* seperti jam operasional dan kontak layanan (WhatsApp/Email), serta melihat kotak masuk pesan dari pengunjung situs.

## BAB 5: STUDI KASUS / CONTOH PRAKTIK
* **5.1 Studi Kasus 1:** Penelusuran Visualisasi Infografis Statistik Kependudukan pada Menu Profil oleh Masyarakat.
* **5.2 Studi Kasus 2:** Penulisan dan Pemublikasian Artikel Kabar Desa (Berita KKN) Menggunakan Fitur TipTap Editor secara Lengkap.
* **5.3 Studi Kasus 3:** Penambahan Katalog Produk UMKM Lokal beserta Foto Produk oleh Editor.
* **5.4 Studi Kasus 4:** Pembaruan Data Demografi (seperti jumlah 1.077 KK dan Batas Wilayah Kelurahan) pada Halaman Pendataan oleh Administrator.

## BAB 6: PENUTUP
### 6.1 Kesimpulan
### 6.2 Saran & Rekomendasi Pemeliharaan
* Melakukan pembaruan data statistik pada beranda (Jiwa, Luas Wilayah) dan artikel berita kelurahan secara berkala.
* Melakukan manajemen pengaturan kata sandi dan kontrol keamanan *Role-Based Access* (USER, ADMIN, EDITOR) dengan ketat.
* Mengevaluasi batas kuota penyimpanan media gambar pada layanan *Cloudinary*.

## BAGIAN AKHIR
* **BIBLIOGRAFI / DAFTAR PUSTAKA**
* **LAMPIRAN**
  * **Lampiran A:** Peta *Route Mapping* Seluruh Halaman Website Publik & Dasbor Admin.
  * **Lampiran B:** Kamus Data / Skema Database Prisma (Model Desa, UMKM, Galeri, Infografis, Post, dll).
  * **Lampiran C:** Panduan Desain Sistem (Palet Warna Resmi: *Primary Green*, *Teal Dark*, *Midnight Blue*, *Gold* & Tipografi Font Geist, Montserrat).
  * **Lampiran D:** Glosarium Istilah Teknis Web Modern (*SSR, CRUD, ORM, TipTap, Prisma, Cloudinary*, dll).
