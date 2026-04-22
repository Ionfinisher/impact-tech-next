import { Timestamp } from "firebase/firestore";
import { z } from "zod";

export const serviceCategorySchema = z.object({
  createdAt: z.union([z.instanceof(Timestamp), z.date()]),
  description: z.string(),
  name: z.string(),
  typeId: z.string(),
  updatedAt: z.union([z.instanceof(Timestamp), z.date()]),
});

export type ServiceCategory = z.infer<typeof serviceCategorySchema>;
