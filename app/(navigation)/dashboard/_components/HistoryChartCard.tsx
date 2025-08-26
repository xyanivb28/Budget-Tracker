"use client";
import { Card } from "@/components/ui/card";
import { UserSettings } from "@/lib/generated/prisma";
import { ChartColumn } from "lucide-react";
import { useState } from "react";

import HistoryChart from "./HistoryChart";

import HistoryPeriodSelector from "./HistoryPeriodSelector";
import { Period, Timeframe } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { GetHistoryDataResponseType } from "@/app/api/stats/history-data/route";
import SkeletonWrapper from "@/components/SkeletonWrapper";

interface Props {
  userSettings: UserSettings;
  from: Date;
  to: Date;
}

export default function HistoryChartCard({ userSettings }: Props) {
  const [timeframe, setTimeframe] = useState<Timeframe>("year");
  const [period, setPeriod] = useState<Period>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const historyDataQuery = useQuery<GetHistoryDataResponseType>({
    queryKey: ["overview", "history", timeframe, period],
    queryFn: () =>
      fetch(
        `/api/stats/history-data?timeframe=${timeframe}&year=${period.year}&month=${period.month}`
      ).then((res) => res.json()),
  });

  const dataAvailable =
    historyDataQuery.data && historyDataQuery.data.length > 0;

  return (
    <Card className="flex flex-col w-full p-2 gap-2">
      <header className="flex flex-col md:flex-row justify-start md:items-center md:justify-between gap-2">
        <div className="flex flex-row gap-2">
          <ChartColumn width={24} height={24} />
          <h1 className="text-xl font-normal">Chart</h1>
        </div>
        <HistoryPeriodSelector
          period={period}
          setPeriod={setPeriod}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
        />
      </header>
      <SkeletonWrapper isLoading={historyDataQuery.isFetching}>
        {dataAvailable && (
          <HistoryChart
            data={historyDataQuery.data}
            userSettings={userSettings}
            timeFrame={timeframe}
          />
        )}
        {!dataAvailable && (
          <div className="flex flex-col items-center justify-center text-center w-full h-full">
            <p>No data for selected period</p>
            <p className="text-muted-foreground text-sm">
              Try selecting a different period or adding new transactions
            </p>
          </div>
        )}
      </SkeletonWrapper>
    </Card>
  );
}
