import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Profil Kelurahan", href: "/profil" },
  { label: "Visi & Misi", href: "/profil/visi-misi" },
  { label: "UMKM", href: "/umkm" },
  { label: "Wisata", href: "/wisata" },
  { label: "Kontak", href: "/aduan" },
];

export default function Footer() {
  return (
    <footer className="bg-graphite-night dark:bg-graphite-night text-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Logo Kelurahan Salomallori"
                width={48}
                height={48}
                className="object-contain rounded-full"
              />
              <div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[15px] font-extrabold tracking-tight text-white">
                    Kelurahan Salomallori
                  </span>
                  <span className="text-[10px] font-bold tracking-wide text-white/60">
                    Kec. Mattiro Bulu, Kab. Pinrang
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Website resmi Kelurahan Salomallori menyajikan informasi terkini
              seputar kegiatan dan pelayanan kelurahan.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Jam Operasional */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Jam Operasional
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Clock size={16} className="text-hudson-blue mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/80">Senin - Jumat</p>
                  <p className="text-white/60">07.30 - 16.00 WITA</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={16} className="text-hudson-blue mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/80">Sabtu</p>
                  <p className="text-white/60">07.30 - 12.00 WITA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-white font-semibold mb-4">Kontak</h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-hudson-blue shrink-0" />
                <a
                  href="mailto:kelurahansalomallori@gmail.com"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  kelurahansalomallori@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-hudson-blue shrink-0" />
                <span className="text-white/60">-</span>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle size={16} className="text-hudson-blue shrink-0" />
                <a
                  href="https://wa.me/628xxxxxx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </p>
              <p className="flex items-center gap-2">
                <SiInstagram size={16} className="text-hudson-blue shrink-0" />
                <a
                  href="https://instagram.com/kelurahansalomallori"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  @kelurahansalomallori
                </a>
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={16} className="text-hudson-blue mt-0.5 shrink-0" />
                <span className="text-white/60">
                  Kelurahan Salomallori, Kec. Mattiro Bulu, Kab. Pinrang,
                  Sulawesi Selatan
                </span>
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="pt-6 flex flex-col items-center gap-3 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Website Kelurahan Salomallori.
            Hak cipta dilindungi.
          </p>
          <div className="flex gap-4">
            <Link
              href="/aduan"
              className="hover:text-white transition-colors"
            >
              Kontak
            </Link>
            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              Beranda
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
