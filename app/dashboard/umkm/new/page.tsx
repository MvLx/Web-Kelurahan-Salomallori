"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { ArrowLeft, Loader2, Package } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Navbar from "@/components/custom/navbar";
import { ImageUpload } from "@/components/custom/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUMKMSchema } from "@/lib/schemas/umkm";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ── Form section wrapper ──────────────────────────────────────────────────────
function FormSection({
  label,
  htmlFor,
  error,
  children,
  hint,
}: {
  label: string;
  htmlFor?: string;
  error?: string[];
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor} className="text-sm font-semibold">
        {label}
      </Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {children}
      {error?.map((e) => (
        <p key={e} className="text-xs text-destructive">
          {e}
        </p>
      ))}
    </div>
  );
}

const KATEGORI_OPTIONS = [
  "Kuliner",
  "Fashion",
  "Kerajinan",
  "Jasa",
  "Teknologi",
  "Lainnya",
];

// ── Main page ─────────────────────────────────────────────────────────────────
export default function CreateUMKMPage() {
  const router = useRouter();

  const [namaProduk, setNamaProduk] = useState("");
  const [pemilik, setPemilik] = useState("");
  const [kategori, setKategori] = useState("");
  const [harga, setHarga] = useState("");
  const [kontak, setKontak] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState("");

  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = createUMKMSchema.safeParse({
      namaProduk,
      pemilik,
      kategori,
      harga: harga || null,
      kontak,
      deskripsi,
      gambar: gambar || null,
    });

    if (!parsed.success) {
      setErrors(z.flattenError(parsed.error).fieldErrors);
      return;
    }
    setErrors({});

    setSubmitting(true);
    try {
      const res = await fetch("/api/umkm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const json = await res.json();
        toast.error(json.error ?? "Terjadi kesalahan, coba lagi.");
        return;
      }

      toast.success("UMKM berhasil ditambahkan");
      router.push("/dashboard/umkm");
    } catch {
      toast.error("Tidak dapat menghubungi server.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="dashboard" />

      {/* Sticky top bar */}
      <div className="fixed left-0 right-0 top-16 z-40 border-b border-foreground/10 bg-card/80 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="icon" className="shrink-0">
              <Link href="/dashboard/umkm">
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-sm font-bold text-foreground">
                Tambah UMKM Baru
              </h1>
              <p className="text-xs text-muted-foreground">
                Isi semua kolom yang diperlukan
              </p>
            </div>
          </div>

          <Button
            form="create-umkm-form"
            type="submit"
            disabled={submitting}
            size="sm"
          >
            {submitting && (
              <Loader2 className="mr-1.5 size-3.5 animate-spin" />
            )}
            Simpan
          </Button>
        </div>
      </div>

      {/* Form */}
      <main className="pt-36 pb-16">
        <form
          id="create-umkm-form"
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-3xl flex-col gap-6 px-4"
        >
          {/* Gambar */}
          <FormSection label="Gambar Produk" error={errors.gambar}>
            <ImageUpload
              value={gambar}
              onChange={setGambar}
              folder="portal-berita/umkm"
              aspectRatio="square"
              disabled={submitting}
            />
          </FormSection>

          {/* Nama Produk */}
          <FormSection
            label="Nama Produk"
            htmlFor="namaProduk"
            error={errors.namaProduk}
          >
            <Input
              id="namaProduk"
              placeholder="Masukkan nama produk..."
              value={namaProduk}
              onChange={(e) => setNamaProduk(e.target.value)}
              className={cn("text-base", errors.namaProduk && "border-destructive")}
            />
          </FormSection>

          {/* Pemilik */}
          <FormSection
            label="Nama Pemilik"
            htmlFor="pemilik"
            error={errors.pemilik}
          >
            <Input
              id="pemilik"
              placeholder="Nama pemilik UMKM..."
              value={pemilik}
              onChange={(e) => setPemilik(e.target.value)}
              className={cn("text-base", errors.pemilik && "border-destructive")}
            />
          </FormSection>

          {/* Kategori */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormSection
              label="Kategori"
              htmlFor="kategori"
              error={errors.kategori}
            >
              <Select
                value={kategori}
                onValueChange={setKategori}
              >
                <SelectTrigger
                  id="kategori"
                  className={cn(errors.kategori && "border-destructive")}
                >
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {KATEGORI_OPTIONS.map((k) => (
                    <SelectItem key={k} value={k}>
                      {k}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormSection>

            {/* Harga */}
            <FormSection
              label="Harga (opsional)"
              htmlFor="harga"
              error={errors.harga}
            >
              <Input
                id="harga"
                placeholder="Contoh: Rp 50.000"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                className={cn("text-base", errors.harga && "border-destructive")}
              />
            </FormSection>
          </div>

          {/* Kontak */}
          <FormSection
            label="Kontak"
            htmlFor="kontak"
            error={errors.kontak}
            hint="Nomor telepon atau WhatsApp"
          >
            <Input
              id="kontak"
              placeholder="Contoh: 0812-3456-7890"
              value={kontak}
              onChange={(e) => setKontak(e.target.value)}
              className={cn("text-base", errors.kontak && "border-destructive")}
            />
          </FormSection>

          {/* Deskripsi */}
          <FormSection
            label="Deskripsi"
            htmlFor="deskripsi"
            error={errors.deskripsi}
          >
            <textarea
              id="deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Tulis deskripsi produk UMKM..."
              rows={5}
              className={cn(
                "border-input bg-background w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow]",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "resize-none placeholder:text-muted-foreground",
                errors.deskripsi && "border-destructive",
              )}
            />
            <p className="text-right text-xs text-muted-foreground">
              {deskripsi.length} karakter
            </p>
          </FormSection>

          {/* Preview card */}
          {namaProduk && (
            <div className="rounded-lg border border-foreground/10 bg-muted/30 p-4">
              <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Pratinjau
              </p>
              <div className="flex items-center gap-3">
                {gambar ? (
                  <img
                    src={gambar}
                    alt={namaProduk}
                    className="size-14 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex size-14 items-center justify-center rounded-lg bg-foreground/5 text-muted-foreground">
                    <Package className="size-6" />
                  </div>
                )}
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-sm font-medium text-foreground">
                    {namaProduk}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {pemilik} &middot; {kategori || "Belum pilih kategori"}
                  </span>
                  {harga && (
                    <span className="text-xs font-semibold text-foreground">
                      {harga}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}