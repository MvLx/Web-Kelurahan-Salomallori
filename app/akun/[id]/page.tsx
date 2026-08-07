"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock,
  Edit2,
  FileText,
  Loader2,
  Mail,
  Save,
  Shield,
  UserRound,
  X,
  AlertCircle,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { NavbarBeranda } from "@/components/custom/navbar-beranda";
import Footer from "@/components/custom/footer";
import { Reveal } from "@/components/stitch/reveal";
import { getInitials } from "@/utils/string";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ProfileData {
  id: string;
  name: string;
  image: string | null;
  role: "USER" | "EDITOR" | "ADMIN";
  createdAt: string;
  postCount: number;
  // only present for own profile
  email: string | null;
  emailVerified: boolean | null;
  providers: string[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Administrator",
  EDITOR: "Editor",
  USER: "Pengguna",
};

const ROLE_STYLES: Record<string, string> = {
  ADMIN: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  EDITOR: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  USER: "bg-foreground/10 text-foreground/60 dark:bg-[#373a3b]/50 dark:text-[#b0b4b5]",
};

const PROVIDER_LABELS: Record<string, string> = {
  google: "Google",
  github: "GitHub",
  credential: "Email & Password",
};

const PROVIDER_ICONS: Record<string, React.ReactNode> = {
  google: <FcGoogle className="size-5 shrink-0" />,
  github: <FaGithub className="size-5 shrink-0" />,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Profile Page ─────────────────────────────────────────────────────────────

export default function ProfilPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session, isPending: sessionLoading } = authClient.useSession();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  // start loading=true so the spinner shows immediately on mount
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  // track which id was last fetched to avoid stale closure issues
  const lastFetchedId = useRef<string | null>(null);

  // Edit state
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Avatar upload state
  const [avatarUploading, setAvatarUploading] = useState(false);

  const isOwner = !sessionLoading && session?.user?.id === id;

  // ── Fetch profile ────────────────────────────────────────────────────────

  useEffect(() => {
    if (!id) return;
    // Skip if already fetched for this id
    if (lastFetchedId.current === id) return;
    lastFetchedId.current = id;
    setLoading(true);
    setNotFound(false);

    fetch(`/api/profile/${id}`)
      .then(async (res) => {
        if (res.status === 404) {
          setNotFound(true);
          return;
        }
        if (!res.ok) {
          const errorText = await res.text();
          console.error(`Profile fetch error (${res.status}):`, errorText);
          setNotFound(true);
          return;
        }
        const data: ProfileData = await res.json();
        setProfile(data);
        setNameInput(data.name);
      })
      .catch((err) => {
        console.error("Profile fetch exception:", err);
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // focus input when entering edit mode
  useEffect(() => {
    if (editing) setTimeout(() => nameRef.current?.focus(), 50);
  }, [editing]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  async function handleAvatarFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    if (!profile) return;
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarUploading(true);

    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "portal-berita/avatars");

      const uploadRes = await fetch("/api/upload", { method: "POST", body });
      const uploadJson = (await uploadRes.json()) as {
        url?: string;
        error?: string;
      };

      if (!uploadRes.ok) {
        toast.error(uploadJson.error ?? "Gagal mengunggah gambar.");
        return;
      }

      const newImageUrl = uploadJson.url ?? "";

      // Persist to database
      const patchRes = await fetch(`/api/profile/${profile.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: newImageUrl }),
      });

      if (!patchRes.ok) {
        const err = (await patchRes.json()) as { error?: string };
        toast.error(err.error ?? "Gagal menyimpan gambar.");
        return;
      }

      // Keep better-auth session image in sync
      try {
        await authClient.updateUser({ image: newImageUrl });
      } catch (syncErr) {
        // Non-critical: better-auth may fail if session just expired
        console.warn("Failed to sync avatar with better-auth session:", syncErr);
      }

      setProfile((prev) => (prev ? { ...prev, image: newImageUrl } : prev));
      toast.success("Foto profil berhasil diperbarui.");
    } catch {
      toast.error("Tidak dapat menghubungi server.");
    } finally {
      setAvatarUploading(false);
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    }
  }

  function handleCancelEdit() {
    setEditing(false);
    setNameInput(profile?.name ?? "");
    setSaveError(null);
  }

  async function handleSave() {
    if (!profile) return;
    const trimmed = nameInput.trim();
    if (trimmed.length < 2) {
      setSaveError("Nama minimal 2 karakter.");
      return;
    }
    setSaving(true);
    setSaveError(null);

    // Use better-auth's built-in updateUser to keep session in sync
    let betterAuthError: string | undefined;
    try {
      const updateResult = await authClient.updateUser({ name: trimmed });
      if (updateResult.error) {
        betterAuthError = String(updateResult.error?.message ?? updateResult.error);
      }
    } catch (syncErr) {
      console.warn("Failed to sync name with better-auth session:", syncErr);
      // Continue anyway — we'll still update via our own API
    }

    if (betterAuthError) {
      // Don't block — try the direct API update as fallback
      console.warn("better-auth updateUser error (non-fatal):", betterAuthError);
    }

    // Also hit our own API to be consistent
    const res = await fetch(`/api/profile/${profile.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: trimmed }),
    });

    if (!res.ok) {
      const err = await res.json();
      setSaveError(err.error ?? "Gagal menyimpan perubahan.");
      setSaving(false);
      return;
    }

    const updated: Pick<ProfileData, "name"> = await res.json();
    setProfile((prev) => (prev ? { ...prev, name: updated.name } : prev));
    setEditing(false);
    toast.success("Profil berhasil diperbarui.");
    setSaving(false);
  }

  // ── Render ────────────────────────────────────────────────────────────────

  if (loading || sessionLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground dark:bg-[#111415] dark:text-[#e1e3e0]">
        <NavbarBeranda />
        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="size-10 animate-spin rounded-full border-4 border-foreground/20 border-t-foreground dark:border-[#373a3b] dark:border-t-[#84bd3a]" />
            <p className="text-sm text-foreground/50 dark:text-[#b0b4b5]">
              Memuat profil…
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen bg-background text-foreground dark:bg-[#111415] dark:text-[#e1e3e0]">
        <NavbarBeranda />
        <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 text-center">
          <AlertCircle className="size-12 text-foreground/40 dark:text-[#b0b4b5]/50" />
          <h2 className="text-2xl font-bold text-foreground/70 dark:text-white">
            Pengguna tidak ditemukan
          </h2>
          <p className="text-sm text-foreground/50 dark:text-[#b0b4b5]">
            Profil yang kamu cari tidak ada atau sudah dihapus.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-[#111415] dark:text-[#e1e3e0]">
      <NavbarBeranda />

      {/* Hidden file input for avatar upload */}
      {isOwner && (
        <input
          ref={avatarInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          className="hidden"
          onChange={handleAvatarFileChange}
          disabled={avatarUploading}
        />
      )}

      <main className="mx-auto max-w-3xl px-4 pt-24 pb-16 md:px-8">
        {/* ── Header ── */}
        <Reveal>
          <header className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary dark:border-[#32735f]/40 dark:bg-[#32735f]/10 dark:text-[#32735f]">
              <UserRound className="h-3.5 w-3.5" />
              Profil Pengguna
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl dark:text-white">
              {isOwner ? "Akun Saya" : "Profil Pengguna"}
            </h1>
            <p className="mt-3 text-base font-semibold uppercase tracking-widest text-primary dark:text-[#84bd3a]">
              Kelurahan Salomallori
            </p>
            <div className="mx-auto mt-6 flex items-center gap-3 text-primary dark:text-[#84bd3a]">
              <span className="h-px w-16 bg-primary/30 dark:bg-[#84bd3a]/30" />
              <span className="h-2 w-2 rotate-45 bg-primary dark:bg-[#84bd3a]" />
              <span className="h-px w-16 bg-primary/30 dark:bg-[#84bd3a]/30" />
            </div>
          </header>
        </Reveal>

        {/* ── Hero / Avatar Section ── */}
        <Reveal delay={100}>
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            {/* Avatar with coming-soon overlay for owners */}
            <div className="group relative">
              <Avatar className="size-32 ring-4 ring-[#84bd3a]/30 shadow-lg dark:ring-[#32735f]/40">
                <AvatarImage
                  src={profile.image ?? undefined}
                  alt={profile.name}
                />
                <AvatarFallback className="bg-primary/10 text-3xl font-bold text-primary dark:bg-[#32735f]/20 dark:text-[#84bd3a]">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>

              {isOwner && (
                <button
                  type="button"
                  title="Ganti foto profil"
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={avatarUploading}
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 disabled:cursor-not-allowed dark:bg-black/60"
                >
                  {avatarUploading ? (
                    <Loader2 className="size-5 animate-spin text-background" />
                  ) : (
                    <Camera className="size-5 text-background" />
                  )}
                  <span className="mt-1 text-[10px] font-semibold text-background/90">
                    {avatarUploading ? "Mengunggah…" : "Ubah Foto"}
                  </span>
                </button>
              )}
            </div>

            {/* Name */}
            <div className="flex flex-col items-center gap-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground dark:text-white">
                {profile.name}
              </h2>

              {/* Role badge */}
              <span
                className={cn(
                  "mt-1 rounded-full px-3 py-0.5 text-xs font-semibold",
                  ROLE_STYLES[profile.role],
                )}
              >
                <Shield className="mr-1 inline-block size-3" />
                {ROLE_LABELS[profile.role] ?? profile.role}
              </span>
            </div>

            {/* Stats row */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-6 text-sm text-foreground/50 dark:text-[#b0b4b5]">
              <span className="flex items-center gap-1.5">
                <FileText className="size-4" />
                {profile.postCount} postingan
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                Bergabung {formatDate(profile.createdAt)}
              </span>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6">
          {/* ── Profile Info Card ──────────────────────────────────────────── */}
          <Reveal delay={150}>
            <section className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border md:p-10 dark:bg-[#191c1d] dark:shadow-black/20 dark:ring-[#373a3b]">
              <div className="mb-6 flex items-center justify-between border-b border-border pb-4 dark:border-[#373a3b]">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight dark:text-white">
                    Informasi Profil
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground dark:text-[#b0b4b5]">
                    {isOwner
                      ? "Kelola informasi akun Anda."
                      : "Informasi publik pengguna ini."}
                  </p>
                </div>
                {isOwner && !editing && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditing(true)}
                    className="gap-1.5"
                  >
                    <Edit2 className="size-3.5" />
                    Edit
                  </Button>
                )}
              </div>

              <div className="grid gap-5">
                {/* Name field */}
                <div className="grid gap-1.5">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  {editing ? (
                    <div className="flex gap-2">
                      <Input
                        id="name"
                        ref={nameRef}
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSave();
                          if (e.key === "Escape") handleCancelEdit();
                        }}
                        placeholder="Nama lengkap"
                        aria-invalid={!!saveError}
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        onClick={handleSave}
                        disabled={saving}
                        className="gap-1.5"
                      >
                        {saving ? (
                          <span className="size-3.5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        ) : (
                          <Save className="size-3.5" />
                        )}
                        Simpan
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCancelEdit}
                        disabled={saving}
                      >
                        <X className="size-3.5" />
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm font-medium text-foreground dark:text-white">
                      {profile.name}
                    </p>
                  )}
                  {saveError && (
                    <p className="text-xs text-red-500">{saveError}</p>
                  )}
                </div>

                {/* Email (owner only) */}
                {isOwner && profile.email && (
                  <>
                    <Separator className="dark:bg-[#373a3b]" />
                    <div className="grid gap-1.5">
                      <Label className="flex items-center gap-1.5">
                        <Mail className="size-3.5 text-foreground/40 dark:text-[#b0b4b5]/60" />
                        Email
                      </Label>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-foreground dark:text-white">
                          {profile.email}
                        </p>
                        {profile.emailVerified ? (
                          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary dark:bg-[#32735f]/20 dark:text-[#84bd3a]">
                            <CheckCircle2 className="size-3" />
                            Terverifikasi
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                            <Clock className="size-3" />
                            Belum terverifikasi
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </section>
          </Reveal>

          {/* ── Linked Accounts Card (owner only) ───────────────────────── */}
          {isOwner && profile.providers.length > 0 && (
            <Reveal delay={200}>
              <section className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border md:p-10 dark:bg-[#191c1d] dark:shadow-black/20 dark:ring-[#373a3b]">
                <div className="mb-6 border-b border-border pb-4 dark:border-[#373a3b]">
                  <h3 className="text-2xl font-bold tracking-tight dark:text-white">
                    Metode Login
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground dark:text-[#b0b4b5]">
                    Akun yang terhubung dengan profil Anda.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  {profile.providers.map((provider) => (
                    <div
                      key={provider}
                      className="flex items-center gap-3 rounded-lg border bg-foreground/5 px-4 py-3 dark:border-[#373a3b] dark:bg-[#111411]/60"
                    >
                      {PROVIDER_ICONS[provider] ?? (
                        <div className="size-5 rounded-full bg-foreground/20 dark:bg-[#b0b4b5]/30" />
                      )}
                      <span className="text-sm font-medium text-foreground dark:text-white">
                        {PROVIDER_LABELS[provider] ?? provider}
                      </span>
                      <span className="ml-auto flex items-center gap-1 text-xs text-primary dark:text-[#84bd3a]">
                        <CheckCircle2 className="size-3.5" />
                        Terhubung
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>
          )}

          {/* ── Recent Activity Placeholder ─────────────────────────────── */}
          <Reveal delay={250}>
            <section className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border md:p-10 dark:bg-[#191c1d] dark:shadow-black/20 dark:ring-[#373a3b]">
              <div className="mb-6 border-b border-border pb-4 dark:border-[#373a3b]">
                <h3 className="text-2xl font-bold tracking-tight dark:text-white">
                  Statistik
                </h3>
                <p className="mt-1 text-sm text-muted-foreground dark:text-[#b0b4b5]">
                  Ringkasan aktivitas pengguna.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 pt-1 sm:grid-cols-3">
                <StatBox
                  label="Total Postingan"
                  value={profile.postCount}
                  icon={<FileText className="size-5 text-[#84bd3a]" />}
                />
                <StatBox
                  label="Peran"
                  value={ROLE_LABELS[profile.role] ?? profile.role}
                  icon={<Shield className="size-5 text-[#32735f]" />}
                />
                <StatBox
                  label="Bergabung"
                  value={formatDate(profile.createdAt)}
                  icon={<CalendarDays className="size-5 text-[#febe0d]" />}
                />
              </div>
            </section>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// ─── StatBox helper ───────────────────────────────────────────────────────────
function StatBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border bg-card p-4 shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/30 dark:border-[#373a3b] dark:bg-[#111411]/60 dark:hover:ring-[#32735f]/60">
      {icon}
      <p className="text-lg font-bold text-foreground dark:text-white">{value}</p>
      <p className="text-xs text-foreground/50 dark:text-[#b0b4b5]">{label}</p>
    </div>
  );
}