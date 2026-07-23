"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { ArrowLeft, Loader2, MapPin } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Navbar from "@/components/custom/navbar";
import { ImageUpload } from "@/components/custom/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createWisataSchema } from "@/lib/schemas/wisata";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function FormSection({ label, htmlFor, error, children, hint }: {
  label: string; htmlFor?: string; error?: string[]; children: React.ReactNode; hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor} className="text-sm font-semibold">{label}</Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {children}
      {error?.map((e) => <p key={e} className="text-xs text-destructive">{e}</p>)}
    </div>
  );
}

const KATEGORI_OPTIONS = [
  { value: "WISATA_ALAM", label: "Wisata Alam" },
  { value: "KULINER", label: "Kuliner" },
  { value: "BUDAYA", label: "Budaya" },
];

export default function CreateWisataPage() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [kategori, setKategori] = useState("");
  const [gambar, setGambar] = useState("");
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = createWisataSchema.safeParse({
      nama, deskripsi, lokasi,
      kategori: kategori || undefined,
      gambar: gambar || null,
    });
    if (!parsed.success) {
      setErrors(z.flattenError(parsed.error).fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/wisata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const json = await res.json();
        toast.error(json.error ?? "Terjadi kesalahan, coba lagi.");
        return;
      }
      toast.success("Wisata berhasil ditambahkan");
      router.push("/dashboard/wisata");
    } catch {
      toast.error("Tidak dapat menghubungi server.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="dashboard" />
      <div className="fixed left-0 right-0 top-16 z-40 border-b border-foreground/10 bg-card/80 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="icon" className="shrink-0">
              <Link href="/dashboard/wisata"><ArrowLeft className="size-4" /></Link>
            </Button>
            <div>
              <h1 className="text-sm font-bold text-foreground">Tambah Wisata Baru</h1>
              <p className="text-xs text-muted-foreground">Isi semua kolom yang diperlukan</p>
            </div>
          </div>
          <Button form="create-wisata-form" type="submit" disabled={submitting} size="sm">
            {submitting && <Loader2 className="mr-1.5 size-3.5 animate-spin" />}
            Simpan
          </Button>
        </div>
      </div>

      <main className="pt-36 pb-16">
        <form id="create-wisata-form" onSubmit={handleSubmit} className="mx-auto flex max-w-3xl flex-col gap-6 px-4">
          <FormSection label="Gambar" error={errors.gambar}>
            <ImageUpload value={gambar} onChange={setGambar} folder="portal-berita/wisata" aspectRatio="video" disabled={submitting} />
          </FormSection>

          <FormSection label="Nama Wisata" htmlFor="nama" error={errors.nama}>
            <Input id="nama" placeholder="Masukkan nama wisata..." value={nama} onChange={(e) => setNama(e.target.value)}
              className={cn("text-base", errors.nama && "border-destructive")} />
          </FormSection>

          <FormSection label="Kategori" htmlFor="kategori" error={errors.kategori}>
            <Select value={kategori} onValueChange={setKategori}>
              <SelectTrigger id="kategori" className={cn(errors.kategori && "border-destructive")}>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {KATEGORI_OPTIONS.map((k) => (
                  <SelectItem key={k.value} value={k.value}>{k.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormSection>

          <FormSection label="Lokasi" htmlFor="lokasi" error={errors.lokasi}>
            <Input id="lokasi" placeholder="Alamat lokasi wisata..." value={lokasi} onChange={(e) => setLokasi(e.target.value)}
              className={cn("text-base", errors.lokasi && "border-destructive")} />
          </FormSection>

          <FormSection label="Deskripsi" htmlFor="deskripsi" error={errors.deskripsi}>
            <textarea id="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Tulis deskripsi wisata..."
              rows={5}
              className={cn("border-input bg-background w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow]",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "resize-none placeholder:text-muted-foreground", errors.deskripsi && "border-destructive")} />
            <p className="text-right text-xs text-muted-foreground">{deskripsi.length} karakter</p>
          </FormSection>

          {nama && (
            <div className="rounded-lg border border-foreground/10 bg-muted/30 p-4">
              <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Pratinjau</p>
              <div className="flex items-center gap-3">
                {gambar ? <img src={gambar} alt={nama} className="size-14 rounded-lg object-cover" />
                  : <div className="flex size-14 items-center justify-center rounded-lg bg-foreground/5 text-muted-foreground"><MapPin className="size-6" /></div>}
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-sm font-medium text-foreground">{nama}</span>
                  <span className="text-xs text-muted-foreground">{lokasi || "Belum diisi"}</span>
                </div>
              </div>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}