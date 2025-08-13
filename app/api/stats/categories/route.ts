import prisma from "@/lib/prisma";
import { CategoriesStatsQuerySchema } from "@/schema/categories";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const { searchParams } = new URL(request.nextUrl);
  const type = searchParams.get("type");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const queryParams = CategoriesStatsQuerySchema.safeParse({ type, from, to });
  if (!queryParams.success) {
    return NextResponse.json(queryParams.error.message, { status: 400 });
  }

  const categoriesStats = await getCategoriesStats(
    user.id,
    queryParams.data.type,
    new Date(queryParams.data.from),
    new Date(queryParams.data.to)
  );

  return NextResponse.json(categoriesStats);
}

export type GetCategoriesStatsResponseType = Awaited<
  ReturnType<typeof getCategoriesStats>
>;

async function getCategoriesStats(
  userId: string,
  type: string,
  from: Date,
  to: Date
) {
  const stats = await prisma.transaction.groupBy({
    by: ["category", "categoryIcon"],
    where: {
      userId,
      type,
      date: {
        gte: from,
        lte: to,
      },
    },
    _sum: {
      amount: true,
    },
  });

  if (stats.length === 0) return [];

  const totalAmount = stats.reduce((sum, s) => sum + (s._sum.amount || 0), 0);

  const sortedStats = stats.sort(
    (a, b) => (b._sum.amount || 0) - (a._sum.amount || 0)
  );
  const topCategories = sortedStats.slice(0, 5);
  const otherCategories = sortedStats.slice(5);

  if (otherCategories.length > 0) {
    const othersAmount = otherCategories.reduce(
      (sum, s) => sum + (s._sum.amount || 0),
      0
    );
    topCategories.push({
      category: "Others",
      categoryIcon: "",
      _sum: { amount: othersAmount },
    });
  }

  const categories = topCategories.map((s, index) => {
    const colors = generateDistinctColors(topCategories.length); // generate enough colors
    return {
      name: s.category,
      size: ((s._sum.amount || 0) / totalAmount) * 100,
      fill: colors[index],
      icon: s.categoryIcon || "",
      amount: s._sum.amount || 0,
    };
  });

  const sizeSum = categories.reduce((sum, c) => sum + c.size, 0);
  if (sizeSum !== 100) {
    categories[0].size += 100 - sizeSum;
  }

  return categories;
}

function generateDistinctColors(n: number): string[] {
  const colors: string[] = [];
  const saturation = 70;
  const lightness = 60;

  for (let i = 0; i < n; i++) {
    const hue = Math.round((360 / n) * i);
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }

  return colors;
}
