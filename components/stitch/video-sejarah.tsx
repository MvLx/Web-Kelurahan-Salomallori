"use client";

import { useEffect, useRef, useState } from "react";

export const YOUTUBE_VIDEO_ID = process.env.NEXT_PUBLIC_YOUTUBE_SEJARAH;

export function VideoSejarah() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Load iframe hanya ketika section sejarah mendekati viewport (scroll ke bawah)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!YOUTUBE_VIDEO_ID) return null;

  return (
    <div ref={containerRef} className="relative mb-6 w-full overflow-hidden rounded-xl">
      <div className="aspect-video w-full">
        {shouldLoad ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=1`}
            title="Video Sejarah Kelurahan Salomallori"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
          />
        ) : (
          <div className="h-full w-full bg-[#dee2de]/50 dark:bg-[#414943]/50" />
        )}
      </div>
    </div>
  );
}