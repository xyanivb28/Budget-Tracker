"use client";
import { UserSettings } from "@/lib/generated/prisma";
import CategoriesTreemap from "./CategoriesTreemap";
import { Card } from "@/components/ui/card";
import { Blocks } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
import { GetCategoriesStatsResponseType } from "@/app/api/stats/categories/route";
import { useQuery } from "@tanstack/react-query";
import SkeletonWrapper from "@/components/SkeletonWrapper";

interface Props {
  userSettings: UserSettings;
  from: Date;
  to: Date;
}

export default function CategoriesCard({ userSettings, from, to }: Props) {
  const [selected, setSelected] = useState<"income" | "expense">("income");

  const { data, isFetching } = useQuery<GetCategoriesStatsResponseType>({
    queryKey: [
      "overview",
      "categories",
      "treemap",
      selected,
      from.toISOString(),
      to.toISOString(),
    ],
    queryFn: async () => {
      const res = await fetch(
        `/api/stats/categories?type=${selected}&from=${from.toISOString()}&to=${to.toISOString()}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }

      return res.json();
    },
  });

  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <Card className="flex flex-col w-full h-auto xl:max-w-[400px] p-2 gap-2">
      <header className="flex flex-row justify-between w-full">
        <div className="flex flex-row gap-2 self-center">
          <Blocks width={24} height={24} className="text-foreground" />
          <p className="text-foreground text-lg font-normal">Categories</p>
        </div>
        <div className="flex flex-row gap-2">
          <Toggle
            pressed={selected === "income"}
            onPressedChange={() => setSelected("income")}
          >
            Income
          </Toggle>
          <Separator orientation="vertical" className="h-6 bg-border" />
          <Toggle
            pressed={selected === "expense"}
            onPressedChange={() => setSelected("expense")}
          >
            Expense
          </Toggle>
        </div>
      </header>
      <SkeletonWrapper isLoading={isFetching}>
        {hasData && (
          <CategoriesTreemap userSettings={userSettings} data={data} />
        )}
        {!hasData && (
          <div className="flex flex-col items-center justify-center text-center h-full">
            <p>No data for selected period</p>
            <p className="text-muted-foreground text-sm">
              Try selecting different dates or adding new transactions
            </p>
          </div>
        )}
      </SkeletonWrapper>
    </Card>
  );
}
