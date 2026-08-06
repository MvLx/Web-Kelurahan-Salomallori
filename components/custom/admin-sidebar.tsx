/**
 * AdminSidebar — Client Component
 *
 * Sidebar navigasi vertikal untuk halaman dashboard admin.
 * Menggantikan navbar link horizontal yang sebelumnya menempel di top.
 * - Desktop: fixed sidebar 256px di kiri
 * - Mobile: drawer off-canvas dengan hamburger toggle
 * - Berisi: logo, navigasi (11 menu), user info + logout di bagian bawah
 */
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Store,
  Image as ImageIcon,
  Building2,
  Phone,
  BarChart3,
  Tag,
  Users,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { getInitials } from "@/utils/string";

// --- Navigasi Dashboard ---
// Breaking News dihapus karena tidak terpakai (permintaan user).
interface DashboardNavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const dashboardNav: DashboardNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Postingan", href: "/dashboard/posts", icon: FileText },
  { label: "UMKM", href: "/dashboard/umkm", icon: Store },
  { label: "Galeri", href: "/dashboard/galeri", icon: ImageIcon },
  { label: "Profil Kelurahan", href: "/dashboard/profil-desa", icon: Building2 },
  { label: "Kontak", href: "/dashboard/kontak", icon: Phone },
  { label: "Infografis", href: "/dashboard/infografis", icon: BarChart3 },
  { label: "Kategori", href: "/dashboard/categories", icon: Tag },
  { label: "Pengguna", href: "/dashboard/users", icon: Users },
  { label: "Pesan", href: "/dashboard/messages", icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const userRole = session?.user?.role;
  const isAdmin = userRole === "ADMIN";

  const visibleNav = isAdmin
    ? dashboardNav
    : dashboardNav.filter((item) => item.href !== "/dashboard/users");

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === href;
    return pathname.startsWith(href);
  }

  const navContent = (
    <nav className="flex h-full flex-col">
      {/* ── Header: Logo + Nama ── */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-sage px-4 dark:border-[#414943]">
        <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo_kab.png"
              alt="Logo Kelurahan Salomallori"
              width={40}
              height={40}
            className="rounded-sm object-contain"
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="text-[14px] font-extrabold tracking-tight text-obsidian dark:text-white">
              Kelurahan Salomallori
            </span>
            <span className="text-[10px] font-bold tracking-wide text-steel dark:text-white/60">
              Panel Admin
            </span>
          </div>
        </Link>
        <button
          className="ml-auto rounded-md p-1.5 text-steel transition-colors hover:bg-fog md:hidden dark:hover:bg-[#2e2e2e]"
          onClick={() => setMobileOpen(false)}
          aria-label="Tutup menu"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* ── Navigasi ── */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-2 pb-2 font-body text-label-medium font-semibold uppercase tracking-widest text-steel dark:text-white/50">
          Menu
        </p>
        <ul className="flex flex-col gap-0.5">
          {visibleNav.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-[8px] px-3 py-2.5 font-body text-body-medium font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-hudson-blue dark:bg-[#84bd3a]/15 dark:text-[#84bd3a]"
                      : "text-obsidian hover:bg-fog dark:text-white/80 dark:hover:bg-[#2e2e2e]",
                  )}
                >
                  <Icon className="size-[18px] shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── Footer: User Info + Logout ── */}
      <div className="shrink-0 border-t border-sage p-4 dark:border-[#414943]">
        <div className="mb-3 flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage
              src={session?.user?.image ?? undefined}
              alt={session?.user?.name ?? "Pengguna"}
            />
            <AvatarFallback className="bg-primary/10 text-xs text-hudson-blue dark:bg-[#84bd3a]/15 dark:text-[#84bd3a]">
              {getInitials(session?.user?.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate font-body text-body-medium font-semibold text-obsidian dark:text-white">
              {session?.user?.name ?? "Pengguna"}
            </p>
            <p className="truncate font-body text-body-small text-steel dark:text-white/50">
              {session?.user?.email ?? ""}
            </p>
          </div>
          <ThemeToggle />
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="w-full justify-start gap-2 font-body text-body-medium text-red-600 hover:bg-red-600/10 hover:text-red-600 dark:text-red-400"
        >
          <LogOut className="size-4" />
          Keluar
        </Button>
      </div>
    </nav>
  );

  return (
    <>
      {/* ── Toggle (Mobile & Desktop collapse) ── */}
      <div className="fixed left-4 top-4 z-40 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(true)}
          className="rounded-md bg-paper text-obsidian shadow-paper-sm dark:bg-[#1a1a1a] dark:text-white"
          aria-label="Buka menu"
        >
          <Menu className="size-5" />
        </Button>
      </div>

      {/* ── Desktop Sidebar ── */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-sage bg-paper lg:block dark:border-[#414943] dark:bg-[#1a1a1a]">
        {navContent}
      </aside>

      {/* ── Mobile Drawer ── */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        {/* Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity duration-200",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMobileOpen(false)}
        />
        {/* Panel */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-64 bg-paper transition-transform duration-200 ease-in-out dark:bg-[#1a1a1a]",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {navContent}
        </div>
      </div>
    </>
  );
}