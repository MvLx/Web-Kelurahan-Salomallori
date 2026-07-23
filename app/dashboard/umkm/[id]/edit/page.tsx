"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { ArrowLeft, Loader2, Package } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Navbar from "@/components/custom/navbar";
import { ImageUpload } from "@/components/custom/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
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
export default function EditUMKMPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [loadingData, setLoadingData] = useState(true);

  const [namaProduk, setNamaProduk] = useState("");
  const [pemilik, setPemilik] = useState("");
  const [kategori, setKategori] = useState("");
  const [harga, setHarga] = useState("");
  const [kontak, setKontak] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState("");

  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
  const [submitting, setSubmitting] = useState(false);

  // Fetch existing data
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/umkm/${id}`);
        if (!res.ok) {
          toast.error("UMKM tidak ditemukan");
          router.push("/dashboard/umkm");
          return;
        }
        const data = await res.json();
        setNamaProduk(data.namaProduk ?? "");
        setPemilik(data.pemilik ?? "");
        setKategori(data.kategori ?? "");
        setHarga(data.harga ?? "");
        setKontak(data.kontak ?? "");
        setDeskripsi(data.deskripsi ?? "");
        setGambar(data.gambar ?? "");
      } catch {
        toast.error("Gagal memuat data UMKM");
        router.push("/dashboard/umkm");
      } finally {
        setLoadingData(false);
      }
    }
    load();
  }, [id, router]);

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
      const res = await fetch(`/api/umkm/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const json = await res.json();
        toast.error(json.error ?? "Terjadi kesalahan, coba lagi.");
        return;
      }

      toast.success("UMKM berhasil diperbarui");
      router.push("/dashboard/umkm");
    } catch {
      toast.error("Tidak dapat menghubungi server.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar variant="dashboard" />
        <main className="mx-auto max-w-3xl px-4 pt-36 pb-16">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </main>
      </div>
    );
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
                Edit UMKM
              </h1>
              <p className="text-xs text-muted-foreground">
                {namaProduk || "Memuat..."}
              </p>
            </div>
          </div>

          <Button
            form="edit-umkm-form"
            type="submit"
            disabled={submitting}
            size="sm"
          >
            {submitting && (
              <Loader2 className="mr-1.5 size-3.5 animate-spin" />
            )}
            Simpan Perubahan
          </Button>
        </div>
      </div>

      {/* Form */}
      <main className="pt-36 pb-16">
        <form
          id="edit-umkm-form"
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

          {/* Kategori & Harga */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormSection
              label="Kategori"
              htmlFor="kategori"
              error={errors.kategori}
            >
              <Select value={kategori} onValueChange={setKategori}>
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
        </form>
      </main>
    </div>
  );
}