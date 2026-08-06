import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { SiInstagram } from "react-icons/si";

export function FooterStitch() {
  return (
    <footer className="bg-[#0b2b40] pb-8 pt-16 text-white">
      <div className="mx-auto mb-12 grid max-w-7xl grid-cols-1 gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image
              src="/images/logo_kab.png"
              alt="Logo Kelurahan Salomallori"
              width={56}
              height={56}
              className="rounded-full object-contain"
            />
            <div>
              <span className="block text-[15px] font-extrabold tracking-tight text-white">
                Kelurahan Salomallori
              </span>
              <span className="block text-[10px] font-bold tracking-wide text-white/60">
                Kec. Dua Pitue, Kab. Sidenreng Rappang
              </span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/60">
            Website resmi Kelurahan Salomallori menyajikan informasi terkini
            seputar kegiatan dan pelayanan kelurahan.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h4 className="mb-4 font-semibold text-white">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/"
                className="link-underline text-white/60 transition-colors hover:text-white [&::after]:bg-white"
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                href="/profil/sejarah-kelurahan"
                className="link-underline text-white/60 transition-colors hover:text-white [&::after]:bg-white"
              >
                Profil Kelurahan
              </Link>
            </li>
            <li>
              <Link
                href="/profil/visi-misi"
                className="link-underline text-white/60 transition-colors hover:text-white [&::after]:bg-white"
              >
                Visi & Misi
              </Link>
            </li>
            <li>
              <Link
                href="/umkm"
                className="link-underline text-white/60 transition-colors hover:text-white [&::after]:bg-white"
              >
                UMKM
              </Link>
            </li>
            <li>
              <Link
                href="/aduan"
                className="link-underline text-white/60 transition-colors hover:text-white [&::after]:bg-white"
              >
                Kontak
              </Link>
            </li>
          </ul>
        </div>

        {/* Jam Operasional */}
        <div>
          <h4 className="mb-4 font-semibold text-white">Jam Operasional</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Clock size={16} className="mt-0.5 shrink-0 text-[#febe0d]" />
              <div>
                <p className="text-white/80">Senin - Jumat</p>
                <p className="text-white/60">07.30 - 16.00 WITA</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock size={16} className="mt-0.5 shrink-0 text-[#febe0d]" />
              <div>
                <p className="text-white/80">Sabtu</p>
                <p className="text-white/60">07.30 - 12.00 WITA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kontak */}
        <div>
          <h4 className="mb-4 font-semibold text-white">Kontak</h4>
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-[#febe0d]" />
              <a
                href="mailto:kelurahansalomallori@gmail.com"
                className="text-white/60 transition-colors hover:text-white"
              >
                kelurahansalomallori@gmail.com
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-[#febe0d]" />
              <span className="text-white/60">-</span>
            </p>
            <p className="flex items-center gap-2">
              <MessageCircle size={16} className="shrink-0 text-[#febe0d]" />
              <a
                href="https://wa.me/628xxxxxx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-white"
              >
                WhatsApp
              </a>
            </p>
            <p className="flex items-center gap-2">
              <SiInstagram size={16} className="shrink-0 text-[#febe0d]" />
              <a
                href="https://instagram.com/kelurahansalomallori"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-white"
              >
                @kelurahansalomallori
              </a>
            </p>
            <p className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[#febe0d]" />
              <span className="text-white/60">
                Kelurahan Salomallori, Kec. Dua Pitue, Kab. Sidenreng Rappang,
                Sulawesi Selatan
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-white/10" />
        <div className="flex flex-col items-center gap-3 pt-6 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} Website Kelurahan Salomallori. Hak
            cipta dilindungi.
          </p>
          <div className="flex gap-4">
            <Link
              href="/aduan"
              className="link-underline transition-colors hover:text-white [&::after]:bg-white"
            >
              Kontak
            </Link>
            <Link
              href="/"
              className="link-underline transition-colors hover:text-white [&::after]:bg-white"
            >
              Beranda
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}