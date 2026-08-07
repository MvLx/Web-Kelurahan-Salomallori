# Design System — Website Profil Kelurahan Salomallori

Panduan desain visual dan komponen untuk Website Profil Kelurahan Salomallori, KKN Universitas Hasanuddin.

> **Dokumen ini disinkronkan dengan kondisi aktual proyek per Agustus 2026.**
> Palet resmi Kelurahan Salomallori (lihat Section 2) adalah **otoritatif** dan digunakan di seluruh aplikasi.

---

## 1. Brand Identity

### 1.1 Nama
**Kelurahan Salomallori** — Kecamatan Dua Pitue, Kabupaten Sidenreng Rappang (Sidrap), Sulawesi Selatan.

### 1.2 Karakter Visual
- **Editorial-First** — Tipografi menjadi elemen visual utama, layout bersih seperti majalah digital
- **Minimalism** — White space ekspansif, konten bernapas
- **Glassmorphism** — Navbar floating dengan backdrop blur
- **Paper Aesthetic** — Card putih dengan border subtle
- **Floating Architecture** — Navigasi mengapung (floating pill), elemen tidak menempel tepi

---

## 2. Color Palette (Resmi Kelurahan Salomallori)

> **Otoritatif.** Palet Stitch lama (`#2D6A4F`, `#006496`, `#282834`) telah diganti/di-migrasi ke palet di bawah.

### 2.1 Brand Colors (Resmi)

| Nama | Hex | Usage |
|---|---|---|
| **Primary Green** | `#84bd3a` | Warna utama aplikasi: button, link, active state, ring focus, chart utama |
| **Teal Dark** | `#32735f` | Sekunder: aksen profil, border dark mode, teal gelap, hover dark mode |
| **Midnight Blue** | `#0b2b40` | Surface gelap: navbar, footer, dark mode background, teks di atas primary |
| **Gold** | `#febe0d` | Aksen emas: highlight, badge menu, secondary di dark mode |

### 2.2 Named Colors (Netral)

| Nama | Hex | Usage |
|---|---|---|
| **Paper** | `#ffffff` | Card, surface, modal background |
| **Linen** | `#f9faf7` | Background utama, surface variant light |
| **Sage** | `#dee2de` | Border, outline, divider |
| **Fog** | `#f1f3f1` | Background alt, hover state |
| **Ash** | `#e8ebe8` | Disabled background, skeleton |
| **Iron** | `#6b7280` | Secondary text, caption |
| **Steel** | `#9ca3af` | Placeholder, icon muted |
| **Obsidian** | `#171717` | Heading, teks utama (light mode) |
| **Carbon** | `#000000` | Primary (dark) |

### 2.3 Mode Terang vs Gelap

| Token | Light | Dark | Usage |
|---|---|---|---|
| Background | `#f9faf7` (Linen) | `#0b2b40` / `#111411` | Background utama |
| Surface | `#ffffff` (Paper) | `#1a1a1a` | Card, modal |
| Surface Variant | `#f1f3f1` (Fog) | `#2e2e2e` | Surface alternatif |
| Teks Utama | `#171717` (Obsidian) | `#e1e3e0` | Body text |
| Teks Sekunder | `#6b7280` (Iron) | `#c2c8bd` | Subtitle, caption |
| Border | `#dee2de` (Sage) | `#414943` | Divider, outline |

---

## 3. Typography

### 3.1 Font Families (Aktual — next/font/google)

| Level | Font | Karakter |
|---|---|---|
| **Display / Heading** | **Montserrat** | Modern, geometric sans-serif — untuk judul & heading |
| **Body / UI** | **Geist** | Clean, readable sans-serif — untuk body text & UI |
| **Mono / Kode** | **Geist Mono** | Untuk elemen mono (nomor tiket, kode, dll.) |

### 3.2 Type Scale (Panduan Umum)

| Token | Size | Weight | Usage |
|---|---|---|---|
| Display | 36–48px | 700 (Bold) | Hero headline |
| Heading 1 | 32px | 700 | Halaman heading |
| Heading 2 | 24–28px | 700 | Section heading |
| Heading 3 | 20–22px | 600 | Card title |
| Body Large | 16px | 400 | Lead paragraph |
| Body Medium | 14px | 400 | Body text default |
| Body Small | 12px | 400 | Caption, meta info |
| Label | 12–14px | 600 | Button, badge, nav item |

*Gunakan `tracking-tight` untuk heading, `tracking-wide` untuk uppercase label.*

---

## 4. Shape & Roundness

| Token | Value | Usage |
|---|---|---|
| **None** | 0px | Table, layout blocks |
| **Extra Small** | 4px | **Buttons** (default radius), input kecil |
| **Small** | 8px | Card default, modal kecil |
| **Medium** | 12px | Card featured, dialog |
| **Large** | 16px | Large card, hero card |
| **Full** | 9999px | Pill badge, avatar, floating nav island |

---

## 5. Spacing System

Base unit **4px**:

| Token | Value | Usage |
|---|---|---|
| `spacing-2xs` | 4px | Icon padding, small gap |
| `spacing-xs` | 8px | Small elements |
| `spacing-sm` | 12px | Button padding, list gap |
| `spacing-md` | 16px | Card padding (default) |
| `spacing-lg` | 24px | Section spacing, form gap |
| `spacing-xl` | 32px | Large section padding |
| `spacing-2xl` | 48px | Hero padding, section margins |
| `spacing-3xl` | 64px | Major section divider |
| `spacing-4xl` | 80px | Page section gap |

---

## 6. Elevation & Shadow

| Level | Description | CSS |
|---|---|---|
| Level 0 | Flat | `background: surface` |
| Level 1 | Tonal lift | `background: surface-variant` |
| Level 2 | Paper card | `bg-paper border border-sage shadow-sm` |
| Level 3 | Glassmorphism | `backdrop-blur-xl bg-white/70 border border-sage/50 shadow-md` |
| Level 4 | Elevated glass | `backdrop-blur-2xl bg-white/80 border border-sage/60 shadow-lg` |

---

## 7. Ikon (Lucide React)

| Konteks | Ikon |
|---|---|
| Beranda | `Home`, `Sprout` |
| Profil Kelurahan | `Building2`, `Landmark`, `ScrollText`, `Users` |
| Berita | `Newspaper`, `FileText` |
| UMKM | `Store`, `ShoppingBag`, `Package` |
| Wisata | `MapPin`, `TreePine`, `Landmark`, `UtensilsCrossed` |
| Galeri | `Image`, `Images`, `Camera` |
| Infografis | `BarChart3`, `PieChart`, `TrendingUp` |
| Peta (Fase 6) | `Map` |
| Kontak | `Phone`, `Mail`, `MapPin`, `MessageCircle` |
| Dashboard | `LayoutDashboard` |
| Edit / Hapus | `Pencil`, `FileEdit`, `Trash2` |
| Search | `Search` |
| Dark Mode | `Sun`, `Moon` |
| User | `User`, `Users`, `UserCog` |
| Navigasi | `ChevronDown`, `ChevronRight`, `Menu`, `X` |
| Feedback | `CheckCircle`, `AlertCircle`, `AlertTriangle`, `Info`, `Loader2` |

---

## 8. Component Design Tokens

### 8.1 Buttons

| Variant | Styling | Radius |
|---|---|---|
| **Filled Primary** | `bg-[#84bd3a] text-[#0b2b40] hover:bg-[#84bd3a]/90 h-10 px-6 font-semibold text-sm` | 4px |
| **Filled Dark (Midnight)** | `bg-[#0b2b40] text-white hover:bg-[#0b2b40]/90 h-10 px-6 font-semibold text-sm` | 4px |
| **Secondary (Teal)** | `bg-[#32735f] text-white hover:bg-[#32735f]/90 h-10 px-6 font-semibold text-sm` | 4px |
| **Outlined** | `border border-sage text-obsidian hover:bg-linen h-10 px-6 font-semibold text-sm` | 4px |
| **Ghost** | `text-obsidian hover:bg-linen h-10 px-3 font-semibold text-sm` | 4px |
| **Icon Button** | `w-10 h-10 flex items-center justify-center hover:bg-linen rounded-full` | Full |

### 8.2 Cards

| Variant | Styling | Radius |
|---|---|---|
| **Paper** (default) | `bg-paper border border-sage rounded-[12px] shadow-sm` | 12px |
| **Elevated** | `bg-paper border border-sage rounded-[12px] shadow-md` | 12px |
| **Filled** | `bg-fog rounded-[8px]` | 8px |
| **Feature / Hero** | `bg-paper border border-sage rounded-[16px] shadow-md` | 16px |

### 8.3 Input Fields

| State | Styling | Radius |
|---|---|---|
| **Default** | `bg-paper border border-mist rounded-[4px] h-12 px-4 text-sm focus:outline-none` | 4px |
| **Focus** | `border-[#84bd3a] ring-1 ring-[#84bd3a]/20` | 4px |
| **Error** | `border-error ring-1 ring-error/10` | 4px |
| **Disabled** | `bg-ash/50 opacity-50 cursor-not-allowed` | 4px |

### 8.4 Chips / Badges

| Variant | Styling | Radius |
|---|---|---|
| **Filled** | `bg-fog text-obsidian text-xs font-semibold px-3 py-1` | 4px |
| **Outlined** | `border border-sage text-iron text-xs font-semibold px-3 py-1` | 4px |
| **Pill (Gold)** | `bg-[#febe0d] text-[#0b2b40] text-xs font-semibold px-4 py-1` | Full |

### 8.5 Navigasi — Dua Varian Navbar

**1. Navbar Beranda — Floating Pill** (`components/custom/navbar-beranda.tsx`):
```css
position: fixed;
top: 24px;
left: 50%;
transform: translateX(-50%);
z-index: 50;
background: rgba(11, 43, 64, 0.3);  /* #0b2b40/30 */
border-radius: 9999px;
backdrop-filter: blur(12px);
/* saat scroll → background: rgba(11, 43, 64, 0.95) */
```
- Logo Kab. (`logo_kab.png`) + "Kelurahan Salomallori" + sub-label "Kec. Dua Pitue, Kab. Sidenreng Rappang"
- Menu: **Beranda | Profil ▼ (Sejarah Kelurahan, Pejabat Kelurahan, Infografis) | UMKM | Publikasi ▼ (Berita, Galeri Foto) | Kontak**
- Link hover: `hover:text-[#84bd3a]` (light) / `hover:text-[#32735f]` (dark)

**2. Navbar Dashboard / Halaman Dalam** (`components/custom/navbar.tsx`):
```css
position: fixed;
top: 0;
width: 100%;
background: #0b2b40;  /* Midnight Blue */
backdrop-filter: blur(12px);
```

### 8.6 Admin Sidebar (`components/custom/admin-sidebar.tsx`)

```css
/* Desktop */
width: 256px;
background: #ffffff;  /* Paper / Dark: #1a1a1a */
border-right: 1px solid #dee2de;  /* Sage */
active item: background #f1f3f1;  /* Fog */
```
- **10 menu:** Dashboard, Postingan, UMKM, Galeri, Profil Kelurahan, Kontak, Infografis, Kategori, Pengguna (admin only), Pesan
- Bagian bawah: avatar user + email + ThemeToggle + tombol Keluar
- **Mobile:** drawer off-canvas dengan hamburger toggle

### 8.7 Footer

```css
background: #0b2b40;  /* Midnight Blue */
text: white;
```

---

## 9. Page Layouts

### 9.1 Public Layout

```
┌──────────────────────────────────────────────────┐
│            ┌────────────────────────┐             │
│            │  Floating Pill Navbar  │  ← fixed top-6, center, rounded-full
│            │  🏠 ▾ ▾ ▾ ☀️ 👤       │  ← #0b2b40/30 → /95 saat scroll
│            └────────────────────────┘             │
├──────────────────────────────────────────────────┤
│  Hero Section (min-h-[70vh])                      │
│  bg: gambar kelurahan + overlay gelap             │
│  text: white, centered, Montserrat bold           │
├──────────────────────────────────────────────────┤
│  Stats Section — Luas (2,75 km²) / Penduduk       │
│  (1.599) / KK (561) / Dusun (3)                  │
│  Card Paper + Sage border, Icon Lucide            │
├──────────────────────────────────────────────────┤
│  Section: Berita Terbaru (grid card)              │
├──────────────────────────────────────────────────┤
│  Section: Sejarah Kelurahan                       │
├──────────────────────────────────────────────────┤
│  Section: Galeri Foto (grid)                      │
├──────────────────────────────────────────────────┤
│  Footer (Midnight Blue #0b2b40)                   │
└──────────────────────────────────────────────────┘
```

### 9.2 Admin Layout

```
┌──────────────┬────────────────────────────────────────┐
│  Sidebar     │  Top Bar (#0b2b40)                     │
│  (w-64)      ├────────────────────────────────────────┤
│              │                                         │
│  📊 Dashboard│  Content Area (bg-linen)               │
│  📰 Postingan│                                         │
│  🛍️ UMKM    │  ┌────────────────────────────────┐   │
│  🖼️ Galeri   │  │  Data Table / Form             │   │
│  🏛️ Profil   │  │  Card Paper + Sage border      │   │
│  ✉️ Kontak   │  └────────────────────────────────┘   │
│  📊 Infografis│                                        │
│  🏷️ Kategori │                                         │
│  👥 Pengguna  │                                         │
│  💬 Pesan     │                                         │
└──────────────┴────────────────────────────────────────┘
```

---

## 10. Responsive Breakpoints

| Breakpoint | Width | Behavior |
|---|---|---|
| Mobile | < 640px | 1 kolom, hamburger menu/drawer |
| Tablet | 640–1024px | 2 kolom, floating nav tetap |
| Desktop | ≥ 1024px | 3-4 kolom, floating nav full |

Container max-width: **1200px** dengan padding samping `24px` di mobile.

---

## 11. Animations & Motion

| Element | Duration | Easing |
|---|---|---|
| Button hover | 200ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Card hover | 250ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Modal enter | 300ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Drawer slide | 250ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Navbar scroll | 150ms | `ease-out` |
| Reveal (stitch) | 300ms+ | `cubic-bezier(0.4, 0, 0.2, 1)` |

---

## 12. States & Feedback

### 12.1 Loading
- **Skeleton:** `animate-pulse bg-ash/50 rounded-[8px]`
- **Spinner:** Lucide `Loader2` dengan `animate-spin`

### 12.2 Empty State
```
[Ikon Lucide 48px, iron]
Belum ada data
[Tombol Aksi (opsional)]
```

### 12.3 Error State
```
⚠️ [Ikon AlertCircle]
Terjadi kesalahan
Silakan coba lagi
[Coba Lagi] — Outlined button
```

### 12.4 Toast / Snackbar (Sonner)

| Type | Border | Ikon |
|---|---|---|
| Success | `border-l-4 border-[#84bd3a]` | `CheckCircle` (hijau) |
| Error | `border-l-4 border-error` | `AlertCircle` (merah) |
| Warning | `border-l-4 border-[#F59E0B]` | `AlertTriangle` (kuning) |
| Info | `border-l-4 border-[#32735f]` | `Info` (teal) |

---

## 13. Dark Mode Adaptation

| Token | Light | Dark |
|---|---|---|
| Background | `#f9faf7` (Linen) | `#111411` |
| Surface | `#ffffff` (Paper) | `#1a1a1a` |
| Surface Variant | `#f1f3f1` (Fog) | `#2e2e2e` |
| Primary | `#84bd3a` (dengan teks `#0b2b40`) | `#84bd3a` (tetap) |
| Secondary | `#32735f` | `#febe0d` (Gold) |
| Navbar | `#0b2b40/30` → `/90` saat scroll | sama |
| Link hover | `#84bd3a` | `#32735f` |
| Gambar | normal | `brightness-[0.85]` |
| Border Sage | `#dee2de` | `#414943` |

---

## 14. Accessibility (A11y)

| Requirement | Implementation |
|---|---|
| Color contrast (AA) | Body ≥ 4.5:1, large text ≥ 3:1 |
| Keyboard navigation | Semua interactive element focusable via Tab |
| Focus indicator | `focus-visible:outline-2 focus-visible:outline-offset-2` |
| Image alt text | Wajib di semua `<Image>` dan `<img>` |
| Semantic HTML | `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` |
| ARIA labels | Icon buttons pakai `aria-label` |
| Touch targets | Minimum 44x44px untuk interactive element (mobile) |
| Reduced motion | `prefers-reduced-motion: reduce` |

---

## 15. Implementation Guide

### 15.1 CSS Custom Properties (globals.css)

```css
/* globals.css — kondensasi dari Stitch Natural + brand Salomallori */
:root {
  --color-primary: #84bd3a;      /* Primary Green */
  --color-teal-dark: #32735f;    /* Teal Dark */
  --color-midnight: #0b2b40;     /* Midnight Blue */
  --color-gold: #febe0d;         /* Gold */
  --color-paper: #ffffff;
  --color-linen: #f9faf7;
  --color-sage: #dee2de;
  --color-fog: #f1f3f1;
  --color-ash: #e8ebe8;
  --color-iron: #6b7280;
  --color-steel: #9ca3af;
  --color-obsidian: #171717;

  /* Material 3 Tokens (shadcn/ui compatible) */
  --md-sys-color-primary: #84bd3a;
  --md-sys-color-on-primary: #0b2b40;
  --md-sys-color-primary-container: #e8f5d7;
  --md-sys-color-on-primary-container: #0b2b40;
  --md-sys-color-secondary: #32735f;
  --md-sys-color-on-secondary: #ffffff;
  --md-sys-color-secondary-container: #d5e8e0;
  --md-sys-color-on-secondary-container: #0b2b40;
  --md-sys-color-tertiary: #febe0d;
  --md-sys-color-background: #f9faf7;
  --md-sys-color-on-background: #171717;
  --md-sys-color-surface: #ffffff;
  --md-sys-color-on-surface: #171717;
  --md-sys-color-surface-variant: #f1f3f1;
  --md-sys-color-on-surface-variant: #6b7280;
  --md-sys-color-outline: #dee2de;
  --md-sys-color-outline-variant: #e5e7eb;
  --md-sys-color-error: #ba1a1a;
}

.dark {
  --md-sys-color-primary: #84bd3a;
  --md-sys-color-on-primary: #0b2b40;
  --md-sys-color-primary-container: #2e4a1e;
  --md-sys-color-on-primary-container: #ffffff;
  --md-sys-color-secondary: #febe0d;
  --md-sys-color-on-secondary: #0b2b40;
  --md-sys-color-secondary-container: #23503f;
  --md-sys-color-on-secondary-container: #ffffff;
  --md-sys-color-tertiary: #febe0d;
  --md-sys-color-background: #111411;
  --md-sys-color-on-background: #e1e3e0;
  --md-sys-color-surface: #1a1a1a;
  --md-sys-color-on-surface: #e1e3e0;
  --md-sys-color-surface-variant: #2e2e2e;
  --md-sys-color-on-surface-variant: #c2c8bd;
  --md-sys-color-outline: #414943;
  --md-sys-color-outline-variant: #414943;
  --md-sys-color-error: #ffb4ab;
}
```

### 15.2 Font Import (app/layout.tsx)

```ts
// app/layout.tsx — aktual
import { Geist, Geist_Mono, Montserrat } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });
```

### 15.3 Contoh Penggunaan

```tsx
// Heading
<h1 className="font-montserrat text-3xl md:text-4xl font-bold text-[#0b2b40] dark:text-white">
  Selamat Datang di Kelurahan Salomallori
</h1>

// Button primary
<button className="bg-[#84bd3a] text-[#0b2b40] h-10 px-6 rounded-[4px] font-semibold text-sm hover:bg-[#84bd3a]/90 transition-colors">
  Selengkapnya
</button>

// Card
<div className="bg-paper border border-sage rounded-[12px] shadow-sm p-6">
  <h3 className="font-montserrat text-xl font-semibold text-[#0b2b40]">Judul Card</h3>
  <p className="text-sm text-iron mt-3">Deskripsi...</p>
</div>

// Card dark mode
<div className="bg-white dark:bg-[#1a1a1a] border border-sage dark:border-[#414943] rounded-[12px] p-6">
  {/* konten */}
</div>

// Navbar link hover
<Link className="hover:text-[#84bd3a] dark:hover:text-[#32735f] transition-colors">
  Menu
</Link>
```

---

## 16. Checklist Penerapan Design System

- [x] CSS custom properties brand Salomallori diset di `globals.css` (light + dark)
- [x] Font Geist + Geist Mono + Montserrat di-import via `next/font/google` di `app/layout.tsx`
- [x] Semua komponen menggunakan brand colors (`#84bd3a`, `#32735f`, `#0b2b40`, `#febe0d`)
- [x] Dark mode transisi mulus via `class` strategy + CSS variables
- [x] Button height `h-10`, radius `rounded-[4px]`
- [x] Card `rounded-[12px]` dengan border Sage
- [x] Navbar beranda floating pill (`fixed top-6`, rounded-full, `bg-[#0b2b40]/30` → `/90`)
- [x] Navbar dashboard fixed top bar `bg-[#0b2b40]`
- [x] Admin sidebar 10 menu, mobile drawer off-canvas
- [x] Ikon dari Lucide React
- [x] Responsive max-width 1200px container
- [x] Toast sonner untuk feedback operasi CRUD

---

*Dokumen Design System — Program Kerja Pembuatan Website Profil Kelurahan Salomallori, KKN Universitas Hasanuddin. Disinkronkan dengan kondisi aktual kode per Agustus 2026.*