import { z } from "zod";

export const createGaleriSchema = z.object({
  judul: z.string().min(3, "Judul minimal 3 karakter").max(200, "Judul maksimal 200 karakter"),
  gambar: z.string().url("URL gambar tidak valid"),
  kategori: z.string().min(2, "Kategori minimal 2 karakter").max(100, "Kategori maksimal 100 karakter"),
});

export const updateGaleriSchema = createGaleriSchema.partial().extend({
  id: z.string().cuid("ID tidak valid"),
});

export type CreateGaleriInput = z.infer<typeof createGaleriSchema>;
export type UpdateGaleriInput = z.infer<typeof updateGaleriSchema>;