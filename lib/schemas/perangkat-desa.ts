import { z } from "zod";

export const createPerangkatDesaSchema = z.object({
  nama: z.string().min(3, "Nama minimal 3 karakter").max(200, "Nama maksimal 200 karakter"),
  jabatan: z.string().min(3, "Jabatan minimal 3 karakter").max(200, "Jabatan maksimal 200 karakter"),
  foto: z.string().url("URL foto tidak valid").or(z.literal("")).nullish(),
  urutan: z.number().int().nonnegative("Urutan harus >= 0").default(0),
});

export const updatePerangkatDesaSchema = createPerangkatDesaSchema.partial().extend({
  id: z.string().cuid("ID tidak valid"),
});

export type CreatePerangkatDesaInput = z.infer<typeof createPerangkatDesaSchema>;
export type UpdatePerangkatDesaInput = z.infer<typeof updatePerangkatDesaSchema>;