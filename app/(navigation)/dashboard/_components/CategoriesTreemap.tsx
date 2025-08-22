"use client";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";
import { useMemo } from "react";
import { GetFormatterForCurrency } from "@/lib/helpers";
import { UserSettings } from "@/lib/generated/prisma";
import { GetCategoriesStatsResponseType } from "@/app/api/stats/categories/route";

interface Props {
  userSettings: UserSettings;
  data: GetCategoriesStatsResponseType;
}

export default function CategoriesTreemap({ userSettings, data }: Props) {
  const formatter = useMemo(
    () => GetFormatterForCurrency(userSettings.currency),
    [userSettings.currency]
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
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
  );
}

const RoundedCell = ({ x, y, width, height, fill, size, icon }: any) => {
  const gap = 4;
  const displaySize = typeof size === "number" ? Math.round(size) + "%" : null;

  // Define font sizes
  const fontSizeIcon = 32;
  const fontSizeDisplay = 14;
  const gapBetween = 10;

  // Calculate total height needed for icon + displaySize + gap
  const totalHeight = fontSizeIcon + fontSizeDisplay + gapBetween;

  // Only render if rectangle is wide and tall enough
  const canRender = width - gap > fontSizeIcon && height - gap > totalHeight;

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
      {canRender && (
        <text
          x={x + width / 2}
          y={y + height / 2 - totalHeight / 2 + fontSizeIcon}
          textAnchor="middle"
          fill="#fff"
          stroke="none"
        >
          <tspan x={x + width / 2} dy="0" fontSize={fontSizeIcon}>
            {icon}
          </tspan>
          <tspan
            x={x + width / 2}
            dy={gapBetween + fontSizeDisplay / 2}
            fontSize={fontSizeDisplay}
            fontWeight="light"
          >
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
