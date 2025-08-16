"use client";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Currencies } from "@/lib/currencies";
import { UserSettings } from "@/lib/generated/prisma";
import { differenceInDays, startOfMonth } from "date-fns";
import { useState } from "react";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { toast } from "sonner";
import StatsCards from "./StatsCards";
import CategoriesCard from "./CategoriesCard";
import HistoryChartCard from "./HistoryChartCard";

interface Props {
  userSettings: UserSettings;
}

export default function Overview({ userSettings }: Props) {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  const locale = Currencies.find(
    (c) => c.value === userSettings.currency
  )?.locale;

  return (
    <div className="p-4">
      <header className="flex flex-col md:flex-row justify-between">
        <h1 className="text-3xl text-center md:text-start mb-4 md:mb-0 font-semibold">
          Overview
        </h1>
        <DateRangePicker
          onUpdate={(values) => {
            const { from, to } = values.range;

            if (!from || !to) return;
            if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
              toast.error(
                `The selected date range is too big. Max allowed range is ${MAX_DATE_RANGE_DAYS} days!`
              );
              return;
            }

            console.log("from", from);
            console.log("to", to);

            setDateRange({ from, to });
          }}
          initialDateFrom={dateRange.from}
          initialDateTo={dateRange.to}
          align="start"
          locale={locale}
          showCompare={false}
        />
      </header>
      <main className="h-full">
        <StatsCards
          userSettings={userSettings}
          from={dateRange.from}
          to={dateRange.to}
        />
        <div className="flex flex-col xl:flex-row w-full gap-2">
          <CategoriesCard
            userSettings={userSettings}
            from={dateRange.from}
            to={dateRange.to}
          />
          <HistoryChartCard
            userSettings={userSettings}
            from={dateRange.from}
            to={dateRange.to}
          />
        </div>
      </main>
    </div>
  );
}
