"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { NavbarBeranda } from "@/components/custom/navbar-beranda";
import Footer from "@/components/custom/footer";
import { Reveal } from "@/components/stitch/reveal";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Loader2, MessageCircle } from "lucide-react";
import { createMessageSchema } from "@/lib/schemas/message";

interface FormState {
  fullName: string;
  email: string;
  phoneNumber: string;
  content: string;
}

type FieldErrors = Partial<Record<keyof FormState, string>>;

interface KontakData {
  id: string;
  alamat: string;
  telepon: string | null;
  whatsapp: string | null;
  email: string | null;
  jamKerja: string | null;
  mapsEmbed: string | null;
  fotoKantor: string | null;
}

// Data placeholder — akan ditimpa dari API /api/kontak setelah load
const defaultKontak: KontakData = {
  id: "default",
  alamat: "Kantor Kelurahan Salomallori\nKecamatan Dua Pitue, Kabupaten Sidenreng Rappang\nSulawesi Selatan",
  telepon: "(0421) 123456",
  whatsapp: "+62 812-3456-7890",
  email: "kelurahansalomallori@gmail.com",
  jamKerja: "Senin – Jumat: 08.00 – 16.00 WITA",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15899.234567!2d119.6!3d-3.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNTQnMDAuMCJTIDExOcKwMzYnMDAuMCJF!5e1!3m2!1sid!2sid!4v1",
  fotoKantor: null,
};

// Kelola format WA: terima "+62 812-3456-7890", "081234567890", dst → "6281234567890"
function waLink(wa: string | null): string {
  if (!wa) return "https://wa.me/";
  const digits = wa.replace(/[^\d]/g, "");
  const normalized = digits.startsWith("0") ? "62" + digits.slice(1) : digits.replace(/^\+/, "");
  return "https://wa.me/" + normalized;
}

function telLink(telp: string | null): string {
  if (!telp) return "#";
  return "tel:" + telp.replace(/[^\d+]/g, "");
}

export default function AduanPage() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phoneNumber: "",
    content: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [kontak, setKontak] = useState<KontakData>(defaultKontak);

  // Ambil data kontak dari API (fallback ke defaultKontak jika gagal)
  useEffect(() => {
    let canceled = false;
    fetch("/api/kontak")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: KontakData | null) => {
        if (!canceled && data) setKontak(data);
      })
      .catch(() => {
        // Abaikan — tetap pakai defaultKontak
      });
    return () => {
      canceled = true;
    };
  }, []);

  function validateClient(data: FormState): FieldErrors {
    const errors: FieldErrors = {};
    const result = createMessageSchema.safeParse(data);
    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (key && !errors[key]) {
          errors[key] = issue.message;
        }
      }
    }
    return errors;
  }

  function handleFieldChange(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    // Hapus error field saat user mulai mengetik ulang
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed: FormState = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phoneNumber: form.phoneNumber.trim(),
      content: form.content.trim(),
    };

    // Validasi client-side terlebih dahulu
    const clientErrors = validateClient(trimmed);
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      const firstError = Object.values(clientErrors)[0];
      toast.error(firstError ?? "Periksa kembali isian Anda.");
      return;
    }

    const payload = {
      ...trimmed,
      phoneNumber: trimmed.phoneNumber || null,
    };

    setSubmitting(true);
    setFieldErrors({});
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success(
          "Pesan berhasil dikirim! Kami akan segera menghubungi Anda.",
        );
        setForm({ fullName: "", email: "", phoneNumber: "", content: "" });
      } else {
        const json = await res.json();
        // Tampilkan detail error per field jika ada
        if (json.details) {
          const serverErrors: FieldErrors = {};
          for (const [key, messages] of Object.entries(json.details)) {
            const field = key as keyof FormState;
            if (field in trimmed && Array.isArray(messages) && messages.length > 0) {
              serverErrors[field] = messages[0] as string;
            }
          }
          setFieldErrors(serverErrors);
          const firstServerError = Object.values(serverErrors)[0];
          toast.error(
            firstServerError ?? (json.error as string) ?? "Gagal mengirim pesan.",
          );
        } else {
          toast.error((json.error as string) ?? "Gagal mengirim pesan.");
        }
      }
    } catch {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xs border bg-background px-4 py-3 text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:ring-1 dark:border-[#32735f]/30 dark:bg-[#1a1d1e] ${
      hasError
        ? "border-destructive focus:border-destructive focus:ring-destructive/20"
        : "border-input focus:border-primary focus:ring-primary/10"
    }`;

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-[#111415] dark:text-[#e1e3e0]">
      <NavbarBeranda />

      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Hero Image */}
          <Reveal>
          <div className="mb-12 overflow-hidden rounded-2xl shadow-2xl">
            {kontak.fotoKantor ? (
              <Image
                src={kontak.fotoKantor}
                alt="Kantor Kelurahan Salomallori"
                width={1200}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
            ) : (
              <Image
                src="/kontak.jpg"
                alt="Kantor Kelurahan Salomallori"
                width={1200}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
            )}
          </div>
          </Reveal>

          {/* Header */}
          <Reveal delay={80}>
          <div className="mb-12 text-center">
            <h1 className="mb-3 text-4xl font-black leading-tight md:text-5xl font-display dark:text-white">
              Kontak & Lokasi
            </h1>
            <p className="text-xl font-semibold text-secondary">
              Kelurahan Salomallori, Kecamatan Dua Pitue, Kabupaten Sidenreng Rappang
            </p>
          </div>
          </Reveal>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact Info */}
            <Reveal delay={120}>
            <div className="rounded-2xl bg-card p-8 shadow-xl border border-sage dark:border-[#32735f]/30 dark:bg-[#171a1b]">
              <h2 className="mb-6 text-2xl font-bold font-display">Informasi Kontak</h2>
              <div className="space-y-6">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">Alamat Kantor</h3>
                    <p className="leading-relaxed text-muted-foreground whitespace-pre-line dark:text-[#b0b4b5]">
                      {kontak.alamat}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <Phone className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">Nomor Telepon</h3>
                    {kontak.telepon ? (
                      <a
                        href={telLink(kontak.telepon)}
                        className="text-muted-foreground transition-colors hover:text-secondary dark:text-[#b0b4b5]"
                      >
                        {kontak.telepon}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">-</p>
                    )}
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                    <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">WhatsApp</h3>
                    {kontak.whatsapp ? (
                      <a
                        href={waLink(kontak.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-green-600 dark:hover:text-green-400 dark:text-[#b0b4b5]"
                      >
                        <MessageCircle className="h-4 w-4" />
                        {kontak.whatsapp}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">-</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <Mail className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">Email Resmi</h3>
                    {kontak.email ? (
                      <a
                        href={`mailto:${kontak.email}`}
                        className="text-muted-foreground transition-colors hover:text-secondary dark:text-[#b0b4b5]"
                      >
                        {kontak.email}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">-</p>
                    )}
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">Jam Operasional</h3>
                    {kontak.jamKerja ? (
                      <p className="leading-relaxed text-muted-foreground whitespace-pre-line dark:text-[#b0b4b5]">
                        {kontak.jamKerja}
                      </p>
                    ) : (
                      <p className="text-muted-foreground">-</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            </Reveal>

            {/* Contact Form */}
            <Reveal delay={160}>
            <div className="rounded-2xl bg-card p-8 shadow-xl border border-sage dark:border-[#32735f]/30 dark:bg-[#171a1b]">
              <h2 className="mb-6 text-2xl font-bold font-display">Kirim Pesan</h2>
              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-muted-foreground dark:text-[#b0b4b5]"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Masukkan nama lengkap Anda"
                    required
                    value={form.fullName}
                    onChange={(e) => handleFieldChange("fullName", e.target.value)}
                    className={inputClass(!!fieldErrors.fullName)}
                  />
                  {fieldErrors.fullName && (
                    <p className="mt-1 text-sm text-destructive">{fieldErrors.fullName}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-muted-foreground dark:text-[#b0b4b5]"
                  >
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="contoh@email.com"
                    required
                    value={form.email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    className={inputClass(!!fieldErrors.email)}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1 text-sm text-destructive">{fieldErrors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-muted-foreground dark:text-[#b0b4b5]"
                  >
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="08xx xxxx xxxx"
                    value={form.phoneNumber}
                    onChange={(e) => handleFieldChange("phoneNumber", e.target.value)}
                    className={inputClass(!!fieldErrors.phoneNumber)}
                  />
                  {fieldErrors.phoneNumber && (
                    <p className="mt-1 text-sm text-destructive">{fieldErrors.phoneNumber}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-muted-foreground dark:text-[#b0b4b5]"
                  >
                    Pesan Anda
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tulis pesan Anda di sini..."
                    required
                    value={form.content}
                    onChange={(e) => handleFieldChange("content", e.target.value)}
                    className={inputClass(!!fieldErrors.content)}
                  />
                  {fieldErrors.content && (
                    <p className="mt-1 text-sm text-destructive">{fieldErrors.content}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xs bg-primary px-6 py-4 font-bold text-primary-foreground transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting && <Loader2 className="size-4 animate-spin" />}
                  {submitting ? "Mengirim..." : "Kirim Pesan"}
                </button>
              </form>
            </div>
            </Reveal>
          </div>

          {/* Map */}
          <Reveal delay={200}>
          <div className="mt-8 overflow-hidden rounded-2xl shadow-lg border border-sage dark:border-[#32735f]/30">
            <iframe
              src={kontak.mapsEmbed ?? defaultKontak.mapsEmbed ?? ""}
              className="w-full"
              style={{ height: "clamp(300px, 41.67vw, 500px)", border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Kelurahan Salomallori"
            />
          </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}