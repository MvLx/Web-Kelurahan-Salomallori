import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ChevronRight } from "lucide-react";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import type { Metadata } from "next";

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
    <div className="min-h-screen">
      <Navbar variant="public" />
      <div className="h-16" />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-2 font-display text-display-medium font-bold text-obsidian dark:text-white">
          Berita
        </h1>
        <p className="mb-8 font-body text-body-medium text-iron">
          Informasi dan berita terbaru dari Kelurahan Salomallori
        </p>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-iron">
            <CalendarDays className="mb-4 h-12 w-12" />
            <p className="font-body text-body-medium">Belum ada berita</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}`}
                className="group rounded-[12px] border border-sage bg-paper p-4 shadow-paper-sm transition-all hover:shadow-paper-md dark:border-[#414943] dark:bg-[#1a1a1a]"
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
                    <CalendarDays className="h-8 w-8 text-iron" />
                  </div>
                )}
                <div className="flex items-center gap-2 text-body-small text-steel">
                  {post.category && (
                    <span className="rounded-full bg-sage/30 px-2.5 py-0.5 font-body text-label-medium text-hudson-blue dark:bg-[#414943] dark:text-[#7fc8ff]">
                      {post.category.name}
                    </span>
                  )}
                  <span>
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
                <div className="mt-3 flex items-center gap-1 font-body text-label-large font-semibold text-hudson-blue dark:text-[#7fc8ff]">
                  Baca selengkapnya
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}