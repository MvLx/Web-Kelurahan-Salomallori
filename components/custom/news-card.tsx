import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, User } from "lucide-react";
import { cn } from "@/lib/utils";

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
  className?: string;
}

export function NewsCard({ post, priority = false, className }: NewsCardProps) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className={cn(
        "group relative block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className,
      )}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-[14px] border border-sage bg-paper shadow-paper-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-paper-md dark:border-[#414943] dark:bg-[#1a1a1a] dark:group-hover:border-[#84bd3a]/50">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-[#e8f5d7] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0b2b40] shadow-sm dark:bg-[#84bd3a]/20 dark:text-[#84bd3a]">
            {post.category.name}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col px-5 py-5">
          <div className="mb-2.5 flex flex-wrap items-center gap-3 text-[12px] text-iron dark:text-[#a0a0a0]">
            {post.author && (
              <span className="inline-flex items-center gap-1.5">
                <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary dark:text-[#84bd3a]">
                  <User className="size-3" />
                </span>
                <span className="font-medium">{post.author}</span>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              <span>
                {post.date}
                {post.time ? ` pukul ${post.time}` : ""}
              </span>
            </span>
          </div>

          <h3 className="line-clamp-2 font-display text-headline-small font-semibold leading-snug tracking-tight text-obsidian transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-[#84bd3a]">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mt-2 line-clamp-2 font-body text-body-medium leading-relaxed text-iron dark:text-[#a0a0a0]">
              {post.excerpt}
            </p>
          )}

          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-body text-label-large font-semibold text-primary transition-all group-hover:gap-2.5 dark:text-[#84bd3a]">
            Baca selengkapnya
            <ArrowRight className="size-4 transition-transform" />
          </span>
        </div>
      </article>
    </Link>
  );
}