"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
  User,
  UserPlus,
} from "lucide-react";
import { useTheme } from "next-themes";
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
import { cn } from "@/lib/utils";

export function NavbarStitch() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
  const hoverLinkClass = isDark
    ? "hover:text-[#32735f] [&::after]:bg-[#32735f]"
    : "hover:text-[#84bd3a] [&::after]:bg-[#84bd3a]";
  const hoverDropdownClass = isDark ? "hover:text-[#32735f]" : "hover:text-[#84bd3a]";

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="pointer-events-none fixed left-0 right-0 top-6 z-50 flex justify-center px-4">
      <div
        className={`pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full px-6 py-3 shadow-lg backdrop-blur-xl transition-all duration-500 ${
          isScrolled
            ? "border border-white/10 bg-[#0b2b40]/90 dark:border-[#373a3b]"
            : "border border-transparent bg-[#0b2b40]/30"
        }`}
      >
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/images/logo_kab.png"
            alt="Logo Kelurahan Salomallori"
            width={40}
            height={40}
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
          <Link
            href="/"
            className={cn("link-underline text-white transition-colors", hoverLinkClass)}
          >
            Beranda
          </Link>

          <div className="group relative before:absolute before:inset-x-0 before:top-full before:h-4">
            <span
              className={cn(
                "flex cursor-pointer items-center gap-1 transition-colors",
                hoverDropdownClass,
              )}
            >
              Profil <ChevronDown className="h-4 w-4" />
            </span>
            <div
              className={`invisible absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 rounded-xl border border-white/10 p-2 opacity-0 shadow-xl backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 dark:border-[#373a3b] ${
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
            className={cn("link-underline transition-colors", hoverLinkClass)}
          >
            UMKM
          </Link>

          <div className="group relative before:absolute before:inset-x-0 before:top-full before:h-4">
            <span
              className={cn(
                "flex cursor-pointer items-center gap-1 transition-colors",
                hoverDropdownClass,
              )}
            >
              Publikasi <ChevronDown className="h-4 w-4" />
            </span>
            <div
              className={`invisible absolute left-1/2 top-full z-50 mt-3 w-48 -translate-x-1/2 rounded-xl border border-white/10 p-2 opacity-0 shadow-xl backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 dark:border-[#373a3b] ${
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
            className={cn("link-underline transition-colors", hoverLinkClass)}
          >
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
  );
}