import { z } from "zod";

export const createMessageSchema = z.object({
  fullName: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(200, "Nama maksimal 200 karakter"),
  email: z
    .string()
    .email("Format email tidak valid")
    .max(200, "Email maksimal 200 karakter"),
  phoneNumber: z
    .string()
    .max(30, "Nomor telepon maksimal 30 karakter")
    .nullish(),
  content: z
    .string()
    .min(10, "Pesan minimal 10 karakter")
    .max(5000, "Pesan maksimal 5000 karakter"),
});

export type CreateMessageInput = z.infer<typeof createMessageSchema>;