import { z } from "zod";

export const createDesaSchema = z.object({
  nama: z.string().min(2, "Nama minimal 2 karakter").max(200, "Nama maksimal 200 karakter"),
  sejarah: z.string().min(10, "Sejarah minimal 10 karakter"),
  visi: z.string().min(10, "Visi minimal 10 karakter"),
  misi: z.string().min(10, "Misi minimal 10 karakter"),
  luasWilayah: z.number().positive("Luas wilayah harus positif").nullish(),
  jumlahPenduduk: z.number().int().positive("Jumlah penduduk harus positif").nullish(),
  jumlahKK: z.number().int().positive("Jumlah KK harus positif").nullish(),
  jumlahDusun: z.number().int().positive("Jumlah dusun harus positif").nullish(),
  batasUtara: z.string().max(200).nullish(),
  batasTimur: z.string().max(200).nullish(),
  batasSelatan: z.string().max(200).nullish(),
  batasBarat: z.string().max(200).nullish(),
  fotoKepalaDesa: z.string().url("URL foto tidak valid").or(z.literal("")).nullish(),
});

export const updateDesaSchema = createDesaSchema.partial().extend({
  id: z.string().cuid("ID tidak valid"),
});

export type CreateDesaInput = z.infer<typeof createDesaSchema>;
export type UpdateDesaInput = z.infer<typeof updateDesaSchema>;