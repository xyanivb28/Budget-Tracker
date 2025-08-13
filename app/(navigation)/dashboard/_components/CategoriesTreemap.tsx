"use client";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";
import { useMemo } from "react";
import { GetFormatterForCurrency } from "@/lib/helpers";
import { UserSettings } from "@/lib/generated/prisma";
import { GetCategoriesStatsResponseType } from "@/app/api/stats/categories/route";
import { useQuery } from "@tanstack/react-query";
import { TransactionType } from "@/lib/types";
import SkeletonWrapper from "@/components/SkeletonWrapper";

interface Props {
  userSettings: UserSettings;
  selected: TransactionType;
  from: Date;
  to: Date;
}

export default function CategoriesTreemap({
  userSettings,
  selected,
  from,
  to,
}: Props) {
  const { data, isFetching } = useQuery<GetCategoriesStatsResponseType>({
    queryKey: [
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

  const formatter = useMemo(
    () => GetFormatterForCurrency(userSettings.currency),
    [userSettings.currency]
  );

  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <SkeletonWrapper isLoading={isFetching}>
      <div className="w-full h-[350px] sm:w-[300px] sm:h-[300px] flex items-center justify-center">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={data}
              dataKey="size"
              stroke="none"
              content={<RoundedCell />}
              style={{ fill: "transparent", backgroundColor: "transparent" }}
              animationDuration={300}
            >
              <Tooltip content={<CustomTooltip formatter={formatter} />} />
            </Treemap>
          </ResponsiveContainer>
        ) : (
          <p className="text-muted-foreground text-center">
            No data to display
          </p>
        )}
      </div>
    </SkeletonWrapper>
  );
}

const RoundedCell = ({ x, y, width, height, fill, size, icon }: any) => {
  const gap = 4;
  const displaySize = typeof size === "number" ? Math.round(size) + "%" : null;

  return (
    <g>
      <rect
        x={x + gap / 2}
        y={y + gap / 2}
        width={width - gap}
        height={height - gap}
        rx={8}
        ry={8}
        fill={fill}
        stroke="none"
      />
      {width > 40 && height > 20 && (
        <text
          x={x + width / 2}
          y={y + height / 2 - 6}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
          stroke="none"
        >
          <tspan x={x + width / 2} dy="0">
            {icon}
          </tspan>
          <tspan x={x + width / 2} dy="16" fontSize={12} fontWeight="lighter">
            {displaySize}
          </tspan>
        </text>
      )}
    </g>
  );
};

const CustomTooltip = ({ active, payload, formatter }: any) => {
  if (!active || !payload || payload.length === 0) return null;
  const { name, amount } = payload[0].payload;

  return (
    <Card className="flex flex-col text-start p-4 gap-0 w-fit">
      <p>{name}</p>
      <p>{formatter.format(amount)}</p>
    </Card>
  );
};
