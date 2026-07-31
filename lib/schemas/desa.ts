import { z } from "zod";

/**
 * Helper: ubah string kosong menjadi undefined pada update schema.
 * - "" (string kosong) → undefined → field diabaikan, data lama tetap aman
 * - null → diteruskan → field dihapus (untuk batas wilayah / foto)
 * - nilai lain → divalidasi sesuai schema
 */
function emptyToUndefined<T extends z.ZodTypeAny>(schema: T) {
  return z.preprocess((val) => (val === "" ? undefined : val), schema);
}

/**
 * Helper: ubah NaN menjadi undefined pada update schema.
 * Input number kosong di browser sering menghasilkan NaN dari parseFloat/parseInt.
 */
function nanToUndefined<T extends z.ZodTypeAny>(schema: T) {
  return z.preprocess(
    (val) => (typeof val === "number" && Number.isNaN(val) ? undefined : val),
    schema,
  );
}

export const createDesaSchema = z.object({
  nama: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(200, "Nama maksimal 200 karakter"),
  sejarah: z.string().min(10, "Sejarah minimal 10 karakter"),
  visi: z.string().min(10, "Visi minimal 10 karakter"),
  misi: z.string().min(10, "Misi minimal 10 karakter"),
  luasWilayah: z
    .number()
    .positive("Luas wilayah harus positif")
    .nullish(),
  jumlahPenduduk: z
    .number()
    .int()
    .positive("Jumlah penduduk harus positif")
    .nullish(),
  jumlahKK: z.number().int().positive("Jumlah KK harus positif").nullish(),
  jumlahDusun: z
    .number()
    .int()
    .positive("Jumlah dusun harus positif")
    .nullish(),
  batasUtara: z.string().max(200).nullish(),
  batasTimur: z.string().max(200).nullish(),
  batasSelatan: z.string().max(200).nullish(),
  batasBarat: z.string().max(200).nullish(),
  fotoKepalaDesa: z.string().url("URL foto tidak valid").or(z.literal("")).nullish(),
});

export const updateDesaSchema = z
  .object({
    nama: emptyToUndefined(
      z
        .string()
        .min(2, "Nama minimal 2 karakter")
        .max(200, "Nama maksimal 200 karakter")
        .optional(),
    ),
    sejarah: emptyToUndefined(
      z.string().min(10, "Sejarah minimal 10 karakter").optional(),
    ),
    visi: emptyToUndefined(
      z.string().min(10, "Visi minimal 10 karakter").optional(),
    ),
    misi: emptyToUndefined(
      z.string().min(10, "Misi minimal 10 karakter").optional(),
    ),
    luasWilayah: nanToUndefined(
      z
        .number()
        .positive("Luas wilayah harus positif")
        .nullish()
        .optional(),
    ),
    jumlahPenduduk: nanToUndefined(
      z
        .number()
        .int()
        .positive("Jumlah penduduk harus positif")
        .nullish()
        .optional(),
    ),
    jumlahKK: nanToUndefined(
      z
        .number()
        .int()
        .positive("Jumlah KK harus positif")
        .nullish()
        .optional(),
    ),
    jumlahDusun: nanToUndefined(
      z
        .number()
        .int()
        .positive("Jumlah dusun harus positif")
        .nullish()
        .optional(),
    ),
    batasUtara: emptyToUndefined(z.string().max(200).nullish()),
    batasTimur: emptyToUndefined(z.string().max(200).nullish()),
    batasSelatan: emptyToUndefined(z.string().max(200).nullish()),
    batasBarat: emptyToUndefined(z.string().max(200).nullish()),
    fotoKepalaDesa: emptyToUndefined(
      z
        .string()
        .url("URL foto tidak valid")
        .or(z.literal(""))
        .nullish()
        .optional(),
    ),
  })
  .extend({
    id: z.string().cuid("ID tidak valid"),
  });

export type CreateDesaInput = z.infer<typeof createDesaSchema>;
export type UpdateDesaInput = z.infer<typeof updateDesaSchema>;