import { z } from "zod";

export const chartTypeEnum = z.enum([
  "BAR_CHART",
  "LINE_CHART",
  "PIE_CHART",
  "DOUGHNUT_CHART",
  "AREA_CHART",
  "STAT_CARDS",
]);

export const createInfografisSchema = z.object({
  judul: z.string().min(3, "Judul minimal 3 karakter").max(200, "Judul maksimal 200 karakter"),
  tahun: z.number().int().min(1900, "Tahun tidak valid").max(2100, "Tahun tidak valid"),
  dataJson: z.any().describe("Data JSON untuk chart"),
  chartType: chartTypeEnum.default("BAR_CHART"),
});

export const updateInfografisSchema = createInfografisSchema.partial().extend({
  id: z.string().cuid("ID tidak valid"),
});

export type CreateInfografisInput = z.infer<typeof createInfografisSchema>;
export type UpdateInfografisInput = z.infer<typeof updateInfografisSchema>;