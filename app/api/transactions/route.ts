import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { OverviewQuerySchema } from "@/schema/overview";
import { endOfDay, startOfDay } from "date-fns";

export async function GET(request: NextRequest) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { searchParams } = new URL(request.nextUrl);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  // Case: 10 recent transactions (when no date range is probvided)
  if (!from || !to) {
    const recentTransactions = await getRecentTransactions(user.id);
    return NextResponse.json(recentTransactions);
  }

  const queryParams = OverviewQuerySchema.safeParse({ from, to });

  if (!queryParams.success) {
    return NextResponse.json(queryParams.error.message, { status: 400 });
  }

  const fromDate = startOfDay(queryParams.data.from);
  const toDate = endOfDay(queryParams.data.to);

  const transactions = await getTransactions(user.id, fromDate, toDate);

  return NextResponse.json(transactions);
}

// Case: Get transactions based on date range
export type GetTransactionsResponseType = Awaited<
  ReturnType<typeof getTransactions>
>;

async function getTransactions(userId: string, from: Date, to: Date) {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: from,
        lte: to,
      },
    },
    orderBy: { date: "desc" },
  });

  const transactionsDTO = transactions.map((transaction) => {
    return {
      id: transaction.id,
      date: transaction.date,
      description: transaction.description,
      type: transaction.type,
      category: `${transaction.categoryIcon} ${transaction.category}`,
      amount: transaction.amount,
    };
  });

  return transactionsDTO;
}

// Case: 10 recent transactions
export type GetRecentTransactionsResponseType = Awaited<
  ReturnType<typeof getRecentTransactions>
>;

async function getRecentTransactions(userId: string) {
  const recentTransactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: "desc" },
    take: 10,
  });

  const recentTransactionsDTO = recentTransactions.map((transaction) => {
    return {
      id: transaction.id,
      date: transaction.date,
      description: transaction.description,
      type: transaction.type,
      category: `${transaction.categoryIcon} ${transaction.category}`,
      amount: transaction.amount,
    };
  });

  return recentTransactionsDTO;
}
