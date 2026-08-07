import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.salomallori.web.id"),
  title: {
    default: "Kelurahan Salomallori — Website Profil & Pelayanan",
    template: "%s | Kelurahan Salomallori",
  },
  description:
    "Website resmi Kelurahan Salomallori, Kec. Dua Pitue, Kab. Sidenreng Rappang. Menyajikan informasi profil kelurahan, UMKM, wisata, galeri, dan pelayanan publik.",
  keywords: [
    "Kelurahan Salomallori",
    "Salomallori",
    "Dua Pitue",
    "Sidenreng Rappang",
    "Sidrap",
    "Profil Kelurahan",
    "UMKM Salomallori",
    "Wisata Salomallori",
    "Website Kelurahan",
    "KKN Unhas",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "X9cPct-uu9THGL88XCpe2Se_Dp9FO6RFTx59-lpYykY",
  },
  alternates: {
    canonical: "https://www.salomallori.web.id",
  },
  openGraph: {
    title: "Kelurahan Salomallori — Website Profil & Pelayanan",
    description:
      "Website resmi Kelurahan Salomallori, Kec. Dua Pitue, Kab. Sidenreng Rappang. Menyajikan informasi profil kelurahan, UMKM, wisata, galeri, dan pelayanan publik.",
    url: "https://www.salomallori.web.id",
    siteName: "Kelurahan Salomallori",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://www.salomallori.web.id/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Kelurahan Salomallori",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kelurahan Salomallori — Website Profil & Pelayanan",
    description:
      "Website resmi Kelurahan Salomallori, Kec. Dua Pitue, Kab. Sidenreng Rappang. Menyajikan informasi profil kelurahan, UMKM, wisata, galeri, dan pelayanan publik.",
    images: ["https://www.salomallori.web.id/images/hero-bg.jpg"],
  },
  category: "government",
  icons: {
    icon: "/images/logo_kab.png",
    apple: "/images/logo_kab.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
