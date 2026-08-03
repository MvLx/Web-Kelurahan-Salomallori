import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CardContent } from "@/components/ui/card";

export interface NewsCardPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  category: { name: string; color?: string | null };
  author: string;
  authorAvatar?: string;
  date: string;
  time?: string;
  image: string;
}

interface NewsCardProps {
  post: NewsCardPost;
  priority?: boolean;
}

export function NewsCard({ post, priority = false }: NewsCardProps) {
  return (
    <Link href={`/news/${post.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-[12px] border border-sage bg-paper shadow-paper-sm transition-all duration-200 hover:shadow-paper-md dark:border-[#414943] dark:bg-[#1a1a1a]">
        {/* Cover image with category badge overlay */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            width={0}
            height={0}
            sizes="100vw"
            priority={priority}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 rounded bg-white/90 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-obsidian backdrop-blur-sm dark:bg-black/80 dark:text-[#e1e3e0]">
            {post.category.name}
          </div>
        </div>

        {/* Content */}
        <CardContent className="flex flex-1 flex-col px-4 py-4">
          <p className="mb-2 text-sm text-iron dark:text-[#a0a0a0]">
            {post.date}
            {post.time ? ` pukul ${post.time}` : ""}
          </p>
          <h3 className="line-clamp-2 font-display text-headline-small font-semibold leading-tight text-obsidian transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-primary">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mt-2 line-clamp-2 font-body text-body-medium leading-relaxed text-iron dark:text-[#a0a0a0]">
              {post.excerpt}
            </p>
          )}

          <span className="mt-auto inline-flex items-center gap-1 pt-4 font-body text-label-large font-semibold text-primary transition-colors group-hover:text-primary dark:text-[#84bd3a]">
            Baca selengkapnya
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </CardContent>
      </article>
    </Link>
  );
}