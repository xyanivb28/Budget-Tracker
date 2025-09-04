import z from "zod";

export const defaultAccountSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 charecters." })
    .max(50, { message: "Name must not exceed 50 charecters." }),
});

export type defaultAccountSchemaType = z.infer<typeof defaultAccountSchema>;
