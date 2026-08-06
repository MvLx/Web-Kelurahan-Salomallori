import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Newspaper, ArrowRight, ImageOff, User } from "lucide-react";
import { NavbarBeranda } from "@/components/custom/navbar-beranda";
import Footer from "@/components/custom/footer";
import { NewsCard, type NewsCardPost } from "@/components/custom/news-card";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Berita — Kelurahan Salomallori",
  description: "Berita dan informasi terbaru dari Kelurahan Salomallori",
};

type NewsPost = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  image: string | null;
  createdAt: Date;
  category: { name: string; color: string | null } | null;
  authors: { name: string; image: string | null }[];
};

function mapToCard(post: NewsPost): NewsCardPost {
  const author = post.authors[0]?.name ?? "Redaksi";
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.summary,
    category: {
      name: post.category?.name ?? "Berita",
      color: post.category?.color ?? null,
    },
    author,
    date: new Date(post.createdAt).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    image: post.image ?? `https://picsum.photos/seed/${post.slug}/800/500`,
  };
}

export default async function NewsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      category: true,
      authors: { select: { name: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-background">
      <NavbarBeranda />
      <div className="h-16" />

      <section className="bg-linen py-4xl dark:bg-[#111411]">
        <div className="mx-auto max-w-7xl px-6">
          {/* ── Header ── */}
          <div className="mb-10 flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-primary/10 text-primary dark:bg-[#84bd3a]/15 dark:text-[#84bd3a]">
              <Newspaper className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-display-small font-semibold text-obsidian dark:text-white">
                Berita
              </h1>
              <p className="font-body text-body-medium text-iron">
                Informasi dan berita terbaru dari Kelurahan Salomallori
              </p>
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-iron">
              <Newspaper className="mb-4 h-12 w-12" />
              <p className="font-body text-body-medium">Belum ada berita</p>
            </div>
          ) : (
            <>
              {/* ── Featured Article ── */}
              {featured && (
                <Link
                  href={`/news/${featured.slug}`}
                  className="group mb-10 block outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <article className="grid overflow-hidden rounded-[16px] border border-sage bg-paper shadow-paper-md transition-all duration-300 group-hover:shadow-paper-lg dark:border-[#414943] dark:bg-[#1a1a1a] md:grid-cols-2">
                    <div className="relative aspect-video overflow-hidden md:aspect-auto md:min-h-[320px]">
                      {featured.image ? (
                        <Image
                          src={featured.image}
                          alt={featured.title}
                          fill
                          priority
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-fog dark:bg-[#2e2e2e]">
                          <ImageOff className="h-10 w-10 text-iron" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 md:hidden" />
                    </div>

                    <div className="flex flex-col justify-center p-6 sm:p-8">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        {featured.category && (
                          <span className="inline-flex items-center rounded-full bg-[#e8f5d7] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0b2b40] dark:bg-[#84bd3a]/20 dark:text-[#84bd3a]">
                            {featured.category.name}
                          </span>
                        )}
                        <span className="text-[12px] font-medium text-iron">
                          {new Date(featured.createdAt).toLocaleDateString(
                            "id-ID",
                            { year: "numeric", month: "long", day: "numeric" },
                          )}
                        </span>
                      </div>

                      <h2 className="font-display text-headline-large font-semibold leading-tight tracking-tight text-obsidian transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-[#84bd3a]">
                        {featured.title}
                      </h2>

                      <p className="mt-3 line-clamp-3 font-body text-body-large leading-relaxed text-iron">
                        {featured.summary}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <span className="inline-flex items-center gap-2 font-body text-body-medium font-semibold text-obsidian dark:text-white">
                          <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary dark:text-[#84bd3a]">
                            <User className="size-3.5" />
                          </span>
                          {featured.authors[0]?.name ?? "Redaksi"}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-body text-body-medium font-semibold text-primary transition-all group-hover:gap-2.5 dark:text-[#84bd3a]">
                          Baca selengkapnya
                          <ArrowRight className="size-4" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {/* ── Grid Berita Lainnya ── */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <NewsCard key={post.id} post={mapToCard(post)} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}