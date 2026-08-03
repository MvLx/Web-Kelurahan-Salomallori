import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Newspaper, ArrowRight, ImageOff } from "lucide-react";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Berita — Kelurahan Salomallori",
  description: "Berita dan informasi terbaru dari Kelurahan Salomallori",
};

export default async function NewsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="public" />
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

          {/* ── Grid ── */}
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-iron">
              <Newspaper className="mb-4 h-12 w-12" />
              <p className="font-body text-body-medium">Belum ada berita</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/news/${post.slug}`}
                  className="group rounded-[12px] border border-sage bg-paper p-4 shadow-paper-sm transition-all duration-200 hover:shadow-paper-md dark:border-[#414943] dark:bg-[#1a1a1a]"
                >
                  {post.image ? (
                    <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-[8px]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="mb-3 flex aspect-video w-full items-center justify-center rounded-[8px] bg-fog dark:bg-[#2e2e2e]">
                      <ImageOff className="h-8 w-8 text-iron" />
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    {post.category && (
                      <span className="rounded-full bg-sage/30 px-2.5 py-0.5 font-body text-label-medium text-hudson-blue dark:bg-[#414943] dark:text-[#84bd3a]">
                        {post.category.name}
                      </span>
                    )}
                    <span className="font-body text-body-small text-steel">
                      {new Date(post.createdAt).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <h2 className="mt-2 font-display text-headline-small font-semibold text-obsidian line-clamp-2 dark:text-white">
                    {post.title}
                  </h2>
                  <p className="mt-1 font-body text-body-medium text-iron line-clamp-2">
                    {post.summary}
                  </p>

                  <div className="mt-3 flex items-center gap-1 font-body text-label-large font-semibold text-hudson-blue dark:text-[#84bd3a]">
                    Baca selengkapnya
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}