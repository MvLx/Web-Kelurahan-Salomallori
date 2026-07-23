"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  Loader2,
  BarChart3,
  PieChart,
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/custom/navbar";
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
type ChartType = "BAR_CHART" | "LINE_CHART" | "PIE_CHART" | "DOUGHNUT_CHART" | "AREA_CHART" | "STAT_CARDS";

interface Infografis {
  id: string;
  judul: string;
  tahun: number;
  chartType: ChartType;
  dataJson: unknown;
}

const CHART_LABELS: Record<ChartType, string> = {
  BAR_CHART: "Bar Chart",
  LINE_CHART: "Line Chart",
  PIE_CHART: "Pie Chart",
  DOUGHNUT_CHART: "Doughnut Chart",
  AREA_CHART: "Area Chart",
  STAT_CARDS: "Stat Cards",
};

const CHART_OPTIONS: { value: ChartType; label: string }[] = [
  { value: "BAR_CHART", label: "Bar Chart" },
  { value: "LINE_CHART", label: "Line Chart" },
  { value: "PIE_CHART", label: "Pie Chart" },
  { value: "DOUGHNUT_CHART", label: "Doughnut Chart" },
  { value: "AREA_CHART", label: "Area Chart" },
  { value: "STAT_CARDS", label: "Stat Cards" },
];

// ── Main ──
export default function InfografisPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Infografis[]>([]);

  // Dialog
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [judul, setJudul] = useState("");
  const [tahun, setTahun] = useState(new Date().getFullYear());
  const [chartType, setChartType] = useState<ChartType>("BAR_CHART");
  const [dataJson, setDataJson] = useState("[]");
  const [submitting, setSubmitting] = useState(false);

  // Delete
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/infografis");
      if (res.ok) setItems(await res.json());
    } catch {
      toast.error("Gagal memuat data infografis");
    } finally {
      setLoading(false);
    }
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadData(); }, [loadData]);

  function openAdd() {
    setEditId(null);
    setJudul("");
    setTahun(new Date().getFullYear());
    setChartType("BAR_CHART");
    setDataJson("[]");
    setOpen(true);
  }

  function openEdit(item: Infografis) {
    setEditId(item.id);
    setJudul(item.judul);
    setTahun(item.tahun);
    setChartType(item.chartType);
    setDataJson(JSON.stringify(item.dataJson, null, 2));
    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!judul.trim()) {
      toast.error("Judul harus diisi");
      return;
    }

    let parsedData: unknown;
    try {
      parsedData = JSON.parse(dataJson);
    } catch {
      toast.error("Data JSON tidak valid");
      return;
    }

    setSubmitting(true);
    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `/api/infografis/${editId}` : "/api/infografis";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ judul: judul.trim(), tahun, chartType, dataJson: parsedData }),
      });
      if (res.ok) {
        toast.success(editId ? "Infografis berhasil diupdate" : "Infografis berhasil ditambahkan");
        setOpen(false);
        await loadData();
      } else {
        const json = await res.json();
        toast.error(json.error ?? "Gagal menyimpan");
      }
    } catch {
      toast.error("Gagal menyimpan infografis");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/infografis/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Infografis berhasil dihapus");
        setConfirmDelete(null);
        await loadData();
      } else {
        toast.error("Gagal menghapus");
      }
    } catch {
      toast.error("Gagal menghapus");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar variant="dashboard" />
        <main className="mx-auto max-w-5xl px-4 pt-24 pb-16">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-6 h-64 w-full rounded-lg" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Delete dialog */}
      <Dialog open={confirmDelete !== null} onOpenChange={(o) => { if (!o && !deleting) setConfirmDelete(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Infografis</DialogTitle>
            <DialogDescription>Apakah kamu yakin ingin menghapus infografis ini?</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" disabled={deleting} onClick={() => setConfirmDelete(null)}>Batal</Button>
            <Button variant="destructive" disabled={deleting} onClick={() => confirmDelete && handleDelete(confirmDelete)}>
              {deleting && <Loader2 className="mr-1.5 size-3.5 animate-spin" />} Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Form dialog */}
      <Dialog open={open} onOpenChange={(o) => { if (!o && !submitting) setOpen(false); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Infografis" : "Tambah Infografis"}</DialogTitle>
            <DialogDescription>Data infografis akan ditampilkan di halaman beranda.</DialogDescription>
          </DialogHeader>
          <form id="infografis-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label className="text-xs font-semibold text-muted-foreground">Judul</Label>
              <Input value={judul} onChange={(e) => setJudul(e.target.value)} placeholder="Contoh: Jumlah Penduduk per Dusun" disabled={submitting} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <Label className="text-xs font-semibold text-muted-foreground">Tahun</Label>
                <Input type="number" value={tahun} onChange={(e) => setTahun(parseInt(e.target.value) || new Date().getFullYear())} disabled={submitting} />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs font-semibold text-muted-foreground">Tipe Chart</Label>
                <select value={chartType} onChange={(e) => setChartType(e.target.value as ChartType)}
                  className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  disabled={submitting}>
                  {CHART_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs font-semibold text-muted-foreground">Data JSON</Label>
              <textarea value={dataJson} onChange={(e) => setDataJson(e.target.value)}
                rows={10}
                className="border-input bg-background w-full rounded-md border px-3 py-2 text-xs font-mono shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-y"
                placeholder='[{ "label": "Contoh", "value": 100 }]'
                disabled={submitting} />
            </div>
          </form>
          <DialogFooter>
            <Button variant="outline" disabled={submitting} onClick={() => setOpen(false)}>Batal</Button>
            <Button form="infografis-form" type="submit" disabled={submitting}>
              {submitting && <Loader2 className="mr-1.5 size-3.5 animate-spin" />}
              {editId ? "Update" : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Navbar variant="dashboard" />

      {/* Sticky top bar */}
      <div className="fixed left-0 right-0 top-16 z-40 border-b border-foreground/10 bg-card/80 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <h1 className="text-sm font-bold text-foreground">Infografis</h1>
          <Button size="sm" onClick={openAdd}>
            <Plus className="mr-1.5 size-3.5" /> Tambah
          </Button>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 pt-28 pb-16">
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-muted-foreground">
            <BarChart3 className="size-12 opacity-30" />
            <p className="text-sm font-medium">Belum ada data infografis.</p>
            <Button size="sm" onClick={openAdd}>
              <Plus className="mr-1.5 size-3.5" /> Tambah Infografis
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div key={item.id} className="group relative rounded-lg border border-foreground/10 bg-card p-4 transition-colors hover:border-foreground/20">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{item.judul}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{item.tahun}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-foreground/5 px-2 py-0.5 text-[10px]">
                        <PieChart className="size-3" />
                        {CHART_LABELS[item.chartType] ?? item.chartType}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-end gap-1 border-t border-foreground/5 pt-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button size="icon" variant="ghost" className="size-7" onClick={() => openEdit(item)}>
                    <Pencil className="size-3" />
                  </Button>
                  <Button size="icon" variant="ghost" className="size-7 text-destructive hover:bg-destructive/10" onClick={() => setConfirmDelete(item.id)}>
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}