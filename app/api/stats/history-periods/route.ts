import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const periods = await getHistoryPeriods(user.id);
  return NextResponse.json(periods);
}

export type GetHistoryPeriodsResponseType = Awaited<
  ReturnType<typeof getHistoryPeriods>
>;

async function getHistoryPeriods(userId: string) {
  const result = await prisma.monthHistory.findMany({
    where: {
      userId,
    },
    select: {
      year: true,
    },
    distinct: ["year"],
    orderBy: [
      {
        year: "asc",
      },
    ],
  });

  const years = result.map((el) => el.year);

  if (years.length === 0) {
    return [new Date().getFullYear()];
  }

  if (!years.includes(new Date().getFullYear())) {
    years.push(new Date().getFullYear());
  }

  return years;
}
