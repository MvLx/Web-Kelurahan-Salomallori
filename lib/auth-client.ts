import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { ac, adminRole, editorRole, userRole } from "@/lib/permissions";

function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Client-side: use current origin
    return window.location.origin;
  }
  // Server-side: fallback
  return process.env.NEXT_PUBLIC_BASE_URL || "https://web-kelurahan-salomallori.vercel.app";
}

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: getBaseUrl(),
  plugins: [
    adminClient({
      ac,
      roles: {
        USER: userRole,
        EDITOR: editorRole,
        ADMIN: adminRole,
      },
    }),
  ],
});
