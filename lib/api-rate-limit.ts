/**
 * Pre-configured rate limiters for API routes.
 *
 * Centralises all rate-limit configurations so they can be reused
 * consistently across all route handlers.
 */
import { rateLimit } from "@/lib/rate-limit";

/** Strict — public contact-form / feedback submissions (5 per minute). */
export const contactLimiter = rateLimit({ windowMs: 60_000, max: 5 });

/** Moderate — authenticated mutations (30 per minute per user/IP). */
export const mutationLimiter = rateLimit({ windowMs: 60_000, max: 30 });

/** Strict — file uploads (10 per minute per IP). */
export const uploadLimiter = rateLimit({ windowMs: 60_000, max: 10 });

/** Loose — user-management operations (20 per minute). */
export const userManagementLimiter = rateLimit({ windowMs: 60_000, max: 20 });

/**
 * Extract the client IP from a Request / NextRequest.
 */
export function getClientIp(request: Request | { headers: Headers }): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "127.0.0.1"
  );
}