import { z } from "zod";

export const CreateTransactionSchema = z.object({
  amount: z.coerce.number().positive().multipleOf(0.01),
  description: z.string().optional(),
  date: z.coerce.date(),
  category: z.string(),
  type: z.union([z.literal("income"), z.literal("expense")]),
});

export type CreateTransactionSchemaType = z.infer<
  typeof CreateTransactionSchema
>;

export const TransactionDataSchema = z.object({
  id: z.string(),
  date: z.coerce.date(),
  type: z.enum(["income", "expense"]),
  description: z.string().optional(),
  category: z.string(),
  amount: z.coerce.number().positive().multipleOf(0.01),
});

export type TransactionDataSchemaType = z.infer<typeof TransactionDataSchema>;

export const TransactionsIdSchema = z.object({
  id: z.array(z.string()),
});

export type TransactionsIdSchemaType = z.infer<typeof TransactionsIdSchema>;
