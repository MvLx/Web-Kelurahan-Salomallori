import { z } from "zod";

/**
 * Helper: ubah string kosong menjadi undefined pada update schema.
 * - "" (string kosong) → undefined → field diabaikan, data lama tetap aman
 * - null → diteruskan → field dihapus
 * - nilai lain → divalidasi sesuai schema
 */
function emptyToUndefined<T extends z.ZodTypeAny>(schema: T) {
  return z.preprocess((val) => (val === "" ? undefined : val), schema);
}

export const updateKontakSchema = z.object({
  alamat: z
    .string()
    .min(5, "Alamat minimal 5 karakter")
    .max(500, "Alamat maksimal 500 karakter")
    .optional(),
  telepon: emptyToUndefined(z.string().max(50).nullish()),
  whatsapp: emptyToUndefined(z.string().max(50).nullish()),
  email: emptyToUndefined(
    z.string().email("Format email tidak valid").max(200).nullish(),
  ),
  jamKerja: emptyToUndefined(z.string().max(200).nullish()),
  mapsEmbed: emptyToUndefined(
    z.string().max(2000, "Link Google Maps terlalu panjang").nullish(),
  ),
});

export type UpdateKontakInput = z.infer<typeof updateKontakSchema>;