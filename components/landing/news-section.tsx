"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Newspaper, ArrowRight } from "lucide-react";
import { NewsCard, type NewsCardPost } from "@/components/custom/news-card";

// ─── Types ──────────────────────────────────────────
type PostItem = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  image: string | null;
  published: boolean;
  views: number;
  createdAt: string;
  category: { name: string; color: string | null } | null;
  authors: { id: string; name: string; image: string | null }[];
};

// ─── Skeleton ───────────────────────────────────────
function CardSkeleton() {
  return (
    <div className="rounded-[12px] border border-sage bg-paper p-4 shadow-paper-sm dark:border-[#414943] dark:bg-[#1a1a1a]">
      <div className="aspect-video w-full animate-pulse rounded-[8px] bg-ash dark:bg-[#2e2e2e]" />
      <div className="mt-3 space-y-2">
        <div className="h-5 w-3/4 animate-pulse rounded bg-ash dark:bg-[#2e2e2e]" />
        <div className="h-4 w-full animate-pulse rounded bg-ash dark:bg-[#2e2e2e]" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-ash dark:bg-[#2e2e2e]" />
      </div>
    </div>
  );
}

// ─── News Grid ──────────────────────────────────────
function NewsGrid({ items }: { items: PostItem[] }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-iron">
        <Newspaper className="mb-4 h-12 w-12" />
        <p className="font-body text-body-medium">Belum ada berita</p>
      </div>
    );
  }

  const cards: NewsCardPost[] = items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.summary,
    category: {
      name: item.category?.name ?? "Berita",
      color: item.category?.color ?? null,
    },
    author: item.authors[0]?.name ?? "Redaksi",
    date: new Date(item.createdAt).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    image: item.image ?? `https://picsum.photos/seed/${item.slug}/800/500`,
  }));

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <NewsCard key={card.id} post={card} />
      ))}
    </div>
  );
}

// ─── Main NewsSection ───────────────────────────────
export function NewsSection() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/posts?status=published&limit=5");
        if (res.ok) {
          const json = await res.json();
          setPosts(Array.isArray(json.data) ? json.data : []);
        }
      } catch (error) {
        console.error("Failed to load news:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="bg-linen py-4xl dark:bg-[#111411]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Newspaper className="h-7 w-7 text-hudson-blue dark:text-[#84bd3a]" />
            <h2 className="font-display text-display-small font-semibold text-obsidian dark:text-white">
              Berita Terbaru
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 font-body text-label-large font-semibold text-hudson-blue transition-colors hover:text-hudson-blue/80 dark:text-[#84bd3a] dark:hover:text-[#84bd3a]/80"
          >
            Lihat Semua
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <NewsGrid items={posts} />
        )}
      </div>
    </section>
  );
}