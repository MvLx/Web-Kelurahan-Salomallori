"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  User,
  UserPlus,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/custom/theme-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { cn } from "@/lib/utils";

const NAV_PROFIL_LINKS = [
  { href: "/profil/sejarah-kelurahan", label: "Sejarah Kelurahan" },
  { href: "/profil/pejabat-kelurahan", label: "Pejabat Kelurahan" },
  { href: "/infografis", label: "Infografis" },
];

const NAV_PUBLIKASI_LINKS = [
  { href: "/news", label: "Berita" },
  { href: "/galeri", label: "Galeri Foto" },
];

export function NavbarBeranda() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const { data: session } = authClient.useSession();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<"profil" | "publikasi" | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const userRole = session?.user?.role;
  const isPrivileged = userRole === "EDITOR" || userRole === "ADMIN";

  const isDark = resolvedTheme === "dark";
  const dropdownBorder = isDark ? "border-[#373a3b]" : "border-white/10";

  // Gaya drawer — berbeda untuk light & dark agar lebih immersive
  const drawerClasses = isDark
    ? "border-l border-white/10 bg-[#0b2b40]/95 text-white data-[state=open]:slide-in-from-right"
    : "border-l border-gray-200 bg-white/95 text-[#0b2b40] backdrop-blur-xl data-[state=open]:slide-in-from-right";
  const headerBorder = isDark ? "border-white/10" : "border-gray-200";
  const headerTitle = isDark ? "text-white" : "text-[#0b2b40]";
  const headerSubtitle = isDark ? "text-white/70" : "text-[#0b2b40]/60";
  const navItem = isDark
    ? "text-white/90 hover:bg-white/10 hover:text-white"
    : "text-[#0b2b40]/90 hover:bg-[#0b2b40]/5 hover:text-[#0b2b40]";
  const navItemSub = isDark
    ? "text-white/70 hover:bg-white/10 hover:text-white"
    : "text-[#0b2b40]/70 hover:bg-[#0b2b40]/5 hover:text-[#0b2b40]";
  const actionButton = isDark
    ? "bg-white/10 text-white hover:bg-white/15"
    : "bg-[#0b2b40]/5 text-[#0b2b40] hover:bg-[#0b2b40]/10";
  const avatarFallback = isDark ? "bg-white/20 text-white" : "bg-[#0b2b40]/10 text-[#0b2b40]";
  const userName = isDark ? "text-white" : "text-[#0b2b40]";
  const userEmail = isDark ? "text-white/60" : "text-[#0b2b40]/60";
  const bottomBorder = isDark ? "border-white/10" : "border-gray-200";
  const logoutButton = isDark
    ? "text-red-300 hover:bg-white/10 hover:text-red-200"
    : "text-red-500 hover:bg-red-50 hover:text-red-600";
  const daftarButton = isDark
    ? "bg-white/10 text-white hover:bg-white/15"
    : "bg-[#0b2b40]/5 text-[#0b2b40] hover:bg-[#0b2b40]/10";

  function toggleMenu(menu: "profil" | "publikasi") {
    setOpenMenu((current) => (current === menu ? null : menu));
  }

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="pointer-events-none fixed left-0 right-0 top-6 z-50 flex justify-center px-4">
      <div
        className={`pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-3 shadow-lg backdrop-blur-xl transition-all duration-500 sm:px-6 ${
          isScrolled
            ? "border border-white/10 bg-[#0b2b40]/90"
            : "border border-transparent bg-[#0b2b40]/30"
        }`}
      >
        {/* Logo — tetap di kiri, teks nama hanya tampil di >= md (bersama menu desktop) */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/images/logo_kab.png"
            alt="Logo Kelurahan Salomallori"
            width={40}
            height={40}
            className="rounded-sm object-contain"
            priority
          />
          <div className="hidden flex-col leading-tight md:flex">
            <span className="text-[14px] font-extrabold tracking-tight text-white">
              Kelurahan Salomallori
            </span>
            <span className="text-[9px] font-bold tracking-wide text-white/70">
              Kec. Dua Pitue, Kab. Sidenreng Rappang
            </span>
          </div>
        </Link>

        <div className="hidden items-center space-x-6 text-[13px] font-semibold text-white/90 md:flex">
          <Link
            href="/"
            className="link-underline text-white transition-colors hover:text-[#84bd3a] [&::after]:bg-[#84bd3a] dark:hover:text-[#32735f] dark:[&::after]:bg-[#32735f]"
          >
            Beranda
          </Link>
          <div className="group relative before:absolute before:inset-x-0 before:top-full before:h-4">
            <span className="flex cursor-pointer items-center gap-1 transition-colors hover:text-[#84bd3a] dark:hover:text-[#32735f]">
              Profil <ChevronDown className="h-4 w-4" />
            </span>
            <div
              className={`invisible absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 rounded-xl border p-2 opacity-0 shadow-xl backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 ${dropdownBorder} ${
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
          <Link
            href="/umkm"
            className={`link-underline transition-colors hover:text-[#84bd3a] [&::after]:bg-[#84bd3a] dark:hover:text-[#32735f] dark:[&::after]:bg-[#32735f]`}
          >
            UMKM
          </Link>
          <div className="group relative before:absolute before:inset-x-0 before:top-full before:h-4">
            <span className="flex cursor-pointer items-center gap-1 transition-colors hover:text-[#84bd3a] dark:hover:text-[#32735f]">
              Publikasi <ChevronDown className="h-4 w-4" />
            </span>
            <div
              className={`invisible absolute left-1/2 top-full z-50 mt-3 w-48 -translate-x-1/2 rounded-xl border p-2 opacity-0 shadow-xl backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 ${dropdownBorder} ${
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
          <Link
            href="/aduan"
            className="link-underline transition-colors hover:text-[#84bd3a] [&::after]:bg-[#84bd3a] dark:hover:text-[#32735f] dark:[&::after]:bg-[#32735f]"
          >
            Kontak
          </Link>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Hamburger — tampil hanya di mobile (< md), di kanan sejajar profil */}
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  aria-label="Buka menu navigasi"
                  className="size-10 rounded-full bg-white/10 p-0 text-white hover:bg-white/15 hover:text-white focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                showCloseButton={false}
                className={cn("w-[85%] max-w-[320px] p-0", drawerClasses)}
              >
                <SheetHeader
                  className={cn(
                    "border-b px-4 py-5 text-left",
                    headerBorder
                  )}
                >
                  <SheetTitle className="sr-only">
                    Menu Navigasi Kelurahan Salomallori
                  </SheetTitle>
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/logo_kab.png"
                      alt="Logo Kelurahan Salomallori"
                      width={40}
                      height={40}
                      className="rounded-sm object-contain"
                    />
                    <div className="flex flex-col leading-tight">
                      <span
                        className={cn(
                          "text-sm font-extrabold tracking-tight",
                          headerTitle
                        )}
                      >
                        Kelurahan Salomallori
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-bold tracking-wide",
                          headerSubtitle
                        )}
                      >
                        Kec. Dua Pitue, Kab. Sidenreng Rappang
                      </span>
                    </div>
                  </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-2">
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className={cn(
                        "flex items-center rounded-lg px-4 py-3.5 text-sm font-semibold transition-colors",
                        navItem
                      )}
                    >
                      Beranda
                    </Link>
                  </SheetClose>

                  {/* Dropdown Profil */}
                  <div>
                    <button
                      onClick={() => toggleMenu("profil")}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-sm font-semibold transition-colors",
                        navItem
                      )}
                      aria-expanded={openMenu === "profil"}
                    >
                      Profil
                      <ChevronRight
                        className={cn(
                          "size-4 transition-transform duration-200",
                          openMenu === "profil" && "rotate-90"
                        )}
                      />
                    </button>
                    {openMenu === "profil" && (
                      <div className="space-y-0.5 px-3 pb-2">
                        {NAV_PROFIL_LINKS.map((item) => (
                          <SheetClose key={item.href} asChild>
                            <Link
                              href={item.href}
                              className={cn(
                                "block rounded-lg px-4 py-2.5 text-[13px] font-medium transition-colors",
                                navItemSub
                              )}
                            >
                              {item.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    )}
                  </div>

                  <SheetClose asChild>
                    <Link
                      href="/umkm"
                      className={cn(
                        "flex items-center rounded-lg px-4 py-3.5 text-sm font-semibold transition-colors",
                        navItem
                      )}
                    >
                      UMKM
                    </Link>
                  </SheetClose>

                  {/* Dropdown Publikasi */}
                  <div>
                    <button
                      onClick={() => toggleMenu("publikasi")}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-sm font-semibold transition-colors",
                        navItem
                      )}
                      aria-expanded={openMenu === "publikasi"}
                    >
                      Publikasi
                      <ChevronRight
                        className={cn(
                          "size-4 transition-transform duration-200",
                          openMenu === "publikasi" && "rotate-90"
                        )}
                      />
                    </button>
                    {openMenu === "publikasi" && (
                      <div className="space-y-0.5 px-3 pb-2">
                        {NAV_PUBLIKASI_LINKS.map((item) => (
                          <SheetClose key={item.href} asChild>
                            <Link
                              href={item.href}
                              className={cn(
                                "block rounded-lg px-4 py-2.5 text-[13px] font-medium transition-colors",
                                navItemSub
                              )}
                            >
                              {item.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    )}
                  </div>

                  <SheetClose asChild>
                    <Link
                      href="/aduan"
                      className={cn(
                        "flex items-center rounded-lg px-4 py-3.5 text-sm font-semibold transition-colors",
                        navItem
                      )}
                    >
                      Kontak
                    </Link>
                  </SheetClose>
                </div>

                {/* Bagian user/auth di bawah drawer */}
                <div className={cn("border-t p-4", bottomBorder)}>
                  {mounted && session ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarImage
                            src={session.user.image ?? undefined}
                            alt={session.user.name ?? "Pengguna"}
                          />
                          <AvatarFallback
                            className={cn("text-xs", avatarFallback)}
                          >
                            {getInitials(session.user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1 leading-tight">
                          <p
                            className={cn(
                              "truncate text-sm font-semibold",
                              userName
                            )}
                          >
                            {session.user.name}
                          </p>
                          <p
                            className={cn(
                              "truncate text-xs",
                              userEmail
                            )}
                          >
                            {session.user.email}
                          </p>
                        </div>
                      </div>
                      <div className="grid gap-1.5">
                        {isPrivileged && (
                          <SheetClose asChild>
                            <Link
                              href="/dashboard"
                              className={cn(
                                "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors",
                                actionButton
                              )}
                            >
                              <LayoutDashboard className="size-4" />
                              Dashboard
                            </Link>
                          </SheetClose>
                        )}
                        <SheetClose asChild>
                          <Link
                            href={`/akun/${session.user.id}`}
                            className={cn(
                              "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors",
                              actionButton
                            )}
                          >
                            <User className="size-4" />
                            Profil
                          </Link>
                        </SheetClose>
                        <Button
                          onClick={handleSignOut}
                          variant="ghost"
                          className={cn(
                            "flex h-auto w-full justify-start gap-2 rounded-lg bg-transparent px-4 py-2.5 text-sm font-semibold transition-colors",
                            logoutButton
                          )}
                        >
                          <LogOut className="size-4" />
                          Keluar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-1.5">
                      <SheetClose asChild>
                        <Link
                          href="/auth/signin"
                          className="flex items-center justify-center gap-2 rounded-lg bg-[#84bd3a] px-4 py-2.5 text-sm font-semibold text-[#0b2b40] transition-colors hover:bg-[#84bd3a]/90"
                        >
                          <LogIn className="size-4" />
                          Masuk
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          href="/auth/signup"
                          className={cn(
                            "flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors",
                            daftarButton
                          )}
                        >
                          <UserPlus className="size-4" />
                          Daftar
                        </Link>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <ThemeToggle />
          {mounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="size-10 rounded-full p-0 focus-visible:ring-2 focus-visible:ring-white/50"
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
            <div className="size-10 rounded-full bg-white/10" />
          )}
        </div>
      </div>
    </nav>
  );
}