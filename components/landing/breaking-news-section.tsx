"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import Link from "next/link";

interface BreakingNews {
  id: string;
  text: string;
  labelLink: string | null;
  isActive: boolean;
  postId: string | null;
  post: { id: string; title: string; slug: string } | null;
}

export function BreakingNewsSection() {
  const [news, setNews] = useState<BreakingNews[]>([]);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/breaking-news?active=true&limit=5");
        const json = await res.json();
        setNews(json.data ?? []);
      } catch {
        setNews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading || news.length === 0 || !visible) return null;

  // Ambil item pertama sebagai teks utama marquee (sesuai desain Stitch)
  const first = news[0];

  return (
    <div className="border-y border-amber-100 bg-amber-50 px-6 py-3 dark:border-amber-900/50 dark:bg-amber-950/30">
      <div className="mx-auto flex max-w-6xl items-center gap-4">
        <div className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-semibold text-amber-800 dark:text-amber-500">
          <AlertTriangle className="h-[18px] w-[18px]" />
          Pengumuman
        </div>
        <div className="h-4 w-px bg-amber-200 dark:bg-amber-800" />
        <div className="flex min-w-0 flex-1 items-center gap-4">
          {first.post ? (
            <Link
              href={`/news/${first.post.slug}`}
              className="truncate text-sm text-obsidian transition-colors hover:text-primary dark:text-[#e1e3e0] dark:hover:text-primary"
            >
              {first.text}
              {first.labelLink && (
                <span className="ml-1.5 font-medium">→ {first.labelLink}</span>
              )}
            </Link>
          ) : (
            <p className="truncate text-sm text-obsidian transition-colors hover:text-primary dark:text-[#e1e3e0] dark:hover:text-primary">
              {first.text}
              {first.labelLink && (
                <span className="ml-1.5 font-medium">→ {first.labelLink}</span>
              )}
            </p>
          )}
          {/* Item tambahan (jika ada) tersembunyi di mobile, tampil di desktop */}
          {news.length > 1 && (
            <div className="hidden min-w-0 flex-1 items-center gap-4 lg:flex">
              {news.slice(1).map((item) => (
                <span
                  key={item.id}
                  className="truncate text-sm text-iron dark:text-[#a0a0a0]"
                >
                  {item.text}
                </span>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => setVisible(false)}
          className="shrink-0 rounded-lg p-1 text-amber-500 transition-colors hover:bg-amber-100 hover:text-amber-700 dark:hover:bg-amber-900/50 dark:hover:text-amber-300"
          aria-label="Tutup pengumuman"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}