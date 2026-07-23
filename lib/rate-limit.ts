/**
 * Simple In-Memory Rate Limiter
 *
 * Implements a sliding-window rate limiter using a plain `Map`.
 * Suitable for single-instance deployments (development & small-scale
 * production). For multi-instance (horizontal scaling) replace this
 * module with an external store (Upstash Redis, etc.).
 *
 * Usage:
 * ```ts
 * import { rateLimit } from "@/lib/rate-limit";
 *
 * const limiter = rateLimit({ windowMs: 60_000, max: 10 });
 *
 * export async function POST(request: NextRequest) {
 *   const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
 *   const result = limiter.check(ip);
 *   if (!result.allowed) {
 *     return NextResponse.json({ error: "Terlalu banyak permintaan" }, { status: 429 });
 *   }
 *   // ... handle request
 * }
 * ```
 *
 * @param options.windowMs  Duration of the sliding window in milliseconds (default: 60_000 = 1 minute)
 * @param options.max        Maximum number of requests allowed within the window (default: 20)
 */

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetMs: number;
}

interface RateLimitEntry {
  timestamps: number[];
}

interface RateLimitConfig {
  windowMs: number;
  max: number;
}

export function rateLimit(config?: Partial<RateLimitConfig>) {
  const { windowMs = 60_000, max = 20 } = config ?? {};

  // Shared mutable store — unique per `rateLimit()` call.
  // In a single-instance scenario this is safe; on multi-instance a
  // centralised store (Redis) must be used instead.
  const store = new Map<string, RateLimitEntry>();

  // Periodically purge stale entries to prevent unbounded memory growth.
  // Runs every `windowMs` milliseconds.
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
      // Keep only timestamps still within the window.
      entry.timestamps = entry.timestamps.filter((ts) => now - ts < windowMs);
      if (entry.timestamps.length === 0) {
        store.delete(key);
      }
    }
  }, windowMs);

  // Allow the timer to be freed when the module is garbage-collected
  // (not strictly necessary in Next.js long-running server but good practice).
  if (cleanupTimer.unref) {
    cleanupTimer.unref();
  }

  return {
    /**
     * Check whether `key` (typically the client IP) is allowed to proceed.
     * If not allowed the caller should return HTTP 429 Too Many Requests.
     */
    check(key: string): RateLimitResult {
      const now = Date.now();
      let entry = store.get(key);

      if (!entry) {
        entry = { timestamps: [now] };
        store.set(key, entry);
        return { allowed: true, remaining: max - 1, resetMs: windowMs };
      }

      // Discard timestamps outside the current window.
      entry.timestamps = entry.timestamps.filter((ts) => now - ts < windowMs);

      if (entry.timestamps.length >= max) {
        const oldest = entry.timestamps[0] ?? now;
        return {
          allowed: false,
          remaining: 0,
          resetMs: oldest + windowMs - now,
        };
      }

      entry.timestamps.push(now);
      return {
        allowed: true,
        remaining: max - entry.timestamps.length,
        resetMs: windowMs,
      };
    },

    /**
     * Reset the rate-limit state for a given key (useful after successful login).
     */
    reset(key: string): void {
      store.delete(key);
    },
  };
}