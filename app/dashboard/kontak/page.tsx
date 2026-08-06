"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Save,
  Loader2,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

// ── Type ──
interface KontakData {
  id: string;
  alamat: string;
  telepon: string | null;
  whatsapp: string | null;
  email: string | null;
  jamKerja: string | null;
  mapsEmbed: string | null;
}

const EMPTY_KONTAK: KontakData = {
  id: "",
  alamat: "",
  telepon: "",
  whatsapp: "",
  email: "",
  jamKerja: "",
  mapsEmbed: "",
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
export default function KontakPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [kontak, setKontak] = useState<KontakData>(EMPTY_KONTAK);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/kontak");
      if (res.ok) {
        const data = await res.json();
        setKontak({
          ...EMPTY_KONTAK,
          ...data,
          telepon: data.telepon ?? "",
          whatsapp: data.whatsapp ?? "",
          email: data.email ?? "",
          jamKerja: data.jamKerja ?? "",
          mapsEmbed: data.mapsEmbed ?? "",
        });
      } else {
        toast.error("Gagal memuat data kontak");
      }
    } catch {
      toast.error("Tidak dapat menghubungi server");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function saveKontak() {
    setSaving(true);
    setErrors({});
    try {
      const res = await fetch("/api/kontak", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alamat: kontak.alamat,
          telepon: kontak.telepon || null,
          whatsapp: kontak.whatsapp || null,
          email: kontak.email || null,
          jamKerja: kontak.jamKerja || null,
          mapsEmbed: kontak.mapsEmbed || null,
        }),
      });
      if (res.ok) {
        toast.success("Data kontak berhasil disimpan");
        await loadData();
      } else {
        const json = await res.json();
        if (json.details) {
          setErrors(json.details);
          const messages = Object.entries(json.details as Record<string, string[]>)
            .map(([field, errs]) => `${field}: ${errs.join(", ")}`)
            .join(" | ");
          toast.error(messages || json.error || "Gagal menyimpan");
        } else {
          toast.error(json.error ?? "Gagal menyimpan");
        }
      }
    } catch {
      toast.error("Tidak dapat menghubungi server");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">

        <main className="mx-auto max-w-2xl px-4 pt-24 pb-16">
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


      <main className="mx-auto max-w-2xl px-4 pt-4 pb-16">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h1 className="text-sm font-bold text-foreground">Data Kontak</h1>
          <Button size="sm" onClick={saveKontak} disabled={saving}>
            {saving && <Loader2 className="mr-1.5 size-3.5 animate-spin" />}
            <Save className="mr-1.5 size-3.5" />
            Simpan
          </Button>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">
          Data ini ditampilkan di halaman <strong>Kontak & Aduan</strong> (publik) dan footer website.
        </p>

        <div className="space-y-6">
          {/* Alamat */}
          <div className="rounded-lg border border-foreground/10 bg-card p-4 sm:p-6">
            <h2 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <MapPin className="size-4" /> Alamat Kantor
            </h2>
            <Field label="Alamat Lengkap" error={errors.alamat?.[0]}>
              <textarea
                value={kontak.alamat}
                onChange={(e) => setKontak({ ...kontak, alamat: e.target.value })}
                rows={3}
                placeholder="Kantor Kelurahan Salomallori..."
                className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-none"
              />
            </Field>
          </div>

          {/* Telepon & WhatsApp */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-foreground/10 bg-card p-4 sm:p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <Phone className="size-4" /> Telepon
              </h2>
              <Field label="Nomor Telepon" error={errors.telepon?.[0]}>
                <Input
                  value={kontak.telepon ?? ""}
                  onChange={(e) => setKontak({ ...kontak, telepon: e.target.value })}
                  placeholder="(0421) 123456"
                />
              </Field>
            </div>
            <div className="rounded-lg border border-foreground/10 bg-card p-4 sm:p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <MessageCircle className="size-4" /> WhatsApp
              </h2>
              <Field label="Nomor WhatsApp" error={errors.whatsapp?.[0]}>
                <Input
                  value={kontak.whatsapp ?? ""}
                  onChange={(e) => setKontak({ ...kontak, whatsapp: e.target.value })}
                  placeholder="+62 812-3456-7890"
                />
              </Field>
            </div>
          </div>

          {/* Email & Jam Kerja */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-foreground/10 bg-card p-4 sm:p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <Mail className="size-4" /> Email
              </h2>
              <Field label="Alamat Email" error={errors.email?.[0]}>
                <Input
                  value={kontak.email ?? ""}
                  onChange={(e) => setKontak({ ...kontak, email: e.target.value })}
                  placeholder="kelurahansalomallori@gmail.com"
                />
              </Field>
            </div>
            <div className="rounded-lg border border-foreground/10 bg-card p-4 sm:p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <Clock className="size-4" /> Jam Operasional
              </h2>
              <Field label="Jam Kerja" error={errors.jamKerja?.[0]}>
                <Input
                  value={kontak.jamKerja ?? ""}
                  onChange={(e) => setKontak({ ...kontak, jamKerja: e.target.value })}
                  placeholder="Senin – Jumat: 08.00 – 16.00 WITA"
                />
              </Field>
            </div>
          </div>

          {/* Google Maps */}
          <div className="rounded-lg border border-foreground/10 bg-card p-4 sm:p-6">
            <h2 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <ExternalLink className="size-4" /> Google Maps Embed
            </h2>
            <Field label="Link Embed Google Maps" error={errors.mapsEmbed?.[0]}>
              <textarea
                value={kontak.mapsEmbed ?? ""}
                onChange={(e) => setKontak({ ...kontak, mapsEmbed: e.target.value })}
                rows={3}
                placeholder="https://www.google.com/maps/embed?pb=..."
                className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-none"
              />
            </Field>
            <p className="mt-1 text-xs text-muted-foreground">
              Cara mendapatkan link embed: buka Google Maps → Share → Embed a map → salin URL pada tag {"<iframe>"}.
            </p>
          </div>

          <div className="flex justify-end">
            <Button onClick={saveKontak} disabled={saving} size="lg">
              {saving && <Loader2 className="mr-1.5 size-4 animate-spin" />}
              <Save className="mr-1.5 size-4" />
              Simpan Data Kontak
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}