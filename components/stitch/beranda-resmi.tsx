"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BerandaData } from "./beranda-page-client";
import { Reveal } from "./reveal";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  Mail,
  Map,
  MapPin,
  MessageCircle,
  Phone,
  Users,
  X,
} from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { NavbarBeranda } from "@/components/custom/navbar-beranda";
import { YOUTUBE_VIDEO_ID, VideoSejarah } from "./video-sejarah";

export function BerandaResmi({ data }: { data: BerandaData }) {
  const stats = [
    {
      icon: Map,
      value:
        data.desa?.luasWilayah != null
          ? `${String(data.desa.luasWilayah).replace(".", ",")} km²`
          : "—",
      label: "Luas Wilayah",
    },
    {
      icon: Users,
      value:
        data.desa?.jumlahPenduduk != null
          ? `${data.desa.jumlahPenduduk.toLocaleString("id-ID")} jiwa`
          : "—",
      label: "Jumlah Penduduk",
    },
    {
      icon: Home,
      value:
        data.desa?.jumlahKK != null
          ? `${data.desa.jumlahKK.toLocaleString("id-ID")} KK`
          : "—",
      label: "Jumlah KK",
    },
    {
      icon: Building2,
      value:
        data.desa?.jumlahDusun != null
          ? `${data.desa.jumlahDusun} Lingkungan`
          : "—",
      label: "Jumlah Lingkungan",
    },
  ];

  const news = data.posts.map((p) => ({
    slug: p.slug,
    category: p.category ?? "Berita",
    date: p.dateLabel,
    title: p.title,
    excerpt: p.summary,
    image: p.image ?? "https://picsum.photos/seed/beranda-news/800/500",
  }));

  const gallery = data.galeri.map((g) => ({
    id: g.id,
    category: g.kategori,
    title: g.judul,
    image: g.gambar,
  }));

  const heroImage = data.heroImage;
  const batasWilayah = data.batasWilayah;
  const fullSejarah =
    data.desa?.sejarah ??
    "Kelurahan Salomallori memiliki akar sejarah yang panjang, berawal dari pemukiman agraris yang menjunjung tinggi nilai-nilai kearifan lokal.";
  const sejarahPreview =
    fullSejarah.length > 250 ? fullSejarah.slice(0, 250).trimEnd() + "..." : fullSejarah;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % gallery.length : null
    );
  }, [gallery.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + gallery.length) % gallery.length
        : null
    );
  }, [gallery.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <div className="min-h-screen bg-[#f9faf7] font-sans text-[#171717] antialiased transition-colors duration-300 dark:bg-[#111411] dark:text-[#e1e3e0]">
      {/* Navigasi (Floating Island) */}
      <NavbarBeranda />

      {/* Hero Section */}
      <header className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 pb-16 pt-24">
        <div className="absolute inset-0 z-0">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
          <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#f9faf7] to-transparent dark:from-[#111411]" />
        </div>
        <div className="relative z-10 mx-auto mt-12 flex max-w-3xl flex-col items-center text-center">
          <div className="w-full rounded-tl-[48px] rounded-br-[48px] rounded-tr-lg rounded-bl-lg border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur sm:p-8">
            <span
              className="animate-fade-in-up mb-4 inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-sm"
              style={{ animationDelay: "0ms" }}
            >
              Kec. Dua Pitue, Kab. Sidenreng Rappang
            </span>
            <p
              className="animate-fade-in-up mb-3 font-[family-name:serif] text-lg italic text-[#febe0d] sm:text-xl"
              style={{ animationDelay: "150ms" }}
            >
              &ldquo;Satu Kelurahan, Sejuta Harapan&rdquo;
            </p>
            <p
              className="animate-fade-in-up mb-8 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base"
              style={{ animationDelay: "300ms" }}
            >
              Website resmi Kelurahan Salomallori menyajikan informasi seputar
              profil, pelayanan, UMKM, hingga potensi daerah. Mari bersama
              membangun Salomallori yang unggul dan berkelanjutan.
            </p>
            <div
              className="animate-fade-in-up flex flex-wrap justify-center gap-4"
              style={{ animationDelay: "450ms" }}
            >
              <Link
                href="/profil/sejarah-kelurahan"
                className="inline-flex h-11 items-center gap-2 rounded-[4px] bg-[#84bd3a] px-7 text-sm font-semibold text-[#0b2b40] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#84bd3a]/90 hover:shadow-lg hover:shadow-[#84bd3a]/30"
              >
                Jelajahi Profil <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/news"
                className="inline-flex h-11 items-center gap-2 rounded-[4px] border-2 border-white bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10"
              >
                Lihat Berita <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/70">
          <ChevronDown className="h-8 w-8" />
        </div>
      </header>

      {/* Sejarah Kelurahan */}
      <section className="py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-12">
            <Reveal>
              <h2 className="mb-6 font-serif text-[36px] font-semibold text-[#171717] dark:text-white">
                Sejarah Salomallori
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <VideoSejarah />
              {!YOUTUBE_VIDEO_ID &&
                (data.fotoSejarah ? (
                <div className="relative mb-6 h-[220px] w-full overflow-hidden rounded-xl sm:h-[350px] lg:h-[400px]">
                  <img
                    src={data.fotoSejarah}
                    alt="Sejarah Kelurahan Salomallori"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="mb-6 h-[220px] w-full overflow-hidden rounded-xl bg-[#dee2de]/50 dark:bg-[#414943]/50 sm:h-[350px] lg:h-[400px]" />
              ))}
            </Reveal>
            <Reveal delay={200}>
              <p className="mb-6 text-[16px] leading-[1.6] text-[#666666] dark:text-[#b0b4b5]">
                {sejarahPreview}
              </p>
            </Reveal>
            <Reveal delay={300}>
              <Link
                href="/profil/sejarah-kelurahan"
                className="inline-block rounded-md bg-[#32735f] px-6 py-3 font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0b2b40] hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/40"
              >
                Baca Sejarah Lengkap
              </Link>
            </Reveal>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-12">
            <Reveal delay={150}>
              <div className="rounded-xl border border-[#dee2de] bg-white p-6 shadow-sm transition-colors duration-300 hover:border-[#32735f]/60 dark:border-[#414943] dark:bg-[#1a1a1a] dark:hover:border-[#84bd3a]/60">
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* Berita Terbaru */}
      <section className="mx-auto max-w-6xl border-t border-[#dee2de] px-6 py-16 dark:border-[#414943]">
        <Reveal className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="mb-2 font-serif text-[36px] font-semibold text-[#171717] dark:text-white">
              Kabar Desa
            </h2>
            <p className="text-[#666666] dark:text-[#b0b4b5]">
              Berita dan publikasi terbaru dari Kelurahan Salomallori.
            </p>
          </div>
          <Link
            href="/news"
            className="hidden items-center gap-1 text-sm font-semibold text-[#32735f] transition-colors hover:text-[#84bd3a] md:flex"
          >
            Lihat Semua Berita <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {news.map(({ slug, category, date, title, excerpt, image }, i) => (
            <Reveal key={title} delay={i * 120}>
              <Link href={`/news/${slug}`} className="group block cursor-pointer">
                <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-gray-200 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-black/10 dark:bg-gray-800 dark:group-hover:shadow-black/40">
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
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#32735f] transition-all duration-300 group-hover:gap-2 group-hover:text-[#84bd3a] dark:text-[#84bd3a] dark:group-hover:text-[#32735f]">
                  Baca selengkapnya <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Statistik Kelurahan */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-20">
        <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-[radial-gradient(ellipse_at_top,rgba(50,115,95,0.07),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(132,189,58,0.07),transparent_65%)]" />
        <div className="relative mb-12 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-[#32735f]/40 dark:bg-[#84bd3a]/40" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#32735f] dark:text-[#84bd3a]">
            Statistik Kelurahan
          </span>
          <span className="h-px w-12 bg-[#32735f]/40 dark:bg-[#84bd3a]/40" />
        </div>
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <Reveal key={label} delay={i * 100}>
              <div
                className={`group flex flex-col items-center rounded-[16px] border border-[#dee2de] bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#32735f]/60 hover:shadow-xl dark:border-[#414943] dark:bg-[#1a1a1a] dark:hover:border-[#84bd3a]/60 dark:hover:shadow-black/30 ${
                  i % 2 === 1 ? "lg:translate-y-8" : ""
                }`}
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#32735f]/10 text-[#32735f] transition-transform duration-300 group-hover:scale-110 dark:bg-[#84bd3a]/10 dark:text-[#84bd3a]">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-2 font-serif text-[32px] font-bold leading-none text-[#171717] sm:text-[36px] dark:text-white">
                  {value}
                </h3>
                <p className="text-sm font-medium text-[#666666] dark:text-[#b0b4b5]">
                  {label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Galeri Foto */}
      <section className="mx-auto max-w-[1400px] px-6 py-20">
        <Reveal className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-[36px] font-semibold text-[#171717] dark:text-white">
            Potret Desa
          </h2>
          <p className="mx-auto max-w-2xl text-[#666666] dark:text-[#b0b4b5]">
            Menjelajahi kekayaan alam dan kreativitas warga yang menjadi pilar
            kebanggaan Kelurahan Salomallori.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {gallery.map(({ category, title, image }, index) => (
            <Reveal key={index} delay={(index % 5) * 80}>
              <button
              onClick={() => openLightbox(index)}
              className="group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-lg bg-[#dee2de]/50 text-left"
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
            </button>
            </Reveal>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && gallery[lightboxIndex] && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4"
            onClick={closeLightbox}
          >
            <div
              className="relative mx-2 sm:mx-4 max-h-[90vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute -top-10 sm:-top-12 right-0 z-10 rounded-full bg-white/10 p-1.5 sm:p-2 text-white transition-colors hover:bg-white/20"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button
                onClick={goPrev}
                className="absolute left-1 sm:left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-1.5 sm:p-2 text-white transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-1 sm:right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-1.5 sm:p-2 text-white transition-colors hover:bg-white/20"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <img
                src={gallery[lightboxIndex].image}
                alt={gallery[lightboxIndex].title}
                className="max-h-[80vh] sm:max-h-[85vh] w-auto rounded-2xl object-contain shadow-2xl"
              />
              <div className="absolute -bottom-10 sm:-bottom-12 left-0 right-0 text-center">
                <p className="text-xs sm:text-sm text-white/80">
                  {gallery[lightboxIndex].title}
                  <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs">
                    {gallery[lightboxIndex].category}
                  </span>
                </p>
                <p className="mt-1 text-xs text-white/50">
                  {lightboxIndex + 1} / {gallery.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-[#0b2b40] pb-8 pt-16 text-white">
        <div className="mx-auto mb-12 grid max-w-7xl grid-cols-1 gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/images/logo_kab.png"
                alt="Logo Kelurahan Salomallori"
                width={56}
                height={56}
                className="rounded-full object-contain"
              />
              <div>
                <span className="block text-[15px] font-extrabold tracking-tight text-white">
                  Kelurahan Salomallori
                </span>
                <span className="block text-[10px] font-bold tracking-wide text-white/60">
                  Kec. Dua Pitue, Kab. Sidenreng Rappang
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Website resmi Kelurahan Salomallori menyajikan informasi terkini
              seputar kegiatan dan pelayanan kelurahan.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="link-underline text-white/60 transition-colors hover:text-white [&::after]:bg-white"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/profil/sejarah-kelurahan"
                  className="link-underline text-white/60 transition-colors hover:text-white [&::after]:bg-white"
                >
                  Sejarah Kelurahan
                </Link>
              </li>
              <li>
                <Link
                  href="/profil/pejabat-kelurahan"
                  className="link-underline text-white/60 transition-colors hover:text-white [&::after]:bg-white"
                >
                  Pejabat Kelurahan
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="link-underline text-white/60 transition-colors hover:text-white [&::after]:bg-white"
                >
                  Berita
                </Link>
              </li>
              <li>
                <Link
                  href="/umkm"
                  className="link-underline text-white/60 transition-colors hover:text-white [&::after]:bg-white"
                >
                  UMKM
                </Link>
              </li>
              <li>
                <Link
                  href="/galeri"
                  className="link-underline text-white/60 transition-colors hover:text-white [&::after]:bg-white"
                >
                  Galeri
                </Link>
              </li>
              <li>
                <Link
                  href="/infografis"
                  className="link-underline text-white/60 transition-colors hover:text-white [&::after]:bg-white"
                >
                  Infografis
                </Link>
              </li>
              <li>
                <Link
                  href="/aduan"
                  className="link-underline text-white/60 transition-colors hover:text-white [&::after]:bg-white"
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Jam Operasional */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Jam Operasional</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 shrink-0 text-[#febe0d]" />
                <div>
                  <p className="text-white/80">Senin - Jumat</p>
                  <p className="text-white/60">07.30 - 16.00 WITA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Kontak</h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-[#febe0d]" />
                <a
                  href="mailto:kelurahansalomallori@gmail.com"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  kelurahansalomallori@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-[#febe0d]" />
                <span className="text-white/60">-</span>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle size={16} className="shrink-0 text-[#febe0d]" />
                <a
                  href="https://wa.me/628xxxxxx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
              </p>
              <p className="flex items-center gap-2">
                <SiInstagram size={16} className="shrink-0 text-[#febe0d]" />
                <a
                  href="https://instagram.com/kelurahansalomallori"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  @kelurahansalomallori
                </a>
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#febe0d]" />
                <span className="text-white/60">
                  Kelurahan Salomallori, Kec. Dua Pitue, Kab. Sidenreng
                  Rappang, Sulawesi Selatan
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-white/10" />
          <div className="flex flex-col items-center gap-3 pt-6 text-sm text-white/60 sm:flex-row sm:justify-between">
            <p>
              © {new Date().getFullYear()} Website Kelurahan Salomallori. Hak
              cipta dilindungi.
            </p>
            <p>
              Dibuat dan dikembangkan oleh KKN-T 116 Universitas Hasanuddin
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}