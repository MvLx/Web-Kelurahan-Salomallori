"use client";

import { useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Loader2, MessageCircle } from "lucide-react";

interface FormState {
  fullName: string;
  email: string;
  phoneNumber: string;
  content: string;
}

export default function AduanPage() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phoneNumber: "",
    content: "",
  });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phoneNumber: form.phoneNumber.trim() || null,
          content: form.content.trim(),
        }),
      });
      if (res.ok) {
        toast.success(
          "Pesan berhasil dikirim! Kami akan segera menghubungi Anda.",
        );
        setForm({ fullName: "", email: "", phoneNumber: "", content: "" });
      } else {
        const json = await res.json();
        toast.error((json.error as string) ?? "Gagal mengirim pesan.");
      }
    } catch {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar variant="public" />

      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Hero Image */}
          <div className="mb-12 overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/kontak.jpg"
              alt="Kantor Kelurahan Salomallori"
              width={1200}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-3 text-4xl font-black leading-tight md:text-5xl font-display">
              Kontak & Lokasi
            </h1>
            <p className="text-xl font-semibold text-secondary">
              Kelurahan Salomallori, Kecamatan Mattiro Bulu, Kabupaten Pinrang
            </p>
          </div>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="rounded-2xl bg-card p-8 shadow-xl border border-sage">
              <h2 className="mb-6 text-2xl font-bold font-display">Informasi Kontak</h2>
              <div className="space-y-6">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">Alamat Kantor</h3>
                    <p className="leading-relaxed text-muted-foreground">
                      Kantor Kelurahan Salomallori<br />
                      Kecamatan Mattiro Bulu, Kabupaten Pinrang<br />
                      Sulawesi Selatan
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
                    <a
                      href="tel:+6281234567890"
                      className="text-muted-foreground transition-colors hover:text-secondary"
                    >
                      (0421) 123456
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                    <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">WhatsApp</h3>
                    <a
                      href="https://wa.me/6281234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-green-600 dark:hover:text-green-400"
                    >
                      <MessageCircle className="h-4 w-4" />
                      +62 812-3456-7890
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <Mail className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">Email Resmi</h3>
                    <a
                      href="mailto:kelurahansalomallori@gmail.com"
                      className="text-muted-foreground transition-colors hover:text-secondary"
                    >
                      kelurahansalomallori@gmail.com
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">Jam Operasional</h3>
                    <p className="leading-relaxed text-muted-foreground">
                      Senin – Jumat: 08.00 – 16.00 WITA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl bg-card p-8 shadow-xl border border-sage">
              <h2 className="mb-6 text-2xl font-bold font-display">Kirim Pesan</h2>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-muted-foreground"
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
                    onChange={(e) =>
                      setForm((f) => ({ ...f, fullName: e.target.value }))
                    }
                    className="w-full rounded-xs border border-input bg-background px-4 py-3 text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary/10"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-muted-foreground"
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
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="w-full rounded-xs border border-input bg-background px-4 py-3 text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary/10"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-muted-foreground"
                  >
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="08xx xxxx xxxx"
                    value={form.phoneNumber}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phoneNumber: e.target.value }))
                    }
                    className="w-full rounded-xs border border-input bg-background px-4 py-3 text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary/10"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-muted-foreground"
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
                    onChange={(e) =>
                      setForm((f) => ({ ...f, content: e.target.value }))
                    }
                    className="w-full resize-none rounded-xs border border-input bg-background px-4 py-3 text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary/10"
                  />
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
          </div>

          {/* Map */}
          <div className="mt-8 overflow-hidden rounded-2xl shadow-lg border border-sage">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15899.234567!2d119.6!3d-3.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNTQnMDAuMCJTIDExOcKwMzYnMDAuMCJF!5e1!3m2!1sid!2sid!4v1"
              className="w-full"
              style={{ height: "clamp(300px, 41.67vw, 500px)", border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Kelurahan Salomallori"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}