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

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800/40 dark:bg-amber-950/30">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="flex-1 space-y-1.5">
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
              Pengumuman
            </p>
            {news.map((item) => (
              <div key={item.id}>
                {item.post ? (
                  <Link
                    href={`/news/${item.post.slug}`}
                    className="text-sm text-amber-700 underline-offset-2 hover:underline dark:text-amber-300"
                  >
                    {item.text}
                    {item.labelLink && (
                      <span className="ml-1.5 font-medium">
                        → {item.labelLink}
                      </span>
                    )}
                  </Link>
                ) : (
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    {item.text}
                    {item.labelLink && (
                      <span className="ml-1.5 font-medium">
                        → {item.labelLink}
                      </span>
                    )}
                  </p>
                )}
              </div>
            ))}
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
    </section>
  );
}