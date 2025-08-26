"use server";

import prisma from "@/lib/prisma";
import {
  CreateTransactionSchema,
  CreateTransactionSchemaType,
  EditTransactionSchema,
  TransactionDataSchemaType,
  TransactionsIdSchema,
} from "@/schema/transactions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateTransaction(form: CreateTransactionSchemaType) {
  const parsedBody = CreateTransactionSchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const { amount, category, date, description, type } = parsedBody.data;

  const categoryRow = await prisma.category.findFirst({
    where: {
      userId: user.id,
      name: category,
    },
  });

  if (!categoryRow) {
    throw new Error("category not found");
  }

  // NOTE: don't confuse between @transaction ( prisma - allows to run multiple changes to db ) and prisma.transaction ( table )
  await prisma.$transaction([
    // Create user transaction
    prisma.transaction.create({
      data: {
        userId: user.id,
        amount,
        date: date,
        description: description || "",
        type,
        category: categoryRow.name,
        categoryIcon: categoryRow.icon,
      },
    }),

    // Update month aggregate table
    prisma.monthHistory.upsert({
      where: {
        day_month_year_userId: {
          userId: user.id,
          day: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
        },
      },
      create: {
        userId: user.id,
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        expense: type === "expense" ? amount : 0,
        income: type === "income" ? amount : 0,
      },
      update: {
        expense: {
          increment: type === "expense" ? amount : 0,
        },
        income: {
          increment: type === "income" ? amount : 0,
        },
      },
    }),

    // Update year aggregate table
    prisma.yearHistory.upsert({
      where: {
        month_year_userId: {
          userId: user.id,
          month: date.getMonth(),
          year: date.getFullYear(),
        },
      },
      create: {
        userId: user.id,
        month: date.getMonth(),
        year: date.getFullYear(),
        expense: type === "expense" ? amount : 0,
        income: type === "income" ? amount : 0,
      },
      update: {
        expense: {
          increment: type === "expense" ? amount : 0,
        },
        income: {
          increment: type === "income" ? amount : 0,
        },
      },
    }),
  ]);
}

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
            day: t.date.getDate(),
            month: t.date.getMonth(),
            year: t.date.getFullYear(),
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
            month: t.date.getMonth(),
            year: t.date.getFullYear(),
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

export async function EditTransaction(
  transactionData: TransactionDataSchemaType
) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const parsedBody = EditTransactionSchema.safeParse(transactionData);
  if (!parsedBody.success) throw new Error("bad request");

  const { id, description, date, category, amount, type } = parsedBody.data;

  // Update the existing transaction (after checking if it exists)
  // Decrement the month and year history amount aggregate of the old transaction
  // increment the month and year history amount aggregate of the new transaction
  // clean the empty month and year history that the amount field in expense && income is 0

  console.log("Parsed data", { id, description, date, category, amount, type });

  const oldTransaction = await prisma.transaction.findUnique({
    where: { userId: user.id, id },
  });

  if (!oldTransaction) {
    throw new Error("Transaction not found");
  }

  const operations: any[] = [
    // Update existing transaction
    prisma.transaction.update({
      where: {
        userId: user.id,
        id,
      },
      data: {
        description,
        date,
        category,
        amount,
        type,
      },
    }),
    // Decrement the old transaction from month history
    prisma.monthHistory.update({
      where: {
        day_month_year_userId: {
          day: oldTransaction.date.getDate(),
          month: oldTransaction.date.getMonth(),
          year: oldTransaction.date.getFullYear(),
          userId: user.id,
        },
      },
      data: {
        expense: {
          decrement:
            oldTransaction.type === "expense" ? oldTransaction.amount : 0,
        },
        income: {
          decrement:
            oldTransaction.type === "income" ? oldTransaction.amount : 0,
        },
      },
    }),
    // Decrement the year history for the old transaction
    prisma.yearHistory.update({
      where: {
        month_year_userId: {
          userId: user.id,
          month: oldTransaction.date.getMonth(),
          year: oldTransaction.date.getFullYear(),
        },
      },
      data: {
        expense: {
          decrement:
            oldTransaction.type === "expense" ? oldTransaction.amount : 0,
        },
        income: {
          decrement:
            oldTransaction.type === "income" ? oldTransaction.amount : 0,
        },
      },
    }),
    // Increment the new transaction in month history
    prisma.monthHistory.upsert({
      where: {
        day_month_year_userId: {
          day: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
          userId: user.id,
        },
      },
      update: {
        expense: {
          increment: type === "expense" ? amount : 0,
        },
        income: {
          increment: type === "income" ? amount : 0,
        },
      },
      create: {
        userId: user.id,
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        expense: type === "expense" ? amount : 0,
        income: type === "income" ? amount : 0,
      },
    }),
    // Increment the year history for the new transaction
    prisma.yearHistory.upsert({
      where: {
        month_year_userId: {
          userId: user.id,
          month: date.getMonth(),
          year: date.getFullYear(),
        },
      },
      update: {
        expense: {
          increment: type === "expense" ? amount : 0,
        },
        income: {
          increment: type === "income" ? amount : 0,
        },
      },
      create: {
        userId: user.id,
        month: date.getMonth(),
        year: date.getFullYear(),
        expense: type === "expense" ? amount : 0,
        income: type === "income" ? amount : 0,
      },
    }),

    // Cleanup empty income and expense records
    prisma.monthHistory.deleteMany({
      where: { userId: user.id, expense: 0, income: 0 },
    }),

    prisma.yearHistory.deleteMany({
      where: { userId: user.id, expense: 0, income: 0 },
    }),
  ];

  await prisma.$transaction(operations);
}
