import { z } from "zod";

export const createUMKMSchema = z.object({
  namaProduk: z.string().min(3, "Nama produk minimal 3 karakter").max(200, "Nama produk maksimal 200 karakter"),
  deskripsi: z.string().min(10, "Deskripsi minimal 10 karakter"),
  harga: z.string().max(100, "Harga maksimal 100 karakter").nullish(),
  kategori: z.string().min(2, "Kategori minimal 2 karakter").max(100, "Kategori maksimal 100 karakter"),
  kontak: z.string().min(5, "Kontak minimal 5 karakter").max(50, "Kontak maksimal 50 karakter"),
  gambar: z.string().url("URL gambar tidak valid").or(z.literal("")).nullish(),
  pemilik: z.string().min(3, "Nama pemilik minimal 3 karakter").max(200, "Nama pemilik maksimal 200 karakter"),
});

export const updateUMKMSchema = createUMKMSchema.partial().extend({
  id: z.string().cuid("ID tidak valid"),
});

export type CreateUMKMInput = z.infer<typeof createUMKMSchema>;
export type UpdateUMKMInput = z.infer<typeof updateUMKMSchema>;