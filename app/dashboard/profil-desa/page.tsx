"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Save,
  Loader2,
  Plus,
  Trash2,
  Pencil,
  Users,
  Building2,
  MapPin,
  Check,
  X,
  GripVertical,
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/custom/navbar";
import { ImageUpload } from "@/components/custom/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ── Types ──
interface DesaData {
  id: string;
  nama: string;
  sejarah: string;
  visi: string;
  misi: string;
  luasWilayah: number | null;
  jumlahPenduduk: number | null;
  jumlahKK: number | null;
  jumlahDusun: number | null;
  batasUtara: string | null;
  batasTimur: string | null;
  batasSelatan: string | null;
  batasBarat: string | null;
  fotoKepalaDesa: string | null;
}

interface Perangkat {
  id: string;
  nama: string;
  jabatan: string;
  foto: string | null;
  urutan: number;
}

// ── Default empty state ──
const EMPTY_DESA = {
  id: "",
  nama: "",
  sejarah: "",
  visi: "",
  misi: "",
  luasWilayah: null,
  jumlahPenduduk: null,
  jumlahKK: null,
  jumlahDusun: null,
  batasUtara: "",
  batasTimur: "",
  batasSelatan: "",
  batasBarat: "",
  fotoKepalaDesa: null,
};

function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-xs font-semibold text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

// ── Main page ──
export default function ProfilDesaPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [desa, setDesa] = useState<DesaData>(EMPTY_DESA);
  const [perangkat, setPerangkat] = useState<Perangkat[]>([]);

  // Perangkat dialog
  const [perangkatOpen, setPerangkatOpen] = useState(false);
  const [editPerangkatId, setEditPerangkatId] = useState<string | null>(null);
  const [pNama, setPNama] = useState("");
  const [pJabatan, setPJabatan] = useState("");
  const [pFoto, setPFoto] = useState("");
  const [pUrutan, setPUrutan] = useState(0);
  const [pSubmitting, setPSubmitting] = useState(false);

  // Delete confirmation
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [desaRes, perangkatRes] = await Promise.all([
        fetch("/api/desa"),
        fetch("/api/perangkat-desa"),
      ]);
      if (desaRes.ok) setDesa(await desaRes.json());
      if (perangkatRes.ok) setPerangkat(await perangkatRes.json());
    } catch {
      toast.error("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadData(); }, [loadData]);

  async function saveDesa() {
    setSaving(true);
    try {
      const res = await fetch("/api/desa", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: desa.nama,
          sejarah: desa.sejarah,
          visi: desa.visi,
          misi: desa.misi,
          luasWilayah: desa.luasWilayah ?? null,
          jumlahPenduduk: desa.jumlahPenduduk ?? null,
          jumlahKK: desa.jumlahKK ?? null,
          jumlahDusun: desa.jumlahDusun ?? null,
          batasUtara: desa.batasUtara || null,
          batasTimur: desa.batasTimur || null,
          batasSelatan: desa.batasSelatan || null,
          batasBarat: desa.batasBarat || null,
          fotoKepalaDesa: desa.fotoKepalaDesa || null,
        }),
      });
      if (res.ok) {
        toast.success("Data desa berhasil disimpan");
        await loadData();
      } else {
        const json = await res.json();
        toast.error(json.error ?? "Gagal menyimpan");
      }
    } catch {
      toast.error("Tidak dapat menghubungi server");
    } finally {
      setSaving(false);
    }
  }

  function openAddPerangkat() {
    setEditPerangkatId(null);
    setPNama("");
    setPJabatan("");
    setPFoto("");
    setPUrutan(perangkat.length);
    setPerangkatOpen(true);
  }

  function openEditPerangkat(item: Perangkat) {
    setEditPerangkatId(item.id);
    setPNama(item.nama);
    setPJabatan(item.jabatan);
    setPFoto(item.foto ?? "");
    setPUrutan(item.urutan);
    setPerangkatOpen(true);
  }

  async function submitPerangkat(e: React.FormEvent) {
    e.preventDefault();
    if (!pNama.trim() || !pJabatan.trim()) {
      toast.error("Nama dan jabatan harus diisi");
      return;
    }
    setPSubmitting(true);
    try {
      const method = editPerangkatId ? "PUT" : "POST";
      const url = editPerangkatId ? `/api/perangkat-desa/${editPerangkatId}` : "/api/perangkat-desa";
      const body = {
        nama: pNama.trim(),
        jabatan: pJabatan.trim(),
        foto: pFoto || null,
        urutan: pUrutan,
      };
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        toast.success(editPerangkatId ? "Perangkat berhasil diupdate" : "Perangkat berhasil ditambahkan");
        setPerangkatOpen(false);
        await loadData();
      } else {
        const json = await res.json();
        toast.error(json.error ?? "Gagal menyimpan");
      }
    } catch {
      toast.error("Gagal menyimpan perangkat");
    } finally {
      setPSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/perangkat-desa/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Perangkat berhasil dihapus");
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
        <main className="mx-auto max-w-4xl px-4 pt-24 pb-16">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-96 w-full rounded-lg" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ── Delete dialog ── */}
      <Dialog open={confirmDelete !== null} onOpenChange={(o) => { if (!o && !deleting) setConfirmDelete(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Perangkat</DialogTitle>
            <DialogDescription>Apakah kamu yakin ingin menghapus data perangkat desa ini?</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" disabled={deleting} onClick={() => setConfirmDelete(null)}>Batal</Button>
            <Button variant="destructive" disabled={deleting} onClick={() => confirmDelete && handleDelete(confirmDelete)}>
              {deleting && <Loader2 className="mr-1.5 size-3.5 animate-spin" />}
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Perangkat dialog ── */}
      <Dialog open={perangkatOpen} onOpenChange={(o) => { if (!o && !pSubmitting) setPerangkatOpen(false); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editPerangkatId ? "Edit Perangkat Desa" : "Tambah Perangkat Desa"}</DialogTitle>
            <DialogDescription>Data perangkat desa akan ditampilkan di halaman profil.</DialogDescription>
          </DialogHeader>
          <form id="perangkat-form" onSubmit={submitPerangkat} className="flex flex-col gap-4">
            <Field label="Nama">
              <Input value={pNama} onChange={(e) => setPNama(e.target.value)} placeholder="Nama lengkap" disabled={pSubmitting} />
            </Field>
            <Field label="Jabatan">
              <Input value={pJabatan} onChange={(e) => setPJabatan(e.target.value)} placeholder="Contoh: Kepala Desa, Sekretaris" disabled={pSubmitting} />
            </Field>
            <Field label="Foto">
              <ImageUpload value={pFoto} onChange={setPFoto} folder="portal-berita/perangkat" aspectRatio="video" disabled={pSubmitting} />
            </Field>
            <Field label="Urutan">
              <Input type="number" min={0} value={pUrutan} onChange={(e) => setPUrutan(parseInt(e.target.value) || 0)} disabled={pSubmitting} />
            </Field>
          </form>
          <DialogFooter>
            <Button variant="outline" disabled={pSubmitting} onClick={() => setPerangkatOpen(false)}>Batal</Button>
            <Button form="perangkat-form" type="submit" disabled={pSubmitting}>
              {pSubmitting && <Loader2 className="mr-1.5 size-3.5 animate-spin" />}
              {editPerangkatId ? "Update" : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Navbar variant="dashboard" />

      {/* Sticky top bar */}
      <div className="fixed left-0 right-0 top-16 z-40 border-b border-foreground/10 bg-card/80 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <h1 className="text-sm font-bold text-foreground">Profil Desa</h1>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-4 pt-28 pb-16">
        <Tabs defaultValue="desa">
          <TabsList className="mb-6">
            <TabsTrigger value="desa"><Building2 className="mr-1.5 size-4" /> Data Desa</TabsTrigger>
            <TabsTrigger value="perangkat"><Users className="mr-1.5 size-4" /> Perangkat Desa</TabsTrigger>
          </TabsList>

          {/* ── Tab 1: Data Desa ── */}
          <TabsContent value="desa" className="space-y-6">
            <div className="rounded-lg border border-foreground/10 bg-card p-4 sm:p-6">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Identitas Desa
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Nama Desa">
                  <Input value={desa.nama} onChange={(e) => setDesa({ ...desa, nama: e.target.value })} />
                </Field>
                <Field label="Luas Wilayah (km²)">
                  <Input type="number" value={desa.luasWilayah ?? ""} onChange={(e) => setDesa({ ...desa, luasWilayah: e.target.value ? parseFloat(e.target.value) : null })} />
                </Field>
                <Field label="Jumlah Penduduk">
                  <Input type="number" value={desa.jumlahPenduduk ?? ""} onChange={(e) => setDesa({ ...desa, jumlahPenduduk: e.target.value ? parseInt(e.target.value) : null })} />
                </Field>
                <Field label="Jumlah KK">
                  <Input type="number" value={desa.jumlahKK ?? ""} onChange={(e) => setDesa({ ...desa, jumlahKK: e.target.value ? parseInt(e.target.value) : null })} />
                </Field>
                <Field label="Jumlah Dusun">
                  <Input type="number" value={desa.jumlahDusun ?? ""} onChange={(e) => setDesa({ ...desa, jumlahDusun: e.target.value ? parseInt(e.target.value) : null })} />
                </Field>
              </div>
            </div>

            <div className="rounded-lg border border-foreground/10 bg-card p-4 sm:p-6">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Batas Wilayah
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Utara">
                  <Input value={desa.batasUtara ?? ""} onChange={(e) => setDesa({ ...desa, batasUtara: e.target.value })} placeholder="Batas utara..." />
                </Field>
                <Field label="Timur">
                  <Input value={desa.batasTimur ?? ""} onChange={(e) => setDesa({ ...desa, batasTimur: e.target.value })} placeholder="Batas timur..." />
                </Field>
                <Field label="Selatan">
                  <Input value={desa.batasSelatan ?? ""} onChange={(e) => setDesa({ ...desa, batasSelatan: e.target.value })} placeholder="Batas selatan..." />
                </Field>
                <Field label="Barat">
                  <Input value={desa.batasBarat ?? ""} onChange={(e) => setDesa({ ...desa, batasBarat: e.target.value })} placeholder="Batas barat..." />
                </Field>
              </div>
            </div>

            <div className="rounded-lg border border-foreground/10 bg-card p-4 sm:p-6">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Visi & Misi
              </h2>
              <div className="flex flex-col gap-4">
                <Field label="Visi">
                  <textarea value={desa.visi} onChange={(e) => setDesa({ ...desa, visi: e.target.value })}
                    rows={3} className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-none" />
                </Field>
                <Field label="Misi">
                  <textarea value={desa.misi} onChange={(e) => setDesa({ ...desa, misi: e.target.value })}
                    rows={4} className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-none" />
                </Field>
              </div>
            </div>

            <div className="rounded-lg border border-foreground/10 bg-card p-4 sm:p-6">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Sejarah
              </h2>
              <Field label="Sejarah Desa">
                <textarea value={desa.sejarah} onChange={(e) => setDesa({ ...desa, sejarah: e.target.value })}
                  rows={6} className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-none" />
              </Field>
            </div>

            <div className="rounded-lg border border-foreground/10 bg-card p-4 sm:p-6">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Foto Kepala Desa
              </h2>
              <ImageUpload value={desa.fotoKepalaDesa ?? ""} onChange={(url) => setDesa({ ...desa, fotoKepalaDesa: url })} folder="portal-berita/kepala-desa" aspectRatio="video" />
            </div>

            <div className="flex justify-end">
              <Button onClick={saveDesa} disabled={saving} size="lg">
                {saving && <Loader2 className="mr-1.5 size-4 animate-spin" />}
                <Save className="mr-1.5 size-4" />
                Simpan Data Desa
              </Button>
            </div>
          </TabsContent>

          {/* ── Tab 2: Perangkat Desa ── */}
          <TabsContent value="perangkat" className="space-y-4">
            {perangkat.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
                <Users className="size-12 opacity-30" />
                <p className="text-sm font-medium">Belum ada data perangkat desa.</p>
                <Button size="sm" onClick={openAddPerangkat}>
                  <Plus className="mr-1.5 size-3.5" /> Tambah Perangkat
                </Button>
              </div>
            ) : (
              <>
                <div className="flex justify-end">
                  <Button size="sm" onClick={openAddPerangkat}>
                    <Plus className="mr-1.5 size-3.5" /> Tambah Perangkat
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {perangkat.map((item) => (
                    <div key={item.id} className="group relative rounded-lg border border-foreground/10 bg-card p-4 transition-colors hover:border-foreground/20">
                      <div className="flex items-center gap-3">
                        <div className="size-14 shrink-0 overflow-hidden rounded-full bg-foreground/5">
                          {item.foto ? (
                            <img src={item.foto} alt={item.nama} className="size-full object-cover" />
                          ) : (
                            <div className="flex size-full items-center justify-center">
                              <Users className="size-6 text-muted-foreground/40" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">{item.nama}</p>
                          <p className="truncate text-xs text-muted-foreground">{item.jabatan}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-end gap-1 border-t border-foreground/5 pt-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button size="icon" variant="ghost" className="size-7" onClick={() => openEditPerangkat(item)}>
                          <Pencil className="size-3" />
                        </Button>
                        <Button size="icon" variant="ghost" className="size-7 text-destructive hover:bg-destructive/10" onClick={() => setConfirmDelete(item.id)}>
                          <Trash2 className="size-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}