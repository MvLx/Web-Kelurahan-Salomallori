"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { BerandaData } from "./beranda-page-client";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Camera,
  ChevronDown,
  ChevronRight,
  Clock,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  Mail,
  Map,
  MapPin,
  MessageCircle,
  Phone,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/custom/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/utils/string";


export function BerandaResmi({ data }: { data: BerandaData }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const userRole = session?.user?.role;
  const isPrivileged = userRole === "EDITOR" || userRole === "ADMIN";

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

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
    category: p.category ?? "Berita",
    date: p.dateLabel,
    title: p.title,
    excerpt: p.summary,
    image: p.image ?? "https://picsum.photos/seed/beranda-news/800/500",
  }));

  const gallery = data.galeri.map((g) => ({
    category: g.kategori,
    title: g.judul,
    image: g.gambar,
  }));

  const heroImage = data.heroImage;
  const batasWilayah = data.batasWilayah;

  return (
    <div className="min-h-screen bg-[#f9faf7] font-sans text-[#171717] antialiased transition-colors duration-300 dark:bg-[#111411] dark:text-[#e1e3e0]">
      {/* Navigasi (Floating Island) */}
      <nav className="pointer-events-none fixed left-0 right-0 top-6 z-50 flex justify-center px-4">
        <div
          className={`pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full px-6 py-3 shadow-lg backdrop-blur-xl transition-all duration-500 ${
            isScrolled
              ? "border border-white/10 bg-[#0b2b40]/90"
              : "border border-transparent bg-[#0b2b40]/30"
          }`}
        >
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image
              src="/logo.svg"
              alt="Logo Kelurahan Salomallori"
              width={36}
              height={36}
              className="rounded-sm object-contain"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span className="text-[14px] font-extrabold tracking-tight text-white">
                Kelurahan Salomallori
              </span>
              <span className="text-[9px] font-bold tracking-wide text-white/70">
                Kec. Dua Pitue, Kab. Sidenreng Rappang
              </span>
            </div>
          </Link>
          <div className="hidden items-center space-x-6 text-[13px] font-semibold text-white/90 md:flex">
            <Link href="/" className="text-white transition-colors hover:text-[#84bd3a]">
              Beranda
            </Link>
            <div className="group relative before:absolute before:inset-x-0 before:top-full before:h-4">
              <span className="flex cursor-pointer items-center gap-1 transition-colors hover:text-[#84bd3a]">
                Profil <ChevronDown className="h-4 w-4" />
              </span>
              <div
                className={`invisible absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 rounded-xl border border-white/10 p-2 opacity-0 shadow-xl backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 ${
                  isScrolled ? "bg-[#0b2b40]/95" : "bg-[#0b2b40]/30"
                }`}
              >
                <Link
                  href="/profil/sejarah-kelurahan"
                  className="block rounded-lg px-4 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Sejarah Kelurahan
                </Link>
                <Link
                  href="/profil/pejabat-kelurahan"
                  className="block rounded-lg px-4 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Pejabat Kelurahan
                </Link>
                <Link
                  href="/infografis"
                  className="block rounded-lg px-4 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Infografis
                </Link>
              </div>
            </div>
            <Link href="/umkm" className="transition-colors hover:text-[#84bd3a]">
              UMKM
            </Link>
            <div className="group relative before:absolute before:inset-x-0 before:top-full before:h-4">
              <span className="flex cursor-pointer items-center gap-1 transition-colors hover:text-[#84bd3a]">
                Publikasi <ChevronDown className="h-4 w-4" />
              </span>
              <div
                className={`invisible absolute left-1/2 top-full z-50 mt-3 w-48 -translate-x-1/2 rounded-xl border border-white/10 p-2 opacity-0 shadow-xl backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 ${
                  isScrolled ? "bg-[#0b2b40]/95" : "bg-[#0b2b40]/30"
                }`}
              >
                <Link
                  href="/news"
                  className="block rounded-lg px-4 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Berita
                </Link>
                <Link
                  href="/galeri"
                  className="block rounded-lg px-4 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Galeri Foto
                </Link>
              </div>
            </div>
            <Link href="/aduan" className="transition-colors hover:text-[#84bd3a]">
              Kontak
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {mounted ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="size-9 rounded-full p-0 focus-visible:ring-2 focus-visible:ring-white/50"
                  >
                    <Avatar className="size-8">
                      <AvatarImage
                        src={session?.user?.image ?? undefined}
                        alt={session?.user?.name ?? "Pengguna"}
                      />
                      <AvatarFallback className="bg-white/20 text-xs text-white">
                        {getInitials(session?.user?.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {session ? (
                    <>
                      <DropdownMenuLabel className="font-normal">
                        <p className="truncate text-sm font-medium text-foreground">
                          {session.user.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {session.user.email}
                        </p>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        {isPrivileged && (
                          <DropdownMenuItem asChild>
                            <Link href="/dashboard">
                              <LayoutDashboard />
                              Dashboard
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem asChild>
                          <Link href={`/akun/${session.user.id}`}>
                            <User />
                            Profil
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={handleSignOut}
                        >
                          <LogOut />
                          Keluar
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </>
                  ) : (
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link href="/auth/signin">
                          <LogIn />
                          Masuk
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/auth/signup">
                          <UserPlus />
                          Daftar
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="size-9 rounded-full bg-white/10" />
            )}
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
          <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#f9faf7] to-transparent dark:from-[#111411]" />
        </div>
        <div className="relative z-10 mx-auto mt-12 flex max-w-3xl flex-col items-center text-center">
          <span className="mb-6 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
            Kec. Dua Pitue, Kab. Sidenreng Rappang
          </span>
          <h1 className="mb-4 font-serif text-4xl font-semibold leading-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
            Kelurahan Salomallori
          </h1>
          <p className="mb-3 font-serif text-lg italic text-[#febe0d] sm:text-xl">
            "Desa Maju, Mandiri, dan Sejahtera"
          </p>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            Website resmi Kelurahan Salomallori menyajikan informasi seputar
            profil, pelayanan, UMKM, hingga potensi wisata. Mari bersama
            membangun Salomallori yang unggul dan berkelanjutan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/profil/sejarah-kelurahan"
              className="inline-flex h-11 items-center gap-2 rounded-[4px] bg-[#84bd3a] px-7 text-sm font-semibold text-[#0b2b40] shadow-sm transition-all duration-200 hover:bg-[#84bd3a]/90 hover:shadow-md"
            >
              Jelajahi Profil <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/news"
              className="inline-flex h-11 items-center gap-2 rounded-[4px] border-2 border-white bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
            >
              Lihat Berita <ArrowUpRight className="h-4 w-4" />
            </Link>
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
          <Link
            href="/news"
            className="hidden items-center gap-1 text-sm font-semibold text-[#32735f] transition-colors hover:text-[#84bd3a] md:flex"
          >
            Lihat Semua Berita <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {news.map(({ category, date, title, excerpt, image }) => (
            <Link href="/news" key={title} className="group block cursor-pointer">
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
            </Link>
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
              {data.desa?.sejarah ??
                "Kelurahan Salomallori memiliki akar sejarah yang panjang, berawal dari pemukiman agraris yang menjunjung tinggi nilai-nilai kearifan lokal."}
            </p>
            <Link
              href="/profil/sejarah-kelurahan"
              className="inline-block rounded-md bg-[#32735f] px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-[#0b2b40]"
            >
              Baca Sejarah Lengkap
            </Link>
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
            <Link
              href="/galeri"
              key={title}
              className="group relative block aspect-square cursor-pointer overflow-hidden rounded-lg bg-[#dee2de]/50"
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
            </Link>
          ))}
          <Link
            href="/galeri"
            className="relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#dee2de] text-[#666666]/30 transition-colors hover:text-[#32735f] dark:bg-[#414943]"
          >
            <Camera className="mx-auto h-8 w-8" />
          </Link>
          <Link
            href="/galeri"
            className="relative hidden aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#dee2de] text-[#666666]/30 transition-colors hover:text-[#32735f] dark:bg-[#414943] lg:flex"
          >
            <Camera className="mx-auto h-8 w-8" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b2b40] pb-8 pt-16 text-white">
        <div className="mx-auto mb-12 grid max-w-7xl grid-cols-1 gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Logo Kelurahan Salomallori"
                width={48}
                height={48}
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
                <Link href="/" className="text-white/60 transition-colors hover:text-white">
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/profil/sejarah-kelurahan"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  Profil Kelurahan
                </Link>
              </li>
              <li>
                <Link
                  href="/profil/visi-misi"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  Visi & Misi
                </Link>
              </li>
              <li>
                <Link href="/umkm" className="text-white/60 transition-colors hover:text-white">
                  UMKM
                </Link>
              </li>
              <li>
                <Link href="/aduan" className="text-white/60 transition-colors hover:text-white">
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
              <div className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 shrink-0 text-[#febe0d]" />
                <div>
                  <p className="text-white/80">Sabtu</p>
                  <p className="text-white/60">07.30 - 12.00 WITA</p>
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
            <div className="flex gap-4">
              <Link href="/aduan" className="transition-colors hover:text-white">
                Kontak
              </Link>
              <Link href="/" className="transition-colors hover:text-white">
                Beranda
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}