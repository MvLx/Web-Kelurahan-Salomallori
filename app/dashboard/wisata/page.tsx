"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Trash2,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Pencil,
} from "lucide-react";
import Navbar from "@/components/custom/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Wisata {
  id: string;
  nama: string;
  deskripsi: string;
  lokasi: string;
  kategori: "WISATA_ALAM" | "KULINER" | "BUDAYA";
  gambar: string | null;
  createdAt: string;
}

interface PaginatedResponse {
  data: Wisata[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const LIMIT = 10;

const KATEGORI_LABEL: Record<string, string> = {
  WISATA_ALAM: "Wisata Alam",
  KULINER: "Kuliner",
  BUDAYA: "Budaya",
};

const KATEGORI_COLOR: Record<string, string> = {
  WISATA_ALAM: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  KULINER: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  BUDAYA: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ── Badge ─────────────────────────────────────────────────────────────────────
function KategoriBadge({ kategori }: { kategori: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium",
        KATEGORI_COLOR[kategori] ?? "bg-foreground/10 text-foreground/70",
      )}
    >
      {KATEGORI_LABEL[kategori] ?? kategori}
    </span>
  );
}

// ── Row skeleton ──────────────────────────────────────────────────────────────
function RowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-2/3" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-20 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-1/2" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-3 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 w-16 rounded-md" />
      </TableCell>
    </TableRow>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function WisataListPage() {
  const [data, setData] = useState<PaginatedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmItem, setConfirmItem] = useState<Wisata | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce search
  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
    }, 350);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(LIMIT),
        ...(debouncedSearch ? { q: debouncedSearch } : {}),
        ...(kategoriFilter !== "all" ? { kategori: kategoriFilter } : {}),
      });
      const res = await fetch(`/api/wisata?${params}`);
      if (res.ok) setData(await res.json());
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, kategoriFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleKategoriFilter = (val: string) => {
    setKategoriFilter(val);
    setPage(1);
  };

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/wisata/${id}`, { method: "DELETE" });
      if (res.ok) {
        setConfirmItem(null);
        toast.success("Wisata berhasil dihapus");
        const isLastOnPage = data?.data.length === 1 && page > 1;
        if (isLastOnPage) setPage((p) => p - 1);
        else await fetchData();
      } else {
        const body = await res.json().catch(() => ({}));
        toast.error(body?.error ?? "Gagal menghapus wisata");
        setConfirmItem(null);
      }
    } catch {
      toast.error("Gagal menghapus wisata");
      setConfirmItem(null);
    } finally {
      setDeletingId(null);
    }
  }

  const items = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="min-h-screen bg-background">
      {/* ── Delete confirmation dialog ── */}
      <Dialog
        open={confirmItem !== null}
        onOpenChange={(open) => {
          if (!open && !deletingId) setConfirmItem(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Wisata</DialogTitle>
            <DialogDescription>
              Apakah kamu yakin ingin menghapus{" "}
              <span className="font-semibold text-foreground">
                &ldquo;{confirmItem?.nama}&rdquo;
              </span>
              ? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              disabled={!!deletingId}
              onClick={() => setConfirmItem(null)}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              disabled={!!deletingId}
              onClick={() => confirmItem && handleDelete(confirmItem.id)}
            >
              {deletingId && (
                <Loader2 className="mr-1.5 size-3.5 animate-spin" />
              )}
              {deletingId ? "Menghapus..." : "Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Navbar variant="dashboard" />

      {/* Sticky top bar */}
      <div className="fixed left-0 right-0 top-16 z-40 border-b border-foreground/10 bg-card/80 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <h1 className="text-sm font-bold text-foreground">
              Manajemen Wisata
            </h1>
          </div>

          <Button asChild size="sm">
            <Link href="/dashboard/wisata/new">
              <Plus className="size-3.5" />
              Wisata Baru
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 pt-36 pb-16">
        {/* Filters row */}
        <div className="mb-4 flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari nama wisata..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select
            value={kategoriFilter}
            onValueChange={(val) => handleKategoriFilter(val)}
          >
            <SelectTrigger className="sm:w-44">
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              {Object.entries(KATEGORI_LABEL).map(([val, label]) => (
                <SelectItem key={val} value={val}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table card */}
        <Card className="gap-0 py-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-foreground/5 hover:bg-foreground/5">
                <TableHead className="text-xs font-semibold uppercase tracking-wide">
                  Nama Wisata
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide w-28">
                  Kategori
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide">
                  Lokasi
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide w-28">
                  Tanggal
                </TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <RowSkeleton key={i} />)
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <div className="flex flex-col items-center gap-3 py-12 text-muted-foreground">
                      <MapPin className="size-10 opacity-30" />
                      <p className="text-sm font-medium">
                        {debouncedSearch || kategoriFilter !== "all"
                          ? "Tidak ada wisata yang cocok dengan filter."
                          : "Belum ada wisata. Tambah yang pertama!"}
                      </p>
                      {!debouncedSearch && kategoriFilter === "all" && (
                        <Button asChild size="sm" variant="outline">
                          <Link href="/dashboard/wisata/new">
                            <Plus className="mr-1.5 size-3.5" />
                            Tambah Wisata
                          </Link>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex min-w-0 items-center gap-3">
                        {item.gambar ? (
                          <img
                            src={item.gambar}
                            alt={item.nama}
                            className="size-10 shrink-0 rounded-md object-cover"
                          />
                        ) : (
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-foreground/5 text-muted-foreground">
                            <MapPin className="size-5" />
                          </div>
                        )}
                        <span className="truncate text-sm font-medium text-foreground">
                          {item.nama}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <KategoriBadge kategori={item.kategori} />
                    </TableCell>
                    <TableCell className="max-w-48 truncate text-sm text-muted-foreground">
                      {item.lokasi}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(item.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          asChild
                          size="icon"
                          variant="ghost"
                          className="size-8 text-muted-foreground hover:text-foreground"
                        >
                          <Link href={`/dashboard/wisata/${item.id}/edit`}>
                            <Pencil className="size-4" />
                          </Link>
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8 text-muted-foreground hover:text-destructive"
                          onClick={() => setConfirmItem(item)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Halaman {page} dari {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="outline"
                className="size-8"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="size-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 ||
                    p === totalPages ||
                    (p >= page - 1 && p <= page + 1),
                )
                .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                  if (idx > 0 && p - (arr[idx - 1] as number) > 1)
                    acc.push("...");
                  acc.push(p);
                  return acc;
                }, [])
                .map((item, idx) =>
                  item === "..." ? (
                    <span key={`ellipsis-${idx}`} className="px-1">
                      …
                    </span>
                  ) : (
                    <Button
                      key={item}
                      size="icon"
                      variant={item === page ? "default" : "outline"}
                      className="size-8 text-xs"
                      onClick={() => setPage(item as number)}
                    >
                      {item}
                    </Button>
                  ),
                )}
              <Button
                size="icon"
                variant="outline"
                className="size-8"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}