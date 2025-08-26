import { HistoryData } from "@/app/api/stats/history-data/route";
import { UserSettings } from "@/lib/generated/prisma";
import { GetFormatterForCurrency } from "@/lib/helpers";
import { Timeframe } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import CountUp from "react-countup";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  BarChart,
} from "recharts";

interface Props {
  data: HistoryData[] | undefined;
  userSettings: UserSettings;
  timeFrame: Timeframe;
}

export default function HistoryChart({ data, userSettings, timeFrame }: Props) {
  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="w-full h-full">
      {hasData ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} barCategoryGap={5}>
            <defs>
              <linearGradient id="incomeBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset={"0"} stopColor="#10b981" stopOpacity={"1"} />
                <stop offset={"1"} stopColor="#10b981" stopOpacity={"0"} />
              </linearGradient>

              <linearGradient id="expenseBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset={"0"} stopColor="#ef4444" stopOpacity={"1"} />
                <stop offset={"1"} stopColor="#ef4444" stopOpacity={"0"} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray={"5 5"}
              strokeOpacity={0.2}
              vertical={false}
            />
            <XAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              dataKey={(data) => {
                const { year, month, day } = data;
                const date = new Date(year, month, day || 1);
                if (timeFrame === "year") {
                  return date.toLocaleDateString("default", { month: "short" });
                }
                return date.toLocaleDateString("default", { day: "2-digit" });
              }}
              axisLine={false}
              padding={{ left: 5, right: 5 }}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Bar
              dataKey={"income"}
              label="Income"
              fill="url(#incomeBar)"
              radius={4}
            />
            <Bar
              dataKey={"expense"}
              label="Income"
              fill="url(#expenseBar)"
              radius={4}
            />
            <Tooltip
              cursor={{ opacity: 0.1 }}
              content={(props) => (
                <CustomToolTip formatter={formatter} {...props} />
              )}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-muted-foreground">No data to display</p>
      )}
    </div>
  );
}

function CustomToolTip({ active, payload, formatter }: any) {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;
  const { expense, income } = data;

  return (
    <div className="min-w-[300px] rounded border bg-background p-4">
      <TooltipRow
        formatter={formatter}
        label="Income"
        value={income}
        bgColor="bg-emerald-500"
        textColor="text-emerald-500"
      />
      <TooltipRow
        formatter={formatter}
        label="Expense"
        value={expense}
        bgColor="bg-red-500"
        textColor="text-red-500"
      />
      <TooltipRow
        formatter={formatter}
        label="Balance"
        value={income - expense}
        bgColor="bg-gray-100"
        textColor="text-muted-foreground"
      />
    </div>
  );
}

function TooltipRow({
  label,
  value,
  bgColor,
  textColor,
  formatter,
}: {
  label: string;
  textColor: string;
  bgColor: string;
  value: number;
  formatter: Intl.NumberFormat;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("h-4 w-4 rounded-full", bgColor)} />
      <div className="flex w-full justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className={cn("text-sm font-bold", textColor)}>
          <CountUp
            preserveValue
            formattingFn={(value: number) => formatter.format(value)}
            className="text-sm"
            end={value}
            duration={0.5}
            decimals={0}
          />
        </div>
      </div>
    </div>
  );
}
