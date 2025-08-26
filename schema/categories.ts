import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { differenceInDays } from "date-fns";
import z from "zod";

export const CreateCategorySchema = z.object({
  name: z.string().min(3).max(20),
  icon: z.string().max(20),
  type: z.enum(["expense", "income"]),
});

export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;

export const CategoriesStatsQuerySchema = z
  .object({
    type: z.enum(["income", "expense"]),
    from: z.coerce.date(),
    to: z.coerce.date(),
  })
  .refine((args) => {
    const { from, to } = args;
    const days = differenceInDays(to, from);

    const isValidRange = days >= 0 && days <= MAX_DATE_RANGE_DAYS;
    return isValidRange;
  });

export type CategoriesStatsQuerySchemaType = z.infer<
  typeof CategoriesStatsQuerySchema
>;

export const DeleteCategorySchema = z.object({
  name: z.string(),
  icon: z.string(),
  type: z.enum(["expense", "income"]),
});

export type DeleteCategorySchemaType = z.infer<typeof DeleteCategorySchema>;
