"use client";

import {
  ArrowRight,
  Building2,
  ChevronDown,
  Compass,
  Home,
  Map,
  MapPin,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { SejarahData } from "./sejarah-page-client";
import { Reveal } from "./reveal";
import { NavbarStitch } from "./navbar-stitch";
import { FooterStitch } from "./footer-stitch";

export function SejarahResmi({ data }: { data: SejarahData }) {
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

  const heroImage = data.heroImage;
  const nama = data.desa?.nama ?? "Salomallori";
  const sejarah = data.desa?.sejarah;

  return (
    <div className="min-h-screen bg-[#f9faf7] font-sans text-[#171717] antialiased transition-colors duration-300 dark:bg-[#111411] dark:text-[#e1e3e0]">
      <NavbarStitch />

      {/* Hero */}
      <header className="relative flex min-h-[60vh] items-center justify-center overflow-hidden px-6 pb-16 pt-24">
        <div className="absolute inset-0 z-0">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
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
            <h1
              className="animate-fade-in-up mb-3 font-serif text-4xl font-semibold text-white sm:text-5xl"
              style={{ animationDelay: "150ms" }}
            >
              Sejarah Kelurahan {nama}
            </h1>
            <p
              className="animate-fade-in-up mb-8 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base"
              style={{ animationDelay: "300ms" }}
            >
              Menelusuri perjalanan panjang dan nilai-nilai kearifan lokal yang
              menjadi fondasi perkembangan Kelurahan {nama}.
            </p>
            <div
              className="animate-fade-in-up flex flex-wrap justify-center gap-4"
              style={{ animationDelay: "450ms" }}
            >
              <a
                href="#sejarah"
                className="inline-flex h-11 items-center gap-2 rounded-[4px] bg-[#84bd3a] px-7 text-sm font-semibold text-[#0b2b40] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#84bd3a]/90 hover:shadow-lg hover:shadow-[#84bd3a]/30"
              >
                Mulai Membaca <ChevronDown className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/70">
          <ChevronDown className="h-8 w-8" />
        </div>
      </header>

      {/* Statistik */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <Reveal key={label} delay={i * 100}>
              <div className="flex flex-col items-center rounded-[12px] border border-[#dee2de] bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#32735f]/60 hover:shadow-lg dark:border-[#414943] dark:bg-[#1a1a1a] dark:hover:border-[#84bd3a]/60 dark:hover:shadow-black/30">
                <div className="mb-4 text-[#32735f] transition-transform duration-300 hover:scale-110">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-1 font-serif text-[28px] font-semibold text-[#171717] dark:text-white">
                  {value}
                </h3>
                <p className="text-sm text-[#666666] dark:text-[#b0b4b5]">
                  {label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Sejarah */}
      <section id="sejarah" className="border-y border-[#dee2de] bg-white py-20 dark:border-[#414943] dark:bg-[#1a1a1a]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-[#f0f4ef] p-2 dark:bg-[#373a3b]">
                  <Compass className="h-5 w-5 text-[#32735f]" />
                </div>
                <h2 className="font-serif text-[36px] font-semibold text-[#171717] dark:text-white">
                  Perjalanan {nama}
                </h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-[16px] leading-[1.9] text-[#666666] dark:text-[#b0b4b5]">
                {sejarah}
              </p>
            </Reveal>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-5">
            {data.fotoSejarah ? (
              <Reveal delay={150}>
                <div className="relative h-[320px] w-full overflow-hidden rounded-xl">
                  <img
                    src={data.fotoSejarah}
                    alt={`Sejarah Kelurahan ${nama}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
            ) : null}
            <Reveal delay={200}>
              <div className="rounded-xl border border-[#dee2de] bg-[#f9faf7] p-6 shadow-sm transition-colors duration-300 hover:border-[#32735f]/60 dark:border-[#414943] dark:bg-[#111411] dark:hover:border-[#84bd3a]/60">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-white p-2 shadow-sm dark:bg-black">
                    <MapPin className="h-5 w-5 text-[#32735f]" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#171717] dark:text-white">
                    Batas Wilayah
                  </h3>
                </div>
                <ul className="space-y-3 text-sm text-[#666666] dark:text-[#b0b4b5]">
                  {data.batasWilayah.map(({ arah, wilayah }, index) => (
                    <li
                      key={arah}
                      className={`flex justify-between ${
                        index < data.batasWilayah.length - 1
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

      {/* Quote */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <Reveal>
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#dee2de] bg-white dark:border-[#414943] dark:bg-[#1a1a1a]">
            <span className="font-serif text-3xl text-[#32735f]">&ldquo;</span>
          </div>
          <blockquote className="font-serif text-2xl font-medium leading-relaxed text-[#171717] sm:text-3xl dark:text-white">
            Terwujudnya Kelurahan {nama} yang maju, mandiri, dan sejahtera.
          </blockquote>
          <p className="mt-6 text-sm font-semibold tracking-wide text-[#666666] dark:text-[#b0b4b5]">
            — Visi Kelurahan {nama}
          </p>
        </Reveal>
      </section>

      {/* Visi Misi */}
      <section className="border-t border-[#dee2de] bg-white py-20 dark:border-[#414943] dark:bg-[#1a1a1a]">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-[36px] font-semibold text-[#171717] dark:text-white">
              Visi & Misi
            </h2>
            <p className="mx-auto max-w-2xl text-[#666666] dark:text-[#b0b4b5]">
              Arah pembangunan Kelurahan {nama} menuju masa depan yang lebih
              baik.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Reveal delay={100}>
              <div className="h-full rounded-[12px] border border-[#dee2de] bg-[#f9faf7] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#32735f]/60 hover:shadow-lg dark:border-[#414943] dark:bg-[#111411] dark:hover:border-[#84bd3a]/60 dark:hover:shadow-black/20">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0b2b40]">
                  <span className="text-xl font-bold text-[#84bd3a]">V</span>
                </div>
                <h3 className="mb-4 font-serif text-2xl font-semibold text-[#171717] dark:text-white">
                  Visi
                </h3>
                <p className="text-[15px] leading-relaxed text-[#666666] dark:text-[#b0b4b5]">
                  {data.desa?.visi}
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="h-full rounded-[12px] border border-[#dee2de] bg-[#f9faf7] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#32735f]/60 hover:shadow-lg dark:border-[#414943] dark:bg-[#111411] dark:hover:border-[#84bd3a]/60 dark:hover:shadow-black/20">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0b2b40]">
                  <span className="text-xl font-bold text-[#84bd3a]">M</span>
                </div>
                <h3 className="mb-4 font-serif text-2xl font-semibold text-[#171717] dark:text-white">
                  Misi
                </h3>
                <div className="space-y-3">
                  {data.desa?.misi
                    ? data.desa.misi
                        .split("\n")
                        .filter((line) => line.trim().length > 0)
                        .map((line, index) => (
                          <p
                            key={index}
                            className="flex items-start gap-3 text-[15px] leading-relaxed text-[#666666] dark:text-[#b0b4b5]"
                          >
                            <span className="mt-1.5 flex h-2.5 w-2.5 shrink-0 rounded-full bg-[#32735f]" />
                            {line.replace(/^[-•]\s*/, "")}
                          </p>
                        ))
                    : null}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-6 rounded-[16px] border border-[#dee2de] bg-white p-10 text-center md:flex-row md:text-left dark:border-[#414943] dark:bg-[#1a1a1a]">
            <div>
              <h2 className="mb-2 font-serif text-2xl font-semibold text-[#171717] dark:text-white">
                Ingin tahu lebih banyak tentang {nama}?
              </h2>
              <p className="text-[#666666] dark:text-[#b0b4b5]">
                Kunjungi halaman berita dan galeri untuk melihat kegiatan
                terkini.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap justify-center gap-4">
              <Link
                href="/news"
                className="inline-flex h-11 items-center gap-2 rounded-[4px] bg-[#32735f] px-6 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0b2b40]"
              >
                Lihat Berita <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="/galeri"
                className="inline-flex h-11 items-center gap-2 rounded-[4px] border border-[#dee2de] bg-transparent px-6 text-sm font-semibold text-[#171717] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#32735f] hover:text-[#32735f] dark:border-[#414943] dark:text-white dark:hover:border-[#84bd3a] dark:hover:text-[#84bd3a]"
              >
                Buka Galeri
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <FooterStitch />
    </div>
  );
}