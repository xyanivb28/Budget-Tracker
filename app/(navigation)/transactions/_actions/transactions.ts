"use server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { TransactionsIdSchema } from "@/schema/transactions";

export async function DeleteTransaction(transactionsId: string[]) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const parsedBody = TransactionsIdSchema.safeParse({ id: transactionsId });

  if (!parsedBody.success) {
    throw new Error("bad request");
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      id: {
        in: parsedBody.data.id,
      },
      userId: user.id,
    },
  });

  if (transactions.length === 0) return;

  const operations = [
    prisma.transaction.deleteMany({
      where: { id: { in: parsedBody.data.id }, userId: user.id },
    }),
    ...transactions.map((t) =>
      prisma.monthHistory.update({
        where: {
          day_month_year_userId: {
            userId: user.id,
            day: t.date.getUTCDate(),
            month: t.date.getUTCMonth(),
            year: t.date.getUTCFullYear(),
          },
        },
        data: {
          expense: {
            decrement: t.type === "expense" ? t.amount : 0,
          },
          income: {
            decrement: t.type === "income" ? t.amount : 0,
          },
        },
      })
    ),
    ...transactions.map((t) =>
      prisma.yearHistory.update({
        where: {
          month_year_userId: {
            userId: user.id,
            month: t.date.getUTCMonth(),
            year: t.date.getUTCFullYear(),
          },
        },
        data: {
          expense: {
            decrement: t.type === "expense" ? t.amount : 0,
          },
          income: {
            decrement: t.type === "income" ? t.amount : 0,
          },
        },
      })
    ),

    // 4. clean up monthHistory rows that are now empty
    prisma.monthHistory.deleteMany({
      where: { userId: user.id, expense: 0, income: 0 },
    }),

    // 5. clean up yearHistory rows that are now empty
    prisma.yearHistory.deleteMany({
      where: { userId: user.id, expense: 0, income: 0 },
    }),
  ];

  await prisma.$transaction(operations);
}

export async function EditTransaction(transactionId: string) {
  console.log(transactionId);
}
