import { z } from "zod";

export const wisataKategoriEnum = z.enum(["WISATA_ALAM", "KULINER", "BUDAYA"]);

export const createWisataSchema = z.object({
  nama: z.string().min(3, "Nama minimal 3 karakter").max(200, "Nama maksimal 200 karakter"),
  deskripsi: z.string().min(10, "Deskripsi minimal 10 karakter"),
  lokasi: z.string().min(5, "Lokasi minimal 5 karakter").max(300, "Lokasi maksimal 300 karakter"),
  kategori: wisataKategoriEnum,
  gambar: z.string().url("URL gambar tidak valid").or(z.literal("")).nullish(),
});

export const updateWisataSchema = createWisataSchema.partial().extend({
  id: z.string().cuid("ID tidak valid"),
});

export type CreateWisataInput = z.infer<typeof createWisataSchema>;
export type UpdateWisataInput = z.infer<typeof updateWisataSchema>;