import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Camera,
  ChevronDown,
  ChevronRight,
  Globe,
  Home,
  Mail,
  Map,
  Mountain,
  Sun,
  Users,
} from "lucide-react";

const stats = [
  { icon: Map, value: "2,75 km²", label: "Luas Wilayah" },
  { icon: Users, value: "1.599 jiwa", label: "Jumlah Penduduk" },
  { icon: Home, value: "561 KK", label: "Jumlah KK" },
  { icon: Building2, value: "3 Dusun", label: "Jumlah Dusun" },
];

const news = [
  {
    category: "Pemerintahan",
    date: "12 Oktober 2024",
    title: "Program Penghijauan Desa Tahap II Resmi Dimulai",
    excerpt:
      "Pemerintah Kelurahan Salomallori bersama warga memulai penanaman 1000 bibit pohon produktif di area perbukitan untuk menjaga ketersediaan air tanah.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrKK5W-3EDIHbR8S8YeCSN-i0PxUB2KXmNTwGOQzgLV9XEma2ef5hUTu4eFy_eDHNIrwH-fJmZTNgt37S137XZ_8TtIaMQLrUALRLR2rmiLJ6q3i9OXe5iicNn-O3MO1QiCdNM0lEggXZjWc4-AtgmQOmlxEPHD_NFx7mpk0e8PMokhrCW6oQj4QSr14aFJWeXEBxsf3g49AqV8KT0trcspZgS5yNuID9q3M0ET7QFtYYyVbakCdzcGw",
  },
  {
    category: "Ekonomi Warga",
    date: "08 Oktober 2024",
    title: "Bazaar UMKM Mingguan Tarik Perhatian Wisatawan",
    excerpt:
      "Produk kerajinan tangan dan kuliner khas Salomallori menjadi primadona pada acara pameran ekonomi kreatif minggu ini.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCaMCmi5lgjSrepjQqBtxhuia_lBCFsmBF1A_bxms3G-8cY7D_UA_seW9VouMqmANPbIxxRdoBI6nkWzcyTy9djYiRvnJxKjlQThfzAyz87QIto2D_yghaftNbmdK10ouCV_4W-vb9vJK2Uqnv__S-8Q67w6RhHtZooxZsda7QcTIqSYgc8mHyHRFjz7akym50HC0UEvHGssocaP86Y4QwC1uAGN81EN0Vr0mwdX1QbvuCet9BuysVbjQ",
  },
  {
    category: "Kesehatan",
    date: "02 Oktober 2024",
    title: "Fasilitas Posyandu Desa Selesai Direnovasi",
    excerpt:
      "Peningkatan fasilitas layanan kesehatan primer ini diharapkan dapat menunjang program pengentasan stunting secara lebih optimal.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuClyDTMyoD1YpZJE55dYPD2GZL8nnVXtRiryjMntdVzdcGQGC_OO3cQKYNOJ9hfS6F5gZQrbKQ5iAA0VR5bHcBdBNh9WDNj1vDdweRs2j5IP-Nqtu7nm2At4CXpUYn8pjJ38cWof5Sqev0MTxVyM6Z4T3_SqcdwqP8JjDxwzXhyDLjAAjpv7gyy49-6NLNNnn3rf94lzgSp2oN3tSNSzsm5UZPevyRtHTOelWX4TOndD3TaODih851jWw",
  },
];

const gallery = [
  {
    category: "Wisata Alam",
    title: "Air Terjun Batu Pute",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDDirgf-nh20Qei2emlCtuxcPuqjMbHoDk1eqf2_GoAyVdkYjCWiLquiuTb3AR2R8WtMLiKnd9A0ApCKHsZ5nu-5W-A-HGcZtQCWLAxGxdWot0fjw2_WfZ-mVw04lxUrbv-Y5XvNQHQMYzmBL-9on4-Nmppuj1r1zWaZOi4cFhgytC965s72HDbB8Pjr6JodP7mHYRg9Ke82P30i1Yg8gBvom5XgLYH1s6OtyjYMYvfy4rFskXgCYNeSQ",
  },
  {
    category: "UMKM Kriya",
    title: "Kerajinan Anyaman",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAYnQLgfvhqgCbEUn5NZIICJAT973_XmcInHXh7Qp7dLawHd8RhjXjipH4Gbq79FtF6MfquGzoWNFlD9_304PLx5-8ZZ2JlWd7cVCUWX34y4t1mHcULxrDXGgz4LtbUiVjNo0bV2tuHINWdEqkr3SwSNoyCX3vlexyYckV1_JbURE-MtEsWIgca4a8dQEnRwW1JA2_w8UZUvJ8FOEgRec7xGfIxSJVqy45dotBIP8lgg-v6sS2f2AbTRg",
  },
  {
    category: "Agrikultur",
    title: "Kopi Arabika Lokal",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBwGWdJs_U1JcfjfggoxkF4qATNpm2KBA7uS6gdA6e--bBwEEh7kv0g9DPLO-Axs3OgvE7i1JsOwmhHdi6iLr8ZYYfCEyP1JoTSj4SK1ZS_hx7ruL3rK-4lyjvhrv5W1_X-lIRxtQWKguiQ2J06EkrVtehVKMQvdtuUciojz31zsEqT-gZJ8yqGkB8Q5ZVf992eOUXE0uV7vEBQQw_VoHdBQ_bDP4sl_BWmGyK2IfiCYee5TxRfK8vBNQ",
  },
];

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCKOqX_qgthnzWMyvQkifPaxsZvh3OSUr1R807GIOKDkSY3T49EKOuWBqvKBJTdP1kmF6fuEHV4XoPMEdTr2DhVHPJ0BE3g26geJd0NTjlGPUSgLlUnK1zWNEle0p78KX9ebswwxj6WiEwrv99zbSwN4NJEKWTLX0e_z4qYspuFEaAb_GmxnWpeX6-CEh9ABkKQSshH2a1OgqFYDD9akcFFq3NhqzgrwqSuMQKLXNQT_QEITkWWl41s8A";

const batasWilayah = [
  { arah: "Utara", wilayah: "Desa A" },
  { arah: "Selatan", wilayah: "Desa B" },
  { arah: "Timur", wilayah: "Desa C" },
  { arah: "Barat", wilayah: "Desa D" },
];

export function BerandaResmi() {
  return (
    <div className="min-h-screen bg-[#f9faf7] font-sans text-[#171717] antialiased transition-colors duration-300 dark:bg-[#111411] dark:text-[#e1e3e0]">
      {/* Navigasi (Floating Island) */}
      <nav className="pointer-events-none fixed left-0 right-0 top-6 z-50 flex justify-center px-4">
        <div className="pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-[#0b2b40]/90 px-6 py-3 shadow-lg backdrop-blur-xl">
          <a
            href="#"
            className="font-serif text-lg font-bold tracking-tight text-white transition-colors hover:text-[#84bd3a]"
          >
            Salomallori
          </a>
          <div className="hidden items-center space-x-6 text-[13px] font-semibold text-white/90 md:flex">
            <a href="#" className="text-white">
              Beranda
            </a>
            <div className="group relative cursor-pointer">
              <span className="flex items-center gap-1 transition-colors hover:text-[#84bd3a]">
                Profil <ChevronDown className="h-4 w-4" />
              </span>
            </div>
            <div className="group relative cursor-pointer">
              <span className="flex items-center gap-1 transition-colors hover:text-[#84bd3a]">
                Potensi <ChevronDown className="h-4 w-4" />
              </span>
            </div>
            <div className="group relative cursor-pointer">
              <span className="flex items-center gap-1 transition-colors hover:text-[#84bd3a]">
                Publikasi <ChevronDown className="h-4 w-4" />
              </span>
            </div>
            <a href="#" className="transition-colors hover:text-[#84bd3a]">
              Kontak
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              aria-label="Ubah tema"
              className="text-white/80 transition-colors hover:text-white"
            >
              <Sun className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="rounded-full bg-[#32735f] px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#84bd3a]"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 pb-16 pt-24">
        <div className="absolute inset-0 z-0">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
          <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f9faf7] via-transparent to-transparent dark:from-[#111411]" />
        </div>
        <div className="relative z-10 mx-auto mt-12 flex max-w-3xl flex-col items-center text-center">
          <h2 className="mb-2 font-serif text-[36px] text-white/90">
            Selamat Datang di
          </h2>
          <h1 className="mb-6 font-serif text-[57px] font-semibold leading-[1.1] text-white">
            Kelurahan Salomallori
          </h1>
          <p className="mb-10 max-w-xl text-[16px] leading-[1.6] text-white/80">
            Kecamatan Pitumpanua, Kabupaten Wajo. Desa Maju, Mandiri, dan
            Sejahtera. Menghadirkan pelayanan profesional dengan tetap menjaga
            kehangatan komunal dan kelestarian alam warisan leluhur.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              className="rounded-md bg-white px-6 py-3 font-semibold text-[#0b2b40] shadow-sm transition-colors hover:bg-gray-100"
            >
              Jelajahi Profil
            </button>
            <button
              type="button"
              className="rounded-md border border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Lihat Berita
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/70">
          <ChevronDown className="h-8 w-8" />
        </div>
      </header>

      {/* Statistik Kelurahan */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-[12px] border border-[#dee2de] bg-white p-6 text-center shadow-sm dark:border-[#414943] dark:bg-[#1a1a1a]"
            >
              <div className="mb-4 text-[#32735f]">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mb-1 font-serif text-[28px] font-semibold text-[#171717] dark:text-white">
                {value}
              </h3>
              <p className="text-sm text-[#666666] dark:text-[#b0b4b5]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Berita Terbaru */}
      <section className="mx-auto max-w-6xl border-t border-[#dee2de] px-6 py-16 dark:border-[#414943]">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="mb-2 font-serif text-[36px] font-semibold text-[#171717] dark:text-white">
              Kabar Desa
            </h2>
            <p className="text-[#666666] dark:text-[#b0b4b5]">
              Berita dan publikasi terbaru dari Kelurahan Salomallori.
            </p>
          </div>
          <a
            href="#"
            className="hidden items-center gap-1 text-sm font-semibold text-[#32735f] transition-colors hover:text-[#84bd3a] md:flex"
          >
            Lihat Semua Berita <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {news.map(({ category, date, title, excerpt, image }) => (
            <article key={title} className="group cursor-pointer">
              <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
                <img
                  alt={title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={image}
                />
                <div className="absolute left-3 top-3 rounded bg-white/90 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[#171717] backdrop-blur-sm dark:bg-black/80 dark:text-[#e1e3e0]">
                  {category}
                </div>
              </div>
              <div className="mb-2 text-sm text-[#666666] dark:text-[#b0b4b5]">
                {date}
              </div>
              <h3 className="mb-3 font-serif text-[24px] font-semibold leading-tight text-[#171717] transition-colors group-hover:text-[#32735f] dark:text-white dark:group-hover:text-[#84bd3a]">
                {title}
              </h3>
              <p className="mb-4 line-clamp-2 text-sm text-[#666666] dark:text-[#b0b4b5]">
                {excerpt}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#32735f] transition-colors group-hover:text-[#84bd3a] dark:text-[#84bd3a] dark:group-hover:text-[#32735f]">
                Baca selengkapnya <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* Sejarah Kelurahan */}
      <section className="border-y border-[#dee2de] bg-white py-20 dark:border-[#414943] dark:bg-[#1a1a1a]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-12">
            <h2 className="mb-6 font-serif text-[36px] font-semibold text-[#171717] dark:text-white">
              Jejak Sejarah Salomallori
            </h2>
            <div
              className="mb-6 h-full w-full animate-pulse overflow-hidden rounded-xl bg-[#dee2de]/50 dark:bg-[#414943]/50"
              style={{ height: 400 }}
            />
            <p className="mb-6 text-[16px] leading-[1.6] text-[#666666] dark:text-[#b0b4b5]">
              Kelurahan Salomallori memiliki akar sejarah yang panjang, berawal
              dari pemukiman agraris yang menjunjung tinggi nilai-nilai
              kearifan lokal. Seiring berjalannya waktu, wilayah ini
              bertransformasi menjadi pusat pemerintahan kelurahan yang
              dinamis, namun tetap mempertahankan identitas kulturalnya yang
              kuat.
            </p>
            <button
              type="button"
              className="rounded-md bg-[#32735f] px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-[#0b2b40]"
            >
              Baca Sejarah Lengkap
            </button>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-12">
            <div className="rounded-xl border border-[#dee2de] bg-[#f9faf7] p-6 shadow-sm dark:border-[#414943] dark:bg-[#111411]">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-white p-2 shadow-sm dark:bg-black">
                  <Map className="h-5 w-5 text-[#32735f]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#171717] dark:text-white">
                  Batas Wilayah
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-[#666666] dark:text-[#b0b4b5]">
                {batasWilayah.map(({ arah, wilayah }, index) => (
                  <li
                    key={arah}
                    className={`flex justify-between ${
                      index < batasWilayah.length - 1
                        ? "border-b border-[#dee2de]/50 pb-2 dark:border-[#414943]/50"
                        : ""
                    }`}
                  >
                    <span>{arah}</span>
                    <span className="font-semibold text-[#171717] dark:text-white">
                      {wilayah}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Galeri Foto */}
      <section className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-[36px] font-semibold text-[#171717] dark:text-white">
            Potret Desa
          </h2>
          <p className="mx-auto max-w-2xl text-[#666666] dark:text-[#b0b4b5]">
            Menjelajahi kekayaan alam dan kreativitas warga yang menjadi pilar
            kebanggaan Kelurahan Salomallori.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {gallery.map(({ category, title, image }) => (
            <div
              key={title}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-[#dee2de]/50"
            >
              <img
                alt={title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={image}
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#0b2b40]/90 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#febe0d]">
                  {category}
                </span>
                <h4 className="font-serif font-semibold leading-tight text-white">
                  {title}
                </h4>
              </div>
            </div>
          ))}
          <div className="relative aspect-square animate-pulse cursor-pointer overflow-hidden rounded-lg bg-[#dee2de] dark:bg-[#414943]">
            <div className="absolute inset-0 flex items-center justify-center text-[#666666]/30">
              <Camera className="h-8 w-8" />
            </div>
          </div>
          <div className="relative hidden aspect-square animate-pulse cursor-pointer overflow-hidden rounded-lg bg-[#dee2de] dark:bg-[#414943] lg:block">
            <div className="absolute inset-0 flex items-center justify-center text-[#666666]/30">
              <Camera className="h-8 w-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#32735f] pb-8 pt-16 text-white">
        <div className="mx-auto mb-12 grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <a
              href="#"
              className="mb-4 inline-block font-serif text-2xl font-bold text-white"
            >
              Salomallori
            </a>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/70">
              Membangun tata kelola pemerintahan yang profesional tanpa
              meninggalkan kehangatan komunal desa.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Website"
                className="text-white/70 transition-colors hover:text-[#84bd3a]"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Galeri"
                className="text-white/70 transition-colors hover:text-[#84bd3a]"
              >
                <Camera className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Email"
                className="text-white/70 transition-colors hover:text-[#84bd3a]"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-serif text-lg font-semibold text-white">
              Pintasan
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              {["Sejarah", "Pejabat", "Berita"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="transition-colors hover:text-[#84bd3a]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-serif text-lg font-semibold text-white">
              Potensi
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              {["UMKM", "Wisata", "Galeri"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="flex items-center gap-1 transition-colors hover:text-[#84bd3a]"
                  >
                    <ChevronRight className="h-3 w-3" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 px-6 pt-8 text-xs text-white/50 md:flex-row">
          <p>
            © 2024 Kelurahan Salomallori. Professional Governance &
            Communal Warmth.
          </p>
          <p className="flex items-center gap-1">
            <Mountain className="h-3.5 w-3.5" /> Desa Mandiri Sejahtera
          </p>
        </div>
      </footer>
    </div>
  );
}