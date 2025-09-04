import { Currencies } from "@/lib/currencies";
import { z } from "zod";

export const currencySchema = z.object({
  value: z.string().refine((val) => {
    return Currencies.some((c) => c.value === val);
  }, "Invalid currency"),
  label: z.string(),
  locale: z.string(),
});
