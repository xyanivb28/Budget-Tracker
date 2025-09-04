"use server";

import { Currency } from "@/lib/currencies";
import prisma from "@/lib/prisma";
import {
  defaultAccountSchema,
  defaultAccountSchemaType,
} from "@/schema/accounts";
import { currencySchema } from "@/schema/userSettings";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createUserSettings({
  account,
  selectedCurrency,
}: {
  account: defaultAccountSchemaType;
  selectedCurrency: Currency;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const parsedAccount = defaultAccountSchema.safeParse(account);

  if (!parsedAccount.success) {
    throw parsedAccount.error;
  }

  const parsedCurrency = currencySchema.safeParse(selectedCurrency);

  if (!parsedCurrency.success) {
    throw parsedCurrency.error;
  }

  const { name } = parsedAccount.data;
  const { value } = parsedCurrency.data;

  const existing = await prisma.userSettings.findUnique({
    where: { userId: user.id },
  });

  if (existing) {
    redirect("/dashboard");
  }

  const userSettings = await prisma.userSettings.create({
    data: {
      userId: user.id,
      currency: value,
      defaultAccount: {
        create: {
          name: name,
          userId: user.id,
        },
      },
    },
  });

  redirect("/dashboard");
}
