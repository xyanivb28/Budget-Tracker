import prisma from "@/lib/prisma";
import { OverviewQuerySchema } from "@/schema/overview";
import { currentUser } from "@clerk/nextjs/server";
import { endOfDay, startOfDay } from "date-fns";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const queryParams = OverviewQuerySchema.safeParse({ from, to });

  if (!queryParams.success) {
    return NextResponse.json(queryParams.error.message, { status: 400 });
  }

  const fromDate = startOfDay(queryParams.data.from);
  const toDate = endOfDay(queryParams.data.to);

  const stats = await getBalanceStats(user.id, fromDate, toDate);

  return NextResponse.json(stats);
}

export type GetBalanceStatsResponseType = Awaited<
  ReturnType<typeof getBalanceStats>
>;

async function getBalanceStats(userId: string, from: Date, to: Date) {
  const totals = await prisma.transaction.groupBy({
    by: ["type"],
    where: {
      userId,
      date: {
        gte: from,
        lte: to,
      },
    },
    _sum: {
      amount: true,
    },
    _count: {
      _all: true,
    },
  });

  return {
    expense: totals.find((t) => t.type === "expense")?._sum.amount || 0,
    expensesTransactionsAmount:
      totals.find((t) => t.type === "expense")?._count._all || 0,
    income: totals.find((t) => t.type === "income")?._sum.amount || 0,
    incomesTransactionsAmount:
      totals.find((t) => t.type === "income")?._count._all || 0,
  };
}
