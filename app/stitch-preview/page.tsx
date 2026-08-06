import { BerandaResmi } from "@/components/stitch/beranda-resmi";
import { BerandaDark } from "@/components/stitch/beranda-dark";

export default function StitchPreviewPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <div className="relative z-0 flex items-center justify-between border-b bg-background px-6 py-3">
        <div>
          <h1 className="text-lg font-bold">Preview Komponen Stitch</h1>
          <p className="text-sm text-muted-foreground">
            Project: Portal Profil Kelurahan Salomallori
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="rounded bg-emerald-100 px-2 py-1 font-semibold text-emerald-700">
            Beranda Resmi
          </span>
          <span className="rounded bg-slate-800 px-2 py-1 font-semibold text-white">
            Beranda Dark
          </span>
        </div>
      </div>

      {/* Preview Beranda Resmi (Light Theme) */}
      <section aria-label="Beranda Resmi - Updated Theme">
        <div className="border-b-4 border-dashed border-foreground/20 py-2 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Screen: Beranda Resmi (Updated Theme)
        </div>
        <BerandaResmi />
      </section>

      {/* Preview Beranda Dark Mode */}
      <section aria-label="Beranda Dark Mode">
        <div className="border-y-4 border-dashed border-foreground/20 py-2 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Screen: Beranda (Dark Mode)
        </div>
        <BerandaDark />
      </section>
    </div>
  );
}