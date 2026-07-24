import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { prisma } from "@/lib/prisma";
import { ac, adminRole, editorRole, userRole } from "@/lib/permissions";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders:
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {},
  plugins: [
    admin({
      /**
       * Map to the uppercase role values used in the existing database enum
       * (USER | ADMIN | EDITOR).
       */
      defaultRole: "USER",
      adminRoles: ["ADMIN"],
      /** Custom access-control that adds the EDITOR role + content resources */
      ac,
      roles: {
        USER: userRole,
        EDITOR: editorRole,
        ADMIN: adminRole,
      },
    }),
  ],
});
