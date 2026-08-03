import { notFound } from "next/navigation";
import { after } from "next/server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronRight, ArrowRight, User } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import { CategoryBadge } from "@/components/custom/category-badge";
import { NewsCard, type NewsCardPost } from "@/components/custom/news-card";
import { ScrollToTopButton } from "@/components/custom/scroll-to-top";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type PostAuthor = {
  id: string;
  name: string;
  image: string | null;
};

type PostCategory = {
  id: string;
  name: string;
  color: string | null;
};

type PostDetail = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  fullContent: string;
  image: string | null;
  views: number;
  createdAt: Date;
  category: PostCategory;
  authors: PostAuthor[];
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function mapToNewsCard(post: {
  id: string;
  slug: string;
  title: string;
  summary: string;
  image: string | null;
  createdAt: Date;
  category: PostCategory;
  authors: PostAuthor[];
}): NewsCardPost {
  const authorImage = post.authors[0]?.image;
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.summary,
    category: {
      name: post.category.name,
      color: post.category.color,
    },
    author: post.authors[0]?.name ?? "Redaksi",
    ...(authorImage ? { authorAvatar: authorImage } : {}),
    date: formatDate(post.createdAt),
    image: post.image ?? `https://picsum.photos/seed/${post.slug}/800/500`,
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    select: { title: true, summary: true, image: true },
  });

  if (!post) {
    return { title: "Berita Tidak Ditemukan — Kelurahan Salomallori" };
  }

  return {
    title: `${post.title} — Kelurahan Salomallori`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      ...(post.image ? { images: [{ url: post.image }] } : {}),
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const rawPost = await prisma.post.findUnique({
    where: { slug, published: true },
    select: {
      id: true,
      title: true,
      slug: true,
      summary: true,
      fullContent: true,
      image: true,
      views: true,
      createdAt: true,
      category: { select: { id: true, name: true, color: true } },
      authors: { select: { id: true, name: true, image: true } },
    },
  });

  if (!rawPost) notFound();

  const post: PostDetail = rawPost;

  // Increment view count after response is sent (server-side, non-blocking)
  after(async () => {
    await prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });
  });

  // Fetch related posts from the same category
  const relatedRaw = await prisma.post.findMany({
    where: {
      published: true,
      categoryId: post.category.id,
      slug: { not: post.slug },
    },
    orderBy: { createdAt: "desc" },
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      summary: true,
      image: true,
      createdAt: true,
      category: { select: { id: true, name: true, color: true } },
      authors: { select: { id: true, name: true, image: true } },
    },
  });

  const relatedPosts: NewsCardPost[] = relatedRaw.map(mapToNewsCard);

  const primaryAuthor = post.authors[0];

  return (
    <div className="min-h-screen bg-linen dark:bg-[#111411]">
      <Navbar variant="public" />

      <main className="pb-4xl pt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* ── Breadcrumb ── */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-1.5 font-body text-body-small text-steel"
          >
            <Link
              href="/"
              className="transition-colors hover:text-[#32735f] dark:hover:text-[#84bd3a]"
            >
              Beranda
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <Link
              href="/news"
              className="transition-colors hover:text-[#32735f] dark:hover:text-[#84bd3a]"
            >
              Berita
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1 text-iron">{post.title}</span>
          </nav>

          {/* ── Cover Image ── */}
          {post.image && (
            <div className="mb-8 overflow-hidden rounded-[16px] shadow-paper-md">
              <Image
                src={post.image}
                alt={post.title}
                width={900}
                height={500}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          )}

          {/* ── Article Header ── */}
          <header className="mb-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <CategoryBadge
                name={post.category.name}
                color={post.category.color}
              />
            </div>

            <h1 className="mb-4 font-display text-headline-large font-semibold tracking-tight text-obsidian dark:text-white md:text-[40px] md:leading-[48px]">
              {post.title}
            </h1>

            {/* Author & Date Row */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={primaryAuthor?.image ?? ""}
                    alt={primaryAuthor?.name ?? "Redaksi"}
                  />
                  <AvatarFallback className="bg-[#32735f] text-xs text-white">
                    {(primaryAuthor?.name ?? "R")[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-body text-body-medium font-semibold text-obsidian dark:text-white">
                    {primaryAuthor?.name ?? "Redaksi"}
                  </p>
                  <p className="font-body text-body-small text-iron">Penulis</p>
                </div>
              </div>

              <Separator
                orientation="vertical"
                className="hidden h-8 sm:block bg-sage dark:bg-[#414943]"
              />

              <div className="flex items-center gap-1.5 font-body text-body-small text-iron">
                <CalendarDays className="h-4 w-4 shrink-0" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
          </header>

          {/* ── Full Content ── */}
          <article className="mb-4xl rounded-[12px] border border-sage bg-paper p-md shadow-paper-sm dark:border-[#414943] dark:bg-[#1a1a1a] sm:p-lg">
            <div
              className="font-body text-body-medium leading-relaxed text-obsidian dark:text-[#e1e3e0]
                prose prose-neutral max-w-none dark:prose-invert
                prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-obsidian dark:prose-headings:text-white
                prose-p:text-obsidian prose-p:dark:text-[#e1e3e0]
                prose-a:text-[#32735f] prose-a:dark:text-[#84bd3a] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-[8px]
                prose-blockquote:border-l-[#84bd3a] prose-blockquote:bg-linen prose-blockquote:dark:bg-[#2e2e2e] prose-blockquote:rounded-r-[8px] prose-blockquote:px-4 prose-blockquote:py-2
                prose-strong:text-obsidian prose-strong:dark:text-white"
              dangerouslySetInnerHTML={{ __html: post.fullContent }}
            />
          </article>

          {/* ── Multiple Authors ── */}
          {post.authors.length > 1 && (
            <div className="mb-4xl">
              <p className="mb-4 font-body text-label-medium font-semibold uppercase tracking-widest text-iron">
                Ditulis oleh
              </p>
              <div className="flex flex-wrap gap-3">
                {post.authors.map((author) => (
                  <div
                    key={author.id}
                    className="flex items-center gap-2.5 rounded-[12px] border border-sage bg-paper px-4 py-2.5 shadow-paper-sm dark:border-[#414943] dark:bg-[#1a1a1a]"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={author.image ?? ""}
                        alt={author.name}
                      />
                      <AvatarFallback className="bg-[#32735f]/15 text-xs text-[#32735f] dark:text-[#84bd3a]">
                        {author.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-body text-body-medium font-medium text-obsidian dark:text-white">
                      {author.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Related Posts ── */}
          {relatedPosts.length > 0 && (
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-display text-headline-medium font-semibold text-obsidian dark:text-white">
                  <User className="h-6 w-6 text-[#32735f] dark:text-[#84bd3a]" />
                  Berita Terkait
                </h2>
                <Link
                  href="/news"
                  className="inline-flex items-center gap-1.5 font-body text-label-large font-semibold text-[#32735f] transition-colors hover:text-[#32735f]/80 dark:text-[#84bd3a] dark:hover:text-[#84bd3a]/80"
                >
                  Lihat Semua
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {relatedPosts.map((rel) => (
                  <NewsCard key={rel.id} post={rel} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}