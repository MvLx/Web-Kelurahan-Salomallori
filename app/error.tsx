"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Client-side error:", error);
  }, [error]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <div className="space-y-4 max-w-md">
        <h1 className="text-4xl font-bold text-destructive">Terjadi Kesalahan</h1>
        <p className="text-muted-foreground">
          Maaf, terjadi kesalahan yang tidak terduga. Silakan coba refresh halaman.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={reset} variant="default">
            Coba Lagi
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </div>
        {process.env.NODE_ENV === "development" && (
          <pre className="mt-4 max-w-full overflow-auto rounded-lg bg-muted p-4 text-left text-xs text-muted-foreground">
            {error.message}
          </pre>
        )}
      </div>
    </div>
  );
}