import { z } from "zod";

/**
 * Helper: ubah string kosong menjadi undefined pada schema.
 * - "" (string kosong) → undefined → field diabaikan
 * - null → diteruskan (untuk field opsional seperti phoneNumber)
 * - nilai lain → divalidasi sesuai schema
 */
function emptyToUndefined<T extends z.ZodTypeAny>(schema: T) {
  return z.preprocess((val) => (val === "" ? undefined : val), schema);
}

export const createMessageSchema = z.object({
  fullName: z
    .preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z
        .string()
        .min(2, "Nama minimal 2 karakter")
        .max(200, "Nama maksimal 200 karakter"),
    ),
  email: z
    .preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z
        .string()
        .email("Format email tidak valid")
        .max(200, "Email maksimal 200 karakter"),
    ),
  phoneNumber: emptyToUndefined(
    z.preprocess(
      (val) => {
        if (val === "" || val === null) return val;
        if (typeof val === "number") return String(val);
        return typeof val === "string" ? val.trim() : val;
      },
      z
        .string()
        .max(30, "Nomor telepon maksimal 30 karakter")
        .or(z.literal(""))
        .nullish(),
    ),
  ),
  content: z
    .preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z
        .string()
        .min(10, "Pesan minimal 10 karakter")
        .max(5000, "Pesan maksimal 5000 karakter"),
    ),
});

export type CreateMessageInput = z.infer<typeof createMessageSchema>;
