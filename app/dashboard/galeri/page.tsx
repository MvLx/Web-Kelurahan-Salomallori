"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Plus, Search, Trash2, ImageIcon, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/custom/navbar";
import { ImageUpload } from "@/components/custom/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ── Types ──
interface GaleriItem {
  id: string;
  judul: string;
  gambar: string;
  kategori: string;
  createdAt: string;
}

interface PaginatedResponse {
  data: GaleriItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const LIMIT = 24;

// ── Skeleton grid ──
function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-2.5 w-1/2" />
        </div>
      ))}
    </div>
  );
}

// ── Main page ──
export default function GaleriListPage() {
  const [data, setData] = useState<PaginatedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmItem, setConfirmItem] = useState<GaleriItem | null>(null);

  // Upload dialog state
  const [uploadOpen, setUploadOpen] = useState(false);
  const [judul, setJudul] = useState("");
  const [gambar, setGambar] = useState("");
  const [kategori, setKategori] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      const params = new URLSearchParams({ page: String(page), limit: String(LIMIT) });
      if (debouncedSearch) params.set("kategori", debouncedSearch);
      const res = await fetch(`/api/galeri?${params}`);
      if (res.ok) setData(await res.json());
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!judul.trim() || !gambar || !kategori.trim()) {
      toast.error("Semua kolom harus diisi");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/galeri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ judul: judul.trim(), gambar, kategori: kategori.trim() }),
      });
      if (!res.ok) {
        const json = await res.json();
        toast.error(json.error ?? "Gagal upload");
        return;
      }
      toast.success("Gambar berhasil ditambahkan");
      setUploadOpen(false);
      setJudul("");
      setGambar("");
      setKategori("");
      await fetchData();
    } catch {
      toast.error("Tidak dapat menghubungi server");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/galeri/${id}`, { method: "DELETE" });
      if (res.ok) {
        setConfirmItem(null);
        toast.success("Gambar berhasil dihapus");
        const isLastOnPage = data?.data.length === 1 && page > 1;
        if (isLastOnPage) setPage((p) => p - 1);
        else await fetchData();
      } else {
        toast.error("Gagal menghapus");
        setConfirmItem(null);
      }
    } catch {
      toast.error("Gagal menghapus");
      setConfirmItem(null);
    } finally {
      setDeletingId(null);
    }
  }

  const items = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="min-h-screen bg-background">
      {/* ── Delete confirmation ── */}
      <Dialog open={confirmItem !== null} onOpenChange={(open) => { if (!open && !deletingId) setConfirmItem(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Gambar</DialogTitle>
            <DialogDescription>
              Apakah kamu yakin ingin menghapus{" "}
              <span className="font-semibold text-foreground">&ldquo;{confirmItem?.judul}&rdquo;</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" disabled={!!deletingId} onClick={() => setConfirmItem(null)}>Batal</Button>
            <Button variant="destructive" disabled={!!deletingId} onClick={() => confirmItem && handleDelete(confirmItem.id)}>
              {deletingId && <Loader2 className="mr-1.5 size-3.5 animate-spin" />}
              {deletingId ? "Menghapus..." : "Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Upload dialog ── */}
      <Dialog open={uploadOpen} onOpenChange={(open) => { if (!open && !submitting) setUploadOpen(false); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Tambah Gambar Baru</DialogTitle>
            <DialogDescription>Upload gambar untuk galeri kelurahan.</DialogDescription>
          </DialogHeader>
          <form id="upload-galeri-form" onSubmit={handleUpload} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="galeri-gambar">Gambar</Label>
              <ImageUpload value={gambar} onChange={setGambar} folder="portal-berita/galeri" aspectRatio="square" disabled={submitting} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="galeri-judul">Judul</Label>
              <Input id="galeri-judul" placeholder="Nama/deskripsi gambar..." value={judul}
                onChange={(e) => setJudul(e.target.value)} disabled={submitting} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="galeri-kategori">Kategori</Label>
              <Input id="galeri-kategori" placeholder="Contoh: Kegiatan, Acara, Fasilitas..." value={kategori}
                onChange={(e) => setKategori(e.target.value)} disabled={submitting} />
            </div>
          </form>
          <DialogFooter>
            <Button variant="outline" disabled={submitting} onClick={() => setUploadOpen(false)}>Batal</Button>
            <Button form="upload-galeri-form" type="submit" disabled={submitting}>
              {submitting && <Loader2 className="mr-1.5 size-3.5 animate-spin" />}
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Navbar variant="dashboard" />

      {/* Sticky top bar */}
      <div className="fixed left-0 right-0 top-16 z-40 border-b border-foreground/10 bg-card/80 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <h1 className="text-sm font-bold text-foreground">Kelola Galeri</h1>
          <Button size="sm" onClick={() => setUploadOpen(true)}>
            <Plus className="size-3.5" />
            Tambah Gambar
          </Button>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 pt-28 pb-16">
        {/* Search by category */}
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Cari berdasarkan kategori..." value={search}
            onChange={(e) => handleSearchChange(e.target.value)} className="pl-9" />
        </div>

        {loading ? (
          <GridSkeleton />
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-muted-foreground">
            <ImageIcon className="size-12 opacity-30" />
            <p className="text-sm font-medium">
              {debouncedSearch ? "Tidak ada galeri dengan kategori itu." : "Belum ada gambar di galeri."}
            </p>
            {!debouncedSearch && (
              <Button size="sm" variant="outline" onClick={() => setUploadOpen(true)}>
                <Plus className="mr-1.5 size-3.5" /> Tambah Gambar
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {items.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-foreground/5">
                    <img src={item.gambar} alt={item.judul}
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="mt-1.5 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-foreground">{item.judul}</p>
                      <span className="text-[11px] text-muted-foreground">{item.kategori}</span>
                    </div>
                    <button onClick={() => setConfirmItem(item)}
                      className="shrink-0 rounded-md p-1 text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100">
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                <span>Halaman {page} dari {totalPages}</span>
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="outline" className="size-8" disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}>
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="size-8" disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}>
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}