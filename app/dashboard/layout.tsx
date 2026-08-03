/**
 * Dashboard Layout — Server Component Guard
 *
 * Enforces authentication AND staff-role access for every page under
 * /dashboard/*. Two layers of protection are at work:
 *
 *   1. middleware.ts  — fast edge redirect when the session cookie is absent.
 *   2. This layout   — full server-side session validation via the DAL,
 *                      plus role enforcement (ADMIN | EDITOR only).
 *
 * Also provides the shared shell: fixed AdminSidebar (client) + scrollable
 * content area offset by the sidebar width on desktop.
 */
import { redirect } from "next/navigation";
import { verifySession, STAFF_ROLES, type SessionUser } from "@/lib/dal";
import AdminSidebar from "@/components/custom/admin-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Validates the session cryptographically; redirects to /auth/signin on
  // failure so we never reach the role check while unauthenticated.
  const session = await verifySession();

  const role = (session.user as SessionUser).role ?? "";
  if (!STAFF_ROLES.includes(role as (typeof STAFF_ROLES)[number])) {
    // Authenticated but not a staff member — send them to the public homepage.
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-linen dark:bg-[#111411]">
      <AdminSidebar />
      <main className="lg:pl-64">
        <div className="px-4 py-5 sm:px-6 lg:px-8 lg:py-6">{children}</div>
      </main>
    </div>
  );
}